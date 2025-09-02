// =============================
// Clipflow Script
// =============================

// -----------------------------
// Footer year
// -----------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// -----------------------------
// Dark mode toggle (remembers choice)
// -----------------------------
const toggle = document.getElementById('modeToggle');
const saved = localStorage.getItem('mode');
if (saved === 'light') {
  document.documentElement.classList.add('light');
}
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem(
    'mode',
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  );
});

// Light theme overrides (auto-injected CSS)
const style = document.createElement('style');
style.textContent = `
  .light body { background:#f6f8fb; color:#0b0c10 }
  .light .site-header { background: rgba(255,255,255,.7); border-bottom:1px solid rgba(0,0,0,.08) }
  .light .card { background:white; border-color: rgba(0,0,0,.08) }
  .light input, .light textarea { background:white; color:#0b0c10; border-color: rgba(0,0,0,.15) }
`;
document.head.appendChild(style);

// -----------------------------
// Contact form (connects to backend/n8n webhook)
// -----------------------------
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = 'Sending...';
    const data = Object.fromEntries(new FormData(form).entries());

    // Replace with your own endpoint in <form action="">
    const endpoint = form.getAttribute('action');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      msg.textContent = 'Thanks! We will email you soon.';
    } catch (err) {
      console.error(err);
      msg.textContent = 'Could not send. Try again or email us.';
    }
  });
}

// -----------------------------
// Workflow Builder (Clipflow Core)
// -----------------------------
const startBtn = document.getElementById("startBtn");
const workflowCanvas = document.getElementById("workflowCanvas");

let stepCount = 0;
let draggedElement = null;

// Create workflow step
function createWorkflowStep() {
  stepCount++;

  const step = document.createElement("div");
  step.className = "workflow-step";
  step.draggable = true;
  step.innerHTML = `
    <span>Step ${stepCount}</span>
    <button class="delete-btn">✖</button>
  `;

  // Drag functionality
  step.addEventListener("dragstart", handleDragStart);
  step.addEventListener("dragover", handleDragOver);
  step.addEventListener("drop", handleDrop);

  // Delete functionality
  step.querySelector(".delete-btn").addEventListener("click", () => {
    step.remove();
  });

  workflowCanvas.appendChild(step);
}

// Drag handlers
function handleDragStart(e) {
  draggedElement = this;
  setTimeout(() => (this.style.display = "none"), 0);
}
function handleDragOver(e) {
  e.preventDefault();
}
function handleDrop(e) {
  e.preventDefault();
  this.style.display = "flex";
  if (this !== draggedElement) {
    this.parentNode.insertBefore(draggedElement, this);
  }
}
document.addEventListener("dragend", () => {
  if (draggedElement) draggedElement.style.display = "flex";
  draggedElement = null;
});

// Start button
if (startBtn) {
  startBtn.addEventListener("click", () => {
    createWorkflowStep();
  });
}
