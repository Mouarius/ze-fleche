import { ShotHistory } from "../data/ShotHistory";
import { Player } from "../util/types";

const sum = (a, b) => a + b;

const p1 = new Player();
const p2 = new Player();
const p3 = new Player();
p1.id = 0;
p2.id = 1;
p3.id = 2;

const initialPlayers = [p1, p2, p3];

describe("SHOTS HISTORY", () => {
    describe("Initialization", () => {
        it("should add 1 + 2", () => {
            expect(sum(1, 2)).toBe(3);
        });

        it("create empty history", () => {
            const hist = new ShotHistory([]);
            expect(hist.state).toEqual([]);
        });
        it("create empty history for three players", () => {
            const hist = new ShotHistory(initialPlayers);
            expect(hist.state).toStrictEqual([[p1.id, p2.id, p3.id]]);
        });
    });
    describe("Modification", () => {
        let hist: ShotHistory;
        beforeAll(() => {
            hist = new ShotHistory(initialPlayers);
        });

        it("push a volley to the history", () => {
            hist.push(["1", "1", "1"]);
            expect(hist.state.length).toBe(2);
            expect(hist.state).toEqual([[0, 1, 2], [["1", "1", "1"]]]);
        });
        it("pop a volley from the history", () => {
            hist.pop();
            expect(hist.state).toHaveLength(1);
        });
        it("returns the last volley", () => {
            hist.push(["1", "1", "1"]);
            hist.push(["2", "2", "2"]);

            expect(hist.lastVolley).toStrictEqual(["2", "2", "2"]);
            expect(hist.state.length).toBe(2);
            expect(hist.state).toEqual([
                [0, 1, 2],
                [
                    ["1", "1", "1"],
                    ["2", "2", "2"],
                ],
            ]);
        });
    });
});
