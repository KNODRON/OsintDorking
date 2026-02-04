function generateDorks() {
  const query = document.getElementById("query").value.trim();
  const domain = document.getElementById("domain").value.trim();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!query) {
    alert("Ingresa un texto a buscar");
    return;
  }

  const Q = `"${query}"`;
  const SITE = domain ? ` site:${domain}` : "";

  let templates = [];

  // =========================
  // MODO OS9 CHILE
  // =========================
  if (mode === "os9") {
    templates = [
      // Institucional Chile
      `site:pjud.cl ${Q}`,
      `site:tribunales.cl ${Q}`,
      `site:chileatiende.gob.cl ${Q}`,
      `site:serviciomigraciones.cl ${Q}`,
      `site:extranjeria.gob.cl ${Q}`,
      `site:registrocivil.cl ${Q}`,
      `site:diariooficial.interior.gob.cl ${Q}`,
      `site:contraloria.cl ${Q}`,
      `site:municipalidad.cl ${Q}`,

      // Documentos
      `${Q} filetype:pdf site:.cl`,
      `${Q} filetype:doc OR filetype:docx site:.cl`,
      `${Q} filetype:xls OR filetype:xlsx site:.cl`,
      `${Q} ("informe" OR "expediente" OR "resolución") filetype:pdf`,
      `${Q} ("orden de detención" OR "detenido")`,
      `${Q} (intitle:denuncia OR intitle:detenido)`,

      // Datos sensibles (criterio analítico)
      `${Q} ("RUT" OR "rut")`,
      `${Q} ("fecha de nacimiento")`,
      `${Q} ("pasaporte" OR "cédula")`,
      `${Q} ("domicilio" OR "dirección")`,

      // Prensa y comunicados
      `${Q} site:biobiochile.cl`,
      `${Q} site:emol.com`,
      `${Q} site:latercera.com`,
      `${Q} site:soychile.cl`,
      `${Q} ("comunicado" OR "informe") site:.cl`,

      // Contratos / trabajo
      `${Q} ("contrato" OR "licitación") site:.cl`,
      `${Q} ("trabajo" OR "empleo") site:.cl`,

      // Dominio específico
      `${Q}${SITE}`,
      `site:${domain || "example.cl"} ${Q} filetype:pdf`,
      `site:${domain || "example.cl"} ${Q} (intitle:login OR inurl:admin)`
    ];
  }

  // =========================
  // MODO OSINT GLOBAL
  // =========================
  if (mode === "global") {
    templates = [
      // Redes sociales
      `${Q} site:facebook.com`,
      `${Q} site:instagram.com`,
      `${Q} site:linkedin.com`,
      `${Q} site:x.com OR site:twitter.com`,
      `${Q} site:tiktok.com`,
      `${Q} site:youtube.com`,
      `${Q} site:reddit.com`,
      `${Q} site:telegram.org`,
      `${Q} site:vk.com`,

      // Blogs / foros
      `${Q} site:medium.com`,
      `${Q} inurl:blog OR inurl:post`,
      `${Q} site:wordpress.com`,
      `${Q} site:blogspot.com`,

      // Técnica / repositorios
      `${Q} site:github.com`,
      `${Q} site:gitlab.com`,
      `${Q} site:pastebin.com`,
      `${Q} site:archive.org`,

      // Documentos
      `${Q} filetype:pdf`,
      `${Q} filetype:doc OR filetype:docx`,
      `${Q} filetype:xls OR filetype:xlsx`,
      `${Q} filetype:txt`,

      // CV / perfil
      `${Q} ("curriculum" OR "cv" OR "resume")`,
      `${Q} (intitle:curriculum OR intitle:cv)`,

      // Contacto
      `${Q} ("@gmail.com" OR "@hotmail.com" OR "@outlook.com")`,
      `${Q} ("tel" OR "phone" OR "+56")`,
      `${Q} (intitle:contact OR inurl:contact)`,

      // Multimedia
      `${Q} ("foto" OR "imagen")`,
      `${Q} site:flickr.com`,
      `${Q} site:pinterest.com`,

      // Dominio específico
      `${Q}${SITE}`,
      `site:${domain || "example.com"} ${Q}`
    ];
  }

  // Limitar a ~45 dorks
  const dorks = templates.slice(0, 45);

  dorks.forEach((d, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${d}`;
    li.title = "Clic para buscar en Google";
    li.onclick = () => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(d)}`;
      window.open(url, "_blank", "noopener");
      li.classList.add("visited");
    };

    results.appendChild(li);
  });
}
