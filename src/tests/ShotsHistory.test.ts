import { ShotHistory } from "../data/ShotHistory";
import { Player } from "../util/types";

const p1 = new Player();
const p2 = new Player();
const p3 = new Player();
p1.id = 0;
p2.id = 1;
p3.id = 2;

const initialPlayers = [p1, p2, p3];

describe("SHOTS HISTORY", () => {
    describe("Initialization", () => {
        it("create empty history", () => {
            const hist = new ShotHistory([]);
            expect(hist.listOfTurns).toEqual([]);
        });
        it("create empty history for three players", () => {
            const hist = new ShotHistory(initialPlayers);
            expect(hist.listOfTurns).toStrictEqual([]);
        });
    });
    describe("Modification", () => {
        let hist: ShotHistory;
        beforeAll(() => {
            hist = new ShotHistory(initialPlayers);
        });

        it("push a volley to the history", () => {
            hist.push(["1", "1", "1"]);
            expect(hist.listOfTurns.length).toBe(1);
            expect(hist.listOfTurns).toStrictEqual([[["1", "1", "1"]]]);
        });
        it("append a shotValue to the history when the last volley is full", () => {
            hist.pushShot("2");
            expect(hist.listOfTurns.length).toBe(1);
            expect(hist.listOfTurns).toStrictEqual([[["1", "1", "1"], ["2"]]]);
        });
        it("append a shotValue to the history when the last volley is not full", () => {
            hist.pushShot("3");
            hist.print();
            expect(hist.listOfTurns).toStrictEqual([
                [
                    ["1", "1", "1"],
                    ["2", "3"],
                ],
            ]);
        });

        it("pop a volley from the history", () => {
            hist.pop();
            expect(hist.listOfTurns).toHaveLength(1);
        });
        it("pop a shot from the history", () => {
            hist.popShot();
            expect(hist.listOfTurns).toStrictEqual([[["1", "1"]]]);
        });
    });
    describe("Accession", () => {
        let hist: ShotHistory;
        beforeEach(() => {
            hist = new ShotHistory(initialPlayers);
            hist.push(["1", "1", "1"]);
            hist.push(["1", "1", "1"]);
            hist.push(["1", "1", "1"]);
            hist.push(["2", "2", "2"]);
            hist.push(["2", "2", "2"]);
            hist.push(["2", "2", "2"]);
            hist.push(["3", "3"]);
        });
        it.only("get the shots of a player", () => {
            const shots = hist.getShotsOfPlayer(0);
            console.log(shots);
            expect(shots).toStrictEqual([
                ["1", "1", "1"],
                ["2", "2", "2"],
                ["3", "3"],
            ]);
        });
        it("get the last volley", () => {
            hist.print();
            const lastVolley = hist.lastVolley;
            expect(lastVolley).toEqual(["3", "3"]);
        });
    });
});
