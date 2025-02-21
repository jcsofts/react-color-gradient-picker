import React, { useCallback } from 'react';

import { updateGradientActivePercent } from 'lib/helpers';
import { useMouseEvents } from 'lib/hooks';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

function GradientPoint({
    point,
    activePointIndex,
    index,
    length,
    width,
    positions,
    changeActivePointIndex,
    updateGradientLeft,
    removePoint,
}) {
    const activeClassName = activePointIndex === index ? ' active' : '';

    const pointStyle = {
        left: `${(point.left * (width / 100)) - 6}px`,
    };

    const mouseDownHandler = useCallback(event => {
        changeActivePointIndex(index);

        const startX = event.pageX;
        const startY = event.pageY;
        const offsetX = startX - positions.x;

        updateGradientLeft(point.left, index, 'onStartChange');

        return {
            startX,
            startY,
            offsetX,

        };
    }, [point.left, index, positions, changeActivePointIndex, updateGradientLeft]);

    const changeObjectPositions = useCallback((event, { startX, offsetX }) => {
        const moveX = event.pageX - startX;
        offsetX += moveX;
        // update point percent
        const left = updateGradientActivePercent(offsetX, width);

        return {
            positions: {
                offsetX,
                startX: event.pageX,
            },
            left,
        };
    }, [width]);

    const mouseMoveHandler = useCallback((event, { startX, offsetX }) => {
        const { positions, left } = changeObjectPositions(event, { startX, offsetX });

        updateGradientLeft(left, index, 'onChange');

        return positions;
    }, [index, changeObjectPositions, updateGradientLeft]);

    const mouseUpHandler = useCallback((event, { startX, offsetX }) => {
        const { positions, left } = changeObjectPositions(event, { startX, offsetX });

        updateGradientLeft(left, index, 'onEndChange');

        return positions;
    }, [index, changeObjectPositions, updateGradientLeft]);

    const mouseEvents = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler);

    const onMouseDown = event => {
        changeActivePointIndex(index);
        mouseEvents(event);
    };

    const pointerClickHandler = event => {
        event.stopPropagation();
    };

    return length>2?(
        <Tippy content="double click to remove">
            <div
                className={`picker-pointer${activeClassName}`}
                onClick={pointerClickHandler}
                style={pointStyle}
                onMouseDown={onMouseDown}
                onDoubleClick={() => removePoint(index)}
            >
                <span className={`child-point${activeClassName}`} />
            </div>
        </Tippy>
        
    ):(
        <div
            className={`picker-pointer${activeClassName}`}
            onClick={pointerClickHandler}
            style={pointStyle}
            onMouseDown={onMouseDown}
            onDoubleClick={() => removePoint(index)}
        >
            <span className={`child-point${activeClassName}`} />
        </div>
    );
}

export default GradientPoint;
