# BEPO - Heritage-Inspired Waterproof Bags

This website showcases BEPO's heritage-inspired waterproof bags that protect your valuables while connecting you to Georgian culture and women's strength. Founded by Tamar Tsiklauri.

## Project Structure

```
bepo-design/
├── index.html              # Main BEPO website with heritage-inspired design
├── css/
│   └── styles.css          # Georgian-inspired styling and animations
├── js/
│   ├── core/
│   │   ├── App.js          # Main application manager
│   │   └── WorldBase.js    # Base class for all worlds
│   └── worlds/
│       ├── FluidWorld.js   # Fluid shader world implementation
│       ├── GlassWorld.js   # 3D glass crystal world
│       └── AuroraWorld.js  # Aurora shader world implementation
├── assets/                 # Product images and founder photos
└── README.md
```

## About BEPO

### **Heritage-Inspired Design**
- **Waterproof Protection**: Keep your valuables safe in any weather
- **Cultural Storytelling**: Each bag features authentic Georgian motifs
- **Women's Empowerment**: Designed to celebrate strength and heritage

### **Founder Story**
- **Tamar Tsiklauri**: Fashion designer and community development expert
- **Cultural Preservation**: Dedicated to protecting Georgian heritage
- **Community Focus**: Empowering women through practical, beautiful products

### **Product Features**
- **Waterproof Materials**: Durable protection for your essentials
- **Authentic Motifs**: Traditional Georgian patterns and designs
- **Handcrafted Quality**: Made with attention to detail and cultural significance

## Technical Features

### **Interactive Backgrounds**
- **Fluid World**: Dynamic fluid-like shader effects
- **Glass World**: 3D glass crystal formations with realistic lighting
- **Aurora World**: Aurora-like flowing colors with complex patterns

### **Advanced Interactions**
- **Cursor Trail System**: Triple cursor trail with physics-based movement
- **Particle Effects**: Floating particles with realistic physics
- **Magnetic Hover Effects**: Elements respond to cursor proximity
- **Heritage-Inspired Animations**: Georgian cultural motifs and patterns

## Development

The project uses ES6 modules, so it needs to be served from a web server (not opened directly as a file). You can use:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# VS Code Live Server extension
```

Then open `http://localhost:8000` in your browser to experience BEPO's heritage-inspired waterproof bags.



