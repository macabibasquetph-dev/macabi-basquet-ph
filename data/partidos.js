/* ==========================================================================
   MACABI BÁSQUET PH — DATOS DE PARTIDOS Y EVENTOS
   --------------------------------------------------------------------------
   Este es el ÚNICO archivo que tenés que editar para agregar partidos.
   El diseño de la página no se toca.

   CÓMO AGREGAR UN PARTIDO NUEVO
   1. Creá una carpeta dentro de /fotos con un nombre SIN espacios ni tildes.
      Ejemplo:  fotos/2026-10-04-u15-ferro
   2. Copiá tus fotos (JPG) dentro de esa carpeta.
   3. Copiá el bloque "PLANTILLA" de abajo, pegalo dentro de la lista
      "partidos" y completá los datos. El "id" tiene que ser IGUAL al nombre
      de la carpeta.
   4. Hacé doble clic en ACTUALIZAR-FOTOS.command (Mac) o
      ACTUALIZAR-FOTOS.bat (Windows) para que la página detecte las fotos.

   PLANTILLA (copiar desde { hasta }, incluida la coma final):

    {
      id: "2026-10-04-u15-ferro",     // = nombre de la carpeta en /fotos
      temporada: "2026",
      fecha: "2026-10-04",            // formato AÑO-MES-DÍA
      categoria: "U15",               // Premini, Mini, U13, U15, U17, U19, Primera u Otras
      equipo: "Macabi",
      rival: "Ferro",                 // si es un evento sin rival, borrá esta línea y usá "titulo"
      resultado: "70-65",             // opcional. Primero Macabi, después el rival
      lugar: "Buenos Aires",
      sede: "Gimnasio Macabi",        // opcional
      evento: "Torneo Metropolitano · Fecha 8", // opcional
      descripcion: "Texto libre.",    // opcional
      portada: "012.jpg"              // opcional: qué foto usar de tapa (si no, la primera)
    },

   Para un EVENTO sin rival (clínica, torneo, fiesta) — aparece en la sección Eventos:
    {
      id: "2026-12-10-fiesta-fin-de-anio",
      temporada: "2026",
      fecha: "2026-12-10",
      categoria: "Otras",
      titulo: "Fiesta de fin de año",
      lugar: "Buenos Aires"
    },
   ========================================================================== */

