const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const voiceButton = document.getElementById("voice-btn");

let isListening = false;
let key = 0;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-IN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

voiceButton.addEventListener("click", () => {
  if (!isListening) {
    recognition.start();
    console.log("Speak Now!");
    isListening = true;
  } else {
    recognition.stop();
    console.log("Stop Now!");
    isListening = false;
  }
});

recognition.onresult = (event) => {
  if (key == 0) {
    noteTitle.value = event.results[0][0].transcript;
  } else {
    noteContent.value += " " + event.results[key][0].transcript;
  }
  key++;
};
