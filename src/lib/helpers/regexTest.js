var rgb_color_regex = /^rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*\)$/;
var rgba_color_regex = /^rgba\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*((0.[1-9]{0,4})|(.[1-9]{0,4})|(.0[1-9]{0,4})|[01])\s*\)$/;

export const rgbaTest = (value)=>{
    const rgbaTest = value.match(rgba_color_regex);
    return rgbaTest;
}
export const rgbTest = (value)=>{
    const rgbTest = value.match(rgb_color_regex);
    return rgbTest;
}