import { WorldBase } from '../core/WorldBase.js';

/**
 * Glass World - 3D glass crystal geometry with realistic materials
 */
export class GlassWorld extends WorldBase {
    init() {
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);

        const geometry = new THREE.IcosahedronGeometry(1, 2); // Higher subdivision for better quality
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x98b8c8,
            metalness: 0,
            roughness: 0.05, // Smoother surface
            ior: 1.5,
            transmission: 0.95, // More transparent
            transparent: true,
            thickness: 0.3, // Thinner for better light refraction
            reflectivity: 0.3, // More reflective
            clearcoat: 1.0,
            clearcoatRoughness: 0.05, // Smoother clearcoat
            envMapIntensity: 1.2, // More environment reflection
            side: THREE.DoubleSide // Render both sides for better quality
        });
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 25, 100);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
        this.lights.push(pointLight);
        
        // Add additional lighting for better quality
        const pointLight2 = new THREE.PointLight(0x88ccff, 15, 80);
        pointLight2.position.set(-5, -3, 3);
        this.scene.add(pointLight2);
        this.lights.push(pointLight2);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.target.position.set(0, 0, 0);
        this.scene.add(directionalLight);
        this.scene.add(directionalLight.target);
        this.lights.push(directionalLight);

        for (let i = 0; i < 50; i++) {
            const crystal = new THREE.Mesh(geometry, material);
            crystal.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            crystal.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            crystal.scale.setScalar(Math.random() * 0.5 + 0.2);
            this.scene.add(crystal);
            this.objects.push(crystal);
        }
    }

    onResize(w, h, ar) {
        this.camera.aspect = ar;
        this.camera.updateProjectionMatrix();
    }

    onPointerMove(x, y) {
        this.camera.position.x = (x / window.innerWidth - 0.5) * 5;
        this.camera.position.y = -(y / window.innerHeight - 0.5) * 5;
        this.camera.lookAt(0, 0, 0);
    }

    update(deltaTime) {
        this.objects.forEach(obj => {
            obj.rotation.x += deltaTime * 0.1;
            obj.rotation.y += deltaTime * 0.15;
        });
    }
}
