/**
 * Exciting Navigation Transitions System
 * Provides multiple creative transition effects for navigation
 */
export class NavigationTransitions {
    constructor() {
        this.transitionTypes = [
            'flip',
            'dissolve', 
            'cut-reveal',
            'slide-morph',
            'spiral',
            'liquid-blob',
            'geometric',
            'particle-burst'
        ];
        this.currentTransition = null;
        this.isTransitioning = false;
        this.transitionDuration = 1200; // 1.2 seconds
    }

    /**
     * Initialize the navigation transition system
     */
    init() {
        this.setupNavigationListeners();
        this.createTransitionContainer();
        this.setupTransitionPreview();
        console.log('🎨 Navigation Transitions initialized with', this.transitionTypes.length, 'transition types');
    }

    /**
     * Setup navigation event listeners
     */
    setupNavigationListeners() {
        // Desktop navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href');
                if (targetSection && targetSection.startsWith('#')) {
                    this.navigateToSection(targetSection);
                }
            });
        });

        // Mobile navigation
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('show');
                mobileMenuBtn.setAttribute('aria-expanded', 
                    mobileMenu.classList.contains('show') ? 'true' : 'false'
                );
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('show');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    /**
     * Create the transition container
     */
    createTransitionContainer() {
        // Remove existing transition container if it exists
        const existingContainer = document.getElementById('nav-transition-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        const container = document.createElement('div');
        container.id = 'nav-transition-container';
        container.className = 'page-transition';
        container.style.display = 'none';
        document.body.appendChild(container);
    }

    /**
     * Navigate to a section with a transition effect
     */
    async navigateToSection(targetSection) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        
        // Choose transition type (use current or random)
        const transitionType = this.currentTransition || this.getRandomTransitionType();
        
        // Show transition
        await this.showTransition(transitionType, targetSection);
        
        // Scroll to target section
        this.scrollToSection(targetSection);
        
        // Hide transition after scroll
        setTimeout(() => {
            this.hideTransition();
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    /**
     * Get a random transition type
     */
    getRandomTransitionType() {
        return this.transitionTypes[Math.floor(Math.random() * this.transitionTypes.length)];
    }

    /**
     * Show the transition effect
     */
    async showTransition(transitionType, targetSection) {
        const container = document.getElementById('nav-transition-container');
        if (!container) return;

        // Clear previous content
        container.innerHTML = '';
        container.className = `page-transition ${transitionType}-transition`;
        
        // Create transition content based on type
        this.createTransitionContent(container, transitionType, targetSection);
        
        // Show the transition
        container.style.display = 'block';
        container.classList.add('active');
        
        // Trigger specific transition animations
        this.triggerTransitionAnimation(container, transitionType);
    }

    /**
     * Create transition content based on type
     */
    createTransitionContent(container, transitionType, targetSection) {
        const sectionName = this.getSectionName(targetSection);
        
        switch (transitionType) {
            case 'flip':
                this.createFlipContent(container, sectionName);
                break;
            case 'dissolve':
                this.createDissolveContent(container, sectionName);
                break;
            case 'cut-reveal':
                this.createCutRevealContent(container, sectionName);
                break;
            case 'slide-morph':
                this.createSlideMorphContent(container, sectionName);
                break;
            case 'spiral':
                this.createSpiralContent(container, sectionName);
                break;
            case 'liquid-blob':
                this.createLiquidBlobContent(container, sectionName);
                break;
            case 'geometric':
                this.createGeometricContent(container, sectionName);
                break;
            case 'particle-burst':
                this.createParticleBurstContent(container, sectionName);
                break;
        }
    }

    /**
     * Create flip transition content
     */
    createFlipContent(container, sectionName) {
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <div class="flip-content">
                <h2>${sectionName}</h2>
                <div class="loading-dots"></div>
            </div>
        `;
        container.appendChild(content);
    }

    /**
     * Create dissolve transition content
     */
    createDissolveContent(container, sectionName) {
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Dissolving into view...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Create cut and reveal transition content
     */
    createCutRevealContent(container, sectionName) {
        // Create cut panels
        for (let i = 0; i < 5; i++) {
            const panel = document.createElement('div');
            panel.className = 'cut-panel';
            container.appendChild(panel);
        }
        
        // Create content
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Revealing content...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Create slide and morph transition content
     */
    createSlideMorphContent(container, sectionName) {
        const morphShape = document.createElement('div');
        morphShape.className = 'morph-shape';
        container.appendChild(morphShape);
        
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Morphing into view...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Create spiral transition content
     */
    createSpiralContent(container, sectionName) {
        // Create spiral elements
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'spiral-element';
            container.appendChild(element);
        }
        
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Spiraling into view...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Create liquid blob transition content
     */
    createLiquidBlobContent(container, sectionName) {
        const blob = document.createElement('div');
        blob.className = 'blob';
        container.appendChild(blob);
        
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Liquid morphing...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Create geometric transition content
     */
    createGeometricContent(container, sectionName) {
        // Create geometric shapes
        for (let i = 0; i < 3; i++) {
            const shape = document.createElement('div');
            shape.className = 'geometric-shape';
            container.appendChild(shape);
        }
        
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Geometric expansion...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Create particle burst transition content
     */
    createParticleBurstContent(container, sectionName) {
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Set random positions for burst effect
            const angle = (i / 20) * 2 * Math.PI;
            const distance = 200 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.setProperty('--random-x', `${x}px`);
            particle.style.setProperty('--random-y', `${y}px`);
            
            container.appendChild(particle);
        }
        
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2>${sectionName}</h2>
            <p>Particle burst...</p>
        `;
        container.appendChild(content);
    }

    /**
     * Trigger specific transition animations
     */
    triggerTransitionAnimation(container, transitionType) {
        // Add active class to trigger animations
        container.classList.add('active');
        
        // Special handling for cut-reveal
        if (transitionType === 'cut-reveal') {
            setTimeout(() => {
                container.classList.add('active');
            }, 50);
        }
    }

    /**
     * Hide the transition
     */
    hideTransition() {
        const container = document.getElementById('nav-transition-container');
        if (container) {
            container.classList.remove('active');
            setTimeout(() => {
                container.style.display = 'none';
                container.innerHTML = '';
            }, 300);
        }
    }

    /**
     * Scroll to the target section
     */
    scrollToSection(targetSection) {
        const targetElement = document.querySelector(targetSection);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Get section name from href
     */
    getSectionName(targetSection) {
        const sectionNames = {
            '#hero': 'Home',
            '#portfolio': 'Portfolio',
            '#services': 'Services',
            '#about': 'About',
            '#contact': 'Contact'
        };
        return sectionNames[targetSection] || 'Section';
    }

    /**
     * Get current transition type
     */
    getCurrentTransitionType() {
        return this.currentTransition;
    }

    /**
     * Set specific transition type
     */
    setTransitionType(type) {
        if (this.transitionTypes.includes(type)) {
            this.currentTransition = type;
        }
    }

    /**
     * Get all available transition types
     */
    getAvailableTransitions() {
        return [...this.transitionTypes];
    }

    /**
     * Setup transition preview panel
     */
    setupTransitionPreview() {
        const previewPanel = document.getElementById('transition-preview');
        if (!previewPanel) return;

        // Show preview panel after a delay
        setTimeout(() => {
            previewPanel.classList.add('show');
        }, 2000);

        // Setup transition button listeners
        const transitionButtons = previewPanel.querySelectorAll('.transition-btn');
        transitionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const transitionType = e.target.dataset.transition;
                
                // Update active button
                transitionButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Set transition type
                if (transitionType === 'random') {
                    this.currentTransition = null;
                    console.log('🎲 Random transitions enabled');
                } else {
                    this.currentTransition = transitionType;
                    console.log(`🎨 Transition set to: ${transitionType}`);
                }
            });
        });

        // Hide preview panel on click outside
        document.addEventListener('click', (e) => {
            if (!previewPanel.contains(e.target) && !e.target.closest('.nav-link')) {
                previewPanel.classList.remove('show');
            }
        });

        // Show preview panel on navigation hover
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                previewPanel.classList.add('show');
            });
        });

        // Keyboard shortcut to toggle preview panel (Ctrl/Cmd + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                previewPanel.classList.toggle('show');
            }
        });
    }
}
