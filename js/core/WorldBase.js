/**
 * Base class for all world implementations
 * Provides common interface and cleanup functionality
 */
export class WorldBase {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.uniforms = {};
        this.objects = [];
        this.lights = [];
    }

    init() {
        // Override in subclasses
    }

    update(deltaTime) {
        // Override in subclasses
    }

    onResize(w, h, ar) {
        // Override in subclasses
    }

    onPointerMove(x, y) {
        // Override in subclasses
    }

    teardown() {
        // Clean up objects
        this.objects.forEach(obj => {
            if (obj && this.scene) {
                this.scene.remove(obj);
            }
            if (obj && obj.geometry) {
                obj.geometry.dispose();
            }
            if (obj && obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(mat => mat.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
        
        // Clean up lights
        this.lights.forEach(light => {
            if (light && this.scene) {
                this.scene.remove(light);
            }
        });
        
        // Clean up uniforms
        if (this.uniforms) {
            Object.values(this.uniforms).forEach(uniform => {
                if (uniform && uniform.value && uniform.value.dispose) {
                    uniform.value.dispose();
                }
            });
        }
        
        // Reset arrays
        this.objects = [];
        this.lights = [];
        this.uniforms = {};
    }
}
