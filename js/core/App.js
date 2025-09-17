import { FluidWorld } from '../worlds/FluidWorld.js';
import { GlassWorld } from '../worlds/GlassWorld.js';
import { AuroraWorld } from '../worlds/AuroraWorld.js';
import { Phase3Features } from './Phase3Features.js';

/**
 * Main application class that manages the Three.js scene and world switching
 */
export class App {
    constructor() {
        this.currentWorld = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = null;
        this.width = 0;
        this.height = 0;
        this.aspectRatio = 0;
        this.quality = this.detectQuality();
        this.phase3Features = null;
        
        // Phase 2: Advanced interactive features
        this.cursorTrail = [];
        this.particles = [];
        this.codeRain = [];
        this.musicVisualizer = null;
        this.performanceMonitor = { fps: 60, frameCount: 0, lastTime: 0 };
        this.konamiCode = [];
        this.konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.isKonamiActive = false;
        this.mousePosition = { x: 0, y: 0 };
        this.scrollPosition = 0;
    }
    
    detectQuality() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return 'low';
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        
        // Detect high-end GPUs
        const highEndGPUs = ['RTX', 'GTX 10', 'GTX 16', 'GTX 20', 'GTX 30', 'GTX 40', 'RX 6', 'RX 7', 'M1', 'M2', 'M3'];
        const isHighEnd = highEndGPUs.some(gpu => renderer.includes(gpu));
        
        // Detect device pixel ratio
        const dpr = window.devicePixelRatio || 1;
        
