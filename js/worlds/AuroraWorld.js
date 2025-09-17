import { WorldBase } from '../core/WorldBase.js';

/**
 * Aurora World - Aurora-like shader effect with flowing colors
 */
export class AuroraWorld extends WorldBase {
    init() {
        const geometry = new THREE.PlaneGeometry(2, 2);
        this.uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
        };
        
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                varying vec2 vUv;
                
                // A more complex curl noise
                vec2 curl(vec2 p) {
                    float t = u_time * 0.1;
                    float n1 = sin(p.x * 2.0 + t) + cos(p.y * 2.0 + t);
                    float n2 = sin(p.y * 2.5 + t) + cos(p.x * 2.5 + t);
                    vec2 curl_vec = vec2(n1, n2);
                    return normalize(curl_vec) * (sin(t) * 0.1 + 0.5);
                }
                
                void main() {
                    vec2 uv = vUv;
                    vec2 st = uv * 2.0 - 1.0;
                    st.x *= u_resolution.x / u_resolution.y;
                    
                    st += curl(st * 2.0 + u_mouse * 0.5) * 0.5;

                    float lightIntensity = 0.0;
                    // Higher quality with more iterations
                    for (float i = 0.0; i < 8.0; i++) {
                        st += curl(st * 1.5 + u_time * 0.2 + i * 1.0);
                        lightIntensity += sin(st.y * 5.0 + u_time * 0.5 + i * 2.0) * 0.5 + 0.5;
                    }
                    
                    lightIntensity /= 8.0;
                    
                    // Enhanced aurora colors with better gradients
                    vec3 color = vec3(0.0);
                    color.r = sin(lightIntensity * 3.0 + 1.0) * 0.5 + 0.5;
                    color.g = sin(lightIntensity * 2.0 + 2.0) * 0.5 + 0.5;
                    color.b = sin(lightIntensity * 4.0 + 3.0) * 0.5 + 0.5;
                    
                    // Aurora-specific enhancements
                    color = pow(color, vec3(0.7));
                    color = mix(color, color * 1.4, 0.4);
                    
                    // Add aurora-like glow
                    float glow = pow(lightIntensity, 2.0);
                    color += vec3(0.1, 0.3, 0.6) * glow * 0.3;

                    gl_FragColor = vec4(color, lightIntensity);
                }
            `,
        });
        
        this.plane = new THREE.Mesh(geometry, material);
        this.scene.add(this.plane);
        this.objects.push(this.plane);
        this.onResize(this.renderer.domElement.width, this.renderer.domElement.height, this.renderer.domElement.width / this.renderer.domElement.height);
    }

    onResize(w, h, ar) {
        this.uniforms.u_resolution.value.set(w, h);
    }

    onPointerMove(x, y) {
        this.uniforms.u_mouse.value.set(x / window.innerWidth, 1.0 - y / window.innerHeight);
    }

    update(deltaTime) {
        this.uniforms.u_time.value += deltaTime;
    }
}
