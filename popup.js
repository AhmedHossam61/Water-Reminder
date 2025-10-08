// Load saved data when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.storage.local.get(['counter', 'interval', 'enabled']);
  
  document.getElementById('counter').textContent = data.counter || 0;
  document.getElementById('interval').value = data.interval || 60;
  document.getElementById('enableReminders').checked = data.enabled !== false;
});

// Drink water button
document.getElementById('drinkBtn').addEventListener('click', async () => {
  const data = await chrome.storage.local.get(['counter']);
  const newCount = (data.counter || 0) + 1;
  
  await chrome.storage.local.set({ counter: newCount });
  document.getElementById('counter').textContent = newCount;
  
  showStatus('Great! Keep hydrated! 💧');
  
  // Celebrate animation
  const btn = document.getElementById('drinkBtn');
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = 'scale(1)', 100);
});

// Reset counter button
document.getElementById('resetBtn').addEventListener('click', async () => {
  await chrome.storage.local.set({ counter: 0 });
  document.getElementById('counter').textContent = 0;
  showStatus('Counter reset!');
});

// Interval change
document.getElementById('interval').addEventListener('change', async (e) => {
  const interval = parseInt(e.target.value);
  await chrome.storage.local.set({ interval });
  
  // Restart alarm with new interval
  chrome.runtime.sendMessage({ action: 'updateAlarm', interval });
  showStatus(`Reminder set to every ${interval} minutes`);
});

// Sound file upload
document.getElementById('soundFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Convert file to base64
  const reader = new FileReader();
  reader.onload = async (event) => {
    const audioData = event.target.result;
    await chrome.storage.local.set({ customSound: audioData });
    showStatus('Sound uploaded successfully!');
  };
  reader.readAsDataURL(file);
});

// Test sound button
document.getElementById('testSound').addEventListener('click', async () => {
  const data = await chrome.storage.local.get(['customSound']);
  if (data.customSound) {
    const audio = new Audio(data.customSound);
    audio.play();
    showStatus('Playing sound...');
  } else {
    showStatus('Please upload a sound file first');
  }
});

// Enable/disable reminders
document.getElementById('enableReminders').addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await chrome.storage.local.set({ enabled });
  
  chrome.runtime.sendMessage({ 
    action: enabled ? 'enableAlarm' : 'disableAlarm' 
  });
  
  showStatus(enabled ? 'Reminders enabled ✓' : 'Reminders disabled');
});

// Show status message
function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.classList.add('show');
  
  setTimeout(() => {
    status.classList.remove('show');
  }, 2000);
}