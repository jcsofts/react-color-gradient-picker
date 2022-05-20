import React, { useState, useEffect, useCallback } from 'react';

import { rgbToHex,rgbaToHex, hexToRgb } from 'lib/helpers';
import { Input } from 'lib/components/UI';

function Hex({
    red, green, blue,alpha, updateRgb,
}) {
    const [hexValue, setHexValue] = useState('');
    const [progress, setProgress] = useState(false);
    useEffect(() => {
        let hex
        if (progress) {
            return;
        }
        if(alpha){
            hex = rgbaToHex(red, green, blue,alpha);
        }else{
            hex = rgbToHex(red, green, blue);
        }
        setHexValue(hex);
    }, [red, green, blue,alpha, progress]);

    const changeHex = useCallback(event => {
        setHexValue(event.target.value);
        const color = hexToRgb(event.target.value);
        if (color) {
            updateRgb(color);
        }
    }, [setHexValue, updateRgb]);

    return (
        <Input
            value={hexValue}
            label="hex"
            onChange={changeHex}
            onFocus={() => setProgress(true)}
            onBlur={() => setProgress(false)}
            classes="hex"
        />
    );
}

export default Hex;
