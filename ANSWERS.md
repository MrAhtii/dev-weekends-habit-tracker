# Frontend Assessment Answers — Habit Tracker

### 1. How to Run
* **Local Setup:** To run this project locally, you don't need to install any complex dependencies. Simply clone the repository, navigate to the root directory, and open the `index.html` file directly in any modern web browser. Alternatively, you can use an extension like VS Code's "Live Server" to host it locally.
* **Deployment URL:** [https://mrahtii.github.io/dev-weekends-habit-tracker/]

---

### 2. Stack & Design Choices
* **Stack Choice:** I chose to build this using **Vanilla HTML5, CSS3, and modern JavaScript (ES6+)**. Since this is a single-page application requiring fast rendering and local persistence, native browser web APIs provide maximum speed, no build-step overhead, and zero heavy package weights.
* **Design Decision 1 (Visual):** I applied a distinctive highlighting color (a bright outline/background) exclusively to **Today's column** in the weekly grid. This creates an immediate focal point so users don't have to scan the entire screen to figure out where they are in the current week.
* **Design Decision 2 (Interaction):** I implemented a toggleable checkmark state for each grid cell. Clicking a cell instantly updates the visual checkbox state, calculates the updated streak counter next to the habit name in real-time, and saves the state to browser storage without requiring a manual "Save" button click.

---

### 3. Responsive & Accessibility
* **Responsiveness:** On a wide desktop screen ($1440\text{px}$), the grid scales cleanly across the viewport with plenty of breathing room. On a narrow mobile viewport ($360\text{px}$), the layout dynamically handles space by making the habit names column narrower and utilizing CSS Grid/Flexbox properties to prevent the 7-day layout from overflowing or breaking out of the viewport bounds.
* **Accessibility Feature Handled:** I used semantic HTML structural elements (such as native `<button>` tags for week navigation and daily toggles) to ensure that the core controls are accessible via keyboard navigation (`Tab` and `Space`/`Enter`).
* **Knowingly Skipped Feature:** I knowingly skipped implementing full ARIA screen-reader live region announcements (`aria-live`) for the streak counter updates. While valuable for visually impaired users to hear their updated streaks, I prioritized getting the core data persistence and grid rendering flawless due to time constraints.

---

### 4. AI Usage
* **AI Tools Used:** I utilized an AI assistant during development to help scaffold the date calculation logic for shifting weeks backward and forward, and to double-check the logic for calculating consecutive daily streaks.
* **Specific Tweaks Made:** The initial AI-generated output for the weekly grid layout relied heavily on hardcoded pixel widths which completely broke responsiveness on smaller layouts. I discarded the fixed-width styling entirely and rewrote it using responsive CSS Grid tracking (`grid-template-columns`) and flexible fractional units so it scales dynamically across different devices.

---

### 5. Honest Gap
* **What isn't polished enough:** The data management layer is currently tied directly to browser `localStorage`. While it handles page reloads beautifully, it doesn't support multiple account profiles or syncing across separate devices.
* **What I would do with another day:** If given another 24 hours, I would refactor the storage logic to support a lightweight backend database (or mock database) and implement drag-and-drop reordering for habits so users can prioritize their list visually.
