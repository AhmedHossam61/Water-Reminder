// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'playSound' && message.audioData) {
    const audio = new Audio(message.audioData);
    audio.play();
  }
});