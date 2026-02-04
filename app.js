let lastImageFile = null;

function generateDorks() {
  const query = document.getElementById("query").value.trim();
  const domain = document.getElementById("domain").value.trim();
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!query) {
    alert("Ingresa un texto a buscar");
    return;
  }

  const base = `"${query}"`;
  const site = domain ? ` site:${domain}` : "";

  const dorks = [
    `${base} site:facebook.com`,
    `${base} site:instagram.com`,
    `${base} site:linkedin.com`,
    `${base} filetype:pdf`,
    `${base} filetype:doc`,
    `${base} "curriculum" OR "cv"`,
    `site:pjud.cl ${base}`,
    `site:tribunales.cl ${base}`,
    `site:github.com ${base}`,
    `${base}${site}`
  ];

  dorks.forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    li.onclick = () => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(d)}`;
      window.open(url, "_blank");
    };
    results.appendChild(li);
  });
}

// --- BÚSQUEDA POR IMAGEN ---

document.getElementById("imageInput").addEventListener("change", e => {
  lastImageFile = e.target.files[0];
});

const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.style.background = "#163d2e";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "transparent";
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  lastImageFile = e.dataTransfer.files[0];
  dropZone.style.background = "transparent";
});

function openImageSearch(engine) {
  if (!lastImageFile) {
    alert("Selecciona o arrastra una imagen primero");
    return;
  }

  if (engine === "google") {
    window.open("https://images.google.com/", "_blank");
  }
  if (engine === "tineye") {
    window.open("https://tineye.com/", "_blank");
  }
  if (engine === "yandex") {
    window.open("https://yandex.com/images/", "_blank");
  }
}
