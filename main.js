// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sky Background
scene.background = new THREE.Color(0x87CEEB); // Light blue sky

// Add Clouds
const cloudTexture = new THREE.TextureLoader().load('cloud.jpg'); // Use local cloud texture
const cloudMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true });

const clouds = [];
for (let i = 0; i < 5; i++) {
    const cloudGeometry = new THREE.PlaneGeometry(2, 1);
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.set(Math.random() * 10 - 5, Math.random() * 5 - 2.5, -10);
    cloud.scale.set(0.5, 0.5, 0.5);
    clouds.push(cloud);
    scene.add(cloud);
}

// Add Birds
const birdTexture = new THREE.TextureLoader().load('bird.jpg'); // Use local bird texture
const birdMaterial = new THREE.MeshBasicMaterial({ map: birdTexture, transparent: true });

const birds = [];
for (let i = 0; i < 3; i++) {
    const birdGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const bird = new THREE.Mesh(birdGeometry, birdMaterial);
    bird.position.set(Math.random() * 10 - 5, Math.random() * 5 - 2.5, -5);
    birds.push(bird);
    scene.add(bird);
}

// Position the Camera
camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Move Clouds
    clouds.forEach(cloud => {
        cloud.position.x += 0.01;
        if (cloud.position.x > 5) cloud.position.x = -5;
    });

    // Move Birds
    birds.forEach(bird => {
        bird.position.x += 0.02;
        if (bird.position.x > 5) bird.position.x = -5;
    });

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});