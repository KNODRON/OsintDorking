function sanitizeDomain(raw) {
  if (!raw) return "";

  let d = raw.split(/[,;\n ]+/g)[0].trim();
  if (!d) return "";

  d = d.replace(/^https?:\/\//i, "");
  d = d.replace(/^www\./i, "");
  d = d.replace(/\/.*$/, "");
  d = d.replace(/[^\w.-]+$/g, "");

  return d;
}

function openCites() {
  window.open("https://cites.org/esp", "_blank", "noopener");
}

function openSpeciesPlus() {
  window.open("https://www.speciesplus.net/", "_blank", "noopener");
}

function generateDorks() {
  const query = document.getElementById("query").value.trim();
  const domainInput = document.getElementById("domain").value.trim();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!query) {
    alert("Ingresa un texto a buscar");
    return;
  }

  const Q = `"${query}"`;
  const domain = sanitizeDomain(domainInput);

  let templates = [];

  // ==================================================
  // SI HAY DOMINIO: TODAS LAS DORKS SE ACOTAN AL DOMINIO
  // ==================================================
  if (domain) {
    templates = [
      `site:${domain} ${Q}`,
      `site:${domain} ${Q} filetype:pdf`,
      `site:${domain} ${Q} filetype:doc OR filetype:docx`,
      `site:${domain} ${Q} filetype:xls OR filetype:xlsx`,
      `site:${domain} ${Q} filetype:ppt OR filetype:pptx`,
      `site:${domain} ${Q} ("informe" OR "reporte")`,
      `site:${domain} ${Q} ("comunicado" OR "noticia")`,
      `site:${domain} ${Q} ("resolución" OR "documento")`,
      `site:${domain} ${Q} ("contrato" OR "licitación")`,
      `site:${domain} ${Q} ("contacto" OR "teléfono" OR "correo")`,
      `site:${domain} ${Q} inurl:contacto`,
      `site:${domain} ${Q} inurl:noticias`,
      `site:${domain} ${Q} inurl:comunicado`,
      `site:${domain} ${Q} inurl:documentos`,
      `site:${domain} ${Q} inurl:pdf`,
      `site:${domain} ${Q} intitle:informe`,
      `site:${domain} ${Q} intitle:comunicado`,
      `site:${domain} ${Q} intitle:resolución`,
      `site:${domain} ${Q} ("fecha de nacimiento")`,
      `site:${domain} ${Q} ("RUT" OR "rut")`,
      `site:${domain} ${Q} ("domicilio" OR "dirección")`,
      `site:${domain} ${Q} ("curriculum" OR "cv")`,
      `site:${domain} ${Q} ("trabajo" OR "empleo")`,
      `site:${domain} ${Q} ("imagen" OR "foto")`,
      `site:${domain} ${Q} ("archivo" OR "registro")`
    ];
  }

  // ==================================================
  // MODO CHILE SIN DOMINIO
  // ==================================================
  if (!domain && mode === "os9") {
    templates = [
      `site:pjud.cl ${Q}`,
      `site:tribunales.cl ${Q}`,
      `site:chileatiende.gob.cl ${Q}`,
      `site:serviciomigraciones.cl ${Q}`,
      `site:extranjeria.gob.cl ${Q}`,
      `site:registrocivil.cl ${Q}`,
      `site:diariooficial.interior.gob.cl ${Q}`,
      `site:contraloria.cl ${Q}`,
      `site:t.me ("joinchat" OR "invite") ${Q}`,
      `site:t.me "palabra clave" ${Q}`,
      `${Q} filetype:pdf site:.cl`,
      `${Q} filetype:doc OR filetype:docx site:.cl`,
      `${Q} filetype:xls OR filetype:xlsx site:.cl`,
      `${Q} filetype:ppt OR filetype:pptx site:.cl`,
      `${Q} ("informe" OR "expediente" OR "resolución") filetype:pdf`,
      `${Q} ("orden de detención" OR "detenido")`,
      `${Q} (intitle:denuncia OR intitle:detenido)`,
      `${Q} ("RUT" OR "rut")`,
      `${Q} ("fecha de nacimiento")`,
      `${Q} ("pasaporte" OR "cédula")`,
      `${Q} ("domicilio" OR "dirección")`,
      `${Q} site:biobiochile.cl`,
      `${Q} site:emol.com`,
      `${Q} site:latercera.com`,
      `${Q} site:soychile.cl`,
      `${Q} ("comunicado" OR "informe") site:.cl`,
      `${Q} ("contrato" OR "licitación") site:.cl`,
      `${Q} ("trabajo" OR "empleo") site:.cl`,
      `${Q} ("curriculum" OR "cv") site:.cl`,
      `${Q} ("correo" OR "email" OR "teléfono") site:.cl`,
      `${Q} ("foto" OR "imagen") site:.cl`,
      `${Q} "t.me/" "keyword"`,
      `${Q} "t.me" "lista de canales"`,
      `${Q} site:t.me ("es" OR "latam" OR "español"`,
      `${Q} site:t.me "frase exacta"`,
      `${Q} ("registro" OR "archivo") site:.cl`
    ];
  }

  // ==================================================
  // MODO GLOBAL SIN DOMINIO
  // ==================================================
  if (!domain && mode === "global") {
    templates = [
      `${Q} site:facebook.com`,
      `${Q} site:instagram.com`,
      `${Q} site:linkedin.com`,
      `${Q} site:x.com OR site:twitter.com`,
      `${Q} site:tiktok.com`,
      `${Q} site:youtube.com`,
      `${Q} site:reddit.com`,
      `${Q} site:telegram.org`,
      `${Q} site:telegram.me "keyword"`,
      `${Q} site:vk.com`,
      `${Q} site:medium.com`,
      `${Q} site:wordpress.com`,
      `${Q} site:blogspot.com`,
      `${Q} inurl:blog OR inurl:post`,
      `${Q} site:github.com`,
      `${Q} site:gitlab.com`,
      `${Q} site:pastebin.com`,
      `${Q} site:archive.org`,
      `${Q} filetype:pdf`,
      `${Q} filetype:doc OR filetype:docx`,
      `${Q} filetype:xls OR filetype:xlsx`,
      `${Q} filetype:ppt OR filetype:pptx`,
      `${Q} filetype:txt`,
      `${Q} ("curriculum" OR "cv" OR "resume")`,
      `${Q} (intitle:curriculum OR intitle:cv)`,
      `${Q} ("@gmail.com" OR "@hotmail.com" OR "@outlook.com")`,
      `${Q} ("tel" OR "phone" OR "+56")`,
      `${Q} (intitle:contact OR inurl:contact)`,
      `${Q} ("foto" OR "imagen")`,
      `${Q} site:flickr.com`,
      `${Q} site:pinterest.com`
    ];
  }

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
