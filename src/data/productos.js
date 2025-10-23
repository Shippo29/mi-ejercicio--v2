import imgteclado from "../assets/teclado.png";
import img3ds from "../assets/3ds.jpg";
import asustuf from "../assets/asustuf.jpg";
import asusryzen from "../assets/asusryzen.jpg";
import audifonoshyper from "../assets/audifonoshyper.jpg";
import explodingkittens from "../assets/explodingkittens.jpg";
import lenovoloq from "../assets/lenovoloq.jpg";
import lenovoloqryzen from "../assets/lenovoloqryzen.jpg";

import monitorasus from "../assets/monitorasus.jpg";
import monopoly from "../assets/monopoly.jpg";
import polilla from "../assets/polilla.jpg";
import ps4 from "../assets/ps4.jpg";
import ps5 from "../assets/ps5.jpg";
import subwoofer from "../assets/subwoofer.jpg";
import switch2 from "../assets/switch2.jpg";
import Catan from "../assets/Catan.jpg";
import Carcassonne from "../assets/Carcassonne.jpg";
import azul from "../assets/Azul.jpg";
import Risk from "../assets/Risk.jpg";
import Dixit from "../assets/dixit.jpg";
import Pandemic from "../assets/Pandemic.jpg";
import unomercy from "../assets/unonomercy.jpg";

import Soporte from "../assets/Soporte.jpg";
import Tecladomecanico from "../assets/Tecladomecánico.jpg";
import MouseGamer from "../assets/MouseGamer.jpg";
import mouseXXL from "../assets/mouseXXL.jpg";
import XboxSeriesS from "../assets/XboxSeriesS.jpg";
import XboxSeriesX from "../assets/XboxSeriesX.jpg";
import NintendoSwitchLite from "../assets/NintendoSwitchLite.jpg";
import SteamDeck64GB from "../assets/SteamDeck64GB.jpg";
import RetroConsole8000 from "../assets/RetroConsole8000+.jpg";
import Bang from "../assets/Bang.jpg";
import SevenWonders from "../assets/7Wonders.jpg";
import TickettoRide from "../assets/TickettoRide.jpg";
import Codenames from "../assets/Codenames.jpg";
import SmallWorld from "../assets/SmallWorld.jpg";
import Mysterium from "../assets/mysterium.jpg";
import WebcamHD from "../assets/WebcamHD.jpg";
import USB8puertos from "../assets/USB-8puertos.jpg";
import VentiladorLaptop from "../assets/VentiladorLaptop.jpg";
import LimpiezaGaming from "../assets/LimpiezaGaming.jpg";
import SoporteAuriculare from "../assets/SoporteAuriculare.jpg";
import ControlXboxElite from "../assets/ControlXboxElite.jpg";
import StreamDeckMini from "../assets/StreamDeckMini.jpg";
import CapturadoradeVideo from "../assets/CapturadoradeVideo.jpg";
import SteamDeck256GB from "../assets/SteamDeck256GB.jpg";
import steamDeck512GB from "../assets/steamDeck512GB.jpg";
import SwitchOLED from "../assets/SwitchOLED.png";
import PS4Pro1TB from "../assets/PS4Pro1TB.jpg";
import XboxOneX from "../assets/XboxOneX.jpg";
import PS5Digital from "../assets/PS5Digital.jpg";
import ROGAlly from "../assets/ROGAlly.jpg";
import RazerBlade14 from "../assets/RazerBlade14.jpg";
import ROGStrixG15 from "../assets/ROGStrixG15.jpg";
import ROGZephyrus from "../assets/ROGZephyrus.jpg";
import MSIKatana from "../assets/MSIKatana.jpg";
import MSITitanGT77 from "../assets/MSITitanGT77.png";
import HPOmen16 from "../assets/HPOmen16.jpg";
import LenovoLegion5 from "../assets/LenovoLegion5.jpg";
import LegionPro7i from "../assets/LegionPro7i.jpg";
import AsusROGStrix from "../assets/AsusROGStrix.jpg";
import Alienwarem15 from "../assets/Alienwarem15.jpg";
import AcerPredator from "../assets/AcerPredator.jpg";
import KitdeMicrofonoUSB from "../assets/KitdemicrófonoUSB.jpg";
import AuricularesJBL from "../assets/AuricularesJBLWireless.jpg";
import HomeTheater from "../assets/HomeTheater5.1.avif";
import BarraSonido from "../assets/Barradesonido2.1.jpg";
import MicrofonoCondensador from "../assets/MicrófonoCondensador.jpg";
import ParlantesPortatiles from "../assets/ParlantesPortátiles.jpg";
import AuricularesGaming from "../assets/AuricularesGamingInalámbricos.jpg";
import SoundbarMini from "../assets/SoundbarMini.jpg";
import DACAMPGaming from "../assets/DACAMPGaming.png";
import Set71Surround from "../assets/Set7.1Surround.jpg";
import MezcladorAudio from "../assets/MezcladordeAudioUSB.jpg";
import MonitoresEstudio from "../assets/MonitoresdeEstudio.jpg";
import InterfaceAudio from "../assets/InterfacedeAudio2x2.jpg";
import SubwooferGaming from "../assets/SubwooferGamingPro.jpg";
import KitPodcasting from "../assets/KitPodcastingPro.jpg";
import AmplificadorGaming from "../assets/AmplificadorGaming.jpg";

