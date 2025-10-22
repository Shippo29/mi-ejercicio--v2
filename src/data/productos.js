import imgteclado from "../assets/teclado.png";
import img3ds from "../assets/3ds.jpg";
import asusryzen from "../assets/asustuf.jpg";
import asustuf from "../assets/asusryzen.jpg";
import audifonoshyper from "../assets/audifonoshyper.jpg";
import explodingkittens from "../assets/explodingkittens.jpg";
import lenovoloq from "../assets/lenovoloq.jpg";
import lenovoloqryzen from "../assets/lenovoloqryzen.jpg";
// nota: import de logo eliminado porque no se usa en este módulo
import monitorasus from "../assets/monitorasus.jpg";
import monopoly from "../assets/monopoly.jpg";
import polilla from "../assets/polilla.jpg";
import ps4 from "../assets/ps4.jpg";
import ps5 from "../assets/ps5.jpg";
import subwoofer from "../assets/subwoofer.jpg";
import switch2 from "../assets/switch2.jpg";

import unomercy from "..//assets/unonomercy.jpg";
import placeholder from "../assets/placeholder.svg";

const productos = [
  {
    id: 1,
    categoria: "Juegos de Mesa",
    nombre: "Monopoly",
    precio: 8490,
    imagen: monopoly,
    descripcion:
      "Juego económico de 2 a 8 jugadores donde el objetivo es comprar, alquilar y vender propiedades.",
  },
  {
    id: 2,
    categoria: "Juegos de Mesa",
    nombre: "Uno no mercy",
    precio: 8000,
    imagen: unomercy,
    descripcion:
      "Versión intensa del clásico UNO con 56 cartas nuevas, penalizaciones acumulables y reglas agresivas.",
  },
  {
    id: 3,
    categoria: "Juegos de Mesa",
    nombre: "Exploding Kittens",
    precio: 9990,
    imagen: explodingkittens,
    descripcion:
      "Juego de cartas estratégico donde los jugadores deben evitar a toda costa robar un Exploding Kitten.",
  },
  {
    id: 4,
    categoria: "Juegos de Mesa",
    nombre: "Polilla Tramposa",
    precio: 8990,
    imagen: polilla,
    descripcion:
      "Juego de cartas en el que hacer trampa no solo está permitido, ¡es necesario para ganar!",
  },
  {
    id: 5,
    categoria: "Accesorios",
    nombre: "Teclado Gamer ASUS TUF K3 Gen II",
    precio: 74990,
    imagen: imgteclado,
    descripcion:
      "Teclado compacto de 97 teclas con switches óptico-mecánicos RGB y diseño duradero IP57.",
    descuento: 0.15,
  },
  {
    id: 6,
    categoria: "Accesorios",
    nombre: "Auriculares HyperX Cloud Alpha Wireless",
    precio: 194094,
    imagen: audifonoshyper,
    descripcion:
      "Audífonos inalámbricos con hasta 300 horas de batería, sonido DTS y estructura de aluminio.",
  },
  {
    id: 7,
    categoria: "Accesorios",
    nombre: "Monitor ASUS TUF VG27AQ3A",
    precio: 179900,
    imagen: monitorasus,
    descripcion:
      "Monitor QHD 27'' con 180Hz, AMD FreeSync, G-SYNC y 1ms de respuesta.",
  },
  {
    id: 8,
    categoria: "Accesorios",
    nombre: "Subwoofer Monster Games Burst 2.1",
    precio: 19745,
    imagen: subwoofer,
    descripcion:
      "Sistema de sonido compacto con 2 satélites y subwoofer RGB, conexión AUX y USB.",
  },
  {
    id: 9,
    categoria: "Consolas",
    nombre: "PlayStation 4 Slim 1TB",
    precio: 189990,
    imagen: ps4,
    descripcion:
      "Consola PS4 Slim de 1TB con gran catálogo de juegos y accesorios.",
  },
  {
    id: 10,
    categoria: "Consolas",
    nombre: "Nintendo Switch 2",
    precio: 599990,
    imagen: switch2,
    descripcion:
      "Versión mejorada (rumores) de la consola híbrida, con pantalla OLED y soporte para 4K.",
  },
  {
    id: 11,
    categoria: "Consolas",
    nombre: "Nintendo 3DS",
    precio: 134990,
    imagen: img3ds,
    descripcion:
      "Consola portátil con pantalla 3D sin gafas y gran variedad de títulos exclusivos.",
  },
  {
    id: 12,
    categoria: "Consolas",
    nombre: "PlayStation 5 1TB",
    precio: 699990,
    imagen: ps5,
    descripcion:
      "Consola PS5 de última generación con SSD ultrarrápido de 1TB y gráficos de nueva era.",
  },
  {
    id: 13,
    categoria: "Laptops Gamer",
    nombre: "Lenovo LOQ 15IAX9",
    precio: 899990,
    imagen: lenovoloq,
    descripcion:
      "Laptop versátil con 16GB RAM y GPU NVIDIA, ideal para gamers y estudiantes.",
  },
  {
    id: 14,
    categoria: "Laptops Gamer",
    nombre: "Lenovo LOQ 15ARP9 Ryzen 7",
    precio: 979990,
    imagen: lenovoloqryzen,
    descripcion:
      "Notebook gamer con Ryzen 7, RTX4050 y 24GB de RAM para alto rendimiento.",
  },
  {
    id: 15,
    categoria: "Laptops Gamer",
    nombre: "ASUS TUF Gaming F16",
    precio: 959990,
    imagen: asustuf,
    descripcion:
      "Laptop con Intel i5, RTX 3050, pantalla 16'' 144Hz y sonido Dolby Atmos.",
  },
  {
    id: 16,
    categoria: "Laptops Gamer",
    nombre: "Asus 13.3'' Ryzen AI 9",
    precio: 3119990,
    imagen: asusryzen,
    descripcion:
      "Notebook premium con Ryzen AI 9, 32GB RAM, RTX 4070 y pantalla OLED táctil.",
  },
  {
    id: 101,
    categoria: "Accesorios",
    nombre: "Soporte para laptop ajustable",
    precio: 19990,
    imagen: placeholder,
    descripcion:
      "Soporte metálico y plegable para laptop, ergonómico y portátil.",
    descuento: 0.12,
  },
  {
    id: 102,
    categoria: "Audio",
    nombre: "Kit de micrófono USB",
    precio: 34990,
    imagen: placeholder,
    descripcion: "Kit de micrófono USB con brazo articulado y pop filter.",
    descuento: 0.1,
  },
  {
    id: 103,
    categoria: "Muebles",
    nombre: "Silla Gamer Pro",
    precio: 159990,
    imagen: placeholder,
    descripcion:
      "Silla ergonómica con soporte lumbar y reclinable para gamers.",
    descuento: 0.18,
  },
  {
    id: 104,
    categoria: "Accesorios",
    nombre: "Teclado mecánico minimal",
    precio: 54990,
    imagen: placeholder,
    descripcion: "Teclado mecánico compacto con retroiluminación RGB.",
    descuento: 0.15,
  },
  // Productos añadidos para completar categorías (sin imagenes)
  // Juegos de Mesa (agregados para llegar a 8)
  {
    id: 200,
    categoria: "Juegos de Mesa",
    nombre: "Catan - Edición Clásica",
    precio: 24990,
    imagen: placeholder,
    descripcion:
      "Juego de estrategia para comercio y expansión en islas ficticias.",
  },
  {
    id: 201,
    categoria: "Juegos de Mesa",
    nombre: "Carcassonne",
    precio: 19990,
    imagen: placeholder,
    descripcion: "Juego de losetas de construcción de ciudades y caminos.",
  },
  {
    id: 202,
    categoria: "Juegos de Mesa",
    nombre: "Azul",
    precio: 16990,
    imagen: placeholder,
    descripcion: "Juego de patrones y azulejos, ideal para 2-4 jugadores.",
  },
  {
    id: 203,
    categoria: "Juegos de Mesa",
    nombre: "Risk",
    precio: 29990,
    imagen: placeholder,
    descripcion: "Clásico juego de conquista global por turnos.",
  },
  // Accesorios (completando hasta 8)
  {
    id: 204,
    categoria: "Accesorios",
    nombre: "Mouse Gamer RGB",
    precio: 24990,
    imagen: placeholder,
    descripcion: "Mouse ergonómico con sensor óptico de alta precisión y RGB.",
  },
  {
    id: 205,
    categoria: "Accesorios",
    nombre: "Pad de mouse XXL",
    precio: 7990,
    imagen: placeholder,
    descripcion:
      "Alfombrilla extra grande para teclado y mouse con base antideslizante.",
  },
  // Consolas (completando hasta 8)
  {
    id: 206,
    categoria: "Consolas",
    nombre: "Xbox Series S",
    precio: 329990,
    imagen: placeholder,
    descripcion: "Consola compacta de nueva generación con acceso a Game Pass.",
  },
  {
    id: 207,
    categoria: "Consolas",
    nombre: "Xbox Series X",
    precio: 499990,
    imagen: placeholder,
    descripcion: "Consola potente para experiencia 4K y rendimiento elevado.",
  },
  {
    id: 208,
    categoria: "Consolas",
    nombre: "Nintendo Switch Lite",
    precio: 179990,
    imagen: placeholder,
    descripcion: "Versión portátil de la Switch, ligera y compacta.",
  },
  {
    id: 209,
    categoria: "Consolas",
    nombre: "Steam Deck 64GB",
    precio: 279990,
    imagen: placeholder,
    descripcion: "PC portátil para juegos con biblioteca Steam integrada.",
  },
  // Laptops Gamer (completando hasta 8)
  {
    id: 210,
    categoria: "Laptops Gamer",
    nombre: "MSI Katana GF66",
    precio: 899990,
    imagen: placeholder,
    descripcion: "Laptop gamer con CPU i7 y GPU RTX 3060 para gaming sólido.",
  },
  {
    id: 211,
    categoria: "Laptops Gamer",
    nombre: "Acer Predator Helios",
    precio: 1299990,
    imagen: placeholder,
    descripcion:
      "Notebook con pantalla 144Hz, refrigeración avanzada y RTX series.",
  },
  {
    id: 212,
    categoria: "Laptops Gamer",
    nombre: "HP Omen 16",
    precio: 1099990,
    imagen: placeholder,
    descripcion:
      "Equipo equilibrado para gamers con buena relación rendimiento/precio.",
  },
  {
    id: 213,
    categoria: "Laptops Gamer",
    nombre: "Razer Blade 14",
    precio: 1899990,
    imagen: placeholder,
    descripcion:
      "Laptop premium compacta con GPU de alta gama para gaming portátil.",
  },
  // Audio (completando hasta 8)
  {
    id: 214,
    categoria: "Audio",
    nombre: "Auriculares JBL Wireless",
    precio: 59990,
    imagen: placeholder,
    descripcion: "Auriculares Bluetooth con larga autonomía y buen sonido.",
  },
  {
    id: 215,
    categoria: "Audio",
    nombre: "Home Theater 5.1",
    precio: 219990,
    imagen: placeholder,
    descripcion:
      "Sistema de sonido 5.1 para cine en casa con subwoofer potente.",
  },
  {
    id: 216,
    categoria: "Audio",
    nombre: "Barra de sonido 2.1",
    precio: 89990,
    imagen: placeholder,
    descripcion: "Soundbar compacta con subwoofer inalámbrico para TV.",
  },
  {
    id: 217,
    categoria: "Audio",
    nombre: "Micrófono Condensador",
    precio: 49990,
    imagen: placeholder,
    descripcion:
      "Micrófono USB para streaming y grabación con calidad profesional.",
  },
  {
    id: 218,
    categoria: "Audio",
    nombre: "Parlantes Portátiles",
    precio: 24990,
    imagen: placeholder,
    descripcion:
      "Parlantes Bluetooth resistentes al agua para uso en exteriores.",
  },
  {
    id: 219,
    categoria: "Audio",
    nombre: "Auriculares Gaming Inalámbricos",
    precio: 129990,
    imagen: placeholder,
    descripcion: "Auriculares inalámbricos con micrófono desmontable y RGB.",
  },
  {
    id: 220,
    categoria: "Audio",
    nombre: "Soundbar Mini",
    precio: 45990,
    imagen: placeholder,
    descripcion:
      "Mini barra de sonido compacta para escritorios y habitaciones.",
  },
  // Muebles (completando hasta 8)
  {
    id: 221,
    categoria: "Muebles",
    nombre: "Mesa Gamer Pro",
    precio: 179990,
    imagen: placeholder,
    descripcion:
      "Mesa con soporte para monitor, superficie resistente y pasacables.",
  },
  {
    id: 222,
    categoria: "Muebles",
    nombre: "Escritorio en L",
    precio: 149990,
    imagen: placeholder,
    descripcion:
      "Escritorio en L para optimizar espacio en la habitación o sala.",
  },
  {
    id: 223,
    categoria: "Muebles",
    nombre: "Estantería Modular",
    precio: 89990,
    imagen: placeholder,
    descripcion: "Estantería modular para organizar periféricos y colecciones.",
  },
  {
    id: 224,
    categoria: "Muebles",
    nombre: "Reposapiés Ergonómico",
    precio: 4990,
    imagen: placeholder,
    descripcion: "Alivio para largas sesiones de juego y trabajo.",
  },
  {
    id: 225,
    categoria: "Muebles",
    nombre: "Alfombrilla XXL",
    precio: 12990,
    imagen: placeholder,
    descripcion:
      "Alfombrilla para teclado y mouse de gran tamaño y diseño gamer.",
  },
  {
    id: 226,
    categoria: "Muebles",
    nombre: "Lámpara RGB",
    precio: 6990,
    imagen: placeholder,
    descripcion: "Lámpara regulable con modos de color y control táctil.",
  },
  {
    id: 227,
    categoria: "Muebles",
    nombre: "Soporte Monitor Doble",
    precio: 34990,
    imagen: placeholder,
    descripcion: "Soporte articulado para dos monitores con ajuste de altura.",
  },
];

export default productos;
