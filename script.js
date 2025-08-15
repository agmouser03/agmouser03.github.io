/* ===== Reset ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== Body ===== */
body {
  font-family: "Comic Sans MS", "Trebuchet MS", sans-serif;
  background: linear-gradient(135deg, #7ee8fa, #eec0c6);
  color: #222;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ===== Navbar ===== */
header {
  background: #ffcc33;
  border-bottom: 4px solid #ff6699;
  padding: 12px 0;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-btn {
  background: #ff6699;
  color: white;
  border: 2px solid #663399;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
}
.nav-btn:hover {
  background: #ffcc33;
  color: #222;
}

/* ===== Folder Layout ===== */
main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}

/* Manila folder container */
.folder {
  width: 80%;
  max-width: 900px;
  background: #fdf1d6; /* manila color */
  border: 4px solid #d4b483;
  border-radius: 12px;
  box-shadow: 6px 6px 0px #663399;
  position: relative;
  padding-top: 40px; /* space for tab */
}

/* Folder tab */
.folder-tab {
  position: absolute;
  top: -30px;
  left: 30px;
  background: #fdf1d6;
  border: 4px solid #d4b483;
  border-bottom: none;
  padding: 10px 25px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: bold;
  color: #663399;
  box-shadow: 4px -2px 0px #663399;
}

/* Inside the folder */
.folder-content {
  padding: 20px;
  background: white;
  border-radius: 6px;
  border: 2px dashed #cc99ff;
  min-height: 300px;
}

/* ===== Footer ===== */
footer {
  background: #ffcc33;
  border-top: 4px solid #ff6699;
  text-align: center;
  padding: 12px;
  font-size: 0.9rem;
}

