import { ref, computed } from "vue";
import { calculateScore } from "../util/helper";

const initialPlayers = [
    {
        id: 0,
        name: "Emma",
        score: 0,
        isActive: true,
        listOfShots: [],
        rank: 1,
    },
    {
        id: 1,
        name: "Marius",
        score: 0,
        isActive: false,
        listOfShots: [],
        rank: 1,
    },
    {
        id: 2,
        name: "Lucas",
        score: 0,
        isActive: false,
        listOfShots: [],
        rank: 1,
    },
];

export default initialPlayers;
