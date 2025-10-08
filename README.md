# 💧 Water Reminder Chrome Extension

A simple and beautiful Chrome extension that reminds you to stay hydrated throughout the day. Never forget to drink water again!

## ✨ Features

- ⏰ **Customizable Reminders** - Set reminders every 30 minutes, 1 hour, 1.5 hours, or 2 hours
- 📊 **Daily Water Counter** - Track how many glasses you've drunk today
- 🔔 **Browser Notifications** - Get desktop notifications when it's time to drink
- 🎵 **Custom Sound Alerts** - Upload your own notification sound
- 🖼️ **Beautiful UI** - Clean and motivating interface with water imagery
- 💾 **Progress Tracking** - Your count is saved automatically
- 🎨 **Modern Design** - Beautiful gradient interface with smooth animations

## 📸 Screenshots

![Extension Popup](screenshots/popup.png)
*Main interface with counter and settings*

## 🚀 Installation

### From Source

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/yourusername/water-reminder-extension.git
   ```

2. **Add required images:**
   - Add `water.jpg` - A water glass or bottle image for the UI
   - Add `icon.png` - Extension icon (128x128px recommended)

3. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the extension folder
   - Done! 🎉

### For Microsoft Edge

The extension works exactly the same in Edge:
- Navigate to `edge://extensions/`
- Follow the same steps as Chrome

## 📖 How to Use

1. **Click the extension icon** in your Chrome toolbar to open the popup

2. **Track your water intake:**
   - Click "I Drank Water! 💧" button each time you drink
   - Watch your daily counter increase

3. **Customize your reminders:**
   - Choose your preferred reminder interval
   - Upload a custom notification sound
   - Toggle reminders on/off as needed

4. **Reset daily:**
   - Use the "Reset Count" button to start fresh each day

## 🛠️ Technologies Used

- **Manifest V3** - Latest Chrome extension standard
- **JavaScript** - Core functionality
- **HTML/CSS** - User interface
- **Chrome APIs:**
  - `chrome.alarms` - Scheduled reminders
  - `chrome.notifications` - Desktop notifications
  - `chrome.storage` - Data persistence
  - `chrome.offscreen` - Audio playback

## 📁 Project Stru