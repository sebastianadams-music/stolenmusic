var slideIndex = 1;
const synth = window.speechSynthesis;

showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {


  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  
  slides[slideIndex-1].style.display = "block";
  q = slides[slideIndex-1].querySelector("q")  
  console.log(q)
  inputTxt = q
  utterSpeech()
}

function utterSpeech() //modified from dom-examples 


{

    

// const voiceSelect = document.querySelector('select');
const voiceSelect = 1;
const pitch = 1. // document.querySelector('#pitch');
// const pitchValue = 1 // document.querySelector('.pitch-value');
const rate = 1. //document.querySelector('#rate');
// const rateValue = 1 // document.querySelector('.rate-value');

const voices = synth.getVoices();
console.log("VOICES", voices)



     synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(inputTxt.textContent);
  // const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (const voice of voices) {
    if (voice === voiceSelect) {
      utterThis.voice = voice;
    }
  }
  utterThis.pitch = pitch;
  utterThis.rate = rate;
  synth.speak(utterThis);

}