import SillaGamer from "../assets/SillaGamerPro.jpg";
import MesaGamer from "../assets/MesaGamerPro.jpg";
import EscritorioL from "../assets/EscritorioenL.jpg";
import EstanteriaModular from "../assets/EstanteríaModular.jpg";
import ReposapiésErgonomico from "../assets/ReposapiésErgonómico.jpg";
import AlfombrillaXXL from "../assets/AlfombrillaXXL.jpg";
import LamparaRGB from "../assets/LámparaRGB.avif";
import SoporteMonitor from "../assets/SoporteMonitorDoble.jpg";
import EstacionGaming from "../assets/EstaciónGamingElite.avif";
import RackConsolas from "../assets/RackparaConsolas.jpg";
import MesaTV from "../assets/MesaTVGaming.jpg";
import SetGaming from "../assets/SetGamingRoom.jpg";
import OrganizadorCables from "../assets/OrganizadordeCablesPro.jpg";
import VitrinaColeccionista from "../assets/VitrinaColeccionista.jpg";
import BiomboLED from "../assets/BiomboLEDGaming.jpg";
import ReposamuñecasPremium from "../assets/ReposamuñecasPremium.jpg";

/**
 * @typedef {Object} Producto
 * @property {number} id - ID único del producto
 * @property {string} categoria - Categoría del producto
 * @property {string} nombre - Nombre del producto
 * @property {number} precio - Precio en pesos chilenos
 * @property {string} descripcion - Descripción del producto
 * @property {Object} imagen - Imagen importada del producto
 * @property {number} [descuento] - Descuento opcional (entre 0 y 1)
 */

