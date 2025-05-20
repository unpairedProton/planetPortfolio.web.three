const volume = document.querySelector("#volume");
const mute = document.querySelector("#mute");
let audioEnabled = false;
const audio = document.querySelector("#audio");

audio.loop = true;
function toggleAudio() {
    
    volume.style.display = !audioEnabled ? "none" : "block";
    mute.style.display = !audioEnabled ? "block" : "none";
    console.log(audioEnabled ? "Audio enabled" : "Audio disabled");
    !audioEnabled ? audio.play() : audio.pause();

    audioEnabled = !audioEnabled;
}


volume.addEventListener("click", toggleAudio);
mute.addEventListener("click", toggleAudio);

