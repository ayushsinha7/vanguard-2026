# 🏟️ VANGUARD 2026 // FIFA World Cup Smart Stadium Mission Control


**Vanguard 2026** is an enterprise-grade, real-time GenAI-enabled Incident Command and Dynamic Crowd Control dashboard. Specifically engineered to meet the massive operational demands of the **FIFA World Cup 2026**, it transforms raw, chaotic on-ground telemetry into real-time decision support, automated volunteer dispatch directives, and instant multilingual spectator broadcasts.

---

[![Live Site](https://fifa-world-cup-2026-smart-stadium-mission-control-680335411376.asia-southeast1.run.app)

## 🌟 Key Features & Architecture

### 🛡️ 1. Technical Merit & Performance (Weight: 40%)
* **Reactive Simulation State Engine:** Implements a localized, state-driven JavaScript engine allowing operators to simulate critical World Cup crises in real time (e.g., *Gate 4 Surge*, *West Metrolink Transit Blockade*).
* **AI Telemetry & Async Processing:** Integrates professional skeleton loaders representing a 1.5s simulated API round-trip token processing delay to emulate real-world async network requests.
* **Dynamic Visual Mapping:** Features a customized SVG stadium layout representing the North, South, East, and West Stands. The quadrants execute CSS-driven pulse animations and shift colors dynamically to reflect computed risk levels.

### 🧠 2. Deep GenAI Integration & Prompt Engineering (Weight: 25%)
* **Cognitive Action Network:** Uses structured telemetry mockups mirroring Gemini 1.5 Pro output capabilities to compute a real-time Danger Index, Risk Level, and overall Confidence Score.
* **On-Ground Volunteer Directives:** Auto-generates three highly contextual, actionable steps for stadium stewards and volunteers during critical incidents.
* **Multilingual Broadcast Engine:** Instantly localizes stadium-wide emergency announcements into English, Spanish, and French to eliminate communication barriers for international spectators.
* **Integrated System Prompt:** Includes an interactive on-screen "System Prompt" viewer that showcases the exact prompt engineering parameters utilized to control the AI safety warden backend.

### ♿ 3. Accessibility & Security Compliance (Weight: 10%)
* **WCAG AA Color Contrast:** Implements a high-contrast dark mode slate theme (`bg-zinc-950`) specifically styled to minimize eye strain for command center operators working extended shifts.
* **Semantic ARIA Integration:** Fully optimized for assistive technologies with screen-reader accessible landmarks (`role="log"` for the live event stream, `role="status"` for danger indexes).
* **Input Sanitization:** Simulates a secure, zero-trust data pipeline by sanitizing all incoming live logs before rendering them on the DOM.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite-ready)
* **CSS Framework:** Tailwind CSS (Custom color tokens & telemetry animations)
* **Icons:** Lucide React
* **Hosting Pipeline:** Google Cloud Run (Deployed directly via Google AI Studio's cloud-publish feature)

---

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/288c169a-0c3f-4133-8f3e-4c125b0998a7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## 📂 Project Structure

```text
├── src/
│   ├── App.jsx             # Main Dashboard UI & Simulation State Logic
│   ├── index.css           # Tailwind CSS directives & keyframe animations
│   └── main.jsx            # React mounting and entry point
├── package.json            # Scripts and project dependencies
└── README.md               # Project documentation

