export default function rgbaToHex(red, green, blue,alpha) {
    let r16 = red.toString(16);
    let g16 = green.toString(16);
    let b16 = blue.toString(16);
    let a;
    if (red < 16) r16 = `0${r16}`;
    if (green < 16) g16 = `0${g16}`;
    if (blue < 16) b16 = `0${b16}`;
    a = ((alpha * 255) | 1 << 8).toString(16).slice(1)
    return r16 + g16 + b16 + a;
}
