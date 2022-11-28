
import React, { useEffect, useState } from 'react';

import { generateSolidStyle, generateGradientStyle } from 'lib/helpers';

function Preview({
    red,
    green,
    blue,
    alpha,
    isGradient,
    points,
    gradientType,
    gradientDegree,
    eyeDropper = null
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

    return (
        <div className="preview-area">
            <div className="preview-box" style={style} />
            { eyeDropper }
        </div>
    );
}

export default Preview;
