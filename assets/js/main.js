import * as THREE from 'three';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js";
// ===========================butter js========================//
//  WOW init
new WOW().init();
// ===========================butter js========================//
// =================mouse cursor animations====================//
var cursor = $(".cursor"),
		follower = $(".cursor-follower");

var posX = 0,
		posY = 0;

var mouseX = 0,
		mouseY = 0;

TweenMax.to({}, 0.016, {
	repeat:-1,
	onRepeat:function(){
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;
		
		TweenMax.set(follower, {
			css: {
				left: posX - 12,
				top: posY - 12
			}
		});
		TweenMax.set(cursor, {
			css: {
				left: mouseX,
				top: mouseY
			}
		});
	}	
});

$(document).on("mousemove",function(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
});

$("img").on("mouseenter",function(){
	cursor.addClass("active");
	follower.addClass("active");
});

$("img").on("mouseleave",function(){
	cursor.removeClass("active");
	follower.removeClass("active");
});
// =================mouse cursor animations====================//
// =========================scroll navbar======================//
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
// =========================scroll navbar======================//

// ========================MOBILE SCREEN SIDE NAV==============//
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
// ========================MOBILE SCREEN SIDE NAV==============//
// zoom

// zoom
// =================mouse zoom Effect=========================//
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isZoomed = false;

