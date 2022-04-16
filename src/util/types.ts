import { Volley } from "../data/ShotHistory";

export class Player {
    id = 0;
    name = "";
    score = 0;
    isActive = false;
    listOfShots = [] as Volley;
    rank = 1;
    winner = false;
}

export interface ShotRecord {
    playerId: number;
    value: string;
}

export type Shot = String;
