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

let zIndexCounter = 1;

/* ==========================
   PROJECTS WINDOW
   ========================== */
function openProjectsWindow() {
  const desktop = document.getElementById("desktopArea");
  const win = createWindow("Projects", "icons/folder.png");

  let content = `<div class="folder-content">
      <div class="sidebar"><ul>`;
  if (projectData["Videos"]) content += `<li onclick="openProjectFolder('Videos')">Videos</li>`;
  if (projectData["Graphics/Photography"]) content += `<li onclick="openProjectFolder('Graphics/Photography')">Graphics/Photography</li>`;
  if (projectData["Other"]) content += `<li onclick="openProjectFolder('Other')">Other</li>`;
  content += `</ul></div><div class="viewer"><p>Select a folder</p></div></div>`;

  win.querySelector(".window-content").innerHTML = content;
  desktop.appendChild(win);
}

/* Opens a folder window with sidebar + viewer */
function openProjectFolder(folderName) {
  const desktop = document.getElementById("desktopArea");
  const win = createWindow(folderName, "icons/folder.png");

  let itemsHtml = "";
  projectData[folderName].forEach((item, i) => {
    itemsHtml += `<li onclick="loadItem('${folderName}', ${i})">${item.title}</li>`;
  });

  win.querySelector(".window-content").innerHTML = `
    <div class="folder-content">
      <div class="sidebar"><ul>${itemsHtml}</ul></div>
      <div class="viewer" id="viewer-${folderName.replace(/\s+/g,'-')}">
        <p>Select an item</p>
      </div>
    </div>
  `;

  desktop.appendChild(win);
}

function loadItem(folderName, idx) {
  const viewer = document.getElementById(`viewer-${folderName.replace(/\s+/g,'-')}`);
  if (viewer) viewer.innerHTML = projectData[folderName][idx].content;
}

/* ==========================
   ABOUT ME (IE STYLE)
   ========================== */
function openAboutWindow() {
  const desktop = document.getElementById("desktopArea");
  const win = createWindow("About Me", "icons/ie.png");

  win.querySelector(".window-content").innerHTML = `
    <div class="ie-tabs">
      <div class="ie-tab active" onclick="switchIETab(this, 'hobbies')">Hobbies</div>
      <div class="ie-tab" onclick="switchIETab(this, 'favorites')">Favorites</div>
      <div class="ie-tab" onclick="switchIETab(this, 'music')">Music</div>
    </div>
    <div class="ie-content" id="ie-content">
      <p>This is my Hobbies section.</p>
    </div>
  `;

  desktop.appendChild(win);
}

function switchIETab(tabEl, section) {
  document.querySelectorAll(".ie-tab").forEach(t => t.classList.remove("active"));
  tabEl.classList.add("active");

  const content = document.getElementById("ie-content");
  if (section === "hobbies") content.innerHTML = `<p>This is my Hobbies section.</p>`;
  if (section === "favorites") content.innerHTML = `<p>Here are my Favorites.</p>`;
  if (section === "music") content.innerHTML = `<p>Here’s what I’m listening to.</p>`;
}

/* ==========================
   CONTACT (OUTLOOK STYLE)
   ========================== */
function openContactWindow() {
  const desktop = document.getElementById("desktopArea");
  const win = createWindow("Contact", "icons/outlook.png");

  win.querySelector(".window-content").innerHTML = `
    <div class="outlook-layout">
      <div class="outlook-sidebar">
        <ul>
          <li onclick="loadContactSection('inbox')">Inbox</li>
          <li onclick="loadContactSection('sent')">Sent</li>
          <li onclick="loadContactSection('drafts')">Drafts</li>
        </ul>
      </div>
      <div class="outlook-main" id="contact-main">
        <p>Select a folder</p>
      </div>
    </div>
  `;

  desktop.appendChild(win);
}

function loadContactSection(folder) {
  const main = document.getElementById("contact-main");
  if (folder === "inbox") main.innerHTML = `<p>Messages from people reaching out.</p>`;
  if (folder === "sent") main.innerHTML = `<p>Messages I’ve sent.</p>`;
  if (folder === "drafts") main.innerHTML = `<p>Drafts waiting to be finished.</p>`;
}

/* ==========================
   GENERIC WINDOW CREATOR
   ========================== */
function createWindow(title, iconPath) {
  const win = document.createElement("div");
  win.classList.add("window");
  win.style.left = Math.floor(Math.random()*200+100)+"px";
  win.style.top = Math.floor(Math.random()*100+80)+"px";
  win.style.zIndex = ++zIndexCounter;

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
  content.classList.add("window-content");

  // Controls
  titleBar.querySelector(".close-btn").addEventListener("click", ()=>win.remove());

  titleBar.querySelector(".minimize-btn").addEventListener("click", ()=>{
    win.style.display="none";
    createTaskbarButton(title, iconPath, win);
  });

  let maximized=false;
  let prev={};
  titleBar.querySelector(".maximize-btn").addEventListener("click", ()=>{
    if(!maximized){
      prev={top:win.style.top,left:win.style.left,width:win.style.width,height:win.style.height};
      win.style.top="0"; win.style.left="0";
      win.style.width="100%"; win.style.height="calc(100% - 40px)";
      maximized=true;
    } else {
      win.style.top=prev.top; win.style.left=prev.left;
      win.style.width=prev.width; win.style.height=prev.height;
      maximized=false;
    }
  });

  makeDraggable(win,titleBar);

  win.addEventListener("mousedown", ()=>win.style.zIndex=++zIndexCounter);

  win.appendChild(titleBar);
  win.appendChild(content);
  return win;
}

/* ==========================
   TASKBAR BUTTONS (ICONS ONLY)
   ========================== */
function createTaskbarButton(title, iconPath, win) {
  const taskbar = document.getElementById("taskbar");
  const btn = document.createElement("div");
  btn.classList.add("taskbar-button");
  btn.innerHTML = `<img src="${iconPath}" alt="${title}">`;
  btn.addEventListener("click", ()=>{
    win.style.display="flex";
    btn.remove();
  });
  taskbar.appendChild(btn);
}

/* ==========================
   DRAGGING WINDOWS
   ========================== */
function makeDraggable(win, handle) {
  let offsetX=0, offsetY=0, dragging=false;

  handle.addEventListener("mousedown", (e)=>{
    dragging=true;
    offsetX=e.clientX - win.offsetLeft;
    offsetY=e.clientY - win.offsetTop;
    document.addEventListener("mousemove",move);
    document.addEventListener("mouseup",up);
  });

  function move(e){
    if(dragging){
      win.style.left=(e.clientX-offsetX)+"px";
      win.style.top=(e.clientY-offsetY)+"px";
    }
  }
  function up(){
    dragging=false;
    document.removeEventListener("mousemove",move);
    document.removeEventListener("mouseup",up);
  }
}
