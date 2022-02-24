import store from "../store";
import logger from "./logger";

export const wait = (duration) =>
    new Promise((resolve) => {
        return setTimeout(() => resolve(), duration);
    });

export const calculateScore = (gameMode, listOfShots) => {
    let baseScore = 0;
    let sumOfShots = 0;

    if (listOfShots.length > 0) {
        sumOfShots = listOfShots.reduce((acc, strVal) => {
            //Separates the value and the modifier letter
            const matchResult = strVal.match(/(\D)?(\d+)/);
            const [, modifier, strValue] = matchResult;
            let numberValue = parseInt(strValue);

            if (modifier === "T") {
                numberValue = numberValue * 3;
            } else if (modifier === "D") {
                numberValue = numberValue * 2;
            }
            return acc + numberValue;
        }, 0);
    }

    if (gameMode === "301") {
        baseScore = 301;
    }
    return Math.abs(baseScore - sumOfShots);
};

export const calculatePlayersScore = (gameMode, players) => {
    console.log("DEBUG - Recalculating players score");
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        player.score = calculateScore(gameMode, player.listOfShots);
    }
    return players;
};

export const calculatePlayersRanks = (gameMode, players) => {
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

export const getActivePlayer = (players) => {
    let activePlayerIndex;
    const activePlayer = players.find((p, index) => {
        activePlayerIndex = index;
        return p.isActive === true;
    });
    return [activePlayer, activePlayerIndex];
};

export const getNextPlayerIndex = (players) => {
    const [activePlayer, activePlayerIndex] = getActivePlayer(players);

    if (activePlayerIndex < players.length - 1) {
        return activePlayerIndex + 1;
    }
    return 0;
};
export const getPreviousPlayerIndex = (players) => {
    const [activePlayer, activePlayerIndex] = getActivePlayer(players);
    if (activePlayerIndex > 0) {
        return activePlayerIndex - 1;
    }
    return players.length - 1;
};

export const getNextPlayer = (players) => {
    return players[getNextPlayerIndex(players)];
};
export const getPreviousPlayer = (players) => {
    return players[getPreviousPlayerIndex(players)];
};

export const getPreviousPlayerInHistory = (players, shotsHistory) => {
    if (shotsHistory.length >= 1) {
        let previousPlayerInHistory = players.find((p) => p.id === shotsHistory[shotsHistory.length - 1].playerId);
        return previousPlayerInHistory;
    }
    return null;
};

export const getPlayerLastShots = (player) => {
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
