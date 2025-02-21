import React, { useCallback, useState,useMemo } from 'react';

import { useMount } from 'lib/hooks';
import { rgbToHsv, getRightValue, generateSolidStyle } from 'lib/helpers';

import Area from '../Area';
import Preview from '../Preview';

function Solid({
    red,
    green,
    blue,
    alpha,
    onChange,
    onStartChange,
    onEndChange,
    extraControl=null
}) {
    const [colorRed, setColorRed] = useState(red);
    const [colorGreen, setColorGreen] = useState(green);
    const [colorBlue, setColorBlue] = useState(blue);
    const [colorAlpha, setColorAlpha] = useState(alpha);
    const [colorHue, setColorHue] = useState(0);
    const [colorSaturation, setColorSaturation] = useState(100);
    const [colorValue, setColorValue] = useState(100);
    const [key_, setKey] = useState(0)

    const actions = useMemo(()=>{
        return {
        onChange,
        onStartChange,
        onEndChange,
    }},[onChange,onStartChange,onEndChange]);

    useMount(() => {
        const { hue, saturation, value } = rgbToHsv({ red: colorRed, green: colorGreen, blue: colorBlue });

        setColorHue(hue);
        setColorSaturation(saturation);
        setColorValue(value);
    });

    const updateColor = useCallback(({
        red, green, blue, alpha, hue, saturation, value,
    }, actionName = 'onChange') => {
        red = getRightValue(red, colorRed);
        green = getRightValue(green, colorGreen);
        blue = getRightValue(blue, colorBlue);
        alpha = getRightValue(alpha, colorAlpha);//allow 0
        hue = getRightValue(hue, colorHue);
        saturation = getRightValue(saturation, colorSaturation);
        value = getRightValue(value, colorValue);
        if(alpha==null || alpha===undefined){
            alpha=1;
        }
        setKey(key_+1)
        setColorRed(red);
        setColorGreen(green);
        setColorBlue(blue);
        setColorAlpha(alpha);
        setColorHue(hue);
        setColorSaturation(saturation);
        setColorValue(value);

        const action = actions[actionName];

        action && action({
            red,
            green,
            blue,
            alpha,
            hue,
            saturation,
            value,
            style: generateSolidStyle(red, green, blue, alpha),
        });
    }, [key_, colorRed, colorGreen, colorBlue, colorAlpha,
        colorHue, colorSaturation, colorValue,
        actions,
    ]);

    const handleUpdateRgb=(rgb)=>{
        updateColor(rgb,"onEndChange")
    }

    return (
        <>
            <Area
                key={key_}
                red={colorRed}
                green={colorGreen}
                blue={colorBlue}
                alpha={colorAlpha}
                hue={colorHue}
                saturation={colorSaturation}
                value={colorValue}
                updateRgb={updateColor}
                extraControl={extraControl}
            />
            <Preview
                red={colorRed}
                green={colorGreen}
                blue={colorBlue}
                alpha={colorAlpha}
                updateRgb={updateColor}
            />
        </>
    );
}

Solid.defaultProps = {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
};

export default Solid;
