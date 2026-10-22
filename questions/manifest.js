// Lista de archivos de preguntas. Para sumar preguntas, subí el archivo nuevo a esta carpeta
// (preguntas_01.js, preguntas_02.js, ...) y el juego lo carga solo. Si un archivo no existe, se ignora.
const QFILES=[];for(let i=0;i<=19;i++)QFILES.push('preguntas_'+String(i).padStart(2,'0')+'.js');
