// Get elements
const projectLinks = document.querySelectorAll(".project-link");
const projectDisplay = document.getElementById("project-display");

// Fake project data
const projects = {
  p1: {
    title: "Project One",
    desc: "This is my very first retro-inspired project. It mixes early 2000s web design with modern code!"
  },
  p2: {
    title: "Project Two",
    desc: "This project is all about animations, glitter GIFs, and bright Y2K colors."
  },
  p3: {
    title: "Project Three",
    desc: "A throwback to classic Flash-era games and funky layouts."
  },
  p4: {
    title: "Project Four",
    desc: "A personal favorite: retro gradients, comic fonts, and clunky buttons that scream nostalgia."
  }
};

// Add click listeners
projectLinks.forEach(link => {
  link.addEventListener("click", () => {
    const project = projects[link.dataset.project];
    projectDisplay.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.desc}</p>
    `;
  });
});