document.addEventListener('mousemove', onMouseMove);
function onMouseMove(event) {
  mouse.x = (event.clientX / canvasWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvasHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planes);
  if (intersects.length > 0) {
    const plane = intersects[0].object;
    const index = planes.indexOf(plane);
    // const zoomFactor = 1.5;
    const zoomOutFactor = 5;
    if (!isZoomed) {
      // Pause animation
      shouldRunAnimation = false;
      rotateAndZoom(plane, plane.position.x, plane.position.y, plane.position.z, zoomOutFactor);
      isZoomed = true;
      rotateAroundGroup = false;
      document.querySelector('.buttons').style.display = 'block';
    }
    changePlaneColor(planesplate[index]);
    activePlane = plane;
    currentIndex = index;
    // Set the cursor style
    // document.body.style.cursor = 'pointer';
    mouseCircle.position.x = intersects[0].point.x;
    mouseCircle.position.y = intersects[0].point.y;
    mouseCircle.position.z = intersects[0].point.z + 0.1;
  } else {
    mouseCircle.position.set(0, 0, -10);
    document.querySelector('.buttons').style.display = 'none';
    isZoomed = false;
    // Reset positions and resume animation
    resetZoom();
    resetSelectedPlane();
    shouldRunAnimation = true;
  }
}
function resetSelectedPlane() {
  if (activePlane) {
    const originalPosition = originalPositions[currentIndex];
    activePlane.position.copy(originalPosition);
    const originalScale = originalScales[currentIndex];
    activePlane.scale.copy(originalScale);
  }
}
const zoomFactor = 0.02;
function zoom(direction) {
  isZoomed = true;
  const zoomAmount = direction === 'in' ? 1 + zoomFactor : 1 - zoomFactor;
  camera.zoom *= zoomAmount;
  camera.updateProjectionMatrix();
}
function resetZoom() {
  isZoomed = false;
  document.querySelector('.buttons').style.display = 'none';
}
document.querySelector('.original-btn').addEventListener("click", () => {
  resetZoom();
  rotateAroundGroup = true;
  shouldRunAnimation = true;
});
// =================mouse zoom Effect=========================//
const canvas = document.querySelector("#canvas");
const leftZoomBtn = document.querySelector(".left-box-btn");
const originalBtn = document.querySelector(".original-btn");
const rightZoomBtn = document.querySelector(".right-box-btn");
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  if (intersects.length > 0) {
    const plane = intersects[0].object;
    const index = planes.indexOf(plane);
    const zoomFactor = 1.5;
    const zoomOutFactor = 5;
    if (!isZoomed) {
      rotateAndZoom(plane, plane.position.x, plane.position.y, plane.position.z, zoomOutFactor);
      isZoomed = false;
      rotateAroundGroup = false;
      document.querySelector('.buttons').style.display = 'block';
    }
    changePlaneColor(planesplate[currentIndex]);
    activePlane = plane;
    currentIndex = index;
    mouseCircle.position.x = intersects[0].point.x;
    mouseCircle.position.y = intersects[0].point.y;
    mouseCircle.position.z = intersects[0].point.z + 0.1;
  } else {
    mouseCircle.position.set(0, 0, -10);
    document.querySelector('.buttons').style.display = 'none';
    isZoomed = false;
  }
});
let scene, camera, renderer;
let rotateAroundGroup = true;
scene = new THREE.Scene();
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
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('./assets/images/2x/game.png');
const texture11 = textureLoader.load('./assets/images/2x/non-active.png');
const texture2 = textureLoader.load('./assets/images/2x/camera-roll.png');
const texture22 = textureLoader.load('./assets/images/2x/non-active.png');
const texture3 = textureLoader.load('./assets/images/2x/mobile11.png');
const texture33 = textureLoader.load('./assets/images/2x/non-active.png');
const texture5 = textureLoader.load('./assets/images/2x/laptop.png');
const texture55 = textureLoader.load('./assets/images/2x/non-active.png');
const texture7 = textureLoader.load('./assets/images/2x/remote11.png');
const texture77 = textureLoader.load('./assets/images/2x/non-active.png');
const texture9 = textureLoader.load('./assets/images/SVG/spider.svg');
const planeGeometry = new THREE.PlaneGeometry(2, 2);
const material1 = new THREE.MeshBasicMaterial({ map: texture1, transparent: true });
const plane1 = new THREE.Mesh(planeGeometry, material1);
plane1.position.set(-6, 2, 2);
plane1.scale.set(1.2, 1.2, 1);
plane1.rotation.y = Math.PI / 4;
scene.add(plane1);
const planeGeometry1 = new THREE.PlaneGeometry(1, 1);
const material11 = new THREE.MeshBasicMaterial({ map: texture11, transparent: true, depthTest: false, depthWrite: false });
const plane11 = new THREE.Mesh(planeGeometry1, material11);
plane11.position.set(-6, 0.9, 2);
plane11.scale.set(2.3, 0.3, 1);
plane11.rotation.x = Math.PI / 4;
scene.add(plane11);
const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true, });
const plane2 = new THREE.Mesh(planeGeometry, material2);
plane2.position.set(5, 1, 1);
plane2.scale.set(1.2, 1.2, 1);
scene.add(plane2);
const planeGeometry22 = new THREE.PlaneGeometry(1, 1);
const material22 = new THREE.MeshBasicMaterial({ map: texture22, transparent: true, depthTest: false, depthWrite: false });
const plane22 = new THREE.Mesh(planeGeometry22, material22);
plane22.position.set(5, -0.9, 1);
plane22.scale.set(2.5, 0.6, 1);
plane22.rotation.x = Math.PI / 4;
scene.add(plane22);
const material3 = new THREE.MeshBasicMaterial({ map: texture3, transparent: true });
const plane3 = new THREE.Mesh(planeGeometry, material3);
plane3.position.set(-7, -2, 1);
plane3.scale.set(1, 1, 1);
scene.add(plane3);
const planeGeometry33 = new THREE.PlaneGeometry(1, 1);
const material33 = new THREE.MeshBasicMaterial({ map: texture33, transparent: true, depthTest: false, depthWrite: false });
const plane33 = new THREE.Mesh(planeGeometry33, material33);
plane33.position.set(-7, -4, 1);
plane33.scale.set(2.5, 0.6, 1);
plane33.rotation.x = Math.PI / 4;
scene.add(plane33);
const material5 = new THREE.MeshBasicMaterial({ map: texture5, transparent: true, encoding: THREE.sRGBEncoding, magFilter: THREE.LinearFilter, minFilter: THREE.LinearMipmapLinearFilter, });
const plane5 = new THREE.Mesh(planeGeometry, material5);
plane5.position.set(-1, -1, 2);
plane5.scale.set(1.5, 1.5, 2);
scene.add(plane5);
const planeGeometry55 = new THREE.PlaneGeometry(1, 1);
const material55 = new THREE.MeshBasicMaterial({ map: texture55, transparent: true, depthTest: false, depthWrite: false });
const plane55 = new THREE.Mesh(planeGeometry55, material55);
plane55.position.set(-1, -3, 2);
plane55.scale.set(3, 0.6, 1);
plane55.rotation.x = Math.PI / 4;
scene.add(plane55);
const material7 = new THREE.MeshBasicMaterial({ map: texture7, transparent: true, encoding: THREE.sRGBEncoding });
const plane7 = new THREE.Mesh(planeGeometry, material7);
plane7.position.set(7, -3.5, 1);
plane7.scale.set(1.3, 1, 2);
scene.add(plane7);
const planeGeometry77 = new THREE.PlaneGeometry(1, 1);
const material77 = new THREE.MeshBasicMaterial({ map: texture77, transparent: true, depthTest: false, depthWrite: false });
const plane77 = new THREE.Mesh(planeGeometry77, material77);
plane77.position.set(7, -5.1, 1);
plane77.scale.set(2.5, 0.6, 1);
plane77.rotation.x = Math.PI / 4;
scene.add(plane77);
// Eight image
const material9 = new THREE.MeshBasicMaterial({ map: texture9, transparent: true, encoding: THREE.sRGBEncoding });
const plane9 = new THREE.Mesh(planeGeometry, material9);
plane9.position.set(-1, 4, 1);
plane9.scale.set(1.5, 1.5, 1); // Adjust the scale values as needed
scene.add(plane9);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = -0.3;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.gammaOutput = true;
canvas.appendChild(renderer.domElement);