window.MACABI_DATOS = {

  // Logo que aparece en la portada (JPG o PNG dentro de la carpeta fotos)
  logo: "fotos/logo.jpg",

  // Foto de fondo de la portada (opcional). Vacío = fondo oscuro.
  // Para usar una foto: portada: "fotos/portada.jpg",
  portada: "",

  // Orden en que se muestran las categorías
  categorias: ["Premini", "Mini", "U13", "U15", "U17", "U19", "Primera", "Otras"],

  // Temporadas que querés mostrar aunque todavía no tengan partidos.
  // Las temporadas nuevas (2027, 2028...) también aparecen solas cuando cargás un partido.
  temporadas: ["2026"],

  // ----------------------------------------------------------------------
  // PARTIDOS Y EVENTOS (el orden no importa: la página los ordena por fecha)
  // ----------------------------------------------------------------------
  partidos: [

    // ↓↓↓ Pegá acá abajo los partidos (usá la PLANTILLA de arriba) ↓↓↓

    // ===== TIRA FORMATIVAS 2026 (U13, U15, U17, U19) =====
    {
      id: "2026-09-27-u13-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-09-27",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Club Macabi"
    },
    {
      id: "2026-09-27-u15-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-09-27",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Club Macabi"
    },
    {
      id: "2026-09-27-u17-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-09-27",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Club Macabi"
    },
    {
      id: "2026-09-27-u19-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-09-27",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-03-u13-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-10-03",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Cancha de Aldo Bonzi"
    },
    {
      id: "2026-10-03-u15-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-10-03",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Cancha de Aldo Bonzi"
    },
    {
      id: "2026-10-03-u17-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-10-03",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Cancha de Aldo Bonzi"
    },
    {
      id: "2026-10-03-u19-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-10-03",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Cancha de Aldo Bonzi"
    },
    {
      id: "2026-10-04-u13-all-boys",
      temporada: "2026",
      fecha: "2026-10-04",
      categoria: "U13",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-04-u15-all-boys",
      temporada: "2026",
      fecha: "2026-10-04",
      categoria: "U15",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-04-u17-all-boys",
      temporada: "2026",
      fecha: "2026-10-04",
      categoria: "U17",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-04-u19-all-boys",
      temporada: "2026",
      fecha: "2026-10-04",
      categoria: "U19",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-18-u13-deportivo-crovara",
      temporada: "2026",
      fecha: "2026-10-18",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Deportivo Crovara",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-18-u15-deportivo-crovara",
      temporada: "2026",
      fecha: "2026-10-18",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Deportivo Crovara",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-18-u17-deportivo-crovara",
      temporada: "2026",
      fecha: "2026-10-18",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Deportivo Crovara",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-18-u19-deportivo-crovara",
      temporada: "2026",
      fecha: "2026-10-18",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Deportivo Crovara",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-25-u13-huracan",
      temporada: "2026",
      fecha: "2026-10-25",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Huracán",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-25-u15-huracan",
      temporada: "2026",
      fecha: "2026-10-25",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Huracán",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-25-u17-huracan",
      temporada: "2026",
      fecha: "2026-10-25",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Huracán",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-25-u19-huracan",
      temporada: "2026",
      fecha: "2026-10-25",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Huracán",
      lugar: "Club Macabi"
    },
    {
      id: "2026-10-31-u13-circulo-urquiza",
      temporada: "2026",
      fecha: "2026-10-31",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Círculo Urquiza",
      lugar: "Club Círculo General Urquiza"
    },
    {
      id: "2026-10-31-u15-circulo-urquiza",
      temporada: "2026",
      fecha: "2026-10-31",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Círculo Urquiza",
      lugar: "Club Círculo General Urquiza"
    },
    {
      id: "2026-10-31-u17-circulo-urquiza",
      temporada: "2026",
      fecha: "2026-10-31",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Círculo Urquiza",
      lugar: "Club Círculo General Urquiza"
    },
    {
      id: "2026-10-31-u19-circulo-urquiza",
      temporada: "2026",
      fecha: "2026-10-31",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Círculo Urquiza",
      lugar: "Club Círculo General Urquiza"
    },
    {
      id: "2026-11-08-u13-nueva-chicago",
      temporada: "2026",
      fecha: "2026-11-08",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Nueva Chicago",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-08-u15-nueva-chicago",
      temporada: "2026",
      fecha: "2026-11-08",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Nueva Chicago",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-08-u17-nueva-chicago",
      temporada: "2026",
      fecha: "2026-11-08",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Nueva Chicago",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-08-u19-nueva-chicago",
      temporada: "2026",
      fecha: "2026-11-08",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Nueva Chicago",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-14-u13-san-lorenzo",
      temporada: "2026",
      fecha: "2026-11-14",
      categoria: "U13",
      equipo: "Macabi",
      rival: "San Lorenzo",
      lugar: "Cancha de San Lorenzo"
    },
    {
      id: "2026-11-14-u15-san-lorenzo",
      temporada: "2026",
      fecha: "2026-11-14",
      categoria: "U15",
      equipo: "Macabi",
      rival: "San Lorenzo",
      lugar: "Cancha de San Lorenzo"
    },
    {
      id: "2026-11-14-u17-san-lorenzo",
      temporada: "2026",
      fecha: "2026-11-14",
      categoria: "U17",
      equipo: "Macabi",
      rival: "San Lorenzo",
      lugar: "Cancha de San Lorenzo"
    },
    {
      id: "2026-11-14-u19-san-lorenzo",
      temporada: "2026",
      fecha: "2026-11-14",
      categoria: "U19",
      equipo: "Macabi",
      rival: "San Lorenzo",
      lugar: "Cancha de San Lorenzo"
    },
    {
      id: "2026-11-22-u13-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-11-22",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-22-u15-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-11-22",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-22-u17-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-11-22",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-22-u19-aldo-bonzi",
      temporada: "2026",
      fecha: "2026-11-22",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Aldo Bonzi",
      lugar: "Club Macabi"
    },
    {
      id: "2026-11-29-u13-all-boys-saavedra",
      temporada: "2026",
      fecha: "2026-11-29",
      categoria: "U13",
      equipo: "Macabi",
      rival: "All Boys Saavedra",
      lugar: "Cancha de All Boys Saavedra"
    },
    {
      id: "2026-11-29-u15-all-boys-saavedra",
      temporada: "2026",
      fecha: "2026-11-29",
      categoria: "U15",
      equipo: "Macabi",
      rival: "All Boys Saavedra",
      lugar: "Cancha de All Boys Saavedra"
    },
    {
      id: "2026-11-29-u17-all-boys-saavedra",
      temporada: "2026",
      fecha: "2026-11-29",
      categoria: "U17",
      equipo: "Macabi",
      rival: "All Boys Saavedra",
      lugar: "Cancha de All Boys Saavedra"
    },
    {
      id: "2026-11-29-u19-all-boys-saavedra",
      temporada: "2026",
      fecha: "2026-11-29",
      categoria: "U19",
      equipo: "Macabi",
      rival: "All Boys Saavedra",
      lugar: "Cancha de All Boys Saavedra"
    },
    {
      id: "2026-12-06-u13-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-12-06",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Náutico Buchardo"
    },
    {
      id: "2026-12-06-u15-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-12-06",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Náutico Buchardo"
    },
    {
      id: "2026-12-06-u17-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-12-06",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Náutico Buchardo"
    },
    {
      id: "2026-12-06-u19-nautico-buchardo",
      temporada: "2026",
      fecha: "2026-12-06",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Náutico Buchardo",
      lugar: "Náutico Buchardo"
    },
    {
      id: "2026-12-12-u13-all-boys",
      temporada: "2026",
      fecha: "2026-12-12",
      categoria: "U13",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Atlético All Boys"
    },
    {
      id: "2026-12-12-u15-all-boys",
      temporada: "2026",
      fecha: "2026-12-12",
      categoria: "U15",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Atlético All Boys"
    },
    {
      id: "2026-12-12-u17-all-boys",
      temporada: "2026",
      fecha: "2026-12-12",
      categoria: "U17",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Atlético All Boys"
    },
    {
      id: "2026-12-12-u19-all-boys",
      temporada: "2026",
      fecha: "2026-12-12",
      categoria: "U19",
      equipo: "Macabi",
      rival: "All Boys",
      lugar: "Club Atlético All Boys"
    },

  ]
};
