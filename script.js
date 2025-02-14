let speech = new SpeechSynthesisUtterance();
let voices = [];
let voicesSelect = document.querySelector("select");

// Function to prioritize the main voice (Google Translate/Siri)
function getPreferredVoice(voices) {
    let preferredLangs = ["en-CA", "fr-CA", "en-US", "fr-FR", "es-ES", "en-GB"];
    
    for (let lang of preferredLangs) {
        let match = voices.find(voice => voice.lang.startsWith(lang) && voice.default);
        if (match) return match;
    }

    return voices.find(voice => voice.default) || voices[0]; // Fallback if no perfect match
}

// Load voices properly
function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        setTimeout(loadVoices, 100);
        return;
    }

    voicesSelect.innerHTML = ""; // Clear old options

    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
    });

    // Set preferred voice (Google Translate/Siri-like)
    let preferredVoice = getPreferredVoice(voices);
    speech.voice = preferredVoice;
    voicesSelect.value = voices.indexOf(preferredVoice);
}

// Ensure voices are loaded correctly
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Change voice when a new one is selected
voicesSelect.addEventListener("change", () => {
    speech.voice = voices[voicesSelect.value];
});

// Speak the text
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
