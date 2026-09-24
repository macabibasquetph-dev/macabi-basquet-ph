#!/bin/bash
# Doble clic en este archivo (Mac) para que la página detecte las fotos nuevas.
cd "$(dirname "$0")"
python3 herramientas/actualizar_fotos.py
echo ""
read -n 1 -s -r -p "Presioná cualquier tecla para cerrar..."
