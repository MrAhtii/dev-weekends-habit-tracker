# Frontend Assessment Answers — Habit Tracker

### 1. How to Run
* **Local Setup:** This project is built using native browser technologies. Download or clone this repository, navigate into the root directory, and open `index.html` directly in any modern web browser. No installation or build steps are required.
* **Deployment URL:** [https://mrahtii.github.io/dev-weekends-habit-tracker/]

---

### 2. Stack & Design Choices 
* **Stack Choice:** I built this application using **Vanilla HTML5, CSS3, and modern JavaScript (ES6+)**. By avoiding heavy frameworks, the app loads instantly, runs with zero dependencies, and manipulates the DOM dynamically using native Web APIs.
* **Design Decision 1 (Visual):** I implemented a clear **Today Highlight mechanism** (`.grid-col-today`). In JavaScript, the application checks if the rendered date matches the exact string representation of `new Date()`. When it matches, a custom class is appended to inject a distinctive translucent red background (`var(--today-highlight)`), giving the user an immediate focal point for the current day.
* **Design Decision 2 (Interaction):** I chose to design custom interaction points for the habit checkboxes instead of standard browser input elements. They are rounded `div` elements that animate smoothly via CSS transitions (`transition: all 0.2s`). Clicking a checkbox dynamically triggers `toggleHabit()`, altering the completion state in a lookup dictionary, updating the streak calculations instantly, and syncing data silently behind the scenes.

---

### 3. Responsive & Accessibility
* **Responsiveness:** On a wide laptop viewport ($1440\text{px}$), the grid uses a clean layout structure managed via CSS Grid: `grid-template-columns: 200px repeat(7, 1fr);`. On mobile viewports ($360\text{px}$), the explicit $200\text{px}$ column for habit names combined with fixed column gaps creates a horizontal squishing hazard. The container uses `flex-wrap: wrap` for controls to mitigate wrapping breaks, but the 8-column layout remains rigid.
* **Accessibility Feature Handled:** I used semantic HTML `<button>` elements for all week-shifting controls (`#prevWeek`, `#nextWeek`, `#todayBtn`) and the primary addition form. This guarantees that basic browser focus tracking and default keyboard trigger mechanics work automatically out of the box.
* **Knowingly Skipped Feature:** The daily tracking checkboxes are dynamically rendered interactive `div` containers with an `onclick` hook. I skipped adding explicit keyboard tab indexes (`tabindex="0"`) and ARIA roles (`role="checkbox"`, `aria-checked`) to these custom grid intersections, meaning they are currently not natively navigable via a keyboard-only setup.

---

### 4. AI Usage
* **AI Tools Used:** I used an AI assistant to scaffold the consecutive calendar streak math and formulate the initial grid tracking loop logic.
* **Specific Tweaks Made:** The initial AI output provided a generic streak calculator that didn't align cleanly with my key formatting approach (`toDateString()`). I modified the code to implement a precise `while (true)` loop inside `getStreak()`. It steps back day-by-day using explicit hour clearing (`d.setHours(0, 0, 0, 0);`) and verifies completions directly against my `completions` state object, breaking immediately when a streak chain terminates.

### 5. Honest Gap
* **What isn't polished enough:** The responsive scalability on narrow mobile environments is a major gap. Because `grid-template-columns` locks the layout into a minimum width layout of $200\text{px}$ plus 7 columns, text overlapping or clipping will occur on extremely narrow $360\text{px}$ mobile viewports.
* **What I would do with another day:** Given another day, I would rewrite the CSS Grid layout using standard media queries. On screens smaller than $600\text{px}$, I would alter the axis alignment entirely, switching from a weekly grid matrix to a single-day focus view or a vertical stack cards interface.
