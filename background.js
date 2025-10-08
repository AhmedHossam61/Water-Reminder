// Initialize alarm when extension is installed
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['interval', 'enabled', 'counter']);
  
  // Set defaults
  if (data.interval === undefined) {
    await chrome.storage.local.set({ interval: 60 });
  }
  if (data.enabled === undefined) {
    await chrome.storage.local.set({ enabled: true });
  }
  if (data.counter === undefined) {
    await chrome.storage.local.set({ counter: 0 });
  }
  
  // Create the alarm
  createAlarm(data.interval || 60);
});

// Listen for alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'waterReminder') {
    const data = await chrome.storage.local.get(['enabled', 'customSound']);
    
    if (data.enabled !== false) {
      // Show notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Time to Drink Water! 💧',
        message: 'Stay hydrated! Remember to drink a glass of water.',
        priority: 2
      });
      
      // Play custom sound if available
      if (data.customSound) {
        playSound(data.customSound);
      }
    }
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateAlarm') {
    createAlarm(request.interval);
  } else if (request.action === 'enableAlarm') {
    chrome.storage.local.get(['interval'], (data) => {
      createAlarm(data.interval || 60);
    });
  } else if (request.action === 'disableAlarm') {
    chrome.alarms.clear('waterReminder');
  }
});

// Create alarm function
function createAlarm(intervalMinutes) {
  chrome.alarms.clear('waterReminder', () => {
    chrome.alarms.create('waterReminder', {
      delayInMinutes: intervalMinutes,
      periodInMinutes: intervalMinutes
    });
  });
}

// Play sound function
async function playSound(audioData) {
  // Create an offscreen document to play audio
  // (service workers can't play audio directly)
  try {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Play notification sound'
    });
  } catch (e) {
    // Document may already exist
  }
  
  // Send message to offscreen document to play sound
  chrome.runtime.sendMessage({
    type: 'playSound',
    audioData: audioData
  });
  
  // Close offscreen document after sound plays
  setTimeout(() => {
    chrome.offscreen.closeDocument();
  }, 5000);
}