let zIndexCounter = 10; // ensures active windows come to front

/* =======================
   OPEN NEW WINDOW
   ======================= */
function openWindow(page) {
  const desktopArea = document.getElementById("desktopArea");

  // Create a window container
  const windowEl = document.createElement("div");
  windowEl.classList.add("window");
  windowEl.style.left = Math.floor(Math.random() * 200 + 100) + "px";
  windowEl.style.top = Math.floor(Math.random() * 150 + 80) + "px";
  windowEl.style.zIndex = ++zIndexCounter;

  // Title bar with controls
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

  // Content
  const content = document.createElement("div");
  content.classList.add("content");

  // Different content per page
  if (page === "About Me") {
    content.innerHTML = `<h2>About Me</h2><p>This is where your bio goes.</p>`;
  } else if (page === "Projects") {
    content.innerHTML = `<h2>Projects</h2><p>Showcase your work here.</p>`;
  } else if (page === "Contact") {
    content.innerHTML = `<h2>Contact</h2><p>Email: you@example.com</p>`;
  }

  /* =======================
     BUTTON HANDLERS
     ======================= */
  // Close button
  titleBar.querySelector(".close-btn").addEventListener("click", () => {
    windowEl.remove();
  });

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
     WINDOW BEHAVIOR
     ======================= */
  makeDraggable(windowEl, titleBar);

  // Bring window to front when clicked
  windowEl.addEventListener("mousedown", () => {
    windowEl.style.zIndex = ++zIndexCounter;
  });

  // Assemble window
  windowEl.appendChild(titleBar);
  windowEl.appendChild(content);
  desktopArea.appendChild(windowEl);
}

/* =======================
   DRAGGING LOGIC
   ======================= */
function makeDraggable(windowEl, titleBar) {
  let isDragging = false;
  let offsetX, offsetY;

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    windowEl.style.zIndex = ++zIndexCounter; // bring to front
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
}

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

