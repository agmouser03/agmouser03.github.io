/* =======================
   DRAGGABLE WINDOW LOGIC
   ======================= */
const windowEl = document.getElementById("window");
const titleBar = document.getElementById("titleBar");
let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    windowEl.style.left = (e.clientX - offsetX) + "px";
    windowEl.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

/* =======================
   PAGE CONTENT HANDLER
   ======================= */
function openWindow(page) {
  const title = document.getElementById("windowTitle");
  const content = document.getElementById("windowContent");
  
  // Change window title
  title.textContent = page + " - Portfolio";

  // Load content for each page
  if (page === "About Me") {
    content.innerHTML = `
      <h2>About Me</h2>
      <p>This is where your bio or personal intro will go.</p>
    `;
  } else if (page === "Projects") {
    content.innerHTML = `
      <h2>Projects</h2>
      <p>Showcase your work here with links, screenshots, or descriptions.</p>
    `;
  } else if (page === "Contact") {
    content.innerHTML = `
      <h2>Contact</h2>
      <p>Email: you@example.com</p>
      <p>Or add social media links here.</p>
    `;
  }
}

