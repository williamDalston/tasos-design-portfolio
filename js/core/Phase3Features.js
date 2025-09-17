/**
 * Phase 3: Advanced Interactive Features
 * This module contains all the magnetic, scientific, and interactive elements
 * that make Taso's website truly unique and memorable.
 */

export class Phase3Features {
    constructor() {
        this.cursorTrails = [];
        this.particles = [];
        this.neuralLines = [];
        this.quantumDots = [];
        this.energyWaves = [];
        this.dnaHelices = [];
        this.performanceMonitor = null;
        this.musicVisualizer = null;
        this.colorPalette = null;
        this.konamiCode = [];
        this.konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.isKonamiActive = false;
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = 0;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        if (this.isMobile) {
            // Skip heavy effects on mobile for performance
            return;
        }

        this.createCursorTrails();
        this.createParticleSystem();
        this.createNeuralNetworkLines();
        this.createQuantumDots();
        this.createEnergyWaves();
        this.createDNAHelices();
        this.createPerformanceMonitor();
        this.createMusicVisualizer();
        this.createColorPalette();
        this.setupKonamiCode();
        this.setupEventListeners();
        this.startAnimation();
    }

    createCursorTrails() {
        // Create three cursor trail elements
        for (let i = 0; i < 3; i++) {
            const trail = document.createElement('div');
            trail.className = `cursor-trail${i === 0 ? '' : i === 1 ? '-2' : '-3'}`;
            document.body.appendChild(trail);
            this.cursorTrails.push(trail);
        }
    }

