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

    // ↓↓↓ Pegá acá abajo los partidos (usá la PLANTILLA de arriba) ↓↓↓

  ]
};
