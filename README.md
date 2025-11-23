# 🌑 GlowPulse

![Project Status](https://img.shields.io/badge/status-active-00f0ff?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-7c3aed?style=for-the-badge)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Tune Into Your Rhythm.** > A minimal, glassmorphic wellness dashboard designed for the cyber-conscious.

[**🔴 Live Demo**](https://glowpulse.netlify.app/)

---

## ✨ Overview

**GlowPulse** is a concept landing page for a futuristic wellness tracker. It moves away from sterile medical aesthetics, embracing a **"Cyber-wellness"** vibe with deep voids, neon accents, and organic animations.

Built to demonstrate modern UI engineering with **React** and **Tailwind CSS**, it features high-performance animations, mouse-tracking interactions, and a fully responsive glassmorphism design system.

## 🚀 Key Features

### 🎨 **Visual Experience**
* **Glassmorphism UI:** Extensive use of `backdrop-blur`, subtle borders, and noise textures to create depth.
* **Ambient Atmosphere:** Floating gradient orbs and a custom glowing cursor that trails the user's movement.
* **Dark Mode Native:** A rich `#0a0a0a` background designed to reduce eye strain while popping with neon cyan and violet accents.

### ⚡ **Interactive Elements**
* **The "Pulse" Graph:** A custom SVG sine-wave animation that reacts to horizontal mouse movement, simulating a living bio-rhythm.
* **Spotlight Cards:** Feature cards that track cursor position to reveal a subtle radial gradient glow (`card-spotlight`).
* **Scroll Animations:** Elements fade up and float into view using Intersection Observers.

## 🛠️ Tech Stack

* **Framework:** [React 18](https://reactjs.org/) (Functional Components + Hooks)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animation:** Native CSS Transitions & `requestAnimationFrame` for performance.


## 📂 Project Structure

```bash
glowpulse/
├── src/
│   ├── components/       # Broken down components
│   ├── App.jsx           # Main application logic & layout
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & Tailwind directives
├── public/               # Static assets
├── tailwind.config.cjs   # Custom colors & font configuration
└── vite.config.js        # Vite build settings