const textureLoaderBackground = new THREE.TextureLoader();
const backgroundTexture = textureLoaderBackground.load('./assets/images/2x/bg-web.png');
const backgroundGeometry = new THREE.PlaneGeometry(24, 15);
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, transparent: true });
const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundPlane);
backgroundPlane.scale.set(0.9, 0.9, 1);
backgroundPlane.material.transparent = true;
backgroundPlane.material.opacity = 0.9;
const rotateAndZoom = (plane, x, y, z, zoomOutFactor = 0, rotateY = 0) => {
  let tl = gsap
    // .timeline({ defaults: { duration: 1.5, ease: "expo.out" } })
    .timeline({ defaults: { duration: 1.5, ease: "none" } })
    .to(controls.target, { x, y, z })
    .to(camera.position, { x, y, z: z + zoomOutFactor }, 0);
  tl.to(plane.scale, { x: 1.5, y: 1.5, z: 1 }, 0);
  tl.to(plane.position, { x, y, z }, 0);
  tl.to(plane.rotation, { y: rotateY }, 0);
  tl.to(group.rotation, { x: 0, y: 0 }, 0);

  activePlane = plane;
};
let currentIndex = 0;
let activePlane = null;

const planes = [plane1, plane2, plane3, plane5, plane7,];
const planesplate = [plane11, plane22, plane33, plane55, plane77];
const originalColors = [];
planesplate.forEach(plane => {
  originalColors.push(plane.material.color.clone());
});
leftZoomBtn.addEventListener("click", () => {
  const newIndex = (currentIndex - 1 + planes.length) % planes.length;

  if (currentIndex !== newIndex) {
    // Reset the color of all planes
    planesplate.forEach((plane, index) => {
      resetPlaneColor(plane, originalColors[index]);
    });

    // Only change the plane if the index is different
    changePlaneColor(planesplate[newIndex]);
    rotateAndZoom(planes[newIndex], planes[newIndex].position.x, planes[newIndex].position.y, planes[newIndex].position.z, 5);
    rotateAroundGroup = false;
    currentIndex = newIndex;
  }
});

rightZoomBtn.addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % planes.length;

  if (currentIndex !== newIndex) {
    // Reset the color of all planes
    planesplate.forEach((plane, index) => {
      resetPlaneColor(plane, originalColors[index]);
    });

    // Only change the plane if the index is different
    changePlaneColor(planesplate[newIndex]);
    rotateAndZoom(planes[newIndex], planes[newIndex].position.x, planes[newIndex].position.y, planes[newIndex].position.z, 5);
    rotateAroundGroup = false;
    currentIndex = newIndex;
  }
});

