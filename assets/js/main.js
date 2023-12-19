import * as THREE from 'three';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js";
// mouse cursor js open
$(window).mousemove(function (e) {
    $(".ring").css(
        "transform",
        `translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
    );
});
//  mouse cursor js closed 
const canvas = document.querySelector("#canvas");
const leftZoomBtn = document.querySelector(".left-box-btn");
const originalBtn = document.querySelector(".original-btn");
const rightZoomBtn = document.querySelector(".right-box-btn");
// Set initial size
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// ...

// Update canvas size on window resize
window.addEventListener('resize', () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    // Adjust camera aspect ratio and renderer size
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
    // Adjust plane positions based on window size
    plane1.position.set(-canvasWidth / 10, canvasHeight / 20, 2);
    plane2.position.set(canvasWidth / 10, canvasHeight / 40, 1);
    // Adjust positions for other planes accordingly...
});
var textureLoaderbg = new THREE.TextureLoader();
var backgroundImage = textureLoaderbg.load('./assets/images/2x/spiderbg-with-net.png');

let scene, camera, renderer;
let rotateAroundGroup = true;
scene = new THREE.Scene();
// scene.background = backgroundImage;
camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
);
camera.position.set(0, 0, 15);
const light = new THREE.HemisphereLight(0xffffff, "cornflowerblue", 1);
scene.add(light);
const group = new THREE.Group();
// Load textures
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('./assets/images/2x/game1.png');
const texture2 = textureLoader.load('./assets/images/2x/camera-roll1.png');
const texture3 = textureLoader.load('./assets/images/2x/mobile1.png');
const texture4 = textureLoader.load('./assets/images/2x/speaker.png');
const texture5 = textureLoader.load('./assets/images/2x/laptop1.png');
const texture6 = textureLoader.load('./assets/images/2x/dollar.png');
const texture7 = textureLoader.load('./assets/images/2x/remote1.png');
const texture8 = textureLoader.load('./assets/images/2x/stars.png');

// Create planes with textures
const planeGeometry = new THREE.PlaneGeometry(2, 2); // Adjust the size as needed
const material1 = new THREE.MeshBasicMaterial({ map: texture1, transparent: true });
const plane1 = new THREE.Mesh(planeGeometry, material1);
plane1.position.set(-6, 2, 2); // Adjust Y position slightly upwards to compensate for the tilt
plane1.scale.set(1.2, 1.2, 1); // Adjust the scale values as needed/
plane1.rotation.y = Math.PI / 4;
scene.add(plane1);
// second image
const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true, });
const plane2 = new THREE.Mesh(planeGeometry, material2);
plane2.position.set(5, 1, 1);
plane2.scale.set(1.2, 1.2, 1); // Adjust the scale values as needed
scene.add(plane2);
// third image
const material3 = new THREE.MeshBasicMaterial({ map: texture3, transparent: true });
const plane3 = new THREE.Mesh(planeGeometry, material3);
plane3.position.set(-7, -2, 1);
plane3.scale.set(1.2, 1.2, 1); // Adjust the scale values as needed
scene.add(plane3);
// Fourth image
const material4 = new THREE.MeshBasicMaterial({ map: texture4, transparent: true, encoding: THREE.sRGBEncoding });
const plane4 = new THREE.Mesh(planeGeometry, material4);
plane4.position.set(-3.3, 1, 2);
plane4.scale.set(0.5, 0.5, 1); // Adjust the scale values as needed
scene.add(plane4);
// fifth image
const material5 = new THREE.MeshBasicMaterial({ map: texture5, transparent: true, encoding: THREE.sRGBEncoding, magFilter: THREE.LinearFilter, minFilter: THREE.LinearMipmapLinearFilter, });
const plane5 = new THREE.Mesh(planeGeometry, material5);
plane5.position.set(-1, -2, 2);
plane5.scale.set(1.5, 1.5, 2); // Adjust the scale values as needed
scene.add(plane5);
// Sixth image
const material6 = new THREE.MeshBasicMaterial({ map: texture6, transparent: true, encoding: THREE.sRGBEncoding });
const plane6 = new THREE.Mesh(planeGeometry, material6);
plane6.position.set(1, 1.5, 1);
plane6.scale.set(1, 1, 1); // Adjust the scale values as needed
scene.add(plane6);
// Seventh image
const material7 = new THREE.MeshBasicMaterial({ map: texture7, transparent: true, encoding: THREE.sRGBEncoding });
const plane7 = new THREE.Mesh(planeGeometry, material7);
plane7.position.set(7, -3.5, 1);
plane7.scale.set(1.3, 1, 2); // Adjust the scale values as needed
scene.add(plane7);
// Eight image
const material8 = new THREE.MeshBasicMaterial({ map: texture8, transparent: true, encoding: THREE.sRGBEncoding });
const plane8 = new THREE.Mesh(planeGeometry, material8);
plane8.position.set(6, 2.9, 1);
plane8.scale.set(0.5, 0.5, 1); // Adjust the scale values as needed
scene.add(plane8);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = -0.3; // Adjust the exposure as needed
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.gammaOutput = true;
canvas.appendChild(renderer.domElement);
//
const textureLoaderBackground = new THREE.TextureLoader();
// const backgroundTexture = textureLoaderBackground.load('./assets/images/2x/spiderbg-with-net.png');
const backgroundTexture = textureLoaderBackground.load('./assets/images/2x/bg.png');
// Create a plane for the background
const backgroundGeometry = new THREE.PlaneGeometry(24, 15); // Adjust the size as needed
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, transparent: true });
const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundPlane);
backgroundPlane.scale.set(0.9, 0.9, 1); // Adjust the scale values as needed
// Access the class name
const backgroundClassName = backgroundPlane.userData.className;
backgroundPlane.material.transparent = true;
backgroundPlane.material.opacity = 0.9;

const rotateAndZoom = (plane, x, y, z, zoomOutFactor = 0, rotateY = 0) => {
    let tl = gsap
        .timeline({ defaults: { duration: 1.5, ease: "expo.out" } })
        .to(controls.target, { x, y, z })
        .to(camera.position, { x, y, z: z + zoomOutFactor }, 0);
    // Zoom the background
    tl.to(backgroundPlane.scale, { x: 2, y: 2, z: 1 }, 0)
    // Zoom the target plane
    tl.to(plane.scale, { x: 1.5, y: 1.5, z: 1 }, 0);
    tl.to(plane.position, { x, y, z }, 0);
    tl.to(plane.rotation, { y: rotateY }, 0); // Rotate around Y axis
    tl.to(group.rotation, { x: 0, y: 0 }, 0);
    // Set the current plane as the active plane
    activePlane = plane;
};
// Create dots
const dotsGeometry = new THREE.SphereGeometry(0.01, 2, 3);
const dotsMaterial = new THREE.MeshBasicMaterial({ color: 0xFFE358 }); // White color

// Assuming dotsGeometry and dotsMaterial are defined earlier

// Create an array of dots
const dots = [];
const numDots = 300;

for (let i = 1; i <= numDots; i++) {
    const dot = new THREE.Mesh(dotsGeometry, dotsMaterial);

    // Calculate positions dynamically
    const x = Math.random() * 18 - 9; // Random x position between -5 and 5
    const y = Math.random() * 13 - 5; // Random y position between -5 and 5
    const z = Math.random() * 2 + 1;  // Random z position between 1 and 3

    dot.position.set(x, y, z);
    scene.add(dot);
    dots.push(dot);
}

// Function to animate dots up and down
const animateDotsUpDown = () => {
    const tl = gsap.timeline({ repeat: -1, defaults: { duration: 1, ease: 'power1.inOut' } });

    dots.forEach(dot => {
        // tl.to(dot.position, { y: dot.position.y + 0.1, yoyo: true, repeat: -1 }, 'start'); // Move up and down smoothly
        tl.to(dot.position, { y: dot.position.y + 0.1, x: dot.position.x + 0.1, yoyo: true, repeat: -1 }, 'start');
    });
};

// Call the animateDotsUpDown function to start the animation
animateDotsUpDown();


// ... rest of your code  
let currentIndex = 0;
// let activePlane = null;

const planes = [plane1, plane2, plane3, plane5, plane7 /* Add more planes as needed */];
leftZoomBtn.addEventListener("click", () => {
    rotateAndZoom(planes[currentIndex], planes[currentIndex].position.x, planes[currentIndex].position.y, planes[currentIndex].position.z, 5);
    rotateAroundGroup = false;
    currentIndex = (currentIndex - 1 + planes.length) % planes.length; // Move to the previous plane
    zoomOutDots();
    // // Change the color of the active plane
    // if (activePlane) {
    //     activePlane.material.color.set(0xFF9D00); // Set color to red (replace with your desired color)
    // }
});
rightZoomBtn.addEventListener("click", () => {
    rotateAndZoom(planes[currentIndex], planes[currentIndex].position.x, planes[currentIndex].position.y, planes[currentIndex].position.z, 5);
    rotateAroundGroup = false;
    currentIndex = (currentIndex + 1) % planes.length; // Move to the next plane
    // // Change the color of the active plane
    //     if (activePlane) {
    //         activePlane.material.color.set(0xFF9D00); // Set color to red (replace with your desired color)
    //     }
});
originalBtn.addEventListener("click", () => {
    rotateAroundGroup = true;
    rotateAndZoom(planes, 0, 0, 0, 15); // Reset each plane to original position
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
const onWindowResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
};
window.addEventListener("resize", onWindowResize, false);
const clock = new THREE.Clock();
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();
// three js camera zoom into Image Closed





