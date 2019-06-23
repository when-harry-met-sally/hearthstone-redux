import ArgentSquire from "./Images/ArgentSquire.png";
import DireWolfAlpha from "./Images/DireWolfAlpha.png";
import FlameImp from "./Images/FlameImp.png";
import Wisp from "./Images/Wisp.png";
const cards = [
  {
    id: 0,
    name: "Argent Squire",
    img: ArgentSquire,
    cost: 1,
    initialHealth: 1,
    initialAttack: 1,
  },
  {
    id: 1,
    name: "Dire Wolf Alpha",
    img: DireWolfAlpha,
    cost: 2,
    initialHealth: 2,
    initialAttack: 2,
  },
  {
    id: 2,
    name: "Flame Imp",
    img: FlameImp,
    cost: 1,
    initialHealth: 2,
    initialAttack: 3,
  },
  {
    id: 3,
    name: "Wisp",
    img: Wisp,
    cost: 0,
    initialHealth: 1,
    initialAttack: 1,
  }
];

export default cards;
