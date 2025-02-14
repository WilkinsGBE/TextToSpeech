let speech = new SpeechSynthesisUtterance();
let voices = [];
let voicesSelect = document.querySelector("select");

// Function to load voices properly
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    
    if (voices.length === 0) {
        setTimeout(loadVoices, 100); // Retry if voices are not loaded
        return;
    }

    voicesSelect.innerHTML = ""; // Clear old options
    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voicesSelect.appendChild(option);
    });

    speech.voice = voices[0]; // Set default voice
}

// Ensure voices are loaded correctly
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices(); // Call manually in case `onvoiceschanged` doesn't fire

// Change voice when a new one is selected
voicesSelect.addEventListener("change", () => {
    speech.voice = voices[voicesSelect.value];
});

// Speak the text
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
