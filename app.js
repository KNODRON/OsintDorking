function setQuery(value) {
  document.getElementById("query").value = value;
}

function generateDorks() {
  const query = document.getElementById("query").value.trim();
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!query) {
    alert("Ingresa un texto");
    return;
  }

  const Q = `"${query}"`;

  const templates = [
    `${Q} site:facebook.com`,
    `${Q} site:instagram.com`,
    `${Q} site:linkedin.com`,
    `${Q} filetype:pdf`,
    `${Q} filetype:doc`,
    `${Q} "curriculum"`,
    `${Q} "denuncia"`,
    `${Q} site:biobiochile.cl`,
    `${Q} site:emol.com`,
    `${Q} site:reddit.com`
  ];

  templates.forEach((d, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${d}`;
    li.onclick = () => {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(d)}`);
    };
    results.appendChild(li);
  });
}
