import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

let  scene, camera, renderer, controls, randVal,model;

const planetAnimationTime = 1.58
const shipAnimationTime = 1.2
let lastHoverTime=0
const sphereMesh = []
const shipText = document.querySelector('.shipText');
let starSphere;
const spaceshipAudio = document.getElementById('spaceshipAudio');
spaceshipAudio.volume=0.5;
// Scene
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(
  25, //focused more on the obj
  window.innerWidth / window.innerHeight
  , 0.1
  , 100 // far point itna chahiye ni tha to 1000 se 100 kr diya
);

camera.position.z = 10;

// Renderer
const canvas = document.querySelector('canvas');
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// implimenting hdri light
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/lonely_road_afternoon_puresky_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  // scene.background = texture;
});


//attributes for planetes
const radius = 1.3;
const segments = 40;
const orbitRadius = 4.5; // real orbit ka radius
const texs = ["./csilla/color1.png", "./volcanic/color1.png", "./venus/map1.png"]

const spheres = new THREE.Group();

//stars background
function starsBG() {

  const starTextureLoader = new THREE.TextureLoader();
  const starTexture = starTextureLoader.load('./stars2.jpg'); // Replace with the path to your star texture
  starTexture.colorSpace = THREE.SRGBColorSpace;
  const starGeometry = new THREE.SphereGeometry(50, 64, 64); // Large sphere
  const starMaterial = new THREE.MeshStandardMaterial({
    map: starTexture,
    transparent: true,
    opacity: 0.4,
    side: THREE.BackSide // Render the inside of the sphere
  });

  starSphere = new THREE.Mesh(starGeometry, starMaterial);
  starSphere.name = "galaxy"
  scene.add(starSphere);

}
starsBG();



// Basic Geometry
function sphereObj(params) {
  for (let i = 0; i < 3; i++) {

    const textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load(texs[i]);
    // console.log(texture);



    const sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = `planet${i}`

    sphereMesh.push(sphere);
    //color or perfect k liye
    // sphereMaterial.map=texture;
    texture.colorSpace = THREE.SRGBColorSpace;


    // sphere.position.set(1.5, 0, 0);
    const angle = (i / 3) * (Math.PI * 2);
    sphere.position.x = orbitRadius * Math.cos(angle);
    sphere.position.z = orbitRadius * Math.sin(angle);
    //r * cos(theta)
    spheres.add(sphere);
  }
  spheres.rotation.x = .11;// rotate the spheres group 
  spheres.position.y = -0.6;
  spheres.rotation.y = 4.715;
  scene.add(spheres);
}
sphereObj();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let lastWheelTime = 0; // Keep track of the last time the wheel event triggered
let scrollCount = 0;
let touchStartY = 0;

function handleScroll(direction) {
  const currentTime = Date.now();

  // Check if 2 seconds have passed since the last scroll event
  if (currentTime - lastWheelTime > 2000) {
    console.log("Scroll event triggered!");

    lastWheelTime = currentTime; // Update the last scroll time

    scrollCount = (scrollCount + 1) % 3;
    const heading = document.querySelectorAll('.headings');

    gsap.to(heading, {
      y: `-=${100}%`,
      duration: planetAnimationTime,
      ease: 'none'
    })

    gsap.from("h3", {
      opacity: 0,
      duration: 2.1,
      ease: 'expo.in'
    })

    gsap.to(spheres.rotation, {
      y: `+=${(Math.PI * 2) / 3}`,
      duration: planetAnimationTime,
      ease: 'none',
      onStart:()=>{
        spaceshipAudio.play();
      },
      onComplete:()=>{
        spaceshipAudio.pause();
        spaceshipAudio.currentTime=0;
      }
    })

    gsap.to(starSphere.rotation, {
      y: `+=${(Math.PI * 2) / 3}`,
      duration: planetAnimationTime,
      ease: 'none',
    })

    if (scrollCount == 0) {
      gsap.to(heading, {
        y: `0`,
        duration: planetAnimationTime,
        ease: 'power2.inOut'
      })
    }

    gsap.to(model.position, {
      y: getRandomInRange(),
      duration: shipAnimationTime,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(model.position, {
          y: .1,
          duration: .8,
          ease: "power1.inOut",
        })
      }
    });

    gsap.to(model.rotation, {
      x: getRandomRadianAngle(),
      duration: shipAnimationTime,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(model.rotation, {
          x: Math.PI / 4,
          duration: .8,
          ease: "power1.inOut"
        })
      }
    });
  }
}

