import store from "../store";
import { Player, Shot, ShotRecord } from "./types";

export const wait = (duration: number): Promise<void> =>
    new Promise((resolve) => {
        return setTimeout(() => resolve(), duration);
    });

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
 * @param  {Shot[]} listOfShots
 * @returns number
 */
export const calculateScore = (gameMode: String, listOfShots: Shot[]): number => {
    let baseScore = 0;
    const sumOfShots = calculateSumOfShots(listOfShots);

    if (gameMode === "301") {
        baseScore = 301;
    }
    return baseScore - sumOfShots;
};
/**
 * Returns the updated version of players array with the calculated score values depending on the game mode
 * @param  {String} gameMode
 * @param  {Player[]} players
 * @returns Player
 */
export const calculatePlayersScore = (gameMode: String, players: Player[]): Player[] => {
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        player.score = calculateScore(gameMode, player.listOfShots);
    }
    return players;
};
/**
 * Returns the updated version of players array with the calculated rank values depending on the game mode
 * @param  {String} gameMode
 * @param  {Player[]} players
 * @returns Player
 */
export const calculatePlayersRanks = (gameMode: String, players: Player[]): Player[] => {
    let rank = 1;
    if (gameMode === "301") {
        const sortedPlayers = [...players].sort((p1, p2) => p1.score - p2.score);

        //Update player.rank to the index+1 of sortedPlayers
        sortedPlayers.forEach((p) => {
            const playerToUpdate = players.find((player) => player.id === p.id);
            playerToUpdate.rank = rank;
            rank++;
        });
    }
    return players;
};
/**
 * Returns the actual active player
 * @param  {Player[]} players
 * @returns Player
 */
export const getActivePlayer = (players: Player[]): [Player, number] => {
    let activePlayerIndex;
    const activePlayer = players.find((p, index) => {
        activePlayerIndex = index;
        return p.isActive === true;
    });
    return [activePlayer, activePlayerIndex];
};
/**
 * Returns the index in the players array of the player after the active player
 * @param  {Player[]} players
 * @returns number
 */
export const getNextPlayerIndex = (players: Player[]): number => {
    const [activePlayer, activePlayerIndex] = getActivePlayer(players);

    if (activePlayerIndex < players.length - 1) {
        return activePlayerIndex + 1;
    }
    return 0;
};
/**
 * Returns the index in the players array of the player before the active player
 * @param  {Player[]} players
 * @returns number
 */
export const getPreviousPlayerIndex = (players: Player[]): number => {
    const [activePlayer, activePlayerIndex] = getActivePlayer(players);
    if (activePlayerIndex > 0) {
        return activePlayerIndex - 1;
    }
    return players.length - 1;
};
/**
 * Sets the player after the next player to the new active player
 * @param  {Player[]} players
 * @returns void
 */
export const setNextPlayerActive = (players: Player[]): void => {
    // logger.info(`All shots have been fired for ${this.activePlayer.name}, moving to next player...`);
    const nextPlayer = getNextPlayer(players);
    if (nextPlayer) {
        store.actions.setActivePlayer(nextPlayer.id);
    }
};
/**
 * Returns the Player object of the player after the active player
 * @param  {Player[]} players
 * @returns Player
 */
export const getNextPlayer = (players: Player[]): Player => {
    return players[getNextPlayerIndex(players)];
};
/**
 * Returns the Player object of the player before the active player
 * @param  {Player[]} players
 * @returns Player
 */
export const getPreviousPlayer = (players: Player[]): Player => {
    return players[getPreviousPlayerIndex(players)];
};
/**
 * Returns the Player object of the previous player located in the shotsHistory
 * @param  {Player[]} players
 * @param  {ShotRecord[]} shotsHistory
 * @returns Player
 */
export const getPreviousPlayerInHistory = (players: Player[], shotsHistory: ShotRecord[]): Player | null => {
    if (shotsHistory.length >= 1) {
        let previousPlayerInHistory = players.find((p) => p.id === shotsHistory[shotsHistory.length - 1].playerId);
        return previousPlayerInHistory;
    }
    return null;
};
/**
 * Returns the last shots that a player has made
 * @param  {Player} player
 * @returns {Shot[]} lastShots
 */
export const getPlayerLastShots = (player: Player): Shot[] => {
    let lastShots;
    let rest = player.listOfShots.length % 3;
    if (player.listOfShots.length <= 3) {
        return player.listOfShots;
    }
    if (rest === 0) {
        lastShots = player.listOfShots.slice(-3);
    } else {
        lastShots = player.listOfShots.slice(-rest);
    }
    return lastShots;
};
