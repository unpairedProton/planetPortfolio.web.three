const sosCon = document.querySelector('.sos-con');
const waCon = document.querySelector('.wa-con');
const callCon = document.querySelector('.call-con');
const phoneNumber = import.meta.env.VITE_APP_PHONE; // Replace with actual phone number
const message = "hello"; // Replace with actual message

console.log(phoneNumber);

sosCon.addEventListener('click', () => {
    waCon.classList.toggle('active');
    callCon.classList.toggle('active');
    console.log("clickedll");
});

waCon.addEventListener('click', (e) => {
    e.stopPropagation();
  
    const message = 'Emergency SOS message'; // Replace with actual message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

callCon.addEventListener('click', (e) => {
    e.stopPropagation();
    
    window.location.href = `tel:${phoneNumber}`;
});