        if (isHighEnd && dpr <= 2) return 'high';
        if (dpr <= 1.5) return 'medium';
        return 'low';
    }

    init() {
        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            console.error('Three.js is not loaded. Please ensure the script is included before the modules.');
            return;
        }

        try {
            this.setupCanvas();
            this.setupRenderer();
            this.setupScene();
            this.setupCamera();
            this.setupClock();
            this.setupEventListeners();
            this.setupUI();
            this.initPhase2Features();
            
            // Initial world load
            this.loadWorld('fluid');
            
            // Initialize Phase 3 features
            this.phase3Features = new Phase3Features();
            
            // Hide loading indicator
            this.hideLoading();
            
            this.animate();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.hideLoading();
        }
    }

    setupCanvas() {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '0';
        this.canvas = canvas;
    }

    setupRenderer() {
        const pixelRatio = this.quality === 'high' ? window.devicePixelRatio : 
                          this.quality === 'medium' ? Math.min(window.devicePixelRatio, 1.5) : 1;
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: this.quality !== 'low', 
            alpha: true,
            powerPreference: "high-performance",
            precision: this.quality === 'high' ? "highp" : "mediump"
        });
        
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = false;
        this.renderer.autoClear = true;
        this.renderer.setClearColor(0x000000, 0);
        
        console.log(`Quality setting: ${this.quality}, Pixel ratio: ${pixelRatio}`);
        
        // Update quality indicator
        const qualityIndicator = document.getElementById('quality-indicator');
        if (qualityIndicator) {
            const qualityText = this.quality === 'high' ? 'High Quality' : 
                              this.quality === 'medium' ? 'Medium Quality' : 'Low Quality';
            qualityIndicator.textContent = `${qualityText} • ${pixelRatio.toFixed(1)}x`;
        }
    }

    setupScene() {
        this.scene = new THREE.Scene();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
    }

    setupClock() {
        this.clock = new THREE.Clock();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('pointermove', (event) => this.onPointerMove(event));
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('click', (event) => this.onClick(event));
    }

    setupUI() {
        document.getElementById('world-buttons').addEventListener('click', (e) => {
            const worldType = e.target.dataset.world;
            if (worldType) {
                this.loadWorld(worldType);
            }
        });
    }

    loadWorld(type) {
        try {
            // Add a small delay for smooth transition
            setTimeout(() => {
                // Clean up current world
                if (this.currentWorld) {
                    this.currentWorld.teardown();
                    this.currentWorld = null;
                }
                
                // Update UI
                document.querySelectorAll('.world-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                const targetButton = document.querySelector(`[data-world="${type}"]`);
                if (targetButton) {
                    targetButton.classList.add('active');
                }
                
                // Create new world
                switch (type) {
                    case 'fluid':
                        this.currentWorld = new FluidWorld(this.scene, this.camera, this.renderer);
                        break;
                    case 'glass':
                        this.currentWorld = new GlassWorld(this.scene, this.camera, this.renderer);
                        break;
                    case 'aurora':
                        this.currentWorld = new AuroraWorld(this.scene, this.camera, this.renderer);
                        break;
                    default:
                        console.warn(`Unknown world type: ${type}`);
                        return;
                }

                if (this.currentWorld) {
                    this.currentWorld.init();
                }
            }, 50); // Small delay for smooth transition
        } catch (error) {
            console.error(`Failed to load world ${type}:`, error);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        try {
            const deltaTime = this.clock.getDelta();
            
            if (this.currentWorld) {
                this.currentWorld.update(deltaTime);
            }
            
            // Phase 2: Update advanced features
            this.updateCursorTrail();
            this.updateParticles();
            this.updatePerformanceMonitor();
            
            this.renderer.render(this.scene, this.camera);
        } catch (error) {
            console.error('Animation error:', error);
        }
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectRatio = this.width / this.height;
        
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.aspectRatio;
        this.camera.updateProjectionMatrix();
        
        if (this.currentWorld) {
            this.currentWorld.onResize(this.width, this.height, this.aspectRatio);
        }
    }
    
    onPointerMove(event) {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
        
        // Update cursor trail targets
        this.cursorTrail.forEach((trail, index) => {
            const offset = (index + 1) * 10;
            trail.targetX = event.clientX - offset;
            trail.targetY = event.clientY - offset;
        });
        
        // Show color palette on hover over design elements
        const target = event.target;
        if (target.classList.contains('glass-card') || target.classList.contains('text-gradient')) {
            const palette = document.getElementById('color-palette');
            if (palette) {
                palette.style.display = 'block';
            }
        } else {
            const palette = document.getElementById('color-palette');
            if (palette) {
                palette.style.display = 'none';
            }
        }
        
        if (this.currentWorld) {
            this.currentWorld.onPointerMove(event.clientX, event.clientY);
        }
    }

    hideLoading() {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.opacity = '0';
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 300);
        }
    }

    // Phase 2: Advanced Interactive Features
    initPhase2Features() {
        this.createCursorTrail();
        this.createParticleSystem();
        this.createCodeRain();
        this.createMusicVisualizer();
        this.createPerformanceMonitor();
        this.createAdvancedEffects();
        this.createNeuralNetwork();
        this.createDNAHelix();
        this.createQuantumDots();
        this.createEnergyWaves();
        this.createTypingEffect();
    }

    createCursorTrail() {
        // Create cursor trail elements
        for (let i = 0; i < 3; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: ${8 - i * 2}px;
                height: ${8 - i * 2}px;
                background: ${i === 0 ? 'rgba(59, 130, 246, 0.8)' : i === 1 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(236, 72, 153, 0.4)'};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: screen;
                transition: all 0.1s ease-out;
                opacity: 0;
            `;
            document.body.appendChild(trail);
            this.cursorTrail.push({ element: trail, x: 0, y: 0, targetX: 0, targetY: 0 });
        }
    }

    createParticleSystem() {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                animation: floatUp ${Math.random() * 10 + 5}s linear infinite;
            `;
            document.body.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createCodeRain() {
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'code-rain-column';
            column.style.cssText = `
                position: fixed;
                top: -100px;
                left: ${i * 20}px;
                width: 20px;
                height: 100px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                color: rgba(0, 255, 0, 0.3);
                pointer-events: none;
                z-index: 1;
                animation: codeRain ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            let text = '';
            for (let j = 0; j < 10; j++) {
                text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
            }
            column.innerHTML = text;
            document.body.appendChild(column);
            this.codeRain.push(column);
        }
    }

    createMusicVisualizer() {
        const visualizer = document.createElement('div');
        visualizer.className = 'music-visualizer';
        visualizer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            display: flex;
            align-items: end;
            gap: 2px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        for (let i = 0; i < 8; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.cssText = `
                width: 4px;
                height: 20px;
                background: linear-gradient(to top, 
                    ${i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : i === 2 ? '#10b981' : i === 3 ? '#06b6d4' : 
                     i === 4 ? '#3b82f6' : i === 5 ? '#8b5cf6' : i === 6 ? '#ec4899' : '#f97316'}, 
                    transparent);
                border-radius: 2px;
                animation: musicPulse ${Math.random() * 0.5 + 0.5}s ease-in-out infinite alternate;
                animation-delay: ${i * 0.1}s;
            `;
            visualizer.appendChild(bar);
        }
        
        document.body.appendChild(visualizer);
        this.musicVisualizer = visualizer;
    }

    createPerformanceMonitor() {
        const monitor = document.createElement('div');
        monitor.id = 'performance-monitor';
        monitor.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: #00ff00;
            padding: 5px 10px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            z-index: 1000;
            opacity: 0.7;
        `;
        document.body.appendChild(monitor);
    }

    createAdvancedEffects() {
        // Add CSS for advanced effects
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
            
            @keyframes codeRain {
                0% { transform: translateY(-100px); }
                100% { transform: translateY(100vh); }
            }
            
            @keyframes musicPulse {
                0% { height: 20px; }
                100% { height: 60px; }
            }
            
            .glitch-text {
                position: relative;
                display: inline-block;
            }
            
            .glitch-text:hover::before,
            .glitch-text:hover::after {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .glitch-text:hover::before {
                animation: glitch1 0.3s ease-in-out;
                color: #ff0000;
                z-index: -1;
            }
            
            .glitch-text:hover::after {
                animation: glitch2 0.3s ease-in-out;
                color: #00ff00;
                z-index: -2;
            }
            
            @keyframes glitch1 {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
            }
            
            @keyframes glitch2 {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(2px, 2px); }
                40% { transform: translate(2px, -2px); }
                60% { transform: translate(-2px, 2px); }
                80% { transform: translate(-2px, -2px); }
            }
            
            .holographic-text {
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                background-size: 400% 400%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: holographicShift 3s ease-in-out infinite;
            }
            
            @keyframes holographicShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .liquid-morph {
                animation: liquidMorph 4s ease-in-out infinite;
            }
            
            @keyframes liquidMorph {
                0%, 100% { border-radius: 50% 20% 50% 20%; }
                25% { border-radius: 20% 50% 20% 50%; }
                50% { border-radius: 50% 50% 20% 20%; }
                75% { border-radius: 20% 20% 50% 50%; }
            }
            
            .ripple-effect {
                position: relative;
                overflow: hidden;
            }
            
            .ripple-effect::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .ripple-effect:active::before {
                width: 300px;
                height: 300px;
            }
            
            .color-palette {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                padding: 15px;
                border-radius: 10px;
                display: none;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            
            .color-swatch {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin: 5px;
                cursor: pointer;
                transition: transform 0.3s ease;
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            
            .color-swatch:hover {
                transform: scale(1.2);
            }
            
            .magnetic-hover {
                transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .magnetic-hover:hover {
                transform: scale(1.05) rotate(2deg);
            }
        `;
        document.head.appendChild(style);
        
        this.createColorPalette();
        this.addMagneticEffects();
    }

    createColorPalette() {
        const palette = document.createElement('div');
        palette.className = 'color-palette';
        palette.id = 'color-palette';
        
        const colors = [
            '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4',
            '#10B981', '#F59E0B', '#EF4444', '#6366F1'
        ];
        
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.addEventListener('click', () => this.copyColor(color));
            palette.appendChild(swatch);
        });
        
        document.body.appendChild(palette);
    }

    addMagneticEffects() {
        // Add magnetic hover effects to interactive elements
        const magneticElements = document.querySelectorAll('button, .glass-card, .world-btn');
        magneticElements.forEach(element => {
            element.classList.add('magnetic-hover');
        });
    }

    copyColor(color) {
        navigator.clipboard.writeText(color).then(() => {
            // Show feedback
            const feedback = document.createElement('div');
            feedback.textContent = `Copied ${color}`;
            feedback.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
            `;
            document.body.appendChild(feedback);
            setTimeout(() => feedback.remove(), 2000);
        });
    }

    onScroll() {
        this.scrollPosition = window.scrollY;
        this.updateScrollEffects();
    }

    onKeyDown(event) {
        this.konamiCode.push(event.code);
        if (this.konamiCode.length > this.konamiSequence.length) {
            this.konamiCode.shift();
        }
        
        if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
            this.activateKonamiCode();
        }
    }

    onClick(event) {
        this.createRippleEffect(event);
    }

    updateCursorTrail() {
        this.cursorTrail.forEach((trail, index) => {
            const speed = 0.1 + (index * 0.05);
            trail.x += (trail.targetX - trail.x) * speed;
            trail.y += (trail.targetY - trail.y) * speed;
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = '1';
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.bottom < 0) {
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
            }
        });
    }

    updatePerformanceMonitor() {
        this.performanceMonitor.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.performanceMonitor.lastTime >= 1000) {
            this.performanceMonitor.fps = this.performanceMonitor.frameCount;
            this.performanceMonitor.frameCount = 0;
            this.performanceMonitor.lastTime = currentTime;
            
            const monitor = document.getElementById('performance-monitor');
            if (monitor) {
                monitor.textContent = `FPS: ${this.performanceMonitor.fps}`;
            }
            
            // Auto-optimize based on performance
            if (this.performanceMonitor.fps < 30) {
                this.optimizePerformance();
            }
        }
    }

    updateScrollEffects() {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const opacity = Math.max(0, 1 - this.scrollPosition / window.innerHeight);
            hero.style.opacity = opacity;
        }
    }

    activateKonamiCode() {
        this.isKonamiActive = true;
        
        // Show music visualizer
        if (this.musicVisualizer) {
            this.musicVisualizer.style.opacity = '1';
        }
        
        // Add hue rotation effect
        document.body.style.filter = 'hue-rotate(180deg)';
        
        // Reset after 10 seconds
        setTimeout(() => {
            this.isKonamiActive = false;
            if (this.musicVisualizer) {
                this.musicVisualizer.style.opacity = '0';
            }
            document.body.style.filter = 'none';
        }, 10000);
    }

    createRippleEffect(event) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: rippleExpand 0.6s ease-out;
        `;
        
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    createNeuralNetwork() {
        // Create neural network lines
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'neural-line';
                line.style.cssText = `
                    position: fixed;
                    top: ${Math.random() * window.innerHeight}px;
                    left: ${Math.random() * window.innerWidth}px;
                    width: ${Math.random() * 200 + 50}px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
                    transform: rotate(${Math.random() * 360}deg);
                    z-index: 1;
                    animation: neuralPulse 2s ease-in-out infinite;
                `;
                document.body.appendChild(line);
                
                setTimeout(() => line.remove(), 2000);
            }, i * 1000);
        }
    }

    createDNAHelix() {
        const helix = document.createElement('div');
        helix.className = 'dna-helix';
        helix.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 4px;
            height: 100px;
            background: linear-gradient(45deg, #3B82F6, #8B5CF6);
            z-index: 1;
            animation: dnaRotate 4s linear infinite;
        `;
        
        // Add pseudo-elements for double helix
        const style = document.createElement('style');
        style.textContent = `
            .dna-helix::before,
            .dna-helix::after {
                content: '';
                position: absolute;
                width: 4px;
                height: 100px;
                background: linear-gradient(45deg, #EC4899, #06B6D4);
                border-radius: 50%;
            }
            
            .dna-helix::before {
                transform: translateX(-20px) rotateY(60deg);
                animation: dnaRotate 4s linear infinite reverse;
            }
            
            .dna-helix::after {
                transform: translateX(20px) rotateY(-60deg);
                animation: dnaRotate 4s linear infinite;
            }
            
            @keyframes dnaRotate {
                0% { transform: rotateY(0deg); }
                100% { transform: rotateY(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(helix);
    }

    createQuantumDots() {
        for (let i = 0; i < 15; i++) {
            const dot = document.createElement('div');
            dot.className = 'quantum-dot';
            dot.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: radial-gradient(circle, #fff, transparent);
                border-radius: 50%;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                z-index: 1;
                animation: quantumFloat 6s ease-in-out infinite;
                animation-delay: ${Math.random() * 6}s;
            `;
            document.body.appendChild(dot);
        }
    }

    createEnergyWaves() {
        setInterval(() => {
            const wave = document.createElement('div');
            wave.className = 'energy-wave';
            wave.style.cssText = `
                position: fixed;
                width: 200px;
                height: 200px;
                border: 2px solid rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                left: ${Math.random() * (window.innerWidth - 200)}px;
                top: ${Math.random() * (window.innerHeight - 200)}px;
                z-index: 1;
                animation: energyPulse 2s ease-out infinite;
            `;
            document.body.appendChild(wave);
            
            setTimeout(() => wave.remove(), 2000);
        }, 3000);
    }

    createTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            setTimeout(typeWriter, 1000);
        });
    }

    optimizePerformance() {
        // Reduce particle count
        if (this.particles.length > 10) {
            this.particles.slice(10).forEach(particle => particle.remove());
            this.particles = this.particles.slice(0, 10);
        }
        
        // Reduce code rain columns
        if (this.codeRain.length > 10) {
            this.codeRain.slice(10).forEach(column => column.remove());
            this.codeRain = this.codeRain.slice(0, 10);
        }
    }
}
