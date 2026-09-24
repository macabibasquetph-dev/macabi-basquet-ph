# MACABI BÁSQUET PH
**Fotografía de básquet • Momentos que quedan**

Página web para publicar las fotos de los partidos y eventos de básquet de Macabi.
Jugadores, familias y entrenadores entran desde el celular, encuentran su partido y ven o descargan las fotos.

- 100 % gratuita: sin pagos, suscripciones, bases de datos ni servicios pagos.
- HTML + CSS + JavaScript puro: no hay que instalar nada ni “compilar”.
- Las fotos se muestran y descargan **en su archivo original**, sin filtros, sin IA y sin retoques.

---

## 1. Estructura de carpetas

```
macabi-basquet-ph/
├── index.html                  ← la página (no hace falta tocarla)
├── LEEME.md                    ← este archivo
├── ACTUALIZAR-FOTOS.command    ← doble clic en Mac después de agregar fotos
├── ACTUALIZAR-FOTOS.bat        ← doble clic en Windows después de agregar fotos
├── css/
│   └── estilos.css             ← diseño (colores, tipografías, responsive)
├── js/
│   ├── app.js                  ← secciones, navegación, buscador y galerías
│   ├── visor.js                ← visor de fotos a pantalla completa
│   └── utilidades.js           ← fechas y búsqueda
├── data/
│   ├── partidos.js             ← ✏️ LOS PARTIDOS (lo único que editás)
│   └── fotos.js                ← lista de fotos (se genera sola)
├── fotos/
│   ├── portada.svg             ← foto principal de la portada (reemplazala)
│   └── 2026-09-20-u15-hebraica/   ← una carpeta por partido
│       ├── 001.jpg
│       ├── 002.jpg
│       └── miniaturas/         ← copias chicas para la galería (se crean solas)
├── herramientas/
│   └── actualizar_fotos.py     ← detecta fotos y crea miniaturas
└── img/                        ← ícono de la página
```

Las fotos que vienen incluidas son **ilustraciones de ejemplo** (dicen “FOTO DE EJEMPLO”) para mostrar cómo funciona el sitio. Reemplazalas por tus fotos.

---

## 2. Cómo verla en tu computadora

**Opción rápida:** doble clic en `index.html`. Se abre en el navegador y funciona.

**Opción recomendada** (así funciona igual que publicada, incluido el botón *Descargar*):
abrí la Terminal dentro de la carpeta `macabi-basquet-ph` y escribí:

```bash
python3 -m http.server 8000
```

Después entrá a **http://localhost:8000** en el navegador.
Para verla en tu iPhone, conectalo al mismo wifi y entrá a `http://IP-DE-TU-COMPU:8000`.

---

## 3. Cómo agregar un partido nuevo

**Paso 1: Creá la carpeta del partido** dentro de `fotos/`.
Usá solo minúsculas, números y guiones (sin espacios ni tildes). Se recomienda el formato `fecha-categoría-rival`:

```
fotos/2026-10-04-u15-ferro/
```

**Paso 2: Copiá tus fotos** (JPG) dentro de esa carpeta.
Se ordenan por nombre de archivo (`IMG_0001.jpg`, `IMG_0002.jpg`… o `001.jpg`, `002.jpg`…).

