export type Card = 'l' | 'j' | 'k' | 'x' | 'n' | 'm' | 's' | 'z' | 'u' | 'h' | 't' | '#';
export type Deck = Array<Card>;
export const enum Status {
    FaceDown,
    FaceUp,
    Buried,
}
export type Tile = {
    card: Card,
    pipes: Array<Array<number>>,
    rotated: boolean,
    status: Status,
}
export type Board = Array<Tile>;

export const height = 6 as const;
export const width = 6 as const;
export const numCells = 36 as const; // height * width, of course

const startTileIndexes = [7, 10, 25, 28] as const; // must be sorted
const cardPipes = {
    l: [[1, 3], [2, 5]],
    j: [[1, 4], [3, 5]],
    k: [[0, 1], [2, 4], [3, 5]],
    x: [[0, 5], [1, 3], [2, 4]],
    n: [[0, 5], [1, 3]],
    m: [[0, 1], [3, 5]],
    s: [[0, 5], [1, 4], [2, 3]],
    z: [[0, 1], [2, 5], [3, 4]],
    u: [[0, 5], [1, 2], [3, 4]],
    h: [[0, 3], [1, 5], [2, 4]],
    t: [[0, 1, 5], [2, 3, 4]],
    '#': [],
};

function shuffle(ar: Array<unknown>) {
    // http://en.wikipedia.org/wiki/Knuth_shuffle
    for (let i = ar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [ar[j], ar[i]] = [ar[i], ar[j]];
    }
}

export function newDeck(): Deck {
    // @ts-expect-error The chars are all of type Card
    const deck: Deck = "ljkxnmszuht".repeat(4).split('');
    shuffle(deck);
    return deck;
}

export function deal(): Board {
    const deck = newDeck();

    const board: Array<Tile> = deck.slice(0, numCells - startTileIndexes.length).map((c) => ({
        card: c,
        pipes: cardPipes[c],
        rotated: Math.random() > 0.5,
        status: Status.FaceDown,
    }));

    const startTile: Tile = {
        card: '#',
        pipes: [],
        rotated: false,
        status: Status.FaceUp,
    };

    for (const i of startTileIndexes) {
        board.splice(i, 0, { ...startTile });
    }

    return board;
}

export const enum Direction {
    Up = -6, // = -width
    Down = 6, // = width
    Left = -1,
    Right = 1,
}

export function move(start: number, direction: Direction): number {
    // Note that JS is weird with "modulus": -1 % 2 is -1 not 1
    // To avoid this, we add the divisor before the % operation

    switch (direction) {
        case Direction.Left:
        case Direction.Right:
            return start - (start % width) + (start + direction + width) % width;

        case Direction.Up:
        case Direction.Down:
            return (start + direction + numCells) % numCells;

        default:
            throw new Error("Unknown direction");
    }
}
