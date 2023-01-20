
import React, { useEffect, useState,useMemo } from 'react';

import { generateSolidStyle, generateGradientStyle } from 'lib/helpers';

import { rgbTest } from 'lib/helpers/regexTest';
import { hexToRgb,parseRgb,rgbToHex } from 'lib/helpers';
import { yiq } from 'yiq';

function Preview({
    red,
    green,
    blue,
    alpha,
    isGradient,
    points,
    gradientType,
    gradientDegree,
    onEyeDropChange
}) {
    const [style, setStyle] = useState({});

    const ifEyeDropper = 'EyeDropper' in window;

    const handleOpenEyeDropper = () => {
        if(!ifEyeDropper){
            return;
        }
        const eyeDropper = new window.EyeDropper();

        eyeDropper
            .open()
            .then((result) => {
                if (result && result.sRGBHex) {
                    if(rgbTest(result.sRGBHex)){
                        const rgbObj=parseRgb(result.sRGBHex);
                        const hex=rgbToHex(rgbObj.red,rgbObj.green,rgbObj.blue);
                        onEyeDropChange(hexToRgb(hex));
                    }else if(result.sRGBHex.startsWith('#')){
                        onEyeDropChange(hexToRgb(result.sRGBHex));
                    }
                    
                }
            })
            .catch((e) => {
                console.error("ERROR: ", e);
            });
    };

    useEffect(() => {
        if (isGradient) {
            const style = generateGradientStyle(points, gradientType, gradientDegree);
            setStyle({ background: style });
            return;
        }

        const style = generateSolidStyle(red, green, blue, alpha);
        setStyle({ backgroundColor: style });
    }, [points, gradientDegree, gradientType, isGradient, red, green, blue, alpha]);

    const iconColor=useMemo(()=>{
        
        return yiq(`#${rgbToHex(red, green, blue)}`);
    },[red, green, blue])

    return (
        <div className="preview-area">
            <div className="preview-box" style={style} onClick={handleOpenEyeDropper}>
                {ifEyeDropper && (
                    <i className="fas fa-eye-dropper" style={{ color:iconColor }}></i>
                )}
            </div>
        </div>
    );
}

export default Preview;
