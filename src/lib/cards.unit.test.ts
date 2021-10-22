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
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveFourOfEach(): R;
        }
    }
}

test('deck has 44 cards', () => {
    const deck = newDeck();
    expect(deck.length).toBe(44);
});

test('deck has 44 cards', () => {
    const deck = newDeck();
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

test.each([
    // trivial cases
    [1, Direction.Right, 2],
    [22, Direction.Left, 21],
    [12, Direction.Down, 18],
    [12, Direction.Up, 6],
    // literal edge cases!
    [0, Direction.Up, 30],
    [30, Direction.Down, 0],
    [0, Direction.Left, 5],
    [30, Direction.Left, 35],
    [5, Direction.Right, 0],
] as const)('moving %i,%s is %i', (start: number, dir: Direction, expected: number) => {
    expect(move(start, dir)).toBe(expected);
});

test('move only accept directions', () => {
    expect(() => move(1, 0)).toThrowError('Unknown direction');
});
