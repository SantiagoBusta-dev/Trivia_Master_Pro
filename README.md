# Trivia Master Pro

Juego de trivia en HTML + CSS + JS (sin servidor). Progreso guardado en el celular (localStorage).

## Archivos
- `index.html`, `css/style.css`, `js/data.js`, `js/snd.js`, `js/app.js`: el juego.
- `viewer_avatares.html` y `viewer_mascotas.html`: visores 3D (avatares y mascotas). Van en la raíz.
- `questions/`: preguntas. `manifest.js` carga solos `preguntas_00.js` a `preguntas_19.js`.
- `sonidos/`: sonidos propios (opcional). Si falta un archivo, el juego usa un sonido sintético.

## Agregar preguntas
Subí el archivo nuevo (`preguntas_01.js`, etc.) a la carpeta `questions/`. No hay que tocar código.
Formato: `QB.push([ ["categoria", dificultad_1_a_3, "Pregunta", ["A","B","C","D"], indice_correcto_0_a_3, "Pista"], ... ]);`

## Agregar sonidos
Copiá los `.mp3` en `sonidos/<carpeta>/<nombre>.mp3` con los nombres de la lista de sonidos.

## Publicar
GitHub Pages: Settings → Pages → Branch `main` → `/ (root)`.
Los visores 3D cargan three.js desde internet (cdnjs / jsdelivr), así que hace falta conexión.
