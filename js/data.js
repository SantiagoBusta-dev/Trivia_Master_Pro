// Datos del juego: para agregar contenido solo tocás este archivo.
const CATS={ciencia:'🔬 Ciencia',geografia:'🌎 Geografía',historia:'📜 Historia',tecnologia:'💻 Tecnología',deportes:'⚽ Deportes',entretenimiento:'🎬 Entretenimiento',gaming:'🎮 Gaming',general:'🧠 Cultura general',matematica:'➗ Matemática'};
// [categoría, dificultad 1-3, pregunta, opciones, índice correcto, pista]
const Q=[
['ciencia',1,'¿Cuál es el planeta más cercano al Sol?',['Mercurio','Venus','Marte','Júpiter'],0,'Es el más pequeño'],
['ciencia',1,'¿Qué gas necesitamos para respirar?',['Oxígeno','Helio','Hidrógeno','Carbono'],0,'Lo producen las plantas'],
['ciencia',2,'¿Cuál es el símbolo químico del oro?',['Au','Ag','Or','Go'],0,'Viene del latín aurum'],
['ciencia',3,'¿Cuántos huesos tiene un adulto?',['206','180','256','300'],0,'Más de 200'],
['geografia',1,'¿Cuál es la capital de Argentina?',['Buenos Aires','Córdoba','Rosario','Mendoza'],0,'Está sobre el Río de la Plata'],
['geografia',1,'¿En qué continente está Egipto?',['África','Asia','Europa','Oceanía'],0,'Allí está el desierto del Sahara'],
['geografia',2,'¿Cuál es el río más largo de Sudamérica?',['Amazonas','Paraná','Orinoco','Magdalena'],0,'Atraviesa Brasil'],
['geografia',3,'¿Cuál es la capital de Australia?',['Canberra','Sídney','Melbourne','Perth'],0,'No es la ciudad más grande'],
['historia',1,'¿En qué año llegó Colón a América?',['1492','1510','1453','1600'],0,'Fines del siglo XV'],
['historia',1,'¿En qué año se declaró la independencia argentina?',['1810','1816','1853','1776'],1,'Fue en Tucumán'],
['historia',2,'¿Qué civilización construyó Machu Picchu?',['Inca','Maya','Azteca','Olmeca'],0,'Vivían en los Andes'],
['historia',3,'¿En qué año cayó el Muro de Berlín?',['1989','1991','1975','1961'],0,'Fines de los años 80'],
['tecnologia',1,'¿Qué lenguaje da estructura a una página web?',['HTML','Excel','SQL','Word'],0,'Sus siglas terminan en ML'],
['tecnologia',1,'¿Cuál de estas es una red social?',['Instagram','Linux','Python','Chrome'],0,'Se comparten fotos'],
['tecnologia',2,'¿Qué significa CPU?',['Unidad Central de Procesamiento','Computadora Personal Unida','Control Principal de Usuario','Centro de Procesos Universal'],0,'Es el "cerebro" de la computadora'],
['tecnologia',3,'¿Cuántos bits tiene un byte?',['4','8','16','32'],1,'Es una potencia de 2'],
['deportes',1,'¿Cuántos jugadores tiene un equipo de fútbol en la cancha?',['11','9','10','12'],0,'Incluye al arquero'],
['deportes',1,'¿Qué selección ganó el Mundial 2022?',['Argentina','Francia','Brasil','Croacia'],0,'Se jugó en Qatar'],
['deportes',2,'¿Cuántas Copas del Mundo ganó Argentina hasta 2022?',['2','3','4','5'],1,'1978, 1986 y 2022'],
['deportes',3,'¿Dónde se jugó el primer Mundial, en 1930?',['Uruguay','Brasil','Italia','Francia'],0,'Ganó el país anfitrión'],
['entretenimiento',1,'¿Cómo se llama el ratón símbolo de Disney?',['Mickey','Stuart','Jerry','Pinky'],0,'Su novia es Minnie'],
['entretenimiento',1,'¿Qué instrumento tiene teclas blancas y negras?',['Piano','Guitarra','Violín','Flauta'],0,'Tiene 88 teclas'],
['entretenimiento',2,'¿Quién dirigió Titanic (1997)?',['James Cameron','Steven Spielberg','Ridley Scott','Tim Burton'],0,'También hizo Avatar'],
['entretenimiento',3,'¿Cuántos Anillos de Poder existen en El Señor de los Anillos?',['20','19','9','12'],0,'3 + 7 + 9 + 1'],
['gaming',1,'¿Cómo se llama el fontanero de Nintendo con gorra roja?',['Mario','Luigi','Wario','Sonic'],0,'Su hermano es Luigi'],
['gaming',1,'¿Qué juego tiene bloques que caen y se encajan?',['Tetris','Pac-Man','Pong','Snake'],0,'Se completan líneas'],
['gaming',2,'¿Cómo se llama la princesa que protege Link?',['Zelda','Peach','Daisy','Samus'],0,'El juego lleva su nombre'],
['gaming',3,'¿Qué Pokémon es el número 1 de la Pokédex?',['Bulbasaur','Pikachu','Charmander','Squirtle'],0,'Es de tipo planta'],
['general',1,'¿Cuántos colores tiene el arcoíris?',['7','5','6','8'],0,'Rojo, naranja, amarillo...'],
['general',1,'¿Cuál es el océano más grande?',['Pacífico','Atlántico','Índico','Ártico'],0,'Su nombre significa "tranquilo"'],
['general',2,'¿Quién pintó la Mona Lisa?',['Leonardo da Vinci','Picasso','Van Gogh','Dalí'],0,'También fue inventor'],
['general',3,'¿Cuál es el hueso más largo del cuerpo humano?',['Fémur','Húmero','Tibia','Radio'],0,'Está en el muslo'],
['matematica',1,'¿Cuánto es 7 × 8?',['56','54','48','64'],0,'7 × 8 = 50 + 6'],
['matematica',1,'¿Cuál es la raíz cuadrada de 144?',['12','14','11','13'],0,'12 × 12'],
['matematica',2,'¿Cuánto es el 15% de 200?',['30','15','20','25'],0,'10% son 20'],
['matematica',3,'¿Cuánto es 2 elevado a la 10?',['1024','512','2048','100'],0,'Es un kibibyte']
];
const AV=[['a0','🧑','Explorador',0],['a1','🧑‍🔬','Científico',80],['a2','🧑‍🚀','Astronauta',150],['a3','🥷','Ninja',200],['a4','🧙','Mago',300],['a5','🦸','Héroe',400]];
// [id, emoji, nombre, precio, animación, frase, extra]
const PETS=[['p0','🐱','Gato naranja',0,'lick','Miau'],['p1','🐈‍⬛','Gato negro',120,'wag','Prrr...'],['p2','🐶','Perro',150,'wag','¡Guau!'],['p3','🐼','Panda',250,'chew','Ñam ñam','🎋'],['p4','🐰','Conejo',200,'hop','¡Hop!'],['p5','🦌','Ciervo',300,'chew','Ñam','🌿'],['p6','🐐','Cabra Messi',1000,'baa','¡Messi! ¡Messi!']];
