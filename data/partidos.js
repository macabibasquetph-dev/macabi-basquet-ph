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

   Para un EVENTO sin rival (clínica, torneo, fiesta):
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

  // Foto grande de la portada (reemplazala por una tuya: por ejemplo "fotos/portada.jpg")
  portada: "fotos/portada.svg",

  // Orden en que se muestran las categorías
  categorias: ["Premini", "Mini", "U13", "U15", "U17", "U19", "Primera", "Otras"],

  // Temporadas que querés mostrar aunque todavía no tengan partidos.
  // Las temporadas nuevas (2027, 2028...) también aparecen solas cuando cargás un partido.
  temporadas: ["2026"],

  // ----------------------------------------------------------------------
  // PARTIDOS Y EVENTOS (el orden no importa: la página los ordena por fecha)
  // ----------------------------------------------------------------------
  partidos: [
    {
      id: "2026-09-20-u15-hebraica",
      temporada: "2026",
      fecha: "2026-09-20",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Hebraica",
      resultado: "68-61",
      lugar: "Buenos Aires",
      sede: "Gimnasio Macabi",
      evento: "Torneo Metropolitano · Fecha 12",
      descripcion: "Clásico de la categoría con estadio lleno. Macabi lo cerró en el último cuarto con un parcial de 14-4.",
      portada: "003.svg"
    },
    {
      id: "2026-09-13-primera-hacoaj",
      temporada: "2026",
      fecha: "2026-09-13",
      categoria: "Primera",
      equipo: "Macabi",
      rival: "Náutico Hacoaj",
      resultado: "74-79",
      lugar: "Tigre",
      sede: "Náutico Hacoaj",
      evento: "Liga Metropolitana · Fecha 18"
    },
    {
      id: "2026-09-06-u17-ferro",
      temporada: "2026",
      fecha: "2026-09-06",
      categoria: "U17",
      equipo: "Macabi",
      rival: "Ferro",
      resultado: "81-70",
      lugar: "Buenos Aires",
      sede: "Gimnasio Macabi",
      evento: "Torneo Metropolitano · Fecha 11"
    },
    {
      id: "2026-08-30-mini-hebraica",
      temporada: "2026",
      fecha: "2026-08-30",
      categoria: "Mini",
      equipo: "Macabi",
      rival: "Hebraica",
      lugar: "Buenos Aires",
      sede: "Sede Hebraica",
      evento: "Encuentro de Minibásquet",
      descripcion: "En Mini no se lleva resultado: lo importante es jugar y divertirse."
    },
    {
      id: "2026-08-23-u13-obras",
      temporada: "2026",
      fecha: "2026-08-23",
      categoria: "U13",
      equipo: "Macabi",
      rival: "Obras",
      resultado: "55-58",
      lugar: "Buenos Aires",
      sede: "Estadio Obras",
      evento: "Torneo Metropolitano · Fecha 9"
    },
    {
      id: "2026-08-16-premini-encuentro",
      temporada: "2026",
      fecha: "2026-08-16",
      categoria: "Premini",
      titulo: "Encuentro de Premini",
      lugar: "Buenos Aires",
      sede: "Gimnasio Macabi",
      evento: "Jornada recreativa",
      descripcion: "Más de 60 chicos y chicas de cinco clubes compartieron una mañana de básquet."
    },
    {
      id: "2026-08-09-u19-italiano",
      temporada: "2026",
      fecha: "2026-08-09",
      categoria: "U19",
      equipo: "Macabi",
      rival: "Club Italiano",
      resultado: "90-84",
      lugar: "Buenos Aires",
      sede: "Club Italiano",
      evento: "Torneo Metropolitano · Fecha 8"
    },
    {
      id: "2026-07-18-torneo-invierno",
      temporada: "2026",
      fecha: "2026-07-18",
      categoria: "Otras",
      titulo: "Torneo de Invierno",
      lugar: "Buenos Aires",
      sede: "Gimnasio Macabi",
      evento: "Torneo interno · Vacaciones de invierno",
      descripcion: "Tres días de básquet con todas las categorías formativas del club."
    }
  ]
};
