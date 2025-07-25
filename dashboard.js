// === Sidebar Toggle ===
const menuToggle = document.getElementById("menuToggle");
const sidebarMenu = document.getElementById("sidebarMenu");

menuToggle.addEventListener("click", () => {
  sidebarMenu.classList.toggle("hidden");
});

// === Profile Modal Toggle ===
const profileBtn = document.getElementById("profileBtn");
const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");

profileBtn.addEventListener("click", () => {
  profileModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  profileModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === profileModal) {
    profileModal.style.display = "none";
  }
});

// === Task + Calendar Panel ===
document.addEventListener("DOMContentLoaded", () => {
  const upcomingTasks = [
    { title: "Math Assignment", date: "2025-07-28", description: "Complete Algebra worksheet and submit online." },
    { title: "Science Project", date: "2025-07-30", description: "Build a working model for Grade 10 Physics." },
    { title: "Online Exam", date: "2025-08-01", description: "Biology Chapter 3 & 4 online MCQ exam." },
    { title: "Submit Notes", date: "2025-08-03", description: "Upload handwritten notes to the LMS portal." },
    { title: "Teacher Review Meeting", date: "2025-08-04", description: "Parent-teacher Zoom session at 6PM." },
  ];

  // Create panel
  const panel = document.createElement("div");
  panel.className = "task-calendar-panel";

  const title = document.createElement("h3");
  title.textContent = "Upcoming Tasks";
  panel.appendChild(title);

  const list = document.createElement("ul");
  list.className = "task-list";

  upcomingTasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `${task.title} <span>${new Date(task.date).toLocaleDateString()}</span>`;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => showPopup(task));
    list.appendChild(li);
  });

  panel.appendChild(list);

  const calendar = document.createElement("div");
  calendar.className = "calendar";
  panel.appendChild(calendar);

  document.body.appendChild(panel);

  renderSimpleCalendar(calendar, upcomingTasks);
  createPopupModal();
});

// === Task Detail Popup ===
function createPopupModal() {
  const modal = document.createElement("div");
  modal.id = "taskDetailPopup";
  modal.style.cssText = `
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.5); display:none; align-items:center;
    justify-content:center; z-index:99999;`;

  const box = document.createElement("div");
  box.style.cssText = `
    background:#fff; padding:25px; border-radius:12px; max-width:400px;
    width:90%; position:relative; box-shadow:0 4px 12px rgba(0,0,0,0.2);`;

  box.innerHTML = `
    <button id="closeTaskPopup" style="
      position:absolute; top:10px; right:10px;
      background:none; border:none; font-size:22px; cursor:pointer;">&times;</button>
    <h3 id="popupTitle" style="margin-top:0; color:#e67e22;"></h3>
    <p id="popupDate" style="font-size:14px; color:#666;"></p>
    <p id="popupDesc" style="margin-top:10px;"></p>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  document.getElementById("closeTaskPopup").onclick = () => {
    modal.style.display = "none";
  };
}

// Open the popup with task info
function showPopup(task) {
  const modal = document.getElementById("taskDetailPopup");
  document.getElementById("popupTitle").textContent = task.title;
  document.getElementById("popupDate").textContent = `Due: ${new Date(task.date).toLocaleDateString()}`;
  document.getElementById("popupDesc").textContent = task.description;
  modal.style.display = "flex";
}

// === Calendar Rendering ===
function renderSimpleCalendar(container, tasks) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const taskDatesMap = {};
  tasks.forEach(t => {
    if (!taskDatesMap[t.date]) taskDatesMap[t.date] = [];
    taskDatesMap[t.date].push(t);
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  container.innerHTML = `<header>${monthNames[month]} ${year}</header>
    <table>
      <thead><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr></thead>
      <tbody></tbody>
    </table>`;

  const tbody = container.querySelector("tbody");
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (day > daysInMonth) {
        cell.textContent = "";
      } else {
        cell.textContent = day;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (dateStr === new Date().toISOString().slice(0, 10)) {
          cell.classList.add("today");
        }

        if (taskDatesMap[dateStr]) {
          cell.classList.add("task-date");
          cell.style.cursor = "pointer";

          cell.addEventListener("click", () => {
            // If multiple tasks on same date, show all
            const dateTasks = taskDatesMap[dateStr];
            if (dateTasks.length === 1) {
              showPopup(dateTasks[0]);
            } else {
              showMultipleTaskPopup(dateStr, dateTasks);
            }
          });
        }

        day++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
    if (day > daysInMonth) break;
  }
}

// === If multiple tasks on same calendar date ===
function showMultipleTaskPopup(dateStr, taskList) {
  const modal = document.getElementById("taskDetailPopup");
  const title = document.getElementById("popupTitle");
  const date = document.getElementById("popupDate");
  const desc = document.getElementById("popupDesc");

  title.textContent = `Tasks on ${new Date(dateStr).toLocaleDateString()}`;
  date.textContent = "";
  desc.innerHTML = taskList.map(task =>
    `<b>${task.title}</b><br><small>${task.description}</small><br><br>`
  ).join("");

  modal.style.display = "flex";
}
