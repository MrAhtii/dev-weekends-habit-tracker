let habits = JSON.parse(localStorage.getItem("habits")) || [];
let completions = JSON.parse(localStorage.getItem("completions")) || {};
let currentWeekStart = getMonday(new Date());

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function formatDate(date) {
  return date.toDateString();
}

function getStreak(habitId) {
  let streak = 0;
  let d = new Date();
  d.setHours(0, 0, 0, 0);

  if (completions[formatDate(d)]?.includes(habitId)) {
    streak++;
  }

  while (true) {
    d.setDate(d.getDate() - 1);
    if (completions[formatDate(d)]?.includes(habitId)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function render() {
  const grid = document.getElementById("habitGrid");
  grid.innerHTML = "";

  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  document.getElementById("currentWeekLabel").innerText =
    `${currentWeekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const datesInWeek = [];

  for (let i = 0; i < 7; i++) {
    let d = new Date(currentWeekStart);
    d.setDate(d.getDate() + i);
    datesInWeek.push(formatDate(d));

    const header = document.createElement("div");
    header.className = "grid-header";

    const isToday = formatDate(d) === formatDate(new Date());
    if (isToday) header.classList.add("grid-col-today");

    header.innerText = `${days[i]}\n${d.getDate()}`;
    grid.appendChild(header);
  }

  if (habits.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerText = "No habits yet. Add one above!";
    empty.style.gridColumn = "1 / -1";
    grid.appendChild(empty);
    return;
  }

  habits.forEach((habit) => {
    const nameCell = document.createElement("div");
    nameCell.className = "habit-name-cell";

    const streak = getStreak(habit.id);

    nameCell.innerHTML = `
            <span class="habit-name" onclick="renameHabit(${habit.id})" title="Click to rename">${habit.name}</span>
            <span class="streak-badge">🔥 ${streak}</span>
            <span class="icon-text" onclick="renameHabit(${habit.id})" title="Rename">✏️</span>
            <span class="icon-text" onclick="deleteHabit(${habit.id})" title="Delete">×</span>
        `;
    grid.appendChild(nameCell);

    datesInWeek.forEach((dateStr) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";

      const isToday = dateStr === formatDate(new Date());
      if (isToday) cell.classList.add("grid-col-today");

      const checkbox = document.createElement("div");
      checkbox.className = `checkbox ${completions[dateStr]?.includes(habit.id) ? "checked" : ""}`;
      checkbox.onclick = () => toggleHabit(habit.id, dateStr);

      cell.appendChild(checkbox);
      grid.appendChild(cell);
    });
  });
}

function toggleHabit(habitId, dateStr) {
  if (!completions[dateStr]) completions[dateStr] = [];

  const index = completions[dateStr].indexOf(habitId);
  if (index > -1) {
    completions[dateStr].splice(index, 1);
  } else {
    completions[dateStr].push(habitId);
  }
  saveData();
  render();
}

function renameHabit(id) {
  const habit = habits.find((h) => h.id === id);
  if (!habit) return;

  const newName = prompt("Rename your habit:", habit.name);
  if (newName && newName.trim() !== "") {
    habit.name = newName.trim();
    saveData();
    render();
  }
}

function deleteHabit(id) {
  if (confirm("Delete this habit?")) {
    habits = habits.filter((h) => h.id !== id);
    saveData();
    render();
  }
}

function saveData() {
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("completions", JSON.stringify(completions));
}
document.getElementById("addHabitBtn").onclick = () => {
  const input = document.getElementById("newHabitInput");
  if (input.value.trim()) {
    habits.push({ id: Date.now(), name: input.value });
    input.value = "";
    saveData();
    render();
  }
};

document.getElementById("prevWeek").onclick = () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  render();
};

document.getElementById("nextWeek").onclick = () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  render();
};

document.getElementById("todayBtn").onclick = () => {
  currentWeekStart = getMonday(new Date());
  render();
};

render();
