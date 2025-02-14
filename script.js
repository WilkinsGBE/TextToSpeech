let speech = new SpeechSynthesisUtterance();
let voices = [];

let voicesSelect = document.querySelector("select");

// Function to load voices properly
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    
    if (voices.length === 0) {
        setTimeout(loadVoices, 100);
        return;
    }

    speech.voice = voices[0]; 
    voicesSelect.innerHTML = ""; 

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voicesSelect.add(option);
    });
}

// Ensure voices are loaded
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Also call loadVoices in case onvoiceschanged doesn't fire
loadVoices();

// Change voice when the user selects a different option
voicesSelect.addEventListener("change", () => {
    speech.voice = voices[voicesSelect.value];
});

// Speak the text on button click
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    
    if (speech.text.trim() !== "") {
        window.speechSynthesis.cancel(); 
        window.speechSynthesis.speak(speech);
    }
});