function handleWheel(event) {
  const wheelDirect = event.deltaY > 0 ? "down" : "up";
  console.log(wheelDirect);
  handleScroll(wheelDirect);
}

function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  event.preventDefault(); // Prevent default scrolling
  const touchY = event.touches[0].clientY;
  const touchDiff = touchY - touchStartY;
  
  if (Math.abs(touchDiff) > 100) { // Only trigger if swipe is significant enough
    const direction = touchDiff > 0 ? "down" : "up";
    handleScroll(direction);
    touchStartY = touchY; // Reset the start position
  }
}

// Add the event listeners
window.addEventListener('wheel', handleWheel);
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchmove', handleTouchMove, { passive: false });

const gltfLoader = new GLTFLoader();
gltfLoader.load('/3d/ship.glb', function (gltf) {
  model = gltf.scene
  // 

  scene.add(model);
  model.position.z = 7;
  model.scale.set(0.01, 0.01, 0.01);
  model.rotation.y = -Math.PI / 2;
  model.rotation.x = Math.PI / 4;
  model.position.y = .1;
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);
const currentHoverTime = Date.now();

 //onclick 
 
 //throttle for ship text animation
{


  if ((intersects[0].object.name.includes("Object")) && (currentHoverTime-lastHoverTime > 2000)) {
   
  
  
    gsap.to(shipText, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.in"
      ,onComplete:()=>{
        lastHoverTime=currentHoverTime
      }
    });
  
  
  }
  
  else if((!intersects[0].object.name.includes("Object")) && (currentHoverTime-lastHoverTime > 2000)){
    gsap.to(shipText, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  }
}

 

}

function onClick(event) {
  // Prevent raycaster logic if clicking on a UI element
  if (event.target.closest('.ui-block')) {
    return;
  }

  // Calculate pointer position
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // Calculate objects intersecting the picking ray, but only check spheres group
  const intersects = raycaster.intersectObjects(scene.children);

  //onclick for ship
  {
    // console.log(intersects[0].object.name);
    const clickedObjName = intersects[0].object.name
    if (clickedObjName.includes("planet")) {
      gsap.to(model.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      onComplete: () => {
        setTimeout(() => {
          // window.location.href = pagePath;

          switch (clickedObjName) {
            case "planet0":
              window.location.href="/works"
              break;

              case "planet1":
              window.location.href="/projects"
              break;

              case "planet2":
              window.location.href="/contacts"
              break;
          
            default:
              break;
          }
        }, 250);
      }
    })

    gsap.to(model.position, {

      y: -.1,
      ease: "power1.inOut",
      duration: 1.5,

    })
    } 
    
    else if(clickedObjName.includes("Object")) {
      gsap.to(shipText,{
        opacity:1,
        duration:.8,
        ease:"power2.in"
      })
    }
  }
}

function getRandomInRange() {
  // return Math.random() * 0.2 - 0.1; // Returns value between -0.1 and 0.1
  return Math.random() * 0.2 - 0.1; // Returns value between -0.1 and 0.1
}

function getRandomRadianAngle() {
  const angles = [Math.PI / 3, Math.PI / 4, Math.PI / 2];
  const randomIndex = Math.floor(Math.random() * angles.length);
  return angles[randomIndex];
}

//window events
{
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClick);
// Resize event
window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < sphereMesh.length; i++) {
    const sphere = sphereMesh[i];
    sphere.rotation.y += 0.0003;
  }
  // controls.update();
  renderer.render(scene, camera);
}

animate()
