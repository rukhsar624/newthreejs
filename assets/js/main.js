import * as THREE from 'three';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js";
// scroll navbar
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll > 90) {
    $("#navbar-fixed-top").css("background", "#000");
    $("#navbar-fixed-top").css("box-shadow", "rgb(0 0 0 / 46%) 8px 8px 33px")
  }
  else {
    $("#navbar-fixed-top").css("background", "none");
    $("#navbar-fixed-top").css("box-shadow", "none")

  }
})
// scroll navbar
// mouse cursor animations
$(window).mousemove(function (e) {
  $(".ring").css(
    "transform",
    `translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
  );
});
// mouse cursor animations
// MOBILE SCREEN SIDE NAV
var sidebarBox = document.querySelector('#box');
var sidebarBtn = document.querySelector('#btn');
var pageWrapper = document.querySelector('#main-content');

sidebarBtn.addEventListener('click', function (event) {

  if (this.classList.contains('active')) {
    this.classList.remove('active');
    sidebarBox.classList.remove('active');
  } else {
    this.classList.add('active');
    sidebarBox.classList.add('active');
  }
});

pageWrapper.addEventListener('click', function (event) {

  if (sidebarBox.classList.contains('active')) {
    sidebarBtn.classList.remove('active');
    sidebarBox.classList.remove('active');
  }
});
window.addEventListener('keydown', function (event) {

  if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
    sidebarBtn.classList.remove('active');
    sidebarBox.classList.remove('active');
  }
});
// MOBILE SCREEN SIDE NAV
// =================mouse zoom Effect================//
// Add these lines to the beginning of your code
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isZoomed = false;


// Add this event listener to handle mouse movement
document.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
  // Calculate normalized device coordinates
  mouse.x = (event.clientX / canvasWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvasHeight) * 2 + 1;

  // Update the raycaster with the mouse coordinates
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  const intersects = raycaster.intersectObjects(planes);

  // If the mouse is over a plane, apply the zoom effect
  if (intersects.length > 0) {
    const plane = intersects[0].object;
    const index = planes.indexOf(plane);

    // Adjust the zoom based on the mouse position
    const zoomFactor = 1.5;
    const zoomOutFactor = 5;
    // const rotateY = Math.PI / 4;

    // rotateAndZoom(plane, plane.position.x, plane.position.y, plane.position.z, zoomOutFactor);
    // Perform zoom only if not already zoomed
    if (!isZoomed) {
      rotateAndZoom(plane, plane.position.x, plane.position.y, plane.position.z, zoomOutFactor);
      isZoomed = true; // Set the zoomed status to true
      rotateAroundGroup = false; // Reset the rotation flag
      // Show the buttons during the zoom effect
      document.querySelector('.buttons').style.display = 'block';
    }
    // Change the color of the active plane (optional)
    // if (activePlane) {
    //   activePlane.material.color.set(0xFFFFFF); // Set color to white (replace with your desired color)
    // }
    changePlaneColor(planesplate[currentIndex]);
    // Set the current plane as the active plane
    activePlane = plane;
    currentIndex = index;
    // Move the mouse circle to the mouse cursor position
    mouseCircle.position.x = intersects[0].point.x;
    mouseCircle.position.y = intersects[0].point.y;
    mouseCircle.position.z = intersects[0].point.z + 0.1; // Move slightly above the plane
  } else {
    // If the mouse is not over any plane, hide the mouse circle
    mouseCircle.position.set(0, 0, -10); // Move the circle out of the visible area
    document.querySelector('.buttons').style.display = 'none';
    // Reset the zoomed status
    isZoomed = false;
  }
}
// Add these functions to your JavaScript code
const zoomFactor = 0.02; // Decrease the zoom effect by reducing the factor
function zoom(direction) {
  isZoomed = true; // Set the zoomed status to true
  const zoomAmount = direction === 'in' ? 1 + zoomFactor : 1 - zoomFactor;
  camera.zoom *= zoomAmount;
  camera.updateProjectionMatrix();
}

function resetZoom() {
  // Implement your logic to reset the zoom to the original state
  // You may need to adjust the camera position, rotation, or other properties
  isZoomed = false; // Reset the zoomed status
  // Hide the buttons when zoom is reset
  document.querySelector('.buttons').style.display = 'none';
// Change the color of the active plane back to original (optional)
// if (activePlane) {
//   activePlane.material.color.set(0xFFFFFF); // Set color to white (replace with your desired color)
// }
}
// Add the click event listener for originalBtn
document.querySelector('.original-btn').addEventListener("click", () => {
  resetZoom(); // Reset zoom when originalBtn is clicked
  rotateAroundGroup = true; // Set the rotation flag to true
});
// =================mouse zoom Effect================//

const canvas = document.querySelector("#canvas");
const leftZoomBtn = document.querySelector(".left-box-btn");
const originalBtn = document.querySelector(".original-btn");
const rightZoomBtn = document.querySelector(".right-box-btn");
// Set initial size
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
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
const texture1 = textureLoader.load('./assets/images/2x/game.png');
const texture11 = textureLoader.load('./assets/images/2x/non-active.png');
const texture2 = textureLoader.load('./assets/images/2x/camera-roll.png');
const texture22 = textureLoader.load('./assets/images/2x/non-active.png');
const texture3 = textureLoader.load('./assets/images/2x/mobile11.png');
const texture33 = textureLoader.load('./assets/images/2x/non-active.png');
const texture4 = textureLoader.load('./assets/images/2x/speaker.png');
const texture5 = textureLoader.load('./assets/images/2x/laptop.png');
const texture55 = textureLoader.load('./assets/images/2x/non-active.png');
const texture6 = textureLoader.load('./assets/images/2x/dollar.png');
const texture7 = textureLoader.load('./assets/images/2x/remote11.png');
const texture77 = textureLoader.load('./assets/images/2x/non-active.png');
const texture8 = textureLoader.load('./assets/images/2x/stars.png');

// Create planes with textures
const planeGeometry = new THREE.PlaneGeometry(2, 2); // Adjust the size as needed
const material1 = new THREE.MeshBasicMaterial({ map: texture1, transparent: true });
const plane1 = new THREE.Mesh(planeGeometry, material1);
plane1.position.set(-6, 2, 2); // Adjust Y position slightly upwards to compensate for the tilt
plane1.scale.set(1.2, 1.2, 1); // Adjust the scale values as needed/
plane1.rotation.y = Math.PI / 4;
scene.add(plane1);
// 
// first plate 
const planeGeometry1 = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed
const material11 = new THREE.MeshBasicMaterial({ map: texture11, transparent: true ,depthTest: false, depthWrite: false});
const plane11 = new THREE.Mesh(planeGeometry1, material11);
plane11.position.set(-6, 0.9, 2); // Adjust Y position slightly upwards to compensate for the tilt
plane11.scale.set(2.3, 0.3, 1); // Adjust the scale values as needed/
plane11.rotation.x = Math.PI / 4;
scene.add(plane11);
// 
// second image
const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true, });
const plane2 = new THREE.Mesh(planeGeometry, material2);
plane2.position.set(5, 1, 1);
plane2.scale.set(1.2, 1.2, 1); // Adjust the scale values as needed
scene.add(plane2);
// 
// second plate 
const planeGeometry22 = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed
const material22 = new THREE.MeshBasicMaterial({ map: texture22, transparent: true ,depthTest: false, depthWrite: false});
const plane22 = new THREE.Mesh(planeGeometry22, material22);
plane22.position.set(5, -0.9, 1);
plane22.scale.set(2.5, 0.6, 1); // Adjust the scale values as needed
plane22.rotation.x = Math.PI / 4;
scene.add(plane22);
// 
// third image
const material3 = new THREE.MeshBasicMaterial({ map: texture3, transparent: true });
const plane3 = new THREE.Mesh(planeGeometry, material3);
plane3.position.set(-7, -2, 1);
plane3.scale.set(1, 1, 1); // Adjust the scale values as needed
scene.add(plane3);
// third plate 
const planeGeometry33 = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed
const material33 = new THREE.MeshBasicMaterial({ map: texture33, transparent: true ,depthTest: false, depthWrite: false});
const plane33 = new THREE.Mesh(planeGeometry33, material33);
plane33.position.set(-7, -4, 1);
plane33.scale.set(2.5, 0.6, 1); // Adjust the scale values as needed
plane33.rotation.x = Math.PI / 4;
scene.add(plane33);
// 
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
// forth plate 
const planeGeometry55 = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed
const material55 = new THREE.MeshBasicMaterial({ map: texture55, transparent: true ,depthTest: false, depthWrite: false});
const plane55 = new THREE.Mesh(planeGeometry55, material55);
plane55.position.set(-1, -4, 2);
plane55.scale.set(3, 0.6, 1); // Adjust the scale values as needed
plane55.rotation.x = Math.PI / 4;
scene.add(plane55);
// 
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
// fifth plate 
const planeGeometry77 = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed
const material77 = new THREE.MeshBasicMaterial({ map: texture77, transparent: true ,depthTest: false, depthWrite: false});
const plane77 = new THREE.Mesh(planeGeometry77, material77);
plane77.position.set(7, -5.1, 1);
plane77.scale.set(2.5, 0.6, 1); // Adjust the scale values as needed
plane77.rotation.x = Math.PI / 4;
scene.add(plane77);
// 
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
const backgroundTexture = textureLoaderBackground.load('./assets/images/2x/bg-web.png');
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
  // tl.to(backgroundPlane.scale, { x: 2, y: 2, z: 1 }, 0)
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

let currentIndex = 0;
let activePlane = null;

const planes = [plane1, plane2, plane3, plane5, plane7, /* Add more planes as needed */];
const planesplate = [plane11, plane22, plane33, plane55, plane77];
const originalColors = []; // Store original colors for each plane

// Store the original colors of the planes
planesplate.forEach(plane => {
  originalColors.push(plane.material.color.clone());
});

leftZoomBtn.addEventListener("click", () => {
  changePlaneColor(planesplate[currentIndex]); // Change color of the current plane
  rotateAndZoom(planes[currentIndex], planes[currentIndex].position.x, planes[currentIndex].position.y, planes[currentIndex].position.z, 5);
  rotateAroundGroup = false;
  currentIndex = (currentIndex - 1 + planes.length) % planes.length; // Move to the previous plane
  zoomOutDots();
});

rightZoomBtn.addEventListener("click", () => {
  changePlaneColor(planesplate[currentIndex]); // Change color of the current plane
  rotateAndZoom(planes[currentIndex], planes[currentIndex].position.x, planes[currentIndex].position.y, planes[currentIndex].position.z, 5);
  rotateAroundGroup = false;
  currentIndex = (currentIndex + 1) % planes.length; // Move to the next plane
});

originalBtn.addEventListener("click", () => {
  planesplate.forEach((plane, index) => {
    resetPlaneColor(plane, originalColors[index]); // Reset color for each plane
  });
  rotateAroundGroup = true;
  rotateAndZoom(planes, 0, 0, 0, 15); // Reset each plane to the original position
});

function changePlaneColor(plane) {
  if (activePlane) {
    resetPlaneColor(activePlane, originalColors[planes.indexOf(activePlane)]); // Reset color of the previously active plane
  }
  plane.material.color.set(0xFFA910); // Set color to your desired color
  activePlane = plane; // Set the current plane as the active plane
}

function resetPlaneColor(plane, originalColor) {
  plane.material.color.copy(originalColor); // Reset color for the plane
}
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
const aspectRatio = window.innerWidth / window.innerHeight;
const onWindowResize = () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onWindowResize, false);
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
// three js camera zoom into Image Close




// Swiper Slider2
var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: true,
  loop: true,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    280: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    414: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1920: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1600: {
      slidesPerView: 3,
      spaceBetween: 20

    },
    1366: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    1400: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    1366: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    1366: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    2560: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  },
});
var swiper = new Swiper(".mySwiper1", {
  slidesPerView: 5,
  spaceBetween: 30,
  autoplay: true,
  loop: true,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    280: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    414: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1920: {
      slidesPerView: 5,
      spaceBetween: 20
    },
    1600: {
      slidesPerView: 3,
      spaceBetween: 20

    },
    1366: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    1366: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    1366: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    2560: {
      slidesPerView: 5,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  },
});
// 

