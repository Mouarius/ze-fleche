import { ShotHistory } from "../../data/ShotHistory";
import { Shot } from "../types";

/**
 * Returns the parsed calculate number value of a shot in string format
 * @param  {string} shotString
 * @example
 * calculateShotValue("T4") = 3 * 4 //T = 3, D = 2
 * @returns {number}
 */
export const calculateShotValue = (shotString: Shot): number => {
    if (!shotString || shotString.includes("X")) {
        return 0;
    }
    //Separates the value and the modifier letter
    const matchResult = shotString.match(/(\D)?(\d+)/);
    const [, modifier, number] = matchResult;
    let calculatedScore = parseInt(number);
    if (modifier === "T") {
        calculatedScore = calculatedScore * 3;
    } else if (modifier === "D") {
        calculatedScore = calculatedScore * 2;
    }
    return calculatedScore;
};

/**
 * Returns the numeric value of the sum of the Shots
 * @param  {Shot[]} listOfShots
 * @returns number
 */
export const calculateSumOfShots = (listOfShots: Shot[]): number => {
    let sumOfShots = 0;

    if (listOfShots.length > 0) {
        sumOfShots = listOfShots.reduce((acc, shotString) => {
            return acc + calculateShotValue(shotString);
        }, 0);
    }
    return sumOfShots;
};

/**
 * Returns the numeric value of the score depending on the gameMode and a listOfShots
 * @param  {String} gameMode
 * @param  {number} playerId
 * @returns number
 */
export const calculatePlayerScore = (shotHistory: ShotHistory, gameMode: String, playerId: number): number => {
    let baseScore = 0;
    const playerShots = shotHistory.shotsOfPlayer(playerId);
    if (playerShots) {
        if (gameMode === "301") {
            baseScore = 301;
            const sumOfShots = calculateSumOfShots(playerShots);
            return baseScore - sumOfShots;
        }
    }
};
