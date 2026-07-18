# Vanguard 2026: FIFA World Cup Smart Stadium Safety System

An enterprise-grade cognitive operations dashboard engineered for **MetLife Stadium (FIFA World Cup 2026 Tournament Site)**. Vanguard 2026 synthesizes multi-modal IoT sensor telemetry, turnstile entry velocities, dynamic crowd acoustics, and transport network feeds in real-time to safeguard over 82,000 spectators.

---

## 🌟 Chosen Vertical & Operational Persona
- **Role:** Lead Vanguard 2026 Smart Stadium AI Safety Director
- **Operational Site:** MetLife Stadium, East Rutherford, NJ (FIFA World Cup 2026)
- **Authority Level:** Full operational alignment with **FIFA Stadium Safety & Security Regulations**.

---

## 🚀 Three Core Tracks (Problem Statement Alignment)

The platform is designed around three key tracks outlined in the FIFA World Cup tournament expectations:

### 1. Track 1: Dynamic Crowd Management
- **Scenario Simulated:** *Gate 4 Ingress Surge & Turnstile Access Failure*
- **Acoustic / Telemetry Inputs:** Real-time sensor feeds monitoring turnstile bank E1-E8 offline status, localized crowd density spikes exceeding critical levels (4.8 persons/m²), and high-frequency structural load indicators.
- **Dynamic Mitigation:** Automatic load balancing, triggering real-time digital wayfinding sign arrays, and routing arriving spectator waves to the nearest available gates (Gate 5) before a crowd-crush condition develops.

### 2. Track 2: Smart Indoor Navigation & Accessibility
- **Scenario Simulated:** *Section 102 Sound Pressure & Accessibility Detour*
- **Acoustic / Telemetry Inputs:** Ambient decibel monitoring detecting dangerous acoustic spikes (104+ dB), combined with indoor location coordinates identifying sensory-vulnerable, neurodivergent, and disabled spectators.
- **Dynamic Mitigation:** Programmatic routing of disabled spectators through low-acoustic quiet corridors (S1B), coordination with dedicated Accessibility Marshals, and activation of sensory rooms with soothing climate and lighting profiles.

### 3. Track 3: Tournament Sustainability & Transport
- **Scenario Simulated:** *West Metrolink Transit Blockade & Zero-Emission Shuttle Bridge*
- **Acoustic / Telemetry Inputs:** Power rail telemetry detecting stalled commuter trains outside the West Transit Hub and immediate backlog of 18,500+ queuing passengers.
- **Dynamic Mitigation:** Smart-grid green shuttle fleet dispatch (25+ zero-emission electric buses operating from Lot G) combined with dynamic transit delay push alerts on the spectator mobile app.

---

## 📊 Technical Architecture & System Features

### 1. Robust Programmatic Testing Suite (`VanguardAutomatedTestSuite`)
To ensure total runtime stability, the system features a self-executing unit test suite running on load and executable programmatically:
- **`testIncidentStateChange()`**: Asserts that triggering a crisis modifies danger levels, severity classes, and sector coordinates correctly.
- **`testMultilingualLocalization()`**: Guarantees that acoustic warnings and alerts exist in English (Primary), Spanish (MX), and French (FR) with complete coverage.
- **`testInputSanitization()`**: Confirms that XSS injection attempts (malicious scripts, event handlers, protocols) are stripped before rendering.
- **Test Runner Integration:** Run tests directly using the built-in NPM script:
  ```bash
  npm test
  ```

### 2. Security & Input Sanitization
- **XSS Neutralization:** Utilizes an industrial-grade escaping utility (`/src/utils/sanitizer.ts`) to intercept logs and user prompts, sanitizing active HTML tags, `onerror` event handlers, and `javascript:` protocols.
- **Zero Exposed Keys:** Strict adherence to modern server-side secret management.

### 3. Rendering Efficiency & Performance
- **Re-render Isolation:** The high-frequency UTC clock ticker is isolated in its own micro-component `<ClockTicker />`, preventing whole-page re-renders every 1000ms.
- **Spatial Telemetry Memoization:** The `<StadiumSVG />` component uses React `useCallback` for event handlers and static map configurations cached outside the component render tree.

### 4. Accessibility & Inclusive Design (WCAG 2.1 AA)
- **High-Contrast Design:** Slate dark mode canvas with custom emerald and rose indicators, exceeding a 4.5:1 color contrast ratio.
- **Screen Reader Support:** Full semantic HTML elements coupled with `role="region"`, `role="log"`, `role="status"`, `aria-live="polite"`, and specific `aria-label` tags on all interactive widgets.

---

## 🛠️ Assumptions Made
1. **IoT Network Reliability:** Assumes stadium smart nodes support edge failover capabilities to buffer logs during network switch outages.
2. **Spectator Adherence:** Assumes stadium digital screens are clearly visible to spectators, allowing immediate guidance during rerouting.
3. **Transport Integration:** Assumes NJ Transit and local train services expose live telemetry endpoints via standard webhook protocols.
