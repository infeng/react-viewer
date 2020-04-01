// tslint:disable-next-line
import React, { useRef, useEffect, useState } from 'react';

const getCursorPos = (e, container) => {
    const event = e || window.event;
    const containerRect = container.getBoundingClientRect();
    const x = (event.pageX - containerRect.left) - window.pageXOffset;
    if (x > containerRect.width) {
        return containerRect.width;
    }
    if (x < 0) {
        return 0;
    }
    return x;
};

const setStyle = (ref, style) => {
    if (!ref || !ref.current) {
        return;
    }
    for (let key of Object.keys(style)) {
        ref.current.style[key] = style[key];
    }
};

const ViewerImageCompare = ({ renderComponentLeft, renderComponentRight }) => {
    const wrapperRef = useRef();
    const sliderRef = useRef();
    const elementLeftRef = useRef();
    const elementRightRef = useRef();
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [sliderIsClicked, setSliderIsClicked] = useState(false);

    const onMouseDown = () => setSliderIsClicked(true);
    const onMouseUp = () => setSliderIsClicked(false);
    const onMouseMove = (e) => {
        if (!sliderIsClicked) {
            return;
        }
        const cursorPos = getCursorPos(e, wrapperRef.current);
        const widthElementLeft = cursorPos;
        const widthElementRight = wrapperWidth - cursorPos;

        setStyle(elementLeftRef, { width: `${widthElementLeft}px` });
        setStyle(elementRightRef, { width: `${widthElementRight}px`, left: `${cursorPos}px` });
        setStyle(sliderRef, { left: `${cursorPos}px` });
    };

    useEffect(() => {
        if (!wrapperRef || !wrapperRef.current) {
            return;
        }

        const width = wrapperRef.current.getBoundingClientRect().width;
        setWrapperWidth(width);
        setStyle(sliderRef, {left: `${(width / 2)}px`});
    }, [wrapperRef]);

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp);
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="image-compare"
            onMouseMove={onMouseMove}
        >
            <div ref={elementLeftRef} className="image-compare__element">
                <div
                    className="image-compare__element__content"
                    style={{ width: `${wrapperWidth}px` }}
                >
                    {!!renderComponentLeft && renderComponentLeft()}
                </div>
            </div>
            <div ref={elementRightRef} className="image-compare__element image-compare__element--right">
                <div
                    className="image-compare__element__content"
                    style={{ width: `${wrapperWidth}px` }}
                >
                    {!!renderComponentRight && renderComponentRight()}
                </div>
            </div>
            <div
                ref={sliderRef}
                className="image-compare__slider"
                onMouseDown={onMouseDown}
            />
        </div>
    );
};

export default ViewerImageCompare;
