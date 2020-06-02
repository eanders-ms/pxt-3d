namespace threed {
    // Quarter arc of sin values (64 entries)
    const sinTable: Fx8[] = [0 as any as Fx8, 6 as any as Fx8, 12 as any as Fx8, 18 as any as Fx8, 25 as any as Fx8, 31 as any as Fx8, 37 as any as Fx8, 43 as any as Fx8, 49 as any as Fx8, 56 as any as Fx8, 62 as any as Fx8, 68 as any as Fx8, 74 as any as Fx8, 80 as any as Fx8, 86 as any as Fx8, 92 as any as Fx8, 97 as any as Fx8, 103 as any as Fx8, 109 as any as Fx8, 115 as any as Fx8, 120 as any as Fx8, 126 as any as Fx8, 131 as any as Fx8, 136 as any as Fx8, 142 as any as Fx8, 147 as any as Fx8, 152 as any as Fx8, 157 as any as Fx8, 162 as any as Fx8, 167 as any as Fx8, 171 as any as Fx8, 176 as any as Fx8, 181 as any as Fx8, 185 as any as Fx8, 189 as any as Fx8, 193 as any as Fx8, 197 as any as Fx8, 201 as any as Fx8, 205 as any as Fx8, 209 as any as Fx8, 212 as any as Fx8, 216 as any as Fx8, 219 as any as Fx8, 222 as any as Fx8, 225 as any as Fx8, 228 as any as Fx8, 231 as any as Fx8, 234 as any as Fx8, 236 as any as Fx8, 238 as any as Fx8, 241 as any as Fx8, 243 as any as Fx8, 244 as any as Fx8, 246 as any as Fx8, 248 as any as Fx8, 249 as any as Fx8, 251 as any as Fx8, 252 as any as Fx8, 253 as any as Fx8, 254 as any as Fx8, 254 as any as Fx8, 255 as any as Fx8, 255 as any as Fx8, 255 as any as Fx8, 256 as any as Fx8];

    const TWO_PI = 256;
    const PI = 128;
    const PI_OVER_2 = 64;
    const TWO_PI_OVER_3 = 192;
    const TWO_PI_FX8 = Fx8(TWO_PI);
    const PI_FX8 = Fx8(PI);
    const PI_OVER_2_FX8 = Fx8(PI_OVER_2);
    const TWO_PI_OVER_3_FX8 = Fx8(TWO_PI_OVER_3);

    export const negOneFx8 = Fx8(-1);

    function fxmod(a: Fx8, b: Fx8) {
        return ((a as any as number) % (b as any as number)) as any as Fx8;
    }

    export function fxsin(theta: Fx8) {
        let index: Fx8, origIndex: Fx8;
        // Put in unit circle (positive or negative)
        index = fxmod(theta, TWO_PI_FX8);
        // Put into positive units
        if (index < Fx.zeroFx8)
            index = Fx.add(index, TWO_PI_FX8);
        // Save unit circle index
        origIndex = index;
        // Put index into the quarter arc
        index = fxmod(index, PI_OVER_2_FX8);
        let sign = Fx.oneFx8;
        // If index is greater than PI, negate the result
        if (origIndex > PI_FX8)
            sign = Fx.neg(sign);
        // If index is in a reverse quadrant, reverse the lookup
        if ((origIndex >= PI_OVER_2_FX8 && origIndex < PI_FX8) || (origIndex >= TWO_PI_OVER_3_FX8 && origIndex < TWO_PI_FX8))
            index = Fx.sub(PI_OVER_2_FX8, index);
        // Lookup the value
        const s = sinTable[Fx.toInt(index)];
        // TODO: Lerp to the closest value between table entries
        // Apply the sign
        return Fx.mul(sign, s);
    }

    export function fxcos(theta: Fx8) {
        return fxsin(Fx.add(theta, PI_OVER_2_FX8));
    }
}