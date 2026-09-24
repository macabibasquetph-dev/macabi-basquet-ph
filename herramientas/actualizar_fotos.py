#!/usr/bin/env python3
"""
MACABI BÁSQUET PH — Actualizar fotos
====================================

Recorre la carpeta /fotos, encuentra las fotos de cada partido y escribe
data/fotos.js para que la página las muestre. No hace falta escribir a mano
el nombre de cada foto.

Además crea MINIATURAS (copias chicas) en fotos/<partido>/miniaturas/ para que
la galería cargue rápido en el celular. Los ARCHIVOS ORIGINALES NO SE TOCAN:
nunca se modifican, comprimen, filtran ni renombran. El visor y el botón
"Descargar" siempre usan el original.

Uso:
  Mac:      doble clic en ACTUALIZAR-FOTOS.command
  Windows:  doble clic en ACTUALIZAR-FOTOS.bat
  Terminal: python3 herramientas/actualizar_fotos.py [--sin-miniaturas]

Solo usa Python (gratis). Para las miniaturas usa "sips" (viene con macOS) o,
en Windows/Linux, la librería gratuita Pillow si está instalada
(pip install pillow). Si no hay ninguna, la página funciona igual usando los
originales en la galería (solo que carga un poco más lento).
"""

import json
import os
import re
import shutil
import subprocess
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARPETA_FOTOS = os.path.join(RAIZ, "fotos")
ARCHIVO_DATOS = os.path.join(RAIZ, "data", "partidos.js")
ARCHIVO_SALIDA = os.path.join(RAIZ, "data", "fotos.js")

VISIBLES = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"}
NO_WEB = {".heic", ".heif", ".tif", ".tiff", ".cr2", ".cr3", ".nef", ".arw", ".dng", ".raf"}
SIN_MINIATURA = {".svg", ".gif"}
LADO_MINIATURA = 900  # px del lado más largo
CARPETA_MINI = "miniaturas"


def orden_natural(nombre):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", nombre)]


def motor_miniaturas():
    if sys.platform == "darwin" and shutil.which("sips"):
        return "sips"
    try:
        import PIL  # noqa: F401
        return "pillow"
    except ImportError:
        return None


def crear_miniatura(motor, origen, destino):
    if motor == "sips":
        r = subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82",
             "-Z", str(LADO_MINIATURA), origen, "--out", destino],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return r.returncode == 0 and os.path.exists(destino)
    if motor == "pillow":
        from PIL import Image, ImageOps
        with Image.open(origen) as im:
            im = ImageOps.exif_transpose(im)
            im.thumbnail((LADO_MINIATURA, LADO_MINIATURA))
            im.convert("RGB").save(destino, "JPEG", quality=82)
        return True
    return False


def ids_en_datos():
    try:
        with open(ARCHIVO_DATOS, encoding="utf-8") as f:
            texto = f.read()
    except OSError:
        return []
    # Ignora comentarios (la plantilla) para no contar partidos de ejemplo
    texto = re.sub(r"/\*.*?\*/", "", texto, flags=re.S)
    texto = re.sub(r"//[^\n]*", "", texto)
    return re.findall(r"\bid\s*:\s*[\"']([^\"']+)[\"']", texto)


def main():
    sin_miniaturas = "--sin-miniaturas" in sys.argv
    motor = None if sin_miniaturas else motor_miniaturas()

    print("\n🏀  MACABI BÁSQUET PH — Actualizando fotos...\n")
    if not os.path.isdir(CARPETA_FOTOS):
        print("No encontré la carpeta 'fotos'.")
        return 1

    resultado = {}
    avisos = []
    total = 0

    for carpeta in sorted(os.listdir(CARPETA_FOTOS)):
        ruta = os.path.join(CARPETA_FOTOS, carpeta)
        if not os.path.isdir(ruta) or carpeta.startswith((".", "_")):
            continue
        if re.search(r"[^a-zA-Z0-9\-_]", carpeta):
            avisos.append(f"La carpeta '{carpeta}' tiene espacios, tildes o símbolos. "
                          "Renombrala usando solo letras, números y guiones.")

        fotos = []
        for nombre in sorted(os.listdir(ruta), key=orden_natural):
            completo = os.path.join(ruta, nombre)
            if nombre.startswith(".") or not os.path.isfile(completo):
                continue
            ext = os.path.splitext(nombre)[1].lower()
            if ext in VISIBLES:
                fotos.append(nombre)
            elif ext in NO_WEB:
                avisos.append(f"{carpeta}/{nombre}: los navegadores no muestran archivos {ext.upper()}. "
                              "Exportala como JPG (sin retocar) y volvé a correr esta herramienta.")

        mini_ok = False
        if fotos and motor:
            dir_mini = os.path.join(ruta, CARPETA_MINI)
            os.makedirs(dir_mini, exist_ok=True)
            mini_ok = True
            nuevas = 0
            for nombre in fotos:
                ext = os.path.splitext(nombre)[1].lower()
                if ext in SIN_MINIATURA:
                    mini_ok = False
                    continue
                origen = os.path.join(ruta, nombre)
                destino = os.path.join(dir_mini, os.path.splitext(nombre)[0] + ".jpg")
                if os.path.exists(destino) and os.path.getmtime(destino) >= os.path.getmtime(origen):
                    continue
                try:
                    if crear_miniatura(motor, origen, destino):
                        nuevas += 1
                    else:
                        mini_ok = False
                except Exception as e:  # noqa: BLE001
                    mini_ok = False
                    avisos.append(f"No pude crear la miniatura de {carpeta}/{nombre}: {e}")
            if nuevas:
                print(f"   ↳ {nuevas} miniaturas nuevas en {carpeta}")
            if not os.listdir(dir_mini):
                os.rmdir(dir_mini)

        resultado[carpeta] = {"fotos": fotos, "miniaturas": mini_ok}
        total += len(fotos)
        print(f"   ✔ {carpeta}: {len(fotos)} fotos")

    ids = ids_en_datos()
    for i in ids:
        if i not in resultado:
            avisos.append(f"El partido '{i}' está en data/partidos.js pero no existe la carpeta fotos/{i}")
        elif not resultado[i]["fotos"]:
            avisos.append(f"La carpeta fotos/{i} está vacía (la página mostrará 'Fotos en camino').")
    for c in resultado:
        if ids and c not in ids:
            avisos.append(f"La carpeta fotos/{c} no tiene un partido en data/partidos.js "
                          "(agregalo con ese mismo id para que aparezca).")

    with open(ARCHIVO_SALIDA, "w", encoding="utf-8") as f:
        # Sin fecha/hora adentro: si las fotos no cambian, el archivo queda idéntico
        # (así varias actualizaciones seguidas no chocan entre sí).
        f.write("/* ARCHIVO GENERADO AUTOMÁTICAMENTE por herramientas/actualizar_fotos.py\n")
        f.write("   No hace falta editarlo a mano: se actualiza solo cuando se suben fotos. */\n")
        f.write("window.MACABI_FOTOS = ")
        json.dump(resultado, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print(f"\n✅ Listo: {len(resultado)} álbumes y {total} fotos.")
    if not motor and not sin_miniaturas:
        print("ℹ️  No se crearon miniaturas (no encontré 'sips' ni 'Pillow'). La página funciona igual.")
    if avisos:
        print("\n⚠️  Revisá esto:")
        for a in avisos:
            print("   • " + a)
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
