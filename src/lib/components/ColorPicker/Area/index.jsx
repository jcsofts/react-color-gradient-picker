import React from 'react';

import Picking from './Picking';
import Preview from './Preview';
import Hue from './Hue';
import Alpha from './Alpha';
import GradientPoints from './GradientPoints';

import { hexToRgb } from 'lib/helpers';

function Area({
    red,
    green,
    blue,
    alpha,
    hue,
    saturation,
    value,
    isGradient,
    type,
    degree,
    points,
    activePointIndex,
    updateRgb,
    changeActivePointIndex,
    updateGradientLeft,
    addPoint,
    removePoint,
    extraControl
}) {
    const ifEyeDropper = !!window.EyeDropper;

    const handleOpenEyeDropper = async () => {
        const eyeDropper = new EyeDropper();

        eyeDropper
            .open()
            .then((result) => {
                if (result && result.sRGBHex) {
                    updateRgb(hexToRgb(result.sRGBHex));
                }
            })
            .catch((e) => {
                console.error("ERROR: ", e);
            });
    };

    return (
        <div className="picker-area">
            {extraControl && extraControl}
            <Picking
                red={red}
                green={green}
                blue={blue}
                hue={hue}
                saturation={saturation}
                value={value}
                updateRgb={updateRgb}
            />

            {
                isGradient
                && (
                    <GradientPoints
                        type={type}
                        degree={degree}
                        points={points}
                        activePointIndex={activePointIndex}
                        changeActivePointIndex={changeActivePointIndex}
                        updateGradientLeft={updateGradientLeft}
                        addPoint={addPoint}
                        removePoint={removePoint}
                    />
                )
            }

            <div className="preview">
                <Preview
                    red={red}
                    green={green}
                    blue={blue}
                    alpha={alpha}
                    points={points}
                    gradientDegree={degree}
                    gradientType={type}
                    isGradient={isGradient}
                    eyeDropper={
                        ifEyeDropper && (
                            <div className="eyeDropper" onClick={handleOpenEyeDropper}>
                                {/* <i className="fas fa-eye-dropper"></i> */}
                                <button >Eye Dropper</button>
                            </div>
                        )
                    }
                />

                <div className="color-hue-alpha">
                    <Hue
                        hue={hue}
                        saturation={saturation}
                        value={value}
                        updateRgb={updateRgb}
                    />
                    <Alpha
                        alpha={alpha}
                        red={red}
                        green={green}
                        blue={blue}
                        updateRgb={updateRgb}
                    />
                </div>
            </div>
        </div>
    );
}

export default Area;
