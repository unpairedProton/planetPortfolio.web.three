import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

let scene, camera, renderer, controls, randVal;
let model;
const planetAnimationTime = 1.58
const shipAnimationTime = 1.2
let shipTimeline;


const sphereMesh = []

// Scene
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(
  25, //focused more on the obj
  window.innerWidth / window.innerHeight
  , 0.1
  , 100 // far point itna chahiye ni tha to 1000 se 100 kr diya
);
// camera.position.set(0, 1, 5);
camera.position.z = 10;
let starSphere

// Renderer
const canvas = document.querySelector('canvas');
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// OrbitControls
// controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

//hdri light

const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/lonely_road_afternoon_puresky_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  // scene.background = texture;
});


//add radius
const radius = 1.3;
const segments = 40;
const orbitRadius = 4.5; // real orbit ka radius
const texs = ["./csilla/color.png", "./volcanic/color.png", "./venus/map.jpg"]

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




// Resize event
window.addEventListener('resize', onWindowResize, false);


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let lastWheelTime = 0; // Keep track of the last time the wheel event triggered
let scrollCount = 0;
function ani2() {


  function handleWheel(event) {
    const currentTime = Date.now();

    // Check if 2 seconds have passed since the last wheel event
    if (currentTime - lastWheelTime > 2000) {
      console.log("Wheel event triggered!");

      // Your code to run when the wheel event triggers goes here

      lastWheelTime = currentTime; // Update the last wheel time

      const wheelDirect = event.deltaY > 0 ? "down" : "up";
      console.log(wheelDirect);

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

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/3d/ship.glb', function (gltf) {
    model = gltf.scene
    scene.add(model);
    model.position.z = 7;
    model.scale.set(0.01, 0.01, 0.01);
    model.rotation.y = -Math.PI / 2;
    model.rotation.x = Math.PI / 4;
    model.position.y = .1;
  });

  // Add the event listener to the element you want to track
  window.addEventListener('wheel', handleWheel);
}

ani2();

function gsapAni() {

  // gsap.to(spheres.rotation,{
  //   y: Math.PI * 2,
  //   duration: 10,
  //   repeat: -1,
  //   ease: 'none'
  // })

  setInterval(() => {

    gsap.to(spheres.rotation, {
      y: `+=${(Math.PI * 2) / 3}`,
      duration: 2,
      ease: 'none'
    })
  }, 2500);

}

// gsapAni();


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


function onClick(event) {
  // Calculate pointer position
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // Calculate objects intersecting the picking ray, but only check spheres group
  const intersects = raycaster.intersectObjects(spheres.children);

  if (intersects.length > 0) {
    const clickedSphere = intersects[0].object;
    console.log('Clicked sphere:', clickedSphere);

    // Get the texture name from the map URL
    const texturePath = clickedSphere.material.map.source.data.src;
    // const textureName = texturePath.split('/').pop(); // Gets the filename from path
    // console.log('Clicked texture:', textureName);

    openNextPage(texturePath);
  }
}



function openNextPage(texturePath) {
  // window.location.href = 'https://example.com/next-page'; // Replace with your desired URL
  if (texturePath.includes('csilla')) {
    console.log('csilla');
    window.location.href = '/work.html';
  }
  else if (texturePath.includes('volcanic')) {
    console.log('volcanic');
  }
  else if (texturePath.includes('venus')) {
    console.log('venus');
  }
  else {
    console.log('other');
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

function spaceshipAni() {
  shipTimeline = gsap.timeline({
    repeat: -1, // Infinite loop
    // onComplete: () => tl.restart() // Restart animation when complete
  });

  shipTimeline.to(model.position, {
    y: .1, // Random y position
    duration: shipAnimationTime,
    ease: "power1.inOut",
    onComplete: function () {

      // Update to a new random y position
      gsap.to(model.position, {
        y: getRandomInRange(),
        duration: shipAnimationTime,
        ease: "power1.inOut"
      });
    }
  }, 'a');

  shipTimeline.to(model.rotation, {
    x: Math.PI / 4, // Random y position
    duration: shipAnimationTime,
    ease: "power1.inOut",
    onComplete: function () {

      // Update to a new random y position
      gsap.to(model.rotation, {
        x: getRandomRadianAngle(),
        duration: shipAnimationTime,
        ease: "power1.inOut"
      });
    }
  }, 'a');


}

// Add click event listener
window.addEventListener('click', onClick);

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