**Paso 3: Cargá los datos del partido** en `data/partidos.js`. Abrilo con cualquier editor de texto
(TextEdit en modo texto plano, Bloc de notas o el editor gratuito [VS Code](https://code.visualstudio.com/)) y agregá un bloque dentro de la lista `partidos`:

```js
{
  id: "2026-10-04-u15-ferro",     // IGUAL al nombre de la carpeta
  temporada: "2026",
  fecha: "2026-10-04",            // AÑO-MES-DÍA
  categoria: "U15",               // Premini, Mini, U13, U15, U17, U19, Primera u Otras
  equipo: "Macabi",
  rival: "Ferro",
  resultado: "70-65",             // opcional (primero Macabi)
  lugar: "Buenos Aires",
  sede: "Gimnasio Macabi",        // opcional
  evento: "Torneo Metropolitano · Fecha 13", // opcional
  descripcion: "Texto libre.",    // opcional
  portada: "IMG_0012.jpg"         // opcional: qué foto usar de tapa
},
```

> ⚠️ Cada bloque va entre `{ }` y termina con una **coma**. Los textos van **entre comillas**.
> Si la página muestra “Falta información”, casi siempre es una coma o comilla que falta.

**Evento sin rival** (clínica, torneo interno, fiesta): en vez de `rival` usá `titulo`:

```js
{
  id: "2026-12-10-fiesta-fin-de-anio",
  temporada: "2026",
  fecha: "2026-12-10",
  categoria: "Otras",
  titulo: "Fiesta de fin de año",
  lugar: "Buenos Aires"
},
```

**Paso 4: Doble clic en `ACTUALIZAR-FOTOS.command`** (Mac) o `ACTUALIZAR-FOTOS.bat` (Windows).
Esto:
- detecta todas las fotos de cada carpeta (no hace falta escribir sus nombres),
- crea miniaturas livianas para que la galería cargue rápido en el celular,
- te avisa si algo no coincide (una carpeta sin partido, un id mal escrito, fotos HEIC).

Los archivos originales **no se modifican nunca**. El visor y el botón *Descargar* siempre usan el original.

> En Mac, la primera vez puede aparecer un aviso de seguridad: clic derecho sobre el archivo → **Abrir** → **Abrir**.
> En Windows necesitás Python (gratis, en python.org). Para miniaturas en Windows: `pip install pillow` (opcional).

**Paso 5: Publicá los cambios** (ver punto 6).

---

## 4. Cómo agregar más fotos a un partido existente

1. Copiá las fotos nuevas en la carpeta del partido (`fotos/<id-del-partido>/`).
2. Doble clic en `ACTUALIZAR-FOTOS`.
3. Publicá.

Para **cambiar la foto de tapa** de un álbum, escribí su nombre en `portada:`.
Para **cambiar la foto grande de la portada** del sitio, copiá tu foto como `fotos/portada.jpg`
y en `data/partidos.js` cambiá `portada: "fotos/portada.svg"` por `portada: "fotos/portada.jpg"`.

**Formato de las fotos:** JPG (también sirven PNG y WEBP). El iPhone guarda en HEIC y los
navegadores no lo muestran: exportalas como JPG desde tu programa (Lightroom, Fotos, etc.) sin aplicar cambios.

**Temporadas futuras:** poné `temporada: "2027"` en los partidos nuevos y el filtro aparece solo.

---

## 5. Qué hace cada sección

| Sección | Qué muestra |
|---|---|
| **Inicio** | Portada, buscador, últimos 6 partidos y guía de 3 pasos |
| **Fotos** | Todos los álbumes con filtros por temporada y categoría + buscador |
| **Partidos** | Calendario de partidos agrupados por mes, con resultado |
| **Categorías** | Premini, Mini, U13, U15, U17, U19, Primera y Otras, con cantidad de álbumes |
| **Buscar** | Resultados mientras escribís: rival, categoría, fecha, evento, lugar |
| **Álbum** | Datos del partido, marcador, galería y botón para compartir por WhatsApp |
| **Visor** | Foto en grande, anterior/siguiente (deslizando o con flechas), descargar y compartir |

El buscador entiende: `U15`, `sub 15`, `u-15`, `Hebraica`, `Macabi vs. Hebraica`, `20/09`, `20/9/2026`, `septiembre`, `torneo`… sin importar tildes ni mayúsculas.

Cada álbum y cada foto tienen su propio enlace (por ejemplo `…/#/partido/2026-09-20-u15-hebraica?foto=12`), así se puede mandar una foto puntual por WhatsApp.

---

## 6. Cómo publicarla gratis

La página es un sitio “estático”: cualquier hosting gratuito sirve. No usa base de datos ni servidor propio.

> **Para editar entre varios organizadores con actualización automática**, seguí
> [ORGANIZADORES.md](ORGANIZADORES.md): GitHub + GitHub Pages. Se edita desde el navegador,
> GitHub detecta las fotos, crea las miniaturas y publica solo (archivo `.github/workflows/publicar.yml`).

### Opción recomendada: GitHub + Cloudflare Pages (gratis, sin tarjeta)
Cloudflare Pages no cobra por el tráfico en su plan gratuito, algo importante para un sitio con muchas fotos.

1. Creá una cuenta gratis en **github.com** e instalá **GitHub Desktop** (gratis).
2. En GitHub Desktop: *File → Add local repository* → elegí la carpeta `macabi-basquet-ph` → *Publish repository*.
3. Creá una cuenta gratis en **pages.cloudflare.com** → *Create project* → *Connect to Git* → elegí el repositorio.
   Configuración de build: **Framework: None**, **Build command: vacío**, **Output directory: `/`**.
4. Te da una dirección como `macabi-basquet-ph.pages.dev`.

**Para subir partidos nuevos:** agregás fotos y datos → `ACTUALIZAR-FOTOS` → en GitHub Desktop escribís un mensaje (“Partido U15 vs Ferro”) → *Commit* → *Push*. En uno o dos minutos la página se actualiza sola.

### Alternativas también gratuitas
- **GitHub Pages:** en el repositorio → *Settings → Pages → Deploy from branch → main*. Dirección: `usuario.github.io/macabi-basquet-ph`. Límite aproximado: 1 GB de sitio.
- **Netlify Drop** (app.netlify.com/drop): arrastrás la carpeta y queda publicada. Útil para probar.

### Sobre el espacio
Los límites gratuitos cambian con el tiempo; hoy son aproximadamente estos: GitHub recomienda repositorios de menos de 1–5 GB,
y Cloudflare Pages admite hasta 20.000 archivos por sitio y hasta 25 MB por archivo.
Con JPG de 3–6 MB entran varios cientos de fotos por GB. Si en algún momento el sitio crece mucho,
la solución gratuita es separar por temporada (un repositorio/sitio por año, por ejemplo `macabi-2026.pages.dev`)
y enlazarlos entre sí.

---

## 7. Personalizar

- **Colores:** al principio de `css/estilos.css` (`--naranja`, `--negro`, etc.).
- **Categorías:** en `data/partidos.js` → `categorias: [...]`.
- **Textos del pie y portada:** en `index.html` y en `js/app.js` (función `vistaInicio`).

## 8. Tecnología y costo

| Parte | Herramienta | Costo |
|---|---|---|
| Página | HTML, CSS y JavaScript sin librerías | Gratis |
| Tipografías | Google Fonts (Barlow y Barlow Condensed) | Gratis |
| Fotos y datos | Archivos en la misma carpeta (sin base de datos) | Gratis |
| Miniaturas | `sips` (incluido en macOS) o Pillow | Gratis |
| Publicación | Cloudflare Pages / GitHub Pages / Netlify | Gratis |

No hay APIs pagas, suscripciones ni servicios que pidan tarjeta de crédito.

---

©️ 2026 Macabi Básquet PH
