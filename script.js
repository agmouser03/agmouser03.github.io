/* ==========================
   PROJECT DATA
   ========================== */
const projectData = {
  "Videos": [
    { title: "Demo Reel", content: `<iframe width="100%" height="200" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen></iframe>` },
    { title: "Short Film", content: `<p>Description or embedded video for Short Film</p>` }
  ],
  "Graphics/Photography": [
    { title: "Poster Design", content: `<img src="images/poster.png" style="max-width:100%;">` },
    { title: "Photo Series", content: `<img src="images/photo1.jpg" style="max-width:100%;">` }
  ],
  "Other": [
    { title: "Web App", content: `<p>Screenshot and link to live demo</p>` },
    { title: "Writing Sample", content: `<p>Excerpt or link to PDF</p>` }
  ]
};

let zIndexCounter = 10;

/* ==========================
   HELPER: Draggable
   ========================== */
function makeDraggable(win, handle) {
  let offsetX = 0, offsetY = 0, isDown = false;

  handle.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = ++zIndexCounter;
  });

  document.addEventListener("mouseup", () => isDown = false);
  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
  });
}

/* ==========================
   TASKBAR ICON
   ========================== */
function createTaskbarButton(iconSrc, windowEl) {
  const taskbarIcons = document.getElementById("taskbar-icons");
  const icon = document.createElement("div");
  icon.classList.add("taskbar-icon");
  icon.innerHTML = `<img src="${iconSrc}" alt="icon">`;

  icon.addEventListener("click", () => {
    if (windowEl.style.display === "none") {
      windowEl.style.display = "flex";
      windowEl.style.zIndex = ++zIndexCounter;
    } else {
      windowEl.style.display = "none";
    }
  });

  taskbarIcons.appendChild(icon);
}

/* ==========================
   GENERIC WINDOW CREATOR
   ========================== */
function createWindow(title, contentHTML, iconSrc) {
  const desktopArea = document.getElementById("desktopArea");
  const win = document.createElement("div");
  win.classList.add("window");
  win.style.left = Math.floor(Math.random() * 200 + 120) + "px";
  win.style.top = Math.floor(Math.random() * 120 + 100) + "px";
  win.style.zIndex = ++zIndexCounter;

  // Title Bar
  const titleBar = document.createElement("div");
  titleBar.classList.add("title-bar");
  titleBar.innerHTML = `
    <span>${title}</span>
    <div class="title-buttons">
      <div class="title-button minimize-btn">_</div>
      <div class="title-button maximize-btn">□</div>
      <div class="title-button close-btn">X</div>
    </div>
  `;

  const content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = contentHTML;

  // Window controls
  titleBar.querySelector(".close-btn").addEventListener("click", () => win.remove());
  titleBar.querySelector(".minimize-btn").addEventListener("click", () => {
    win.style.display = "none";
    createTaskbarButton(iconSrc, win);
  });

  let isMaximized = false;
  let prevPos = {};
  titleBar.querySelector(".maximize-btn").addEventListener("click", () => {
    if (!isMaximized) {
      prevPos = { top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height };
      win.style.top = "0px";
      win.style.left = "0px";
      win.style.width = "100%";
      win.style.height = "calc(100% - 40px)";
      isMaximized = true;
    } else {
      win.style.top = prevPos.top;
      win.style.left = prevPos.left;
      win.style.width = prevPos.width;
      win.style.height = prevPos.height;
      isMaximized = false;
    }
  });

  makeDraggable(win, titleBar);
  win.addEventListener("mousedown", () => win.style.zIndex = ++zIndexCounter);

  win.appendChild(titleBar);
  win.appendChild(content);
  desktopArea.appendChild(win);

  return win;
}

/* ==========================
   PROJECTS WINDOW
   ========================== */
