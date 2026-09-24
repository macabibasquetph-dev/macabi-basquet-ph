/* MACABI BÁSQUET PH — lógica de la página.
   No hace falta editar este archivo para agregar partidos: eso se hace en data/partidos.js */
(function () {
  "use strict";

  var main = document.getElementById("contenido");
  var esc = U.escapar;
  var D = window.MACABI_DATOS;
  var F = window.MACABI_FOTOS || {};

  // --- Si data/partidos.js tiene un error de escritura, avisamos claramente ---
  if (!D || !Array.isArray(D.partidos)) {
    main.innerHTML =
      '<section class="bloque vacio"><h1 class="titulo-seccion">Falta información</h1>' +
      '<p>No se pudo leer <code>data/partidos.js</code>. Suele ser una coma o comilla de más o de menos. ' +
      'Revisá el último partido que agregaste.</p></section>';
    return;
  }

  // ======================================================================
  // DATOS
  // ======================================================================
  function codificarRuta(s) { return String(s).split("/").map(encodeURIComponent).join("/"); }
  function sinExtension(n) { return n.replace(/\.[^.\/]+$/, ""); }

  function preparar(p) {
    var info = F[p.id] || {};
    var manual = Array.isArray(p.fotos);
    var lista = manual ? p.fotos : (info.fotos || []);
    var base = "fotos/" + encodeURIComponent(p.id) + "/";
    var conMini = !manual && info.miniaturas;
    var equipo = p.equipo || "Macabi";
    var titulo = p.rival ? equipo + " vs. " + p.rival : (p.titulo || p.evento || "Evento");

    var fotos = lista.map(function (nombre) {
      var src = /^(https?:)?\/\//.test(nombre) ? nombre : base + codificarRuta(nombre);
      return {
        nombre: nombre.split("/").pop(),
        src: src,
        mini: conMini ? base + "miniaturas/" + codificarRuta(sinExtension(nombre)) + ".jpg" : src,
        descarga: "MacabiBasquetPH_" + p.id + "_" + nombre.split("/").pop()
      };
    });

    var iPortada = p.portada ? lista.indexOf(p.portada) : -1;
    var m = /^\s*(\d+)\s*[-–:]\s*(\d+)\s*$/.exec(p.resultado || "");

    var out = {};
    for (var k in p) out[k] = p[k];
    out.equipo = equipo;
    out.titulo = titulo;
    out.temporada = String(p.temporada || String(p.fecha).slice(0, 4));
    out.fotos = fotos;
    out.portada = fotos[iPortada >= 0 ? iPortada : 0] || null;
    out.marcador = m ? { propio: +m[1], rival: +m[2] } : null;
    out.indice = U.indiceBusqueda(out);
    return out;
  }

  var partidos = D.partidos
    .filter(function (p) { return p && p.id && p.fecha; })
    .map(preparar)
    .sort(function (a, b) { return b.fecha.localeCompare(a.fecha); });

  var porId = {};
  partidos.forEach(function (p) { porId[p.id] = p; });

  var categorias = (D.categorias || ["Premini", "Mini", "U13", "U15", "U17", "U19", "Primera", "Otras"]).slice();
  partidos.forEach(function (p) {
    if (p.categoria && categorias.indexOf(p.categoria) < 0) categorias.push(p.categoria);
  });

  var temporadas = (D.temporadas || []).map(String);
  partidos.forEach(function (p) { if (temporadas.indexOf(p.temporada) < 0) temporadas.push(p.temporada); });
  temporadas.sort(function (a, b) { return b.localeCompare(a); });

  var totalFotos = partidos.reduce(function (s, p) { return s + p.fotos.length; }, 0);

  function mismaCategoria(p, c) { return U.normalizar(p.categoria) === U.normalizar(c); }
  function deCategoria(c) { return partidos.filter(function (p) { return mismaCategoria(p, c); }); }
  function buscar(lista, consulta) {
    var t = U.terminosBusqueda(consulta);
    if (!t.length) return lista;
    return lista.filter(function (p) { return U.coincide(p.indice, t); });
  }
  function plural(n, uno, varios) { return n + " " + (n === 1 ? uno : varios); }

  // ======================================================================
  // PIEZAS DE INTERFAZ
  // ======================================================================
  function icono(id, clase) {
    return '<svg class="ico ' + (clase || "") + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>';
  }

  function tituloPartido(p, etiqueta) {
    etiqueta = etiqueta || "h3";
    if (p.rival) {
      return "<" + etiqueta + ' class="titulo-partido"><span>' + esc(p.equipo) + '</span> <i>vs.</i> <span>' + esc(p.rival) + "</span></" + etiqueta + ">";
    }
    return "<" + etiqueta + ' class="titulo-partido"><span>' + esc(p.titulo) + "</span></" + etiqueta + ">";
  }

  function resultadoCorto(p) {
    if (p.marcador) {
      var estado = p.marcador.propio > p.marcador.rival ? "gano" : p.marcador.propio < p.marcador.rival ? "perdio" : "empate";
      return '<span class="resultado resultado-' + estado + '">' + p.marcador.propio + " – " + p.marcador.rival + "</span>";
    }
    if (p.resultado) return '<span class="resultado">' + esc(p.resultado) + "</span>";
    return "";
  }

  function imagenPortada(p, clase) {
    if (p.portada) {
      return '<img class="' + (clase || "") + '" src="' + esc(p.portada.mini) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">';
    }
    return '<div class="sin-foto">' + icono("camara") + "<span>Fotos en camino</span></div>";
  }

  function tarjeta(p, i) {
    return '<a class="album aparecer" style="--d:' + ((i || 0) % 6) + '" href="#/partido/' + encodeURIComponent(p.id) + '">' +
      '<div class="album-foto">' + imagenPortada(p) +
        '<span class="etiqueta">' + esc(p.categoria || "") + "</span>" +
        (p.fotos.length ? '<span class="cantidad">' + icono("camara") + p.fotos.length + "</span>" : "") +
      "</div>" +
      '<div class="album-info">' +
        '<div class="album-linea"><time datetime="' + esc(p.fecha) + '">' + esc(p.categoria) + " • " + U.fechaCorta(p.fecha) + "</time>" + resultadoCorto(p) + "</div>" +
        tituloPartido(p) +
        '<p class="album-lugar">' + icono("pin") + esc(p.lugar || "") + "</p>" +
        '<span class="album-ver">VER FOTOS ' + icono("flecha") + "</span>" +
      "</div></a>";
  }

  function grillaAlbumes(lista) {
    return '<div class="albumes">' + lista.map(tarjeta).join("") + "</div>";
  }

  function vacio(titulo, texto, extra) {
    return '<div class="vacio">' + icono("balon", "vacio-balon") + "<h3>" + esc(titulo) + "</h3><p>" + texto + "</p>" + (extra || "") + "</div>";
  }

  function chipsCategorias(activa, destino) {
    return categorias.map(function (c) {
      var n = deCategoria(c).length;
      var act = activa && U.normalizar(activa) === U.normalizar(c);
      var href = destino(c, act);
      return '<a class="chip' + (act ? " chip-activo" : "") + (n ? "" : " chip-vacio") + '" href="' + href + '">' +
        esc(c) + (n ? "<small>" + n + "</small>" : "") + "</a>";
    }).join("");
  }

  function encabezado(sobre, titulo, bajada) {
    return '<header class="encabezado aparecer"><p class="sobretitulo">' + esc(sobre) + "</p>" +
      '<h1 class="titulo-seccion">' + titulo + "</h1>" + (bajada ? '<p class="bajada">' + bajada + "</p>" : "") + "</header>";
  }

  function formBuscador(valor, grande) {
    return '<form class="buscador' + (grande ? " buscador-grande" : "") + '" role="search" data-buscador>' +
      icono("buscar", "buscador-ico") +
      '<input type="search" name="q" value="' + esc(valor || "") + '" placeholder="Rival, categoría o fecha" ' +
      'aria-label="Buscar partido por equipo, rival, categoría, fecha o evento" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">' +
      '<button type="submit" class="btn btn-principal">Buscar</button></form>';
  }

  var CANCHA_SVG =
    '<svg class="cancha" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width="2.5">' +
        '<path class="trazo" d="M800 0v900"/>' +
        '<circle class="trazo" cx="800" cy="450" r="130"/>' +
        '<circle class="trazo" cx="800" cy="450" r="45"/>' +
        '<path class="trazo" d="M0 290h380v320H0"/>' +
        '<path class="trazo" d="M380 290a160 160 0 0 1 0 320"/>' +
        '<path class="trazo" d="M0 60h140a390 390 0 0 1 0 780H0"/>' +
        '<path class="trazo" d="M1600 290h-380v320h380"/>' +
        '<path class="trazo" d="M1220 290a160 160 0 0 0 0 320"/>' +
        '<path class="trazo" d="M1600 60h-140a390 390 0 0 0 0 780h140"/>' +
      "</g></svg>";

  // ======================================================================
  // VISTAS
  // ======================================================================
  function vistaInicio() {
    var portada = D.portada || (partidos[0] && partidos[0].portada && partidos[0].portada.src) || "";
    var ultimos = partidos.slice(0, 6);
    var conFotos = categorias.filter(function (c) { return deCategoria(c).length; });

    return (
      '<section class="hero">' +
        (portada ? '<img class="hero-foto" src="' + esc(portada) + '" alt="Fotografía de básquet de Macabi" fetchpriority="high">' : "") +
        '<div class="hero-sombra"></div>' + CANCHA_SVG +
        '<div class="hero-contenido">' +
          '<p class="hero-sub"><span class="en-vivo"></span>Fotografía de básquet • Momentos que quedan</p>' +
          '<h1 class="hero-titulo"><span class="l1">MACABI</span> <span class="l2"><em>BÁSQUET</em> PH</span></h1>' +
          '<p class="hero-frase">Cada partido tiene una historia.<br><strong>Nosotros la capturamos.</strong></p>' +
          '<div class="hero-botones">' +
            '<a class="btn btn-principal btn-grande" href="#/fotos">VER FOTOS ' + icono("flecha") + "</a>" +
            '<button type="button" class="btn btn-borde btn-grande" data-ir="ultimos">ÚLTIMOS PARTIDOS</button>' +
          "</div>" +
        "</div>" +
        '<dl class="hero-tablero">' +
          "<div><dt>Partidos</dt><dd>" + partidos.length + "</dd></div>" +
          "<div><dt>Fotos</dt><dd>" + totalFotos + "</dd></div>" +
          "<div><dt>Categorías</dt><dd>" + conFotos.length + "</dd></div>" +
        "</dl>" +
      "</section>" +

      '<section class="bloque bloque-buscar aparecer">' +
        '<h2 class="titulo-bloque">¿Buscás tu partido?</h2>' +
        formBuscador("", true) +
        '<div class="chips chips-desliza" aria-label="Categorías">' +
          chipsCategorias(null, function (c) { return "#/fotos?categoria=" + encodeURIComponent(c); }) +
        "</div>" +
      "</section>" +

      '<section class="bloque" id="ultimos">' +
        '<div class="fila-titulo aparecer"><h2 class="titulo-bloque">Últimos partidos</h2>' +
        '<a class="link-mas" href="#/partidos">Ver todos ' + icono("flecha") + "</a></div>" +
        (ultimos.length ? grillaAlbumes(ultimos) : vacio("Todavía no hay partidos", "Muy pronto vas a encontrar acá las primeras fotos.")) +
      "</section>" +

      '<section class="bloque pasos aparecer">' +
        '<h2 class="titulo-bloque">Encontrá tus fotos en 3 pasos</h2>' +
        "<ol>" +
          "<li><b>1</b><div><strong>Elegí la categoría</strong><span>o buscá por rival o fecha.</span></div></li>" +
          "<li><b>2</b><div><strong>Entrá al partido</strong><span>y recorré la galería completa.</span></div></li>" +
          "<li><b>3</b><div><strong>Tocá la foto</strong><span>para verla en grande y descargarla.</span></div></li>" +
        "</ol>" +
      "</section>"
    );
  }

  // --- FOTOS: todos los álbumes con filtros ---
  function vistaFotos(params) {
    return encabezado("Galería", "Fotos", "Todos los álbumes, del más nuevo al más viejo. Filtrá por temporada y categoría.") +
      '<section class="bloque bloque-filtros">' +
        formBuscador(params.get("q")) +
        '<div data-filtros></div>' +
      "</section>" +
      '<section class="bloque bloque-resultados" data-resultados aria-live="polite"></section>';
  }

  function pintarFotos(params) {
    var temp = params.get("temporada") || "";
    var cat = params.get("categoria") || "";
    var q = params.get("q") || "";

    function enlace(cambios) {
      var p = new URLSearchParams(params.toString());
      for (var k in cambios) { if (cambios[k]) p.set(k, cambios[k]); else p.delete(k); }
      var s = p.toString();
      return "#/fotos" + (s ? "?" + s : "");
    }

    var filtros = main.querySelector("[data-filtros]");
    filtros.innerHTML =
      '<div class="filtro"><span class="filtro-nombre">Temporada</span><div class="chips chips-desliza">' +
        '<a class="chip' + (!temp ? " chip-activo" : "") + '" href="' + enlace({ temporada: "" }) + '">Todas</a>' +
        temporadas.map(function (t) {
          return '<a class="chip' + (temp === t ? " chip-activo" : "") + '" href="' + enlace({ temporada: t }) + '">' + esc(t) + "</a>";
        }).join("") +
      "</div></div>" +
      '<div class="filtro"><span class="filtro-nombre">Categoría</span><div class="chips chips-desliza">' +
        '<a class="chip' + (!cat ? " chip-activo" : "") + '" href="' + enlace({ categoria: "" }) + '">Todas</a>' +
        chipsCategorias(cat, function (c, act) { return enlace({ categoria: act ? "" : c }); }) +
      "</div></div>";

    var lista = partidos.filter(function (p) {
      return (!temp || p.temporada === temp) && (!cat || mismaCategoria(p, cat));
    });
    lista = buscar(lista, q);

    var res = main.querySelector("[data-resultados]");
    var desc = [cat, temp && "Temporada " + temp, q && "“" + esc(q) + "”"].filter(Boolean).join(" · ");
    res.innerHTML =
      '<p class="conteo"><strong>' + plural(lista.length, "álbum", "álbumes") + "</strong>" + (desc ? " · " + desc : "") +
      (temp || cat || q ? ' <a class="link-limpiar" href="#/fotos">Limpiar filtros</a>' : "") + "</p>" +
      (lista.length ? grillaAlbumes(lista) :
        vacio("No encontramos álbumes", cat && !deCategoria(cat).length ?
          "Todavía no hay fotos de " + esc(cat) + ". ¡Muy pronto!" :
          "Probá con otra categoría, el nombre del rival o la fecha (por ejemplo 20/09).",
          '<a class="btn btn-borde" href="#/fotos">Ver todos los álbumes</a>'));
    centrarChipsActivos();
  }

  // En celular, las filas de filtros se deslizan: mostramos el filtro elegido
  function centrarChipsActivos() {
    main.querySelectorAll(".chips-desliza").forEach(function (fila) {
      var act = fila.querySelector(".chip-activo");
      if (act && fila.scrollWidth > fila.clientWidth) {
        fila.scrollLeft = act.offsetLeft - (fila.clientWidth - act.offsetWidth) / 2;
      }
    });
  }

  // --- PARTIDOS: lista cronológica agrupada por mes ---
  function vistaPartidos(params) {
    var temp = params.get("temporada") || "";
    var lista = partidos.filter(function (p) { return !temp || p.temporada === temp; });

    var grupos = [], actual = null;
    lista.forEach(function (p) {
      var mes = U.mesAnio(p.fecha);
      if (!actual || actual.mes !== mes) { actual = { mes: mes, items: [] }; grupos.push(actual); }
      actual.items.push(p);
    });

    return encabezado("Calendario", "Partidos", "Todos los partidos y eventos fotografiados, en orden cronológico.") +
      '<section class="bloque bloque-filtros"><div class="chips chips-desliza">' +
        '<a class="chip' + (!temp ? " chip-activo" : "") + '" href="#/partidos">Todas las temporadas</a>' +
        temporadas.map(function (t) {
          return '<a class="chip' + (temp === t ? " chip-activo" : "") + '" href="#/partidos?temporada=' + encodeURIComponent(t) + '">Temporada ' + esc(t) + "</a>";
        }).join("") +
      "</div></section>" +
      '<section class="bloque">' +
      (grupos.length ? grupos.map(function (g) {
        return '<div class="mes aparecer"><h2 class="mes-titulo">' + esc(g.mes) + "</h2><ul class=\"lista-partidos\">" +
          g.items.map(function (p) {
            var f = U.leerFecha(p.fecha);
            return '<li><a class="fila-partido" href="#/partido/' + encodeURIComponent(p.id) + '">' +
              '<span class="fecha-bloque"><b>' + (f ? f.d : "") + "</b><small>" + U.mesCorto(p.fecha) + "</small></span>" +
              '<span class="fila-cuerpo">' +
                '<span class="fila-meta"><span class="etiqueta etiqueta-chica">' + esc(p.categoria) + "</span>" + esc(p.evento || "") + "</span>" +
                tituloPartido(p, "strong") +
                '<span class="fila-lugar">' + icono("pin") + esc(p.lugar || "") + (p.fotos.length ? " · " + plural(p.fotos.length, "foto", "fotos") : " · fotos en camino") + "</span>" +
              "</span>" +
              '<span class="fila-fin">' + resultadoCorto(p) + icono("der", "fila-flecha") + "</span>" +
            "</a></li>";
          }).join("") + "</ul></div>";
      }).join("") : vacio("Sin partidos en esta temporada", "Cuando haya fotos nuevas van a aparecer acá.")) +
      "</section>";
  }

  // --- CATEGORÍAS ---
  function vistaCategorias() {
    return encabezado("Equipos", "Categorías", "Elegí tu categoría para ver todos sus partidos.") +
      '<section class="bloque"><div class="categorias">' +
      categorias.map(function (c, i) {
        var lista = deCategoria(c);
        var ult = lista[0];
        var fotos = lista.reduce(function (s, p) { return s + p.fotos.length; }, 0);
        return '<a class="categoria aparecer' + (lista.length ? "" : " categoria-vacia") + '" style="--d:' + (i % 6) + '" href="#/fotos?categoria=' + encodeURIComponent(c) + '">' +
          (ult && ult.portada ? '<img src="' + esc(ult.portada.mini) + '" alt="" loading="lazy" decoding="async">' : "") +
          '<span class="categoria-sombra"></span>' +
          '<span class="categoria-nombre">' + esc(c) + "</span>" +
          '<span class="categoria-datos">' + (lista.length ? plural(lista.length, "álbum", "álbumes") + " · " + plural(fotos, "foto", "fotos") : "Próximamente") + "</span>" +
        "</a>";
      }).join("") +
      "</div></section>";
  }

  // --- BUSCAR ---
  function vistaBuscar(params) {
    return encabezado("Buscador", "Buscar", "Escribí el nombre del rival, la categoría, la fecha o el evento.") +
      '<section class="bloque bloque-filtros">' + formBuscador(params.get("q"), true) +
      '<p class="ayuda">Ejemplos: <button type="button" data-ejemplo="U15">U15</button> <button type="button" data-ejemplo="Macabi vs. Hebraica">Macabi vs. Hebraica</button> <button type="button" data-ejemplo="20/09">20/09</button> <button type="button" data-ejemplo="septiembre">septiembre</button></p>' +
      '</section><section class="bloque bloque-resultados" data-resultados aria-live="polite"></section>';
  }

  function pintarBuscar(q) {
    var res = main.querySelector("[data-resultados]");
    if (!res) return;
    if (!U.terminosBusqueda(q).length) {
      res.innerHTML = '<h2 class="titulo-bloque">Últimos partidos</h2>' + grillaAlbumes(partidos.slice(0, 6));
    } else {
      var lista = buscar(partidos, q);
      res.innerHTML = '<p class="conteo"><strong>' + plural(lista.length, "resultado", "resultados") + "</strong> para “" + esc(q) + "”</p>" +
        (lista.length ? grillaAlbumes(lista) :
          vacio("No encontramos ese partido", "Revisá cómo está escrito o probá solo con el rival o la categoría.",
            '<div class="chips chips-centro">' + chipsCategorias(null, function (c) { return "#/fotos?categoria=" + encodeURIComponent(c); }) + "</div>"));
    }
  }

  // --- PÁGINA DE UN PARTIDO ---
  function vistaPartido(p) {
    if (!p) {
      return '<section class="bloque">' + vacio("No encontramos este álbum", "Puede que el enlace esté mal escrito o que el álbum se haya movido.",
        '<a class="btn btn-principal" href="#/fotos">Ver todas las fotos</a>') + "</section>";
    }

    var marcador = "";
    if (p.marcador) {
      var gano = p.marcador.propio > p.marcador.rival, perdio = p.marcador.propio < p.marcador.rival;
      marcador = '<div class="marcador aparecer" aria-label="Resultado final: ' + esc(p.equipo) + " " + p.marcador.propio + ", " + esc(p.rival || "rival") + " " + p.marcador.rival + '">' +
        '<div class="marcador-equipo' + (gano ? " ganador" : "") + '"><span>' + esc(p.equipo) + "</span><b>" + p.marcador.propio + "</b></div>" +
        '<div class="marcador-medio">FINAL</div>' +
        '<div class="marcador-equipo' + (perdio ? " ganador" : "") + '"><b>' + p.marcador.rival + "</b><span>" + esc(p.rival || "Rival") + "</span></div>" +
      "</div>";
    } else if (p.resultado) {
      marcador = '<p class="resultado-texto">Resultado: <strong>' + esc(p.resultado) + "</strong></p>";
    }

    var relacionados = partidos.filter(function (o) { return o !== p && mismaCategoria(o, p.categoria); }).slice(0, 3);

    return '<section class="partido-cabecera">' + CANCHA_SVG +
        '<div class="partido-in">' +
          '<a class="volver" href="#/fotos" data-volver>' + icono("atras") + "Volver</a>" +
          '<div class="partido-etiquetas aparecer">' +
            '<a class="etiqueta" href="#/fotos?categoria=' + encodeURIComponent(p.categoria) + '">' + esc(p.categoria) + "</a>" +
            '<span class="temporada">Temporada ' + esc(p.temporada) + "</span>" +
          "</div>" +
          '<div class="aparecer">' + tituloPartido(p, "h1") + "</div>" +
          marcador +
          '<ul class="partido-datos aparecer">' +
            '<li><span>Fecha</span><strong>' + esc(U.fechaLarga(p.fecha)) + "</strong></li>" +
            '<li><span>Lugar</span><strong>' + esc([p.sede, p.lugar].filter(Boolean).join(" · ")) + "</strong></li>" +
            (p.evento ? "<li><span>Evento</span><strong>" + esc(p.evento) + "</strong></li>" : "") +
            "<li><span>Fotos</span><strong>" + p.fotos.length + "</strong></li>" +
          "</ul>" +
          (p.descripcion ? '<p class="partido-desc aparecer">' + esc(p.descripcion) + "</p>" : "") +
          '<div class="partido-acciones aparecer">' +
            (p.fotos.length ? '<a class="btn btn-principal" href="#/partido/' + encodeURIComponent(p.id) + '?foto=1">' + icono("fotos") + "Ver en pantalla completa</a>" : "") +
            '<button type="button" class="btn btn-borde" data-compartir>' + icono("compartir") + "Compartir álbum</button>" +
          "</div>" +
        "</div>" +
      "</section>" +
      '<section class="bloque bloque-galeria">' +
        (p.fotos.length ?
          '<div class="galeria">' + p.fotos.map(function (f, i) {
            return '<a class="foto" data-i="' + i + '" href="#/partido/' + encodeURIComponent(p.id) + "?foto=" + (i + 1) + '" aria-label="Abrir foto ' + (i + 1) + '">' +
              '<img src="' + esc(f.mini) + '" alt="Foto ' + (i + 1) + " — " + esc(p.titulo) + '" loading="' + (i < 8 ? "eager" : "lazy") + '" decoding="async"></a>';
          }).join("") + "</div>" +
          '<p class="nota-original">' + icono("camara") + "Tocá una foto para verla en grande y descargarla. Las fotos se muestran y descargan en su archivo original, sin filtros ni retoques automáticos.</p>"
          : vacio("Fotos en camino", "Las fotos de este partido se están subiendo. ¡Volvé en un rato!")) +
      "</section>" +
      (relacionados.length ?
        '<section class="bloque"><div class="fila-titulo"><h2 class="titulo-bloque">Más de ' + esc(p.categoria) + "</h2>" +
        '<a class="link-mas" href="#/fotos?categoria=' + encodeURIComponent(p.categoria) + '">Ver todos ' + icono("flecha") + "</a></div>" +
        grillaAlbumes(relacionados) + "</section>" : "");
  }

  // ======================================================================
  // NAVEGACIÓN (rutas con #, funciona en cualquier hosting gratuito)
  // ======================================================================
  var rutaActual = "";      // p. ej. "partido:ID"
  var clicNavegacion = 0;   // momento del último clic en un enlace interno
  var primeraCarga = true;
  var visorPorClick = false;
  var posiciones = {};
  var hashAnterior = location.hash;
  var historialInterno = 0;

  function leerRuta() {
    var h = location.hash.replace(/^#/, "") || "/";
    var i = h.indexOf("?");
    var camino = i >= 0 ? h.slice(0, i) : h;
    var params = new URLSearchParams(i >= 0 ? h.slice(i + 1) : "");
    var partes = camino.split("/").filter(Boolean).map(function (s) {
      try { return decodeURIComponent(s); } catch (e) { return s; }
    });
    return { partes: partes, params: params };
  }

  function marcarMenu(seccion) {
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var act = a.getAttribute("data-nav") === seccion;
      a.classList.toggle("activo", act);
      if (act) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  function abrirVisor(p, n, porClick) {
    visorPorClick = !!porClick;
    Visor.abrir(p.fotos, n, {
      titulo: p.titulo + " · " + p.categoria + " · " + U.fechaCorta(p.fecha),
      alCambiar: function (i) {
        history.replaceState(null, "", "#/partido/" + encodeURIComponent(p.id) + "?foto=" + (i + 1));
        hashAnterior = location.hash;
      },
      alCerrar: function () {
        var n = parseInt(leerRuta().params.get("foto"), 10) - 1;
        var mini = main.querySelector('.foto[data-i="' + n + '"]');
        if (visorPorClick) {
          history.back();
        } else {
          history.replaceState(null, "", "#/partido/" + encodeURIComponent(p.id));
          hashAnterior = location.hash;
        }
        if (mini) {
          var r = mini.getBoundingClientRect();
          if (r.top < 60 || r.bottom > innerHeight - 80) mini.scrollIntoView({ block: "center" });
        }
      }
    });
  }

  function enrutar() {
    // Navegación "nueva" = vino de un clic (se va arriba de todo).
    // Si no, es atrás/adelante del navegador (se recupera la posición donde estabas).
    var navegacionNueva = primeraCarga || Date.now() - clicNavegacion < 1500;
    clicNavegacion = 0;
    primeraCarga = false;
    posiciones[hashAnterior] = window.scrollY;
    var ruta = leerRuta();
    var seccion = ruta.partes[0] || "inicio";
    var clave = seccion + ":" + (ruta.partes[1] || "");
    var foto = parseInt(ruta.params.get("foto"), 10);

    // Misma página de partido: solo abrimos / cerramos / movemos el visor
    if (seccion === "partido" && clave === rutaActual) {
      var p0 = porId[ruta.partes[1]];
      if (foto > 0 && p0 && p0.fotos.length) {
        if (Visor.estaAbierto()) Visor.ir(foto - 1);
        else abrirVisor(p0, foto - 1, navegacionNueva);
      } else if (Visor.estaAbierto()) {
        Visor.cerrar(true);
      }
      hashAnterior = location.hash;
      return;
    }
    if (Visor.estaAbierto()) Visor.cerrar(true);

    // Cambiar un filtro en Fotos: solo se actualizan los resultados (sin saltar arriba)
    if (seccion === "fotos" && rutaActual.indexOf("fotos:") === 0 && main.querySelector("[data-filtros]")) {
      var input = main.querySelector("[data-buscador] input");
      if (input && input.value !== (ruta.params.get("q") || "")) input.value = ruta.params.get("q") || "";
      pintarFotos(ruta.params);
      if (!navegacionNueva) window.scrollTo(0, posiciones[location.hash] || window.scrollY);
      hashAnterior = location.hash;
      return;
    }

    var html, tituloPagina = "", despues = null;
    switch (seccion) {
      case "inicio":
        html = vistaInicio(); marcarMenu("inicio"); break;
      case "fotos":
        html = vistaFotos(ruta.params); marcarMenu("fotos"); tituloPagina = "Fotos";
        despues = function () { pintarFotos(ruta.params); };
        break;
      case "partidos":
        html = vistaPartidos(ruta.params); marcarMenu("partidos"); tituloPagina = "Partidos"; break;
      case "categorias":
        html = vistaCategorias(); marcarMenu("categorias"); tituloPagina = "Categorías"; break;
      case "buscar":
        html = vistaBuscar(ruta.params); marcarMenu("buscar"); tituloPagina = "Buscar";
        despues = function () { pintarBuscar(ruta.params.get("q") || ""); };
        break;
      case "partido":
        var p = porId[ruta.partes[1]];
        html = vistaPartido(p); marcarMenu("fotos"); tituloPagina = p ? p.titulo + " · " + p.categoria : "Álbum no encontrado";
        if (p && foto > 0 && p.fotos.length) despues = function () { abrirVisor(p, foto - 1, false); };
        break;
      default:
        html = '<section class="bloque">' + vacio("Página no encontrada", "", '<a class="btn btn-principal" href="#/">Ir al inicio</a>') + "</section>";
    }

    main.innerHTML = '<div class="vista vista-' + seccion + '">' + html + "</div>";
    document.body.setAttribute("data-vista", seccion);
    document.title = (tituloPagina ? tituloPagina + " · " : "") + "MACABI BÁSQUET PH";
    rutaActual = clave;
    if (despues) despues();
    centrarChipsActivos();

    if (navegacionNueva) {
      window.scrollTo(0, 0);
      if (historialInterno > 0) main.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, posiciones[location.hash] || 0);
    }
    historialInterno++;
    hashAnterior = location.hash;
    actualizarBarra();
  }

  // Los clics en enlaces internos son navegación "nueva" (arriba de todo).
  // Atrás / adelante del navegador recupera la posición donde estabas.
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (a && a.hasAttribute("data-saltar")) {
      e.preventDefault(); main.focus(); return;
    }
    if (a && a.hasAttribute("data-volver") && historialInterno > 1) {
      e.preventDefault();
      history.back();
      return;
    }
    if (a && (a.getAttribute("href") || "").charAt(0) === "#") clicNavegacion = Date.now();

    var ir = e.target.closest("[data-ir]");
    if (ir) {
      var destino = document.getElementById(ir.getAttribute("data-ir"));
      if (destino) desplazarA(destino);
    }

    if (e.target.closest("[data-compartir]")) compartirAlbum();

    var ej = e.target.closest("[data-ejemplo]");
    if (ej) {
      var input = main.querySelector("[data-buscador] input");
      input.value = ej.getAttribute("data-ejemplo");
      alEscribir(input);
    }
  });

  window.addEventListener("hashchange", enrutar);

  // --- Buscador: resultados mientras escribís ---
  var temporizador;
  function alEscribir(input) {
    var q = input.value;
    var ruta = leerRuta();
    var seccion = ruta.partes[0];
    if (seccion === "buscar") {
      history.replaceState(null, "", "#/buscar" + (q ? "?q=" + encodeURIComponent(q) : ""));
      pintarBuscar(q);
    } else if (seccion === "fotos") {
      var p = ruta.params;
      if (q) p.set("q", q); else p.delete("q");
      var s = p.toString();
      history.replaceState(null, "", "#/fotos" + (s ? "?" + s : ""));
      pintarFotos(p);
    }
    hashAnterior = location.hash;
  }

  document.addEventListener("input", function (e) {
    if (!e.target.closest("[data-buscador]")) return;
    var input = e.target;
    var seccion = leerRuta().partes[0];
    if (seccion !== "buscar" && seccion !== "fotos") return; // en inicio busca al enviar
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { alEscribir(input); }, 120);
  });

  document.addEventListener("submit", function (e) {
    var form = e.target.closest("[data-buscador]");
    if (!form) return;
    e.preventDefault();
    var input = form.querySelector("input");
    var q = input.value.trim();
    var seccion = leerRuta().partes[0];
    input.blur(); // cierra el teclado del celular para ver los resultados
    if (seccion === "buscar" || seccion === "fotos") {
      alEscribir(input);
      var res = main.querySelector("[data-resultados]");
      if (res) desplazarA(res);
    } else {
      clicNavegacion = Date.now();
      location.hash = "#/buscar" + (q ? "?q=" + encodeURIComponent(q) : "");
    }
  });

  // Desplazamiento suave; si el navegador no lo hace, salta directo
  function desplazarA(nodo) {
    var suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    var inicio = window.scrollY;
    nodo.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
    if (suave) setTimeout(function () { if (window.scrollY === inicio) nodo.scrollIntoView(); }, 400);
  }

  // --- Compartir el enlace del álbum (WhatsApp, etc.) ---
  function compartirAlbum() {
    var ruta = leerRuta();
    var p = porId[ruta.partes[1]];
    var url = location.href.split("#")[0] + "#/partido/" + encodeURIComponent(ruta.partes[1] || "");
    var titulo = p ? p.titulo + " · " + p.categoria + " · " + U.fechaCorta(p.fecha) : "MACABI BÁSQUET PH";
    if (navigator.share) {
      navigator.share({ title: titulo, text: "Fotos de " + titulo + " — MACABI BÁSQUET PH", url: url }).catch(function () {});
    } else if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () { aviso("Enlace copiado. ¡Pegalo donde quieras!"); });
    } else {
      window.prompt("Copiá este enlace:", url);
    }
  }

  var avisoEl = document.getElementById("aviso"), avisoT;
  function aviso(texto) {
    avisoEl.textContent = texto;
    avisoEl.classList.add("aviso-visible");
    clearTimeout(avisoT);
    avisoT = setTimeout(function () { avisoEl.classList.remove("aviso-visible"); }, 2600);
  }

  // --- Barra superior: transparente sobre la portada, sólida al bajar ---
  var barra = document.getElementById("barra");
  function actualizarBarra() { barra.classList.toggle("barra-solida", window.scrollY > 24 || document.body.getAttribute("data-vista") !== "inicio"); }
  window.addEventListener("scroll", actualizarBarra, { passive: true });

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  enrutar();
})();
