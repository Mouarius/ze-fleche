import { ref, computed } from "vue";
import { calculateScore } from "../util/helper";
import { Player } from "../util/types";

const emma = new Player();
const marius = new Player();

emma.id = 0;
emma.name = "Emma";

marius.id = 1;
marius.name = "Marius";
const initialPlayers = [
    emma,
    marius,
    // {
    //     id: 1,
    //     name: "Marius",
    //     score: 0,
    //     isActive: false,
    //     listOfShots: [],
    //     rank: 1,
    // },
    // {
    //     id: 2,
    //     name: "Lucas",
    //     score: 0,
    //     isActive: false,
    //     listOfShots: [],
    //     rank: 1,
    // },
];

export default initialPlayers as Player[];
