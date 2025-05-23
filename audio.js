const volume = document.querySelector("#volume");
const mute = document.querySelector("#mute");
let audioEnabled = false;
const audio = document.querySelector("#audio");
audio.volume=0.7;

audio.loop = true;
function toggleAudio() {
    
    volume.style.display = audioEnabled ? "none" : "block";
    mute.style.display = audioEnabled ? "block" : "none";
    console.log(audioEnabled ? "Audio enabled" : "Audio disabled");
    audioEnabled ? audio.pause() : audio.play();

    audioEnabled = !audioEnabled;
}


volume.addEventListener("click", toggleAudio);
mute.addEventListener("click", toggleAudio);