/** @type {Producto[]} */
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
    imagen: Soporte,
    descripcion:
      "Soporte metálico y plegable para laptop, ergonómico y portátil.",
    descuento: 0.12,
  },
  {
    id: 102,
    categoria: "Audio",
    nombre: "Kit de micrófono USB",
    precio: 34990,
    imagen: KitdeMicrofonoUSB,
    descripcion: "Kit de micrófono USB con brazo articulado y pop filter.",
    descuento: 0.1,
  },
  {
    id: 103,
    categoria: "Muebles",
    nombre: "Silla Gamer Pro",
    precio: 159990,
    imagen: SillaGamer,
    descripcion:
      "Silla ergonómica con soporte lumbar y reclinable para gamers.",
    descuento: 0.18,
  },
  {
    id: 104,
    categoria: "Accesorios",
    nombre: "Teclado mecánico minimal",
    precio: 54990,
    imagen: Tecladomecanico,
    descripcion: "Teclado mecánico compacto con retroiluminación RGB.",
    descuento: 0.15,
  },
  {
    id: 200,
    categoria: "Juegos de Mesa",
    nombre: "Catan - Edición Clásica",
    precio: 24990,
    imagen: Catan,
    descripcion:
      "Juego de estrategia para comercio y expansión en islas ficticias.",
  },
  {
    id: 201,
    categoria: "Juegos de Mesa",
    nombre: "Carcassonne",
    precio: 19990,
    imagen: Carcassonne,
    descripcion: "Juego de losetas de construcción de ciudades y caminos.",
  },
  {
    id: 202,
    categoria: "Juegos de Mesa",
    nombre: "Azul",
    precio: 16990,
    imagen: azul,
    descripcion: "Juego de patrones y azulejos, ideal para 2-4 jugadores.",
  },
  {
    id: 203,
    categoria: "Juegos de Mesa",
    nombre: "Risk",
    precio: 29990,
    imagen: Risk,
    descripcion: "Clásico juego de conquista global por turnos.",
  },
  {
    id: 204,
    categoria: "Accesorios",
    nombre: "Mouse Gamer RGB",
    precio: 24990,
    imagen: MouseGamer,
    descripcion: "Mouse ergonómico con sensor óptico de alta precisión y RGB.",
  },
  {
    id: 205,
    categoria: "Accesorios",
    nombre: "Pad de mouse XXL",
    precio: 7990,
    imagen: mouseXXL,
    descripcion:
      "Alfombrilla extra grande para teclado y mouse con base antideslizante.",
  },
  {
    id: 206,
    categoria: "Consolas",
    nombre: "Xbox Series S",
    precio: 329990,
    imagen: XboxSeriesS,
    descripcion: "Consola compacta de nueva generación con acceso a Game Pass.",
  },
  {
    id: 207,
    categoria: "Consolas",
    nombre: "Xbox Series X",
    precio: 499990,
    imagen: XboxSeriesX,
    descripcion: "Consola potente para experiencia 4K y rendimiento elevado.",
  },
  {
    id: 208,
    categoria: "Consolas",
    nombre: "Nintendo Switch Lite",
    precio: 179990,
    imagen: NintendoSwitchLite,
    descripcion: "Versión portátil de la Switch, ligera y compacta.",
  },
  {
    id: 209,
    categoria: "Consolas",
    nombre: "Steam Deck 64GB",
    precio: 279990,
    imagen: SteamDeck64GB,
    descripcion: "PC portátil para juegos con biblioteca Steam integrada.",
  },
  {
    id: 210,
    categoria: "Laptops Gamer",
    nombre: "MSI Katana GF66",
    precio: 899990,
    imagen: MSIKatana,
    descripcion: "Laptop gamer con CPU i7, RTX 3060 y pantalla de 144Hz.",
  },
  {
    id: 211,
    categoria: "Laptops Gamer",
    nombre: "Acer Predator Helios",
    precio: 1299990,
    imagen: AcerPredator,
    descripcion: "Notebook con Intel i9, RTX 4070 y refrigeración avanzada.",
  },
  {
    id: 212,
    categoria: "Laptops Gamer",
    nombre: "HP Omen 16",
    precio: 1099990,
    imagen: HPOmen16,
    descripcion: "Gaming laptop con Ryzen 7, RTX 4060 y teclado RGB.",
  },
  {
    id: 213,
    categoria: "Laptops Gamer",
    nombre: "Razer Blade 14",
    precio: 1899990,
    imagen: RazerBlade14,
    descripcion: "Laptop premium ultradelgada con Ryzen 9 y RTX 4070.",
  },
  {
    id: 272,
    categoria: "Laptops Gamer",
    nombre: "Asus ROG Strix Scar",
    precio: 2199990,
    imagen: AsusROGStrix,
    descripcion:
      "Laptop gaming con Intel i9, RTX 4090, pantalla 240Hz y RGB personalizable.",
  },
  {
    id: 273,
    categoria: "Laptops Gamer",
    nombre: "ROG Zephyrus G14",
    precio: 1899990,
    imagen: ROGZephyrus,
    descripcion:
      "Ultraportátil con Ryzen 9, RTX 4070, pantalla QHD y gran autonomía.",
  },
  {
    id: 274,
    categoria: "Laptops Gamer",
    nombre: "Lenovo Legion 5 Pro",
    precio: 1599990,
    imagen: LenovoLegion5,
    descripcion:
      "Laptop gaming con Ryzen 7, RTX 4060, pantalla QHD 165Hz y teclado RGB.",
  },
  {
    id: 275,
    categoria: "Laptops Gamer",
    nombre: "ROG Ally (Docked)",
    precio: 1299990,
    imagen: ROGAlly,
    descripcion:
      "Consola portátil con Windows 11, AMD Z1 Extreme y dock incluido.",
  },
  {
    id: 214,
    categoria: "Audio",
    nombre: "Auriculares JBL Wireless",
    precio: 59990,
    imagen: AuricularesJBL,
    descripcion: "Auriculares Bluetooth con larga autonomía y buen sonido.",
  },
  {
    id: 215,
    categoria: "Audio",
    nombre: "Home Theater 5.1",
    precio: 219990,
    imagen: HomeTheater,
    descripcion:
      "Sistema de sonido 5.1 para cine en casa con subwoofer potente.",
  },
  {
    id: 216,
    categoria: "Audio",
    nombre: "Barra de sonido 2.1",
    precio: 89990,
    imagen: BarraSonido,
    descripcion: "Soundbar compacta con subwoofer inalámbrico para TV.",
  },
  {
    id: 217,
    categoria: "Audio",
    nombre: "Micrófono Condensador",
    precio: 49990,
    imagen: MicrofonoCondensador,
    descripcion:
      "Micrófono USB para streaming y grabación con calidad profesional.",
  },
  {
    id: 218,
    categoria: "Audio",
    nombre: "Parlantes Portátiles",
    precio: 24990,
    imagen: ParlantesPortatiles,
    descripcion:
      "Parlantes Bluetooth resistentes al agua para uso en exteriores.",
  },
  {
    id: 219,
    categoria: "Audio",
    nombre: "Auriculares Gaming Inalámbricos",
    precio: 129990,
    imagen: AuricularesGaming,
    descripcion: "Auriculares inalámbricos con micrófono desmontable y RGB.",
  },
  {
    id: 220,
    categoria: "Audio",
    nombre: "Soundbar Mini",
    precio: 45990,
    imagen: SoundbarMini,
    descripcion:
      "Mini barra de sonido compacta para escritorios y habitaciones.",
  },
  {
    id: 221,
    categoria: "Muebles",
    nombre: "Mesa Gamer Pro",
    precio: 179990,
    imagen: MesaGamer,
    descripcion:
      "Mesa con soporte para monitor, superficie resistente y pasacables.",
  },
  {
    id: 222,
    categoria: "Muebles",
    nombre: "Escritorio en L",
    precio: 149990,
    imagen: EscritorioL,
    descripcion:
      "Escritorio en L para optimizar espacio en la habitación o sala.",
  },
  {
    id: 223,
    categoria: "Muebles",
    nombre: "Estantería Modular",
    precio: 89990,
    imagen: EstanteriaModular,
    descripcion: "Estantería modular para organizar periféricos y colecciones.",
  },
  {
    id: 224,
    categoria: "Muebles",
    nombre: "Reposapiés Ergonómico",
    precio: 4990,
    imagen: ReposapiésErgonomico,
    descripcion: "Alivio para largas sesiones de juego y trabajo.",
  },
  {
    id: 225,
    categoria: "Muebles",
    nombre: "Alfombrilla XXL",
    precio: 12990,
    imagen: AlfombrillaXXL,
    descripcion:
      "Alfombrilla para teclado y mouse de gran tamaño y diseño gamer.",
  },
  {
    id: 226,
    categoria: "Muebles",
    nombre: "Lámpara RGB",
    precio: 6990,
    imagen: LamparaRGB,
    descripcion: "Lámpara regulable con modos de color y control táctil.",
  },
  {
    id: 227,
    categoria: "Muebles",
    nombre: "Soporte Monitor Doble",
    precio: 34990,
    imagen: SoporteMonitor,
    descripcion: "Soporte articulado para dos monitores con ajuste de altura.",
  },
  {
    id: 228,
    categoria: "Juegos de Mesa",
    nombre: "Dixit",
    precio: 22990,
    imagen: Dixit,
    descripcion: "Juego de cartas ilustradas y narración creativa.",
  },
  {
    id: 229,
    categoria: "Juegos de Mesa",
    nombre: "Pandemic",
    precio: 32990,
    imagen: Pandemic,
    descripcion: "Juego cooperativo de salvar al mundo de enfermedades.",
  },
  {
    id: 230,
    categoria: "Juegos de Mesa",
    nombre: "7 Wonders",
    precio: 29990,
    imagen: SevenWonders,
    descripcion: "Juego de cartas de construcción de civilizaciones.",
  },
  {
    id: 231,
    categoria: "Juegos de Mesa",
    nombre: "Ticket to Ride",
    precio: 34990,
    imagen: TickettoRide,
    descripcion: "Juego de construcción de rutas ferroviarias.",
  },
  {
    id: 232,
    categoria: "Juegos de Mesa",
    nombre: "Bang!",
    precio: 15990,
    imagen: Bang,
    descripcion: "Juego de cartas del viejo oeste.",
  },
  {
    id: 233,
    categoria: "Juegos de Mesa",
    nombre: "Codenames",
    precio: 19990,
    imagen: Codenames,
    descripcion: "Juego de palabras y espías por equipos.",
  },
  {
    id: 234,
    categoria: "Juegos de Mesa",
    nombre: "Small World",
    precio: 39990,
    imagen: SmallWorld,
    descripcion: "Juego de conquista con razas fantásticas.",
  },
  {
    id: 235,
    categoria: "Juegos de Mesa",
    nombre: "Mysterium",
    precio: 42990,
    imagen: Mysterium,
    descripcion: "Juego cooperativo de misterio y deducción.",
  },
  {
    id: 236,
    categoria: "Accesorios",
    nombre: "Webcam HD Pro",
    precio: 49990,
    imagen: WebcamHD,
    descripcion: "Cámara web 1080p con micrófono integrado.",
  },
  {
    id: 237,
    categoria: "Accesorios",
    nombre: "Hub USB-C 8 puertos",
    precio: 29990,
    imagen: USB8puertos,
    descripcion: "Hub con puertos USB, HDMI y lector de tarjetas.",
  },
  {
    id: 238,
    categoria: "Accesorios",
    nombre: "Ventilador para Laptop",
    precio: 14990,
    imagen: VentiladorLaptop,
    descripcion: "Base refrigerante con 5 ventiladores y RGB.",
  },
  {
    id: 239,
    categoria: "Accesorios",
    nombre: "Kit de Limpieza Gaming",
    precio: 9990,
    imagen: LimpiezaGaming,
    descripcion: "Kit completo para limpieza de periféricos.",
  },
  {
    id: 240,
    categoria: "Accesorios",
    nombre: "Soporte para Auriculares RGB",
    precio: 19990,
    imagen: SoporteAuriculare,
    descripcion: "Soporte con iluminación y puertos USB.",
  },
  {
    id: 241,
    categoria: "Accesorios",
    nombre: "Control Xbox Elite",
    precio: 149990,
    imagen: ControlXboxElite,
    descripcion: "Control premium personalizable para PC y Xbox.",
  },
  {
    id: 242,
    categoria: "Accesorios",
    nombre: "Stream Deck Mini",
    precio: 89990,
    imagen: StreamDeckMini,
    descripcion: "Controlador programable para streaming.",
  },
  {
    id: 243,
    categoria: "Accesorios",
    nombre: "Capturadora de Video",
    precio: 129990,
    imagen: CapturadoradeVideo,
    descripcion: "Capturadora HD para streaming y grabación.",
  },
  {
    id: 244,
    categoria: "Consolas",
    nombre: "Retro Console 8000+",
    precio: 49990,
    imagen: RetroConsole8000,
    descripcion: "Consola retro con miles de juegos clásicos.",
  },
  {
    id: 245,
    categoria: "Consolas",
    nombre: "Steam Deck 256GB",
    precio: 459990,
    imagen: SteamDeck256GB,
    descripcion:
      "Versión mejorada con más almacenamiento y vidrio antirreflejos.",
  },
  {
    id: 246,
    categoria: "Consolas",
    nombre: "Steam Deck 512GB",
    precio: 559990,
    imagen: steamDeck512GB,
    descripcion: "Modelo premium con SSD NVMe y extras exclusivos.",
  },
  {
    id: 247,
    categoria: "Consolas",
    nombre: "Switch OLED",
    precio: 349990,
    imagen: SwitchOLED,
    descripcion: "Modelo con pantalla OLED mejorada y más almacenamiento.",
  },
  {
    id: 248,
    categoria: "Consolas",
    nombre: "PS4 Pro 1TB",
    precio: 299990,
    imagen: PS4Pro1TB,
    descripcion: "Versión mejorada con soporte 4K y mejor rendimiento.",
  },
  {
    id: 249,
    categoria: "Consolas",
    nombre: "Xbox One X",
    precio: 289990,
    imagen: XboxOneX,
    descripcion: "Consola potente con capacidad 4K nativa.",
  },
  {
    id: 250,
    categoria: "Consolas",
    nombre: "PS5 Digital",
    precio: 549990,
    imagen: PS5Digital,
    descripcion: "Versión digital de PS5 sin lector de discos.",
  },
  {
    id: 251,
    categoria: "Consolas",
    nombre: "ROG Ally",
    precio: 699990,
    imagen: ROGAlly,
    descripcion: "PC portátil gaming con Windows y AMD Ryzen Z1.",
  },
  {
    id: 252,
    categoria: "Laptops Gamer",
    nombre: "Alienware m15 R7",
    precio: 2199990,
    imagen: Alienwarem15,
    descripcion: "Laptop premium con i9, RTX 4080 y pantalla QHD 240Hz.",
  },
  {
    id: 253,
    categoria: "Laptops Gamer",
    nombre: "ROG Strix G15",
    precio: 1499990,
    imagen: ROGStrixG15,
    descripcion: "Laptop gaming con Ryzen 9, RTX 3070 y pantalla 300Hz.",
  },
  {
    id: 254,
    categoria: "Laptops Gamer",
    nombre: "MSI Titan GT77",
    precio: 3499990,
    imagen: MSITitanGT77,
    descripcion: "Laptop extrema con i9 13980HX, RTX 4090 y 64GB RAM.",
  },
  {
    id: 255,
    categoria: "Laptops Gamer",
    nombre: "Legion Pro 7i",
    precio: 2799990,
    imagen: LegionPro7i,
    descripcion: "Laptop tope de gama con i9 13900HX y RTX 4080.",
  },
  {
    id: 256,
    categoria: "Audio",
    nombre: "DAC/AMP Gaming",
    precio: 89990,
    imagen: DACAMPGaming,
    descripcion: "Conversor y amplificador para mejor calidad de audio.",
  },
  {
    id: 257,
    categoria: "Audio",
    nombre: "Set 7.1 Surround",
    precio: 299990,
    imagen: Set71Surround,
    descripcion: "Sistema completo de sonido envolvente gaming.",
  },
  {
    id: 258,
    categoria: "Audio",
    nombre: "Mezclador de Audio USB",
    precio: 79990,
    imagen: MezcladorAudio,
    descripcion: "Mezclador con efectos para streaming.",
  },
  {
    id: 259,
    categoria: "Audio",
    nombre: "Monitores de Estudio",
    precio: 199990,
    imagen: MonitoresEstudio,
    descripcion: "Par de monitores activos para producción.",
  },
  {
    id: 260,
    categoria: "Audio",
    nombre: "Interface de Audio 2x2",
    precio: 129990,
    imagen: InterfaceAudio,
    descripcion: "Interface para grabación profesional.",
  },
  {
    id: 261,
    categoria: "Audio",
    nombre: "Subwoofer Gaming Pro",
    precio: 149990,
    imagen: SubwooferGaming,
    descripcion: "Subwoofer potente con iluminación RGB.",
  },
  {
    id: 262,
    categoria: "Audio",
    nombre: "Kit Podcasting Pro",
    precio: 159990,
    imagen: KitPodcasting,
    descripcion: "Kit completo para streaming y podcasting.",
  },
  {
    id: 263,
    categoria: "Audio",
    nombre: "Amplificador Gaming",
    precio: 189990,
    imagen: AmplificadorGaming,
    descripcion: "Amplificador con procesamiento gaming.",
  },
  {
    id: 264,
    categoria: "Muebles",
    nombre: "Estación Gaming Elite",
    precio: 399990,
    imagen: EstacionGaming,
    descripcion: "Escritorio gaming completo con iluminación.",
  },
  {
    id: 265,
    categoria: "Muebles",
    nombre: "Rack para Consolas",
    precio: 79990,
    imagen: RackConsolas,
    descripcion: "Organizador vertical para múltiples consolas.",
  },
  {
    id: 266,
    categoria: "Muebles",
    nombre: "Mesa TV Gaming",
    precio: 159990,
    imagen: MesaTV,
    descripcion: "Mueble TV con espacio para consolas.",
  },
  {
    id: 267,
    categoria: "Muebles",
    nombre: "Set Gaming Room",
    precio: 599990,
    imagen: SetGaming,
    descripcion: "Set completo de muebles para sala gaming.",
  },
  {
    id: 268,
    categoria: "Muebles",
    nombre: "Organizador de Cables Pro",
    precio: 24990,
    imagen: OrganizadorCables,
    descripcion: "Sistema completo de organización de cables.",
  },
  {
    id: 269,
    categoria: "Muebles",
    nombre: "Vitrina Coleccionista",
    precio: 199990,
    imagen: VitrinaColeccionista,
    descripcion: "Vitrina iluminada para colecciones gaming.",
  },
  {
    id: 270,
    categoria: "Muebles",
    nombre: "Biombo LED Gaming",
    precio: 129990,
    imagen: BiomboLED,
    descripcion: "Biombo decorativo con iluminación personalizable.",
  },
  {
    id: 271,
    categoria: "Muebles",
    nombre: "Reposamuñecas Premium",
    precio: 29990,
    imagen: ReposamuñecasPremium,
    descripcion: "Set ergonómico de reposamuñecas de memory foam.",
  },
];

export default productos;
