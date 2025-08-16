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

 // Title bar
const titleBar = document.createElement("div");
titleBar.classList.add("title-bar");
titleBar.innerHTML = `
  <span>${page} - Portfolio</span>
  <div class="title-buttons">
    <div class="title-button minimize-btn">_</div>
    <div class="title-button maximize-btn">□</div>
    <div class="title-button close-btn">X</div>
  </div>
`;
// Minimize button
const minimizeBtn = titleBar.querySelector(".minimize-btn");
minimizeBtn.addEventListener("click", () => {
  windowEl.style.display = "none"; // hide window
  createTaskbarButton(page, windowEl);
});

// Maximize / Restore button
const maximizeBtn = titleBar.querySelector(".maximize-btn");
let isMaximized = false;
let prevPos = { top: "", left: "", width: "", height: "" };

maximizeBtn.addEventListener("click", () => {
  if (!isMaximized) {
    // Save old position/size
    prevPos = {
      top: windowEl.style.top,
      left: windowEl.style.left,
      width: windowEl.style.width,
      height: windowEl.style.height
    };
    // Expand to full screen (minus taskbar)
    windowEl.style.top = "0px";
    windowEl.style.left = "0px";
    windowEl.style.width = "100%";
    windowEl.style.height = "calc(100% - 40px)";
    isMaximized = true;
  } else {
    // Restore old size
    windowEl.style.top = prevPos.top;
    windowEl.style.left = prevPos.left;
    windowEl.style.width = prevPos.width;
    windowEl.style.height = prevPos.height;
    isMaximized = false;
  }
});
/* =======================
   TASKBAR BUTTON HANDLER
   ======================= */
function createTaskbarButton(page, windowEl) {
  const taskbar = document.getElementById("taskbar");

  // Create taskbar button
  const btn = document.createElement("button");
  btn.classList.add("taskbar-btn");
  btn.textContent = page;

  btn.addEventListener("click", () => {
    if (windowEl.style.display === "none") {
      windowEl.style.display = "block";
      windowEl.style.zIndex = ++zIndexCounter;
    } else {
      windowEl.style.display = "none";
    }
  });

  // Remove taskbar button when window is closed
  windowEl.addEventListener("DOMNodeRemoved", () => {
    btn.remove();
  });

  taskbar.appendChild(btn);
}

  }
}

