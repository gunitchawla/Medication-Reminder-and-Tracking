# 💊 MedTracker

> **A premium, intelligent medication tracking assistant built for the modern web.**

![image alt](https://github.com/gunitchawla/Medication-Reminder-and-Tracking/blob/main/Medication%20Tracker.png?raw=true)

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**MedTracker** is a progressive web application (PWA) designed to help users manage their medication schedules with ease and style. Built with a focus on **User Experience (UX)** and **Visual Aesthetics**, it features a stunning glassmorphism UI, robust notification system, and offline capabilities.

Unlike clunky medical apps, MedTracker feels like a premium digital assistant—keeping you healthy without the hassle.

## ✨ Key Features

### 🎨 Premium Design
- **Glassmorphism UI**: A modern, translucent aesthetic with vibrant gradients and blur effects.
- **Responsive Layout**: Seamlessly adapts from desktop to mobile devices.
- **Dark Mode Native**: Designed with eye comfort in mind using a deep slate palette.

### ⚡ Core Functionality
- **Smart Dashboard**: Instant view of your daily timeline and upcoming doses.
- **Inventory Tracking**: Automatically decrements stock and alerts you when refills are needed.
- **History Log**: Detailed record of every dose taken or skipped, with **Undo** capability.
- **Flexible Scheduling**: Support for daily, twice-daily, or weekly schedules.

### 🔔 Intelligent Notifications
- **Real-time Alerts**: Browser notifications exactly when your dose is due.
- **Missed Dose Detection**: Smart logic checks if you missed a dose while the app was closed and reminds you upon return.
- **Interactive Actions**: Mark doses as taken directly from the app interface.

### 📱 PWA Support
- **Installable**: Add to your home screen on iOS and Android.
- **Offline Ready**: Core features work even without an internet connection.
- **Local Privacy**: All data is stored locally in your browser (`localStorage`). No servers, no tracking.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medication-tracker.git
   cd medication-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Variables & Glassmorphism Utility Classes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Management**: [date-fns](https://date-fns.org/)
- **State Management**: React Context API + useReducer

## 📂 Project Structure

```
src/
├── components/        # UI Components
│   ├── Dashboard.jsx      # Main timeline view
│   ├── MedicationManager.jsx # Add/Edit forms
│   ├── RefillAlerts.jsx   # Inventory tracking
│   └── HistoryLog.jsx     # Action history
├── context/          # Global State
│   └── MedicationContext.jsx
├── hooks/            # Custom Hooks
│   └── useNotifications.js # Notification logic
├── App.jsx           # Main Layout & Routing
└── index.css         # Design System & Variables
```

## 🔮 Future Roadmap

- [ ] **Cloud Sync**: Optional account creation to sync across devices.
- [ ] **Complex Schedules**: Support for "every X hours" or specific days of the week.
- [ ] **Drug Interactions**: Warning system for potential medication conflicts.
- [ ] **Export Data**: Download history as PDF/CSV for doctor visits.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/gunitchawla">Gunit Chawla</a></sub>
</div>
