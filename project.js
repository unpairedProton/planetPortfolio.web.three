import gsap from "gsap"

const layer1 = document.querySelector('.layer-1')
const layer2 = document.querySelector('.layer-2')
const layer3 = document.querySelector('.layer-3')
const layer4 = document.querySelector('.layer-4')
const layer5 = document.querySelector('.layer-5')
const changedIcons = document.querySelectorAll('.iconSection')
const iconsLocation = [
    "/images/movie.webp",
    "/images/ecom.webp",
    "/images/rann.webp",
    "/images/round.webp",
    "/images/king.webp",
    "/images/pomodoro.webp",
    "/images/clay.webp",
    "/images/obys.webp",
    "/images/robot.webp",
    "/images/gta.webp",


]

const gettingIcons = () =>{
    changedIcons.forEach((iconCon,i)=>{
        iconCon.querySelector("img").src=iconsLocation[i]
    })
}
gettingIcons()

window.addEventListener("mousemove", (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    const mouseY = (e.clientY / window.innerWidth - 0.5) * 40;
    
    gsap.to(layer1, {
        x: `${mouseX*1}`, // Use x instead of transform
        y: `${mouseY*1}`, // Use x instead of transform
        duration: 1,
        ease: "power2.out"
    });

    gsap.to(layer2, {
        x: `${mouseX*.8}`, // Use x instead of transform
         y: `${mouseY*.8}`,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to(layer3, {
        x: `${mouseX*.6}`, // Use x instead of transform
        y: `${mouseY*.6}`, // Use x instead of transform
        duration: 1,
        ease: "power2.out"
    });
    if (layer4) {
        gsap.to(layer4, {
        x: `${mouseX*.4}`, // Use x instead of transform
        y: `${mouseY*.4}`, // Use x instead of transform
        duration: 1,
        ease: "power2.out"
    });
    }
    
    if (layer5) {
        gsap.to(layer5, {
        x: `${mouseX*.2}`, // Use x instead of transform
        y: `${mouseY*.2}`, // Use x instead of transform
        duration: 1,
        ease: "power2.out"
    });
    }
    
});

