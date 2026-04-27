let selectedCategory = "chile";

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

function setCategory(category, btn) {
  selectedCategory = category;

  document.querySelectorAll(".category-buttons button").forEach(b => {
    b.classList.remove("active-category");
  });

  if (btn) {
    btn.classList.add("active-category");
  }
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
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!query) {
    alert("Ingresa un texto a buscar");
    return;
  }

  const Q = `"${query}"`;
  const domain = sanitizeDomain(domainInput);

  let templates = [];

  if (selectedCategory === "chile") {
    templates = [
      `site:pjud.cl ${Q}`,
      `site:tribunales.cl ${Q}`,
      `site:chileatiende.gob.cl ${Q}`,
      `site:serviciomigraciones.cl ${Q}`,
      `site:extranjeria.gob.cl ${Q}`,
      `site:registrocivil.cl ${Q}`,
      `site:diariooficial.interior.gob.cl ${Q}`,
      `site:contraloria.cl ${Q}`,
      `${Q} filetype:pdf site:.cl`,
      `${Q} filetype:doc OR filetype:docx site:.cl`,
      `${Q} filetype:xls OR filetype:xlsx site:.cl`,
      `${Q} ("informe" OR "expediente" OR "resolución") filetype:pdf`,
      `${Q} ("orden de detención" OR "detenido")`,
      `${Q} ("RUT" OR "rut")`,
      `${Q} ("domicilio" OR "dirección")`,
      `${Q} site:biobiochile.cl`,
      `${Q} site:emol.com`,
      `${Q} site:latercera.com`,
      `${Q} site:soychile.cl`
    ];
  }

  if (selectedCategory === "global") {
    templates = [
      `${Q} filetype:pdf`,
      `${Q} filetype:doc OR filetype:docx`,
      `${Q} filetype:xls OR filetype:xlsx`,
      `${Q} filetype:ppt OR filetype:pptx`,
      `${Q} filetype:txt`,
      `${Q} ("curriculum" OR "cv" OR "resume")`,
      `${Q} ("correo" OR "email" OR "teléfono" OR "phone")`,
      `${Q} ("foto" OR "imagen")`,
      `${Q} ("informe" OR "reporte")`,
      `${Q} ("comunicado" OR "noticia")`,
      `${Q} site:archive.org`,
      `${Q} site:medium.com`,
      `${Q} site:wordpress.com`,
      `${Q} site:blogspot.com`
    ];
  }

  if (selectedCategory === "rrss") {
    templates = [
      `${Q} site:facebook.com`,
      `${Q} site:instagram.com`,
      `${Q} site:linkedin.com`,
      `${Q} site:tiktok.com`,
      `${Q} site:x.com OR site:twitter.com`,
      `${Q} site:youtube.com`,
      `${Q} site:reddit.com`,
      `${Q} site:t.me`,
      `${Q} site:telegram.org`,
      `${Q} "t.me/"`,
      `${Q} ("grupo telegram" OR "canal telegram")`,
      `${Q} ("perfil" OR "usuario")`,
      `${Q} ("foto" OR "imagen")`
    ];
  }

  if (selectedCategory === "fauna") {
    templates = [
      `${Q} ("CITES" OR "Species+")`,
      `${Q} ("especie protegida" OR "especies protegidas")`,
      `${Q} ("fauna silvestre" OR "animal protegido")`,
      `${Q} ("animal exótico" OR "mascota exótica")`,
      `${Q} ("venta" OR "vendo" OR "se vende") ("loro" OR "tortuga" OR "iguana" OR "ave exótica")`,
      `${Q} ("tráfico" OR "comercio ilegal") ("fauna" OR "animales")`,
      `${Q} site:facebook.com ("venta" OR "vendo") ("animal" OR "loro" OR "tortuga")`,
      `${Q} site:instagram.com ("venta" OR "disponible") ("animal" OR "exótico")`,
      `${Q} filetype:pdf ("fauna" OR "CITES" OR "especies protegidas")`,
      `${Q} ("incautación" OR "decomiso") ("fauna" OR "animales")`
    ];
  }

  if (selectedCategory === "vehiculos") {
    templates = [
      `${Q} ("vehículo" OR "auto" OR "camioneta")`,
      `${Q} ("patente" OR "placa")`,
      `${Q} ("robo" OR "robado") ("vehículo" OR "auto")`,
      `${Q} ("encargo" OR "búsqueda") ("vehículo" OR "patente")`,
      `${Q} ("venta" OR "vendo") ("auto" OR "vehículo")`,
      `${Q} site:facebook.com ("venta" OR "vendo") ("auto" OR "vehículo")`,
      `${Q} site:yapo.cl ("auto" OR "vehículo")`,
      `${Q} site:chileautos.cl`,
      `${Q} ("accidente" OR "choque") ("vehículo" OR "auto")`,
      `${Q} filetype:pdf ("vehículo" OR "patente")`
    ];
  }

  if (selectedCategory === "drogas") {
    templates = [
      `${Q} ("droga" OR "cocaína" OR "marihuana" OR "pasta base")`,
      `${Q} ("narco" OR "narcotráfico" OR "microtráfico")`,
      `${Q} ("incautación" OR "decomiso") ("droga" OR "narcótico")`,
      `${Q} ("detenido" OR "imputado") ("droga" OR "narcotráfico")`,
      `${Q} ("cultivo indoor" OR "laboratorio clandestino")`,
      `${Q} ("punto de venta" OR "venta de droga")`,
      `${Q} site:facebook.com ("droga" OR "marihuana" OR "weed")`,
      `${Q} site:instagram.com ("marihuana" OR "weed")`,
      `${Q} filetype:pdf ("droga" OR "narcotráfico" OR "microtráfico")`,
      `${Q} ("distribución" OR "tráfico") ("droga" OR "narcótico")`
    ];
  }

  if (selectedCategory === "armas") {
    templates = [
      `${Q} ("arma" OR "pistola" OR "revólver")`,
      `${Q} ("tenencia ilegal" OR "porte de arma")`,
      `${Q} ("munición" OR "cartuchos")`,
      `${Q} ("disparo" OR "balacera")`,
      `${Q} ("incautación" OR "decomiso") ("arma" OR "armamento")`,
      `${Q} ("detenido" OR "imputado") ("arma" OR "armas")`,
      `${Q} ("calibre" OR "munición")`,
      `${Q} site:facebook.com ("arma" OR "pistola" OR "munición")`,
      `${Q} filetype:pdf ("arma" OR "armamento" OR "munición")`,
      `${Q} ("procedimiento" OR "allanamiento") ("arma" OR "armas")`
    ];
  }

  if (domain) {
    templates = templates.map(dork => `site:${domain} ${dork}`);
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
