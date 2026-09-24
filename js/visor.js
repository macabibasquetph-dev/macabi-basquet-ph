/* Visor de fotos a pantalla completa.
   Muestra el archivo ORIGINAL tal cual está: sin filtros, sin recortes, sin compresión. */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var el = $("visor"), img = $("visor-img"), escena = $("visor-escena"), cargando = $("visor-cargando");
  var titulo = $("visor-titulo"), contador = $("visor-contador");
  var btnPrev = $("visor-prev"), btnSig = $("visor-sig"), btnCerrar = $("visor-cerrar");
  var btnDescargar = $("visor-descargar"), btnCompartir = $("visor-compartir");

  var fotos = [], indice = 0, nombreAlbum = "", alCambiar = null, alCerrar = null;
  var abierto = false, focoPrevio = null, precarga = [];

  if (navigator.share) btnCompartir.hidden = false;

  function abrir(lista, i, opciones) {
    if (!lista || !lista.length) return;
    fotos = lista;
    nombreAlbum = opciones.titulo || "";
    alCambiar = opciones.alCambiar || null;
    alCerrar = opciones.alCerrar || null;
    titulo.textContent = nombreAlbum;
    if (!abierto) {
      focoPrevio = document.activeElement;
      el.hidden = false;
      el.classList.remove("visor-sin-ui");
      document.documentElement.classList.add("bloqueado");
      void el.offsetWidth; // fuerza el estilo inicial para que la transición funcione
      el.classList.add("visor-visible");
      abierto = true;
      btnCerrar.focus({ preventScroll: true });
    }
    ir(i, true);
  }

  function ir(i, sinAviso) {
    var n = fotos.length;
    indice = ((i % n) + n) % n;
    var f = fotos[indice];

    img.classList.add("visor-img-oculta");
    cargando.hidden = false;
    img.onload = function () { cargando.hidden = true; img.classList.remove("visor-img-oculta"); };
    img.onerror = function () { cargando.hidden = true; img.classList.remove("visor-img-oculta"); };
    img.alt = "Foto " + (indice + 1) + " de " + n + " — " + nombreAlbum;
    img.src = f.src;
    if (img.complete && img.naturalWidth) img.onload();

    contador.textContent = (indice + 1) + " / " + n;
    btnDescargar.href = f.src;
    btnDescargar.setAttribute("download", f.descarga || f.nombre);
    btnPrev.hidden = btnSig.hidden = n < 2;

    // Precargar anterior y siguiente para que el paso sea instantáneo
    precarga = [indice + 1, indice - 1].map(function (k) {
      var p = new Image();
      p.src = fotos[((k % n) + n) % n].src;
      return p;
    });

    if (!sinAviso && alCambiar) alCambiar(indice);
  }

  function cerrar(desdeRuta) {
    if (!abierto) return;
    abierto = false;
    el.classList.remove("visor-visible");
    document.documentElement.classList.remove("bloqueado");
    setTimeout(function () { if (!abierto) { el.hidden = true; img.removeAttribute("src"); } }, 200);
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus({ preventScroll: true });
    if (!desdeRuta && alCerrar) alCerrar();
  }

  function siguiente() { ir(indice + 1); }
  function anterior() { ir(indice - 1); }

  async function compartir() {
    var f = fotos[indice];
    try {
      if (navigator.canShare && window.fetch && location.protocol !== "file:") {
        var r = await fetch(f.src);
        var b = await r.blob();
        var archivo = new File([b], f.descarga || f.nombre, { type: b.type || "image/jpeg" });
        if (navigator.canShare({ files: [archivo] })) {
          await navigator.share({ files: [archivo], title: nombreAlbum });
          return;
        }
      }
      await navigator.share({ title: nombreAlbum, text: "Foto de " + nombreAlbum + " — MACABI BÁSQUET PH", url: location.href });
    } catch (e) { /* el usuario canceló */ }
  }

  btnSig.addEventListener("click", function (e) { e.stopPropagation(); siguiente(); });
  btnPrev.addEventListener("click", function (e) { e.stopPropagation(); anterior(); });
  btnCerrar.addEventListener("click", function () { cerrar(); });
  btnCompartir.addEventListener("click", compartir);

  // Tocar el fondo: en computadora cierra; en celular muestra/oculta los controles
  escena.addEventListener("click", function (e) {
    if (e.target === img || matchMedia("(hover: none)").matches) {
      el.classList.toggle("visor-sin-ui");
    } else {
      cerrar();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (!abierto) return;
    if (e.key === "ArrowRight") { e.preventDefault(); siguiente(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); anterior(); }
    else if (e.key === "Escape") { e.preventDefault(); cerrar(); }
  });

  // Deslizar con el dedo: izquierda/derecha cambia de foto, hacia abajo cierra
  var x0 = null, y0 = 0, t0 = 0, multitouch = false;
  escena.addEventListener("touchstart", function (e) {
    multitouch = e.touches.length > 1;
    if (multitouch) { x0 = null; return; }
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
  }, { passive: true });

  escena.addEventListener("touchmove", function (e) {
    if (x0 === null || multitouch || e.touches.length > 1) { x0 = null; return; }
    var dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0;
    if (window.visualViewport && visualViewport.scale > 1.05) return;
    if (Math.abs(dx) > Math.abs(dy)) img.style.transform = "translateX(" + dx * 0.6 + "px)";
    else if (dy > 0) img.style.transform = "translateY(" + dy * 0.6 + "px)";
  }, { passive: true });

  escena.addEventListener("touchend", function (e) {
    img.style.transform = "";
    if (x0 === null) return;
    if (window.visualViewport && visualViewport.scale > 1.05) { x0 = null; return; } // con zoom no cambiamos de foto
    var t = e.changedTouches[0];
    var dx = t.clientX - x0, dy = t.clientY - y0, rapido = Date.now() - t0 < 600;
    x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      e.preventDefault();
      if (dx < 0) siguiente(); else anterior();
    } else if (dy > 110 && Math.abs(dy) > Math.abs(dx) * 1.5 && rapido) {
      e.preventDefault();
      cerrar();
    }
  });

  window.Visor = {
    abrir: abrir,
    cerrar: cerrar,
    ir: function (i) { if (abierto && i !== indice) ir(i, true); },
    estaAbierto: function () { return abierto; }
  };
})();
