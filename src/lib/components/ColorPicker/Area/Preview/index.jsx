
import React, { useEffect, useState } from 'react';

import { generateSolidStyle, generateGradientStyle } from 'lib/helpers';
import { EyeDropper } from "lib/components/EyeDropper";
import pickerSvg from "lib/assets/images/color-picker.svg"

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

    useEffect(() => {
        if (isGradient) {
            const style = generateGradientStyle(points, gradientType, gradientDegree);
            setStyle({ background: style });
            return;
        }

        const style = generateSolidStyle(red, green, blue, alpha);
        setStyle({ backgroundColor: style });
    }, [points, gradientDegree, gradientType, isGradient, red, green, blue, alpha]);

    const onChange = (hexColor) => {
        onEyeDropChange(hexColor);
    };

    return (
        <div className="preview-area">
            <EyeDropper setColor={onChange}>
                <div className="preview-box" style={style}>
                    <img src={pickerSvg} style={{ width:"16px",height:"16px" }} alt=""/>
                </div>
            </EyeDropper>
        </div>
    );
}

export default Preview;
