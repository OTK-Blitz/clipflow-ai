// Clipflow basic interactivity

const startBtn = document.getElementById("startBtn");
const workflowCanvas = document.getElementById("workflowCanvas");

startBtn.addEventListener("click", () => {
  workflowCanvas.innerHTML = "<p>✨ Workflow builder launching soon...</p>";
});
