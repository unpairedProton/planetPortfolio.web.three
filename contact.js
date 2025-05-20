import gsap from "gsap"
import emailjs from '@emailjs/browser';


const inputElementName = document.getElementById('name');
const inputElementEmail = document.getElementById('email');
const inputElementMsg = document.getElementById('msg');
const displayElementName = document.querySelector('.contactReflectName');
const displayElementEmail = document.querySelector('.contactReflectEmail');
const displayElementMsg = document.querySelector('.contactReflectMsg');
const displayScreen = document.querySelector('.reflectScreen');
const submitButton = document.querySelector('input[type="submit"]');

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


submitButton.addEventListener('click',async function(e) {
  e.preventDefault();
  submitButton.value = 'Sending...';
  await emailjs.send(
    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, 
    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    {
      from_name: inputElementName.value,
      to_name: "Vinay Pratap",
      from_email: inputElementEmail.value,
      to_email: "thisisfree4everyone@gmail.com",
      message: inputElementMsg.value
    },
    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
  )
  .then((response) => {
    console.log('Email sent successfully:', response);
    if(response.status === 200){
      inputElementName.value = '';
            inputElementEmail.value = '';
            inputElementMsg.value = '';
            // Clear reflection
            displayElementName.textContent = '';
            displayElementEmail.textContent = '';
            displayElementMsg.textContent = '';
            submitButton.value = 'Send';
    }
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
})

// async function handleSendEmail(e) {
//     e.preventDefault();
    
//     // Disable submit button and show loading state
//     submitButton.disabled = true;
//     submitButton.value = 'Sending...';
    
//     try {
//         const templateParams = {
//             user_name: inputElementName.value,
//             user_email: inputElementEmail.value,
//             message: inputElementMsg.value
//         };

//         const response = await emailjs.send(
//           import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
//           import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, // Replace with your EmailJS template ID
//             templateParams
//         );

//         if (response.status === 200) {
//             alert('Message sent successfully!');
//             // Clear form
//             inputElementName.value = '';
//             inputElementEmail.value = '';
//             inputElementMsg.value = '';
//             // Clear reflection
//             displayElementName.textContent = '';
//             displayElementEmail.textContent = '';
//             displayElementMsg.textContent = '';
//         }
//     } catch (error) {
//         console.error('Error sending email:', error);
//         alert('Failed to send message. Please try again later.');
//     } finally {
//         // Re-enable submit button
//         submitButton.disabled = false;
//         submitButton.value = 'Send';
//     }
    
//     return false;
// }