import { ShotHistory } from "../../data/ShotHistory";
import { Player, Shot } from "../types";

/**
 * Returns the parsed calculate number value of a shot in string format
 * @param  {string} shotString
 * @example
 * calculateShotValue("T4") = 3 * 4 //T = 3, D = 2
 * @returns {number}
 */
export const calculateShotValue = (shotString: String): number => {
    if (shotString) {
        if (shotString.includes("X")) {
            return 0;
        }
        const matchResult = shotString.match(/(\D)?(\d+)/);
        const [, modifier, number] = matchResult;
        let calculatedScore = parseInt(number);
        if (modifier === "T") {
            calculatedScore = calculatedScore * 3;
        } else if (modifier === "D") {
            calculatedScore = calculatedScore * 2;
        }
        return calculatedScore;
    }
    return 0;
    //Separates the value and the modifier letter
};

/**
 * Returns the numeric value of the sum of the Shots
 * @param  {String[]} listOfShots
 * @returns number
 */
export const calculateSumOfShots = (listOfShots: String[]): number => {
    let sumOfShots = 0;
    let flattenListOfShots = listOfShots.flat();

    if (flattenListOfShots.length > 0) {
        sumOfShots = flattenListOfShots.reduce((acc, shotString) => {
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
    const playerShots = shotHistory.getShotsOfPlayer(playerId);
    if (playerShots) {
        if (gameMode === "301") {
            baseScore = 301;
            const sumOfShots = calculateSumOfShots(playerShots.flat());
            return baseScore - sumOfShots;
        }
    }
};

/**
 * Returns the updated version of players array with the calculated score values depending on the game mode
 * @param  {String} gameMode
 * @param  {Player[]} players
 * @returns Player
 */
export const calculatePlayersScore = (shotHistory: ShotHistory, gameMode: String, players: Player[]): Player[] => {
    // for (let i = 0; i < shotHistory.players.length ; i++) {
    //     const player =
    //     player.score = calculateScore(gameMode, player.listOfShots);
    // }
    return players;
};
