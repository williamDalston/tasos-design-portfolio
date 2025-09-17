# Taso's Designs - Modular Structure

This project has been refactored from a monolithic HTML file into a modular, maintainable structure.

## Project Structure

```
tasos-design/
├── index.html              # Main HTML file with minimal markup
├── css/
│   └── styles.css          # All CSS styles and animations
├── js/
│   ├── core/
│   │   ├── App.js          # Main application manager
│   │   └── WorldBase.js    # Base class for all worlds
│   └── worlds/
│       ├── FluidWorld.js   # Fluid shader world implementation
│       ├── GlassWorld.js   # 3D glass crystal world
│       └── AuroraWorld.js  # Aurora shader world implementation
└── README.md
```

## Key Improvements

### 1. **Separation of Concerns**
- **HTML**: Clean markup with semantic structure
- **CSS**: All styles centralized in `css/styles.css`
- **JavaScript**: Modular ES6 classes with clear responsibilities

### 2. **Modular Architecture**
- **WorldBase**: Abstract base class defining the world interface
- **Individual Worlds**: Each world is a separate module with its own file
- **App Manager**: Centralized application logic and world switching

### 3. **Maintainability**
- Easy to add new worlds by extending `WorldBase`
- Clear file organization makes code easy to navigate
- Each component has a single responsibility

### 4. **Performance**
- ES6 modules enable better tree-shaking
- Cleaner separation allows for better optimization
- Easier to implement lazy loading if needed

## Adding New Worlds

To add a new world:

1. Create a new file in `js/worlds/YourWorld.js`
2. Extend the `WorldBase` class
3. Implement the required methods: `init()`, `update()`, `onResize()`, `onPointerMove()`
4. Add the world to the switch statement in `App.js`
5. Add a button to the HTML

Example:
```javascript
import { WorldBase } from '../core/WorldBase.js';

export class YourWorld extends WorldBase {
    init() {
        // Your world initialization
    }
    
    update(deltaTime) {
        // Your world update logic
    }
    
    onResize(w, h, ar) {
        // Handle resize
    }
    
    onPointerMove(x, y) {
        // Handle mouse movement
    }
}
```

## Development

The project uses ES6 modules, so it needs to be served from a web server (not opened directly as a file). You can use:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# VS Code Live Server extension
```

Then open `http://localhost:8000` in your browser.