function openProjectsWindow() {
  const desktopArea = document.getElementById("desktopArea");
  const win = document.createElement("div");
  win.classList.add("window");
  win.style.left = "150px";
  win.style.top = "100px";
  win.style.zIndex = ++zIndexCounter;

  const titleBar = document.createElement("div");
  titleBar.classList.add("title-bar");
  titleBar.innerHTML = `
    <span>Projects</span>
    <div class="title-buttons">
      <div class="title-button minimize-btn">_</div>
      <div class="title-button maximize-btn">□</div>
      <div class="title-button close-btn">X</div>
    </div>
  `;

  let foldersHtml = "";
  for (let folder in projectData) {
    foldersHtml += `<li onclick="openProjectFolder('${folder}')">${folder}</li>`;
  }

  const content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = `
    <div class="sidebar">
      <ul>${foldersHtml}</ul>
    </div>
    <div class="viewer"><p>Select a folder to view projects</p></div>
  `;

  // controls
  titleBar.querySelector(".close-btn").addEventListener("click", () => win.remove());
  titleBar.querySelector(".minimize-btn").addEventListener("click", () => {
    win.style.display = "none";
    createTaskbarButton("icons/projects.png", win);
  });

  let isMaximized = false;
  let prevPos = {};
  titleBar.querySelector(".maximize-btn").addEventListener("click", () => {
    if (!isMaximized) {
      prevPos = { top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height };
      win.style.top = "0px";
      win.style.left = "0px";
      win.style.width = "100%";
      win.style.height = "calc(100% - 40px)";
      isMaximized = true;
    } else {
      win.style.top = prevPos.top;
      win.style.left = prevPos.left;
      win.style.width = prevPos.width;
      win.style.height = prevPos.height;
      isMaximized = false;
    }
  });

  makeDraggable(win, titleBar);
  win.addEventListener("mousedown", () => win.style.zIndex = ++zIndexCounter);

  win.appendChild(titleBar);
  win.appendChild(content);
  desktopArea.appendChild(win);
}

/* ==========================
   OPEN PROJECT FOLDER
   ========================== */
function openProjectFolder(folderName) {
  const desktopArea = document.getElementById("desktopArea");
  const win = document.createElement("div");
  win.classList.add("window");
  win.style.left = Math.floor(Math.random() * 200 + 120) + "px";
  win.style.top = Math.floor(Math.random() * 120 + 100) + "px";
  win.style.zIndex = ++zIndexCounter;

  const titleBar = document.createElement("div");
  titleBar.classList.add("title-bar");
  titleBar.innerHTML = `
    <span>${folderName}</span>
    <div class="title-buttons">
      <div class="title-button minimize-btn">_</div>
      <div class="title-button maximize-btn">□</div>
      <div class="title-button close-btn">X</div>
    </div>
  `;

  let itemsHtml = "";
  if (projectData[folderName]) {
    projectData[folderName].forEach((item, idx) => {
      itemsHtml += `<li onclick="loadItem('${folderName}', ${idx})">${item.title}</li>`;
    });
  }

  const content = document.createElement("div");
  content.classList.add("folder-content");
  content.innerHTML = `
    <div class="sidebar">
      <ul>${itemsHtml}</ul>
    </div>
    <div class="viewer" id="viewer-${folderName.replace(/\s+/g, '-')}">
      <p>Select an item to view</p>
    </div>
  `;

  // controls
  titleBar.querySelector(".close-btn").addEventListener("click", () => win.remove());
  titleBar.querySelector(".minimize-btn").addEventListener("click", () => {
    win.style.display = "none";
    createTaskbarButton("icons/projects.png", win);
  });

  let isMaximized = false;
  let prevPos = {};
  titleBar.querySelector(".maximize-btn").addEventListener("click", () => {
    if (!isMaximized) {
      prevPos = { top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height };
      win.style.top = "0px";
      win.style.left = "0px";
      win.style.width = "100%";
      win.style.height = "calc(100% - 40px)";
      isMaximized = true;
    } else {
      win.style.top = prevPos.top;
      win.style.left = prevPos.left;
      win.style.width = prevPos.width;
      win.style.height = prevPos.height;
      isMaximized = false;
    }
  });

  makeDraggable(win, titleBar);
  win.addEventListener("mousedown", () => win.style.zIndex = ++zIndexCounter);

  win.appendChild(titleBar);
  win.appendChild(content);
  desktopArea.appendChild(win);
}

/* ==========================
   LOA

