import { Deck, newDeck, deal, move, Direction } from "./cards";

expect.extend({
    toHaveFourOfEach(deck: Deck) {
        type FrequencyMap = Map<string, number>;
        const freq: FrequencyMap = deck.reduce((freq: FrequencyMap, card: string) => {
            freq.set(card, (freq.get(card) ?? 0) + 1);
            return freq;
        }, new Map());

        // we don't test for extra letters but we know there's 44 cards
        const fails = "ljkxnmszuht".split('').filter(card => freq.get(card) !== 4);

        return fails.length === 0 ?
            {
                pass: true,
                message: () => `Expected ${deck.join()} to have four of each`,
            }
            :
            {
                pass: false,
                message: () => `Expected ${deck.join()} to have four of each but there's not four of ${fails.join()}`,
            };
    }
});

declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveFourOfEach(): R;
        }
    }
}

test('deck has 44 cards', () => {
    let deck = newDeck();
    expect(deck.length).toBe(44);
});

test('deck has 44 cards', () => {
    let deck = newDeck();
    expect(deck.length).toBe(44);
});

test('deck has four of each', () => {
    expect(newDeck()).toHaveFourOfEach();
});

test("board has four base cards", () => {
    const board = deal();
    const numBaseCards = board.filter(c => c.card === '#').length;
    expect(numBaseCards).toBe(4);
});

test("board has base in [7, 10, 25, 28]", () => {
    const board = deal();
    const actual = [7, 10, 25, 28].map(i => board[i].card);
    expect(actual).toStrictEqual(['#', '#', '#', '#']);
});

test('board has 36 cards', () => {
    expect(deal().length).toBe(36);
});

// describe('move', () => {
test.each([
    // trivial cases
    [1, "Right", 2],
    [22, "Left", 21],
    [12, "Down", 18],
    [12, "Up", 6],
    // literal edge cases!
    [0, "Up", 30],
    [30, "Down", 0],
    [0, "Left", 5],
    [30, "Left", 35],
    [5, "Right", 0],
])('moving %i,%s is %i', (start: number, dir: keyof typeof Direction, expected: number) => {
    expect(move(start, Direction[dir])).toBe(expected);
});
// })

// test('board has is half', () => {
//     expect(deal().reduce((acc, x) => (acc + +x.rotated), 0)).toBe(25 / 2);
// });
