 import gsap from "gsap"
 
 
 const inputElementName = document.getElementById('name');
const inputElementEmail = document.getElementById('email');
const inputElementMsg = document.getElementById('msg');
  const displayElementName = document.querySelector('.contactReflectName');
  const displayElementEmail = document.querySelector('.contactReflectEmail');
  const displayElementMsg = document.querySelector('.contactReflectMsg');
  const displayScreen = document.querySelector('.reflectScreen');

  inputElementName.addEventListener('change', function() {
    displayElementName.textContent = inputElementName.value;
    displayElementEmail.textContent = inputElementEmail.value;
    displayElementMsg.textContent = inputElementMsg.value;
  });

   inputElementEmail.addEventListener('change', function() {
    
    displayElementEmail.textContent = inputElementEmail.value;

  });

   inputElementMsg.addEventListener('change', function() {
    
   
    displayElementMsg.textContent = inputElementMsg.value;
  });


  gsap.to(displayScreen,{
    opacity:0.5,
    duration:5,
    ease:"rough({ strength: 1, points: 20, template: none.out, taper: none, randomize: true, clamp: false })",
    repeat:-1
  })