import gsap from "gsap";


    const tag = document.querySelectorAll(".textCon h1");
    const ring1 = document.querySelector("#r1 .imgCon");
    const ring2 = document.querySelector("#r2 .imgCon");
    const ring3 = document.querySelector("#r3 .imgCon");
    const con1 = document.querySelector("#r1");
    const con2 = document.querySelector("#r2");
    const con3 = document.querySelector("#r3");
    const middleTextTime = 4
    // const rotationAngleLeft = -30
    const rotationAngle = 15
    const completeRotationTime = .5
    const completeRotationAngle = 285
    // const middleTextTime = 4


    const tl = gsap.timeline({
        repeat: -1,
    });
    gsap.to(tag, {
        transform: "translateY(-100%)",
        duration: middleTextTime,
        delay:.5,
        repeat: -1,
        repeatDelay: 1,
        ease: "power1.inOut",
    })

    tl.fromTo(ring1, {
        rotation: -rotationAngle,
        duration: 1,
        ease: "power1.inOut",
    }, {
        rotation: rotationAngle,
        duration: 2,
        repeat: 2,
        repeatDelay: 1,
        yoyo: true,
        ease: "power1.inOut",
    }).to(ring1,{
        rotation:completeRotationAngle,
        duration:.5,
        onStart:()=>{
            gsap.to(con2,{
                opacity:1,
                duration:.5,
                ease:"power1.inOut",
            })
            gsap.to(con1,{
                opacity:0,
                duration:.5,
                ease:"power1.inOut",
            })
        }
    }).fromTo(ring2, {
        rotation: -rotationAngle,
        duration: 1,
        ease: "power1.inOut",
    }, {
        rotation: rotationAngle,
        duration: 2,
        repeat: 2,
        repeatDelay: 1,
        yoyo: true,
        ease: "power1.inOut",
    }).to(ring2,{
        rotation:completeRotationAngle,
        duration:.5,
        onStart:()=>{
            gsap.to(con3,{
                opacity:1,
                duration:.5,
                ease:"power1.inOut",
            })
            gsap.to(con2,{
                opacity:0,
                duration:.5,
                ease:"power1.inOut",
            })
        }
    })
    .fromTo(ring3, {
        rotation: -rotationAngle,
        duration: 1,
        ease: "power1.inOut",
    }, {
        rotation: rotationAngle,
        duration: 2,
        repeat: 2,
        repeatDelay: 1,
        yoyo: true,
        ease: "power1.inOut",
    }).to(ring3,{
        rotation:completeRotationAngle,
        duration:.5,
        onStart:()=>{
            gsap.to(con1,{
                opacity:1,
                duration:.5,
                ease:"power1.inOut",
            })
            gsap.to(con3,{
                opacity:0,
                duration:.5,
                ease:"power1.inOut",
            })
        }
    })