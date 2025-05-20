import gsap from "gsap";
import Typewriter from 'typewriter-effect/dist/core';


const timerElement = document.querySelector(".timer");

gsap.to(timerElement, {
    duration: 5,
    snap: { textContent: 1 },
    textContent: 100,
    ease: "rough({ strength: 1, points: 20, template: none.out, taper: none, randomize: true, clamp: false })",
    onUpdate: function() {
        // Format the number to always show 2 digits
        timerElement.textContent = Math.floor(this.targets()[0].textContent).toString().padStart(2, '0');
    },
    onComplete: function() {
        const tl = gsap.timeline();

        tl.to('.loading',{
            transform: 'translateY(-100%)',
            duration: 1,
            ease: 'power2.inOut',
            onComplete: function() {
             document.querySelector('.loading').style.display = 'none';
            }
        })
    }
});



new Typewriter('#typewriter', {
  strings: ['Worlds', 'Planets','Visions'],
  autoStart: true,
  loop: true,
  delay: 70,
  cursor: "|",
  cursorColor: "#000",
  cursorBlink: true,
  cursorBlinkInterval: 100,
  deleteSpeed: 70,
  typeSpeed: 70,
  pauseFor: 150,
});

volume.addEventListener("click", () => {
     //set audioEnabled from false to true
    // if (!audioEnabled) {  
    //     audioEnabled = true;
    //     volume.style.opacity = 0;
    //     mute.style.opacity = 1;
    // } else {
    //     audioEnabled = false;
    //     volume.style.opacity = 1;
    //     mute.style.opacity = 0;
    // }

    console.log("clicked");
    
});

// mute.addEventListener("click", () => {
//     // audioEnabled = !audioEnabled;
//     if (audioEnabled) {
//         volume.style.opacity = 0;
//         mute.style.opacity = 1;
//     } else {
//         volume.style.opacity = 1;
//         mute.style.opacity = 0;
//     }
// });