    createParticleSystem() {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-dot';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createNeuralNetworkLines() {
        // Create neural network connecting lines
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'neural-line';
            line.style.left = Math.random() * window.innerWidth + 'px';
            line.style.top = Math.random() * window.innerHeight + 'px';
            line.style.width = Math.random() * 200 + 100 + 'px';
            line.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(line);
            this.neuralLines.push(line);
        }
    }

    createQuantumDots() {
        // Create quantum dots with different behaviors
        for (let i = 0; i < 15; i++) {
            const dot = document.createElement('div');
            dot.className = 'quantum-dot';
            dot.style.left = Math.random() * window.innerWidth + 'px';
            dot.style.top = Math.random() * window.innerHeight + 'px';
            dot.style.animationDelay = Math.random() * 3 + 's';
            dot.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(dot);
            this.quantumDots.push(dot);
        }
    }

    createEnergyWaves() {
        // Create energy wave effects
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'energy-wave';
            wave.style.left = Math.random() * window.innerWidth + 'px';
            wave.style.top = Math.random() * window.innerHeight + 'px';
            wave.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(wave);
            this.energyWaves.push(wave);
        }
    }

    createDNAHelices() {
        // Create DNA helix animations
        for (let i = 0; i < 2; i++) {
            const helix = document.createElement('div');
            helix.className = 'dna-helix';
            helix.style.position = 'fixed';
            helix.style.left = Math.random() * (window.innerWidth - 40) + 'px';
            helix.style.top = Math.random() * (window.innerHeight - 200) + 'px';
            helix.style.zIndex = '1';
            helix.style.animationDelay = Math.random() * 4 + 's';
            document.body.appendChild(helix);
            this.dnaHelices.push(helix);
        }
    }

    createPerformanceMonitor() {
        this.performanceMonitor = document.createElement('div');
        this.performanceMonitor.className = 'performance-monitor';
        this.performanceMonitor.innerHTML = 'FPS: <span id="fps-counter">60</span>';
        document.body.appendChild(this.performanceMonitor);
    }

    createMusicVisualizer() {
        this.musicVisualizer = document.createElement('div');
        this.musicVisualizer.className = 'music-visualizer';
        
        for (let i = 0; i < 8; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            this.musicVisualizer.appendChild(bar);
        }
        
        document.body.appendChild(this.musicVisualizer);
    }

    createColorPalette() {
        this.colorPalette = document.createElement('div');
        this.colorPalette.className = 'color-palette';
        this.colorPalette.innerHTML = '<h4 style="color: white; margin-bottom: 10px; font-size: 12px;">Color Palette</h4>';
        
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B'];
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.addEventListener('click', () => this.copyColor(color));
            this.colorPalette.appendChild(swatch);
        });
        
        document.body.appendChild(this.colorPalette);
    }

    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.keyCode);
            
            if (this.konamiCode.length > this.konamiSequence.length) {
                this.konamiCode.shift();
            }
            
            if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
                this.activateKonamiCode();
                this.konamiCode = [];
            }
        });
    }

    setupEventListeners() {
        // Mouse movement for cursor trails
        document.addEventListener('mousemove', (e) => {
            this.updateCursorTrails(e.clientX, e.clientY);
        });

        // Hover effects for design elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('interactive-card')) {
                this.showColorPalette();
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('interactive-card')) {
                this.hideColorPalette();
            }
        });

        // Add magnetic hover effects to all interactive elements
        document.querySelectorAll('.interactive-card, .btn-refined, .glass-card').forEach(element => {
            element.classList.add('magnetic-hover');
        });

        // Add glitch effects to headlines
        document.querySelectorAll('h1, h2, h3').forEach(headline => {
            headline.classList.add('glitch-text');
            headline.setAttribute('data-text', headline.textContent);
        });

        // Add holographic effects to gradient text
        document.querySelectorAll('.text-gradient').forEach(element => {
            element.classList.add('holographic-text');
        });

        // Add liquid morphing to icons
        document.querySelectorAll('.morphing-shape').forEach(element => {
            element.classList.add('liquid-morph');
        });

        // Add magnetic field effects
        document.querySelectorAll('.magnetic-field').forEach(element => {
            element.classList.add('magnetic-field');
        });

        // Add ripple effects to buttons
        document.querySelectorAll('button, .btn-refined').forEach(button => {
            button.classList.add('ripple-effect');
        });
    }

    updateCursorTrails(x, y) {
        this.cursorTrails.forEach((trail, index) => {
            const delay = (index + 1) * 0.1;
            setTimeout(() => {
                trail.style.left = x + 'px';
                trail.style.top = y + 'px';
            }, delay * 1000);
        });
    }

    showColorPalette() {
        if (this.colorPalette) {
            this.colorPalette.classList.add('show');
        }
    }

    hideColorPalette() {
        if (this.colorPalette) {
            this.colorPalette.classList.remove('show');
        }
    }

    copyColor(color) {
        navigator.clipboard.writeText(color).then(() => {
            // Show feedback
            const feedback = document.createElement('div');
            feedback.textContent = `Copied ${color}`;
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                z-index: 10000;
                font-size: 14px;
            `;
            document.body.appendChild(feedback);
            setTimeout(() => feedback.remove(), 2000);
        });
    }

    activateKonamiCode() {
        if (this.isKonamiActive) return;
        
        this.isKonamiActive = true;
        
        // Add hue rotation effect
        document.body.style.filter = 'hue-rotate(180deg)';
        
        // Show music visualizer
        if (this.musicVisualizer) {
            this.musicVisualizer.classList.add('show');
        }
        
        // Show performance monitor
        if (this.performanceMonitor) {
            this.performanceMonitor.classList.add('show');
        }
        
        // Reset after 10 seconds
        setTimeout(() => {
            document.body.style.filter = '';
            if (this.musicVisualizer) {
                this.musicVisualizer.classList.remove('show');
            }
            if (this.performanceMonitor) {
                this.performanceMonitor.classList.remove('show');
            }
            this.isKonamiActive = false;
        }, 10000);
    }

    updatePerformance() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            if (this.performanceMonitor) {
                const fpsCounter = this.performanceMonitor.querySelector('#fps-counter');
                if (fpsCounter) {
                    fpsCounter.textContent = this.fps;
                }
            }
            
            // Auto-optimize based on performance
            if (this.fps < 30) {
                this.optimizePerformance();
            }
        }
    }

    optimizePerformance() {
        // Reduce particle count
        this.particles.slice(10).forEach(particle => particle.remove());
        this.particles = this.particles.slice(0, 10);
        
        // Reduce quantum dots
        this.quantumDots.slice(8).forEach(dot => dot.remove());
        this.quantumDots = this.quantumDots.slice(0, 8);
        
        // Reduce neural lines
        this.neuralLines.slice(3).forEach(line => line.remove());
        this.neuralLines = this.neuralLines.slice(0, 3);
    }

    startAnimation() {
        const animate = () => {
            this.updatePerformance();
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Cleanup method
    destroy() {
        // Remove all created elements
        [...this.cursorTrails, ...this.particles, ...this.neuralLines, 
         ...this.quantumDots, ...this.energyWaves, ...this.dnaHelices,
         this.performanceMonitor, this.musicVisualizer, this.colorPalette]
        .forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        
        // Clear arrays
        this.cursorTrails = [];
        this.particles = [];
        this.neuralLines = [];
        this.quantumDots = [];
        this.energyWaves = [];
        this.dnaHelices = [];
    }
}