originalBtn.addEventListener("click", () => {
  planesplate.forEach((plane, index) => {
    resetPlaneColor(plane, originalColors[index]);
  });
  rotateAroundGroup = true;
  rotateAndZoom(planes, 0, 0, 0, 15);
});

function changePlaneColor(plane) {
  if (activePlane) {
    resetPlaneColor(activePlane, originalColors[planes.indexOf(activePlane)]);
  }
  plane.material.color.set(0xFFA910);
  activePlane = plane;
}

function resetPlaneColor(plane, originalColor) {
  plane.material.color.copy(originalColor);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom = false;
const aspectRatio = window.innerWidth / window.innerHeight;
const clock = new THREE.Clock();
const originalPosition1 = plane1.position.clone();
const originalPosition2 = plane2.position.clone();
const originalPosition3 = plane3.position.clone();
const originalPosition5 = plane5.position.clone();
const originalPosition7 = plane7.position.clone();
let shouldRunAnimation = true
const animate = () => {
  if (shouldRunAnimation) {
    const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    // Define rotation speeds for each plane
    const rotationSpeeds = [0.3, 0.4, 0.2, 0.5, 0.3];

    // Apply rotation for each plane based on its speed
    plane1.rotation.z = THREE.MathUtils.degToRad(20 + 30 * Math.sin(elapsedTime * rotationSpeeds[0]));
    plane2.rotation.z = THREE.MathUtils.degToRad(20 + 30 * Math.sin(elapsedTime * rotationSpeeds[1]));
    plane3.rotation.z = THREE.MathUtils.degToRad(20 + 30 * Math.sin(elapsedTime * rotationSpeeds[2]));
    plane5.rotation.z = THREE.MathUtils.degToRad(20 + 30 * Math.sin(elapsedTime * rotationSpeeds[3]));
    plane7.rotation.z = THREE.MathUtils.degToRad(20 + 30 * Math.sin(elapsedTime * rotationSpeeds[4]));

    if (rotateAroundGroup) {
      group.rotation.y = Math.cos(elapsedTime) * 0.1;
      group.rotation.x = Math.sin(elapsedTime) * 0.05;
    }
  } else {
    // If the animation is disabled, just render the scene
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    // Define the duration of the transition
    const transitionDuration = 1.5;

    // Use gsap to tween the planes back to their original positions
    gsap.to(plane1.position, { x: originalPosition1.x, y: originalPosition1.y, z: originalPosition1.z, duration: transitionDuration });
    gsap.to(plane2.position, { x: originalPosition2.x, y: originalPosition2.y, z: originalPosition2.z, duration: transitionDuration });
    gsap.to(plane3.position, { x: originalPosition3.x, y: originalPosition3.y, z: originalPosition3.z, duration: transitionDuration });
    gsap.to(plane5.position, { x: originalPosition5.x, y: originalPosition5.y, z: originalPosition5.z, duration: transitionDuration });
    gsap.to(plane7.position, { x: originalPosition7.x, y: originalPosition7.y, z: originalPosition7.z, duration: transitionDuration });

    // Use gsap to tween the scales and rotations back to their original values
    const originalScale = new THREE.Vector3(1, 1, 1);
    const originalRotation = new THREE.Euler(0, 0, 0);

    gsap.to(plane1.scale, { x: originalScale.x, y: originalScale.y, z: originalScale.z, duration: transitionDuration });
    gsap.to(plane2.scale, { x: originalScale.x, y: originalScale.y, z: originalScale.z, duration: transitionDuration });
    gsap.to(plane3.scale, { x: originalScale.x, y: originalScale.y, z: originalScale.z, duration: transitionDuration });
    gsap.to(plane5.scale, { x: originalScale.x, y: originalScale.y, z: originalScale.z, duration: transitionDuration });
    gsap.to(plane7.scale, { x: originalScale.x, y: originalScale.y, z: originalScale.z, duration: transitionDuration });

    gsap.to(plane1.rotation, { x: originalRotation.x, y: originalRotation.y, z: originalRotation.z, duration: transitionDuration });
    gsap.to(plane2.rotation, { x: originalRotation.x, y: originalRotation.y, z: originalRotation.z, duration: transitionDuration });
    gsap.to(plane3.rotation, { x: originalRotation.x, y: originalRotation.y, z: originalRotation.z, duration: transitionDuration });
    gsap.to(plane5.rotation, { x: originalRotation.x, y: originalRotation.y, z: originalRotation.z, duration: transitionDuration });
    gsap.to(plane7.rotation, { x: originalRotation.x, y: originalRotation.y, z: originalRotation.z, duration: transitionDuration });
  }
};

animate();

var fireflies = 80; // Change the number of fireflies here
var butterflies = 5; // Add the number of butterflies here
var $container = $(".containers");
var $containerWidth = $container.width();
var $containerHeight = $container.height();

// Create fireflies
for (var i = 0; i < fireflies; i++) {
  var firefly = $('<div class="firefly"></div>');
  TweenLite.set(firefly, {
    x: Math.random() * $containerWidth,
    y: Math.random() * $containerHeight
  });
  $container.append(firefly);
  flyTheFirefly(firefly);
}

// Create butterflies
for (var j = 0; j < butterflies; j++) {
  var butterfly = $('<div class="butterfly"></div>');
  TweenLite.set(butterfly, {
    x: Math.random() * $containerWidth,
    y: Math.random() * $containerHeight
  });
  $container.append(butterfly);
  flyTheButterfly(butterfly);
}

function flyTheFirefly(elm) {
  var flyTl = new TimelineMax();
  var fadeTl = new TimelineMax({
    delay: Math.floor(Math.random() * 3) + 1,
    repeatDelay: Math.floor(Math.random() * 6) + 1,
    repeat: -1
  });

  fadeTl.to(
    [elm],
    0.25,
    { opacity: 0.25, yoyo: true, repeat: 1, repeatDelay: 0.2, yoyo: true },
    Math.floor(Math.random() * 6) + 1
  );

  // Add your custom movement function
  customMovement(elm);

  function customMovement(elm) {
    flyTl.to(elm, Math.random() * 2 + 1, {
      x: "+=" + (Math.random() * 20 - 10), // Move a little bit on the x-axis
      y: "+=" + (Math.random() * 20 - 10), // Move a little bit on the y-axis
      onComplete: flyTheFirefly,
      onCompleteParams: [elm]
    });
  }
}

// Function for butterfly movement
function flyTheButterfly(elm) {
  var flyTl = new TimelineMax();
}

// firefiles

// spider Crawling 
const spider = document.getElementById('spider');
const spiderimg = document.getElementById('spiderimg');
const svgEl = document.getElementById('eeBJI2rPH0Y1');
const whatWeOfferSection = document.querySelector('.what-we-offer');
const embraceMarketingSection = document.querySelector('.Embrace-Marketing');
const bannerSection = document.getElementById('banner');
let scrollTimeout;
let isPaused = false;
let originalSpiderPosition = 0;
let isMouseWheelScrolling = false;

window.addEventListener('scroll', function () {
  clearTimeout(scrollTimeout);

  // Show the spider when scrolling
  spiderimg.style.opacity = 0;

  // Show the text element when scrolling stops
  svgEl.style.opacity = 1;

  const scrollPosition = window.scrollY;

  // Get the top position and height of the what-we-offer section
  const whatWeOfferTop = whatWeOfferSection.offsetTop;
  const whatWeOfferHeight = whatWeOfferSection.offsetHeight;

  // Get the top position and height of the embraceMarketing section
  const embraceMarketingTop = embraceMarketingSection.offsetTop;
  const embraceMarketingHeight = embraceMarketingSection.offsetHeight;

  // Get the top position of the banner section
  const bannerTop = bannerSection.offsetTop;

  // Check if the spider is in the what-we-offer section
  if (!isPaused && scrollPosition > whatWeOfferTop && scrollPosition < whatWeOfferTop + whatWeOfferHeight) {
    // Spider crawls from left to right in the what-we-offer section
    spider.style.transform = `translate3d(${-(scrollPosition + window.innerWidth + 70)}px, ${scrollPosition + 70}px, 0)`;

    // Add width and height to the spider
    spider.style.width = '400px';
    spider.style.height = '400px';
    spider.style.left = '-50px';

    isPaused = true;
    spider.style.transition = '6s ease-in-out';

    setTimeout(() => {
      isPaused = false;
      // Reset width and height after 2 minutes
      spider.style.width = '400px';
      spider.style.height = '400px';
      spider.style.right = '-50px';
      spiderimg.style.opacity = 1;
      svgEl.style.opacity = 0;
      spider.style.transition = '5s ease-in-out';
    }, 120000); // 2 minutes in milliseconds

    return;
  }

  // Check if the spider is in the embraceMarketing section
  if (!isPaused && scrollPosition > embraceMarketingTop && scrollPosition < embraceMarketingTop + embraceMarketingHeight) {
    // Save the original position if not paused
    if (!isPaused) {
      originalSpiderPosition = scrollPosition + 70;
    }
    // Spider pauses when it reaches the Embrace-Marketing section
    isPaused = true;
    return;
  }
// Check if the spider has reached the banner section
if (scrollPosition >= bannerTop) {
  // Horizontal center of the window
  const stopPositionX = window.innerWidth / 2;
  
  // Vertical center of the banner section
  const stopPositionY = bannerTop + (bannerHeight / 2) - 70; // Adjust 70 to center the spider

  // Stop further transformation when the spider reaches the banner
  if (scrollPosition >= stopPositionY) {
    spider.style.transition = 'transform 2s ease';
    spider.style.transform = `translate3d(${stopPositionX}px, ${stopPositionY}px, 0)`;
    return;
  }
}
  // Handle scrolling back
  if (isPaused && scrollPosition <= originalSpiderPosition) {
    // Reset the spider position to the original position
    spider.style.transform = `translate3d(${-(scrollPosition + window.innerWidth + 70)}px, ${originalSpiderPosition}px, 0)`;
    spider.style.left = '630px'; // Reset left offset when scrolling back
    spider.style.width = '600px';
    spider.style.height = '600px';
    spider.style.position = 'absolute';
    spider.style.top = '100px';
    spider.style.transition = '5s ease-in-out';
    isPaused = false;
    // Clear transition after a short delay to allow smooth scrolling
    setTimeout(() => {
      spider.style.transition = '5s ease-in-out';
      // Adjust left position for mobile devices
      if (window.innerWidth < 414) {
        spider.style.left = '175px';
      } 
      else if (window.innerWidth < 375) {
        spider.style.left = '213px'; // Smaller screens
      } 
      else if(this.window.innerWidth>=2560){
        spider.style.left='1185px'
      }
      else if(this.window.innerWidth>=1920){
        spider.style.left='1185px'
      }
      else if (window.innerWidth >= 1600) {
        spider.style.left = '865px'; // larger screens
      } 
      else if (window.innerWidth >= 1440) {
        spider.style.left = '705px'; // larger screens
      } 
      else if (window.innerWidth >= 1366) {
        spider.style.left = '630px'; // larger screens
      } 
      else if (window.innerWidth >= 768) {
        spider.style.left = '365px'; // Smaller screens
      } 
      else {
        spider.style.left = '213px';
      }
    }, 500); // Adjust the delay as needed
  }

  setTimeout(() => {
    const newScrollPosition = window.scrollY;
    spider.style.transform = `translate3d(0, ${newScrollPosition + 70}px, 0)`;

    setTimeout(() => {
      spiderimg.style.opacity = 1;
      svgEl.style.opacity = 0;
    }, 6000);
  }, 1000);

  // Hide the spider image after some seconds
  scrollTimeout = setTimeout(() => {
    // Add any additional actions to be performed after the spider has stopped
  }, 3000);
});
// Add wheel event listener for smooth mouse wheel scrolling
window.addEventListener('wheel', function (event) {
  if (!isMouseWheelScrolling) {
    isMouseWheelScrolling = true;

    // Add your logic for smooth mouse wheel scrolling here
    // For example, you can scroll a certain distance or trigger other animations

    setTimeout(() => {
      isMouseWheelScrolling = false;
    }, 500); // Adjust the duration as needed
  }
});
// spider Crawling




