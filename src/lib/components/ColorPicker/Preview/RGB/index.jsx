import React, { useCallback } from 'react';
import { rgbaTest,rgbTest } from 'lib/helpers/regexTest';
import { rgbToHsv } from 'lib/helpers';

import RGBItem from './item';

function RGB({
    red, green, blue, alpha, updateRgb,
}) {
    const changeValue = useCallback((field, value) => {
        let r,g,b,a;
        const rgba = typeof value === 'string' && rgbaTest(value);
        const rgb = typeof value === 'string' && rgbTest(value);
        if(rgba){
            r=parseInt(rgba[1]);
            g=parseInt(rgba[2]);
            b=parseInt(rgba[3]);
            a=parseFloat(rgba[4]);
            const color = rgbToHsv({
                red:r,green:g,blue:b
            });
            updateRgb({ ...color, 'red' : r, 'green' : g, 'blue' : b, 'alpha' : a },"onEndChange");
            return;
        }else if(rgb){
            r=parseInt(rgb[1]);
            g=parseInt(rgb[2]);
            b=parseInt(rgb[3]);
            const color = rgbToHsv({
                red:r,green:g,blue:b
            });
            updateRgb({ ...color, 'red' : r, 'green' : g, 'blue' : b, 'alpha' : 1  },"onEndChange");
            return;
        }
        else{
            if (field === 'alpha') {
                updateRgb({ alpha: value / 100 },"onEndChange");
    
                return;
            }
    
            const color = rgbToHsv({
                red, green, blue, [field]: value,
            });
            updateRgb({ ...color, [field]: value },"onEndChange");
        }
       
    }, [red, green, blue, updateRgb]);

    return (
        <>
            <RGBItem
                value={red}
                type="text"
                label="R"
                onChange={value => changeValue('red', value)}
            />

            <RGBItem
                value={green}
                type="number"
                label="G"
                onChange={value => changeValue('green', value)}
            />

            <RGBItem
                value={blue}
                type="number"
                label="B"
                onChange={value => changeValue('blue', value)}
            />

            <RGBItem
                value={parseInt(alpha * 100, 10)}
                type="number"
                label="alpha"
                onChange={value => changeValue('alpha', value)}
            />
        </>
    );
}

export default RGB;
