# MACABI BÁSQUET PH — Guía para organizadores

La página se edita entre **tres organizadores** desde **github.com** (gratis).
Cada vez que alguien sube fotos o edita un partido, **la página se actualiza sola en 1–2 minutos**.
No hace falta instalar nada: alcanza con el navegador (también desde el celular).

```
Organizador sube fotos / edita partido en GitHub
        ↓
GitHub revisa que no haya errores, detecta las fotos y crea las miniaturas
        ↓
La página pública se actualiza sola  →  https://USUARIO.github.io/macabi-basquet-ph/
```

---

## A. Configuración inicial (una sola vez, la hace UNA persona)

1. **Crear cuenta** en https://github.com (gratis, sin tarjeta).
2. **Crear el repositorio:** botón **+** (arriba a la derecha) → **New repository**
   - Nombre: `macabi-basquet-ph`
   - Visibilidad: **Public** (GitHub Pages es gratis solo con repositorios públicos; la página igual es pública)
   - **Create repository**
3. **Subir el proyecto:** en el repositorio nuevo → **uploading an existing file** →
   arrastrá **todo el contenido** de la carpeta `macabi-basquet-ph` (incluida la carpeta oculta `.github`) → **Commit changes**.
   > La carpeta `.github` está oculta en Mac. En Finder presioná `Cmd + Shift + .` para verla.
   > También se puede subir con **GitHub Desktop** (gratis): *File → Add local repository → Publish repository*.
4. **Activar la página:** **Settings → Pages → Source: GitHub Actions**.
5. **Primera publicación:** pestaña **Actions → Publicar página → Run workflow**.
   Cuando aparece el tilde verde ✅, la página queda en:
   **`https://USUARIO.github.io/macabi-basquet-ph/`** ← este es el link para compartir.
6. **Invitar a los otros dos organizadores:** **Settings → Collaborators → Add people** →
   escribir su usuario o email de GitHub. Cada uno acepta la invitación que le llega por mail.
   (Primero cada uno tiene que crearse su cuenta gratis en github.com.)

Listo: los tres pueden editar y la página se actualiza sola.

---

## B. Subir las fotos de un partido nuevo

**1. Subir las fotos a una carpeta nueva**
- En el repositorio, entrá a la carpeta **`fotos`**.
- **Add file → Upload files**.
- Desde la computadora, **arrastrá la carpeta entera** del partido (no las fotos sueltas),
  nombrada así: `2026-10-04-u15-ferro` (fecha-categoría-rival, sin espacios ni tildes).
- Abajo: **Commit changes**.

> Límites de la subida por web: hasta 100 archivos por vez y 25 MB por foto.
> Si son más de 100, subilas en tandas a la misma carpeta (entrando a la carpeta → Add file → Upload files).
> Fotos en **JPG**. Las HEIC del iPhone no se ven en los navegadores: exportalas como JPG sin retocar.

**2. Cargar los datos del partido**
- Abrí **`data/partidos.js`** → ícono del lápiz ✏️ (**Edit**).
- Copiá este bloque debajo de la línea `partidos: [` y completalo:

```js
    {
      id: "2026-10-04-u15-ferro",
      temporada: "2026",
      fecha: "2026-10-04",
      categoria: "U15",
      equipo: "Macabi",
      rival: "Ferro",
      resultado: "70-65",
      lugar: "Buenos Aires",
      sede: "Gimnasio Macabi",
      evento: "Torneo Metropolitano · Fecha 13"
    },
```

- **Commit changes** → escribí qué hiciste (ej.: “Partido U15 vs Ferro”) → **Commit changes**.

**3. Esperar 1–2 minutos** y recargar la página. Ya está.

Se puede hacer en cualquier orden (primero datos o primero fotos). Si el partido todavía no tiene fotos,
la página muestra “Fotos en camino”.

---

## C. Reglas para no pisarse entre los tres

- Cada uno puede subir fotos al mismo tiempo sin problema (cada partido tiene su carpeta).
- `data/partidos.js` lo pueden editar los tres. Si dos lo editan al mismo tiempo,
  GitHub avisa al segundo; en ese caso recargá la página y volvé a pegar tu bloque.
- Conviene que **el id y el nombre de la carpeta** sigan siempre el formato `AAAA-MM-DD-categoria-rival`.

---

## D. ¿Y si algo sale mal?

- En la pestaña **Actions**, cada actualización aparece con ✅ (bien) o ❌ (error).
- Si hay ❌, **la página pública sigue funcionando con la versión anterior**: nada se rompe.
  Entrá al ❌ → paso rojo → leé el mensaje (por ejemplo *“Fecha mal escrita en…”* o *“Unexpected token”*,
  que suele ser una coma o comilla que falta). Corregí `data/partidos.js` y guardá de nuevo.
- GitHub además le manda un mail a quien hizo el cambio con error.
- Para volver atrás un cambio: abrí el archivo → **History** → elegí la versión anterior.

## E. Cosas útiles

- **Cambiar la foto de tapa de un álbum:** en el partido agregá `portada: "IMG_0012.jpg"`.
- **Cambiar la foto grande de la portada:** subí tu foto como `fotos/portada.jpg` y en `data/partidos.js`
  cambiá `portada: "fotos/portada.svg"` por `portada: "fotos/portada.jpg"`.
- **Borrar un partido de ejemplo:** borrá su bloque en `data/partidos.js` y su carpeta en `fotos`
  (dentro de la carpeta → los tres puntitos **…** → **Delete directory**).
- **Nueva temporada:** usá `temporada: "2027"` y el filtro aparece solo.
- **Dirección propia** (ej. `macabibasquetph.com`): opcional; el dominio se paga aparte.
  El link `USUARIO.github.io/...` es gratis para siempre.

Todo esto es gratis: GitHub, GitHub Actions y GitHub Pages no piden tarjeta de crédito.
