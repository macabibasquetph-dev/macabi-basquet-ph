/* Funciones de ayuda: fechas, textos y búsqueda. */
(function () {
  "use strict";

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  function dosDigitos(n) { return (n < 10 ? "0" : "") + n; }

  // "2026-09-20" → partes numéricas (sin problemas de zona horaria)
  function leerFecha(iso) {
    var p = String(iso || "").split("-").map(Number);
    if (p.length !== 3 || p.some(isNaN)) return null;
    return { a: p[0], m: p[1], d: p[2], dia: new Date(p[0], p[1] - 1, p[2]).getDay() };
  }

  function fechaCorta(iso) {
    var f = leerFecha(iso);
    return f ? dosDigitos(f.d) + "/" + dosDigitos(f.m) + "/" + f.a : "";
  }

  function fechaLarga(iso) {
    var f = leerFecha(iso);
    if (!f) return "";
    var dia = DIAS[f.dia];
    return dia.charAt(0).toUpperCase() + dia.slice(1) + " " + f.d + " de " + MESES[f.m - 1] + " de " + f.a;
  }

  function mesAnio(iso) {
    var f = leerFecha(iso);
    return f ? MESES[f.m - 1] + " " + f.a : "";
  }

  // Texto sin tildes, en minúscula
  function normalizar(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function escapar(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Palabras que se ignoran al buscar ("Macabi vs. Hebraica" → macabi, hebraica)
  var IGNORAR = { vs: 1, v: 1, versus: 1, contra: 1, de: 1, del: 1, la: 1, el: 1, los: 1, las: 1, y: 1, en: 1, a: 1 };

  function palabras(s) {
    return normalizar(s).replace(/[^a-z0-9ñ\/\-]+/g, " ").split(" ").filter(Boolean);
  }

  function terminosBusqueda(consulta) {
    // "U-15", "u 15", "Sub 15", "sub-15" → u15
    var q = normalizar(consulta).replace(/\b(?:u|sub)[\s\-]?(\d{2})\b/g, "u$1");
    return palabras(q).filter(function (t) { return !IGNORAR[t]; });
  }

  // Todas las palabras por las que se puede encontrar un partido
  function indiceBusqueda(p) {
    var f = leerFecha(p.fecha);
    var extra = [];
    if (f) {
      extra.push(
        fechaCorta(p.fecha),                 // 20/09/2026
        f.d + "/" + f.m + "/" + f.a,         // 20/9/2026
        dosDigitos(f.d) + "/" + dosDigitos(f.m), // 20/09
        f.d + "/" + f.m,                     // 20/9
        p.fecha, MESES[f.m - 1], MESES_CORTOS[f.m - 1], String(f.a), DIAS[f.dia]
      );
    }
    var texto = [p.equipo, p.rival, p.titulo, p.categoria, p.lugar, p.sede, p.evento,
      p.temporada, "temporada " + p.temporada, (p.etiquetas || []).join(" ")].concat(extra).join(" ");
    return palabras(texto);
  }

  // Cada término tiene que coincidir con el comienzo de alguna palabra del partido.
  // Así "mini" encuentra Mini pero no Premini, y "hebra" encuentra Hebraica.
  function coincide(indice, terminos) {
    return terminos.every(function (t) {
      return indice.some(function (w) { return w.indexOf(t) === 0; });
    });
  }

  window.U = {
    fechaCorta: fechaCorta,
    fechaLarga: fechaLarga,
    mesAnio: mesAnio,
    leerFecha: leerFecha,
    mesCorto: function (iso) { var f = leerFecha(iso); return f ? MESES_CORTOS[f.m - 1] : ""; },
    normalizar: normalizar,
    escapar: escapar,
    terminosBusqueda: terminosBusqueda,
    indiceBusqueda: indiceBusqueda,
    coincide: coincide
  };
})();
