namespace threed {
    export const Colors = {
        Transparent: 0,
        White: 1,
        Yellow: 3,
        Magenta: 5,
        Red: 7,
        Cyan: 9,
        Green: 11,
        Blue: 13,
        Black: 15,

        Palette: hex`000000FFFFFFAAAAAAFFFF55AA5500FF55FFAA00AAFF5555AA000055FFFF00AAAA55FF5500AA005555FF0000AA000000`,

        Valid: (color: number) => (color >= 1 && color <= 13 && color % 2),

        // Return the darker version of the given color.
        Shaded: (color: number) => Colors.Valid(color) ? color + 1 : Colors.Black,

        // Pick a non-shaded color. Exclude Transparent and Black.
        Random: () => 1 + 2 * Math.randomRange(0, 6),
    };
}