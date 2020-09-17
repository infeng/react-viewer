// tslint:disable-next-line
import React, { useRef, useEffect, useState } from 'react';

interface ViewerImageCompareProps {
    renderComponentItems;
    minWidth?: number;
}

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
    if (!ref) {
        return;
    }
    for (let key of Object.keys(style)) {
        ref.style[key] = style[key];
    }
};

const ViewerImageCompare: React.FC<ViewerImageCompareProps> = ({
    renderComponentItems,
    minWidth,
}) => {

    const wrapperRef = useRef();
    const sliderRef = useRef(Array.from({length: renderComponentItems.length - 1}, () => React.createRef()));
    const elementRef = useRef(Array.from({length: renderComponentItems.length}, () => React.createRef()));

    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [sliderClicked, setSliderClicked] = useState(null);
    const [sizePropsElement, setSizePropsElement] = useState(new Array(renderComponentItems.length));

    const [ widthElement, setWidthElement ] = useState(0);

    const onMouseDown = (index) => setSliderClicked(index);
    const onMouseUp = () => setSliderClicked(null);
    const onMouseMove = (e) => {

        if (sliderClicked === null) {
            return;
        }

        const cursorPos = getCursorPos(e, wrapperRef.current);

        /* Validações de posicionamento do slider */
        const sliderInitialPosition = widthElement * (sliderClicked + 1);
        const maxPositionSlider = sliderInitialPosition + (widthElement - 50);
        const minPositionSlider = sliderInitialPosition - (widthElement - 50);

        if (cursorPos >= maxPositionSlider || cursorPos <= minPositionSlider) {
            return;
            // tslint:disable-next-line
        }

        if (!!minWidth && (widthElementLeft <= minWidth || widthElementRight <= minWidth)) {
            return;
            // tslint:disable-next-line
        }

        const difSize = sliderInitialPosition - cursorPos;

        let widthElementLeft = elementRef.current[sliderClicked].getBoundingClientRect().width;
        let widthElementRight = elementRef.current[sliderClicked + 1].getBoundingClientRect().width;

        if (difSize < 0) {
            widthElementLeft = widthElementLeft + Math.abs(difSize);
            widthElementRight = widthElementRight - Math.abs(difSize);
        } else if (difSize > 0) {
            widthElementLeft = widthElementLeft - Math.abs(difSize);
            widthElementRight = widthElementRight + Math.abs(difSize);
        }

        /*

        setSizePropsElementLeft({
            wrapperWidth,
            width: widthElementLeft,
            left: 0,
        });
        setSizePropsElementRight({
            wrapperWidth,
            width: widthElementRight,
            left: cursorPos,
        });
        */

        setStyle(elementRef.current[sliderClicked], { width: `${widthElementLeft}px` });
        setStyle(elementRef.current[sliderClicked + 1], { width: `${widthElementRight}px` });
        setStyle(sliderRef.current[sliderClicked], { left: `${cursorPos}px` });
    };

    useEffect(() => {
        if (!wrapperRef || !wrapperRef.current) {
            return;
        }

        const width = wrapperRef.current.getBoundingClientRect().width;
        const widthElementValue = width / renderComponentItems.length;

        setWidthElement(widthElementValue);

        renderComponentItems.forEach( (item, index) => {
            let aux = sizePropsElement;
            aux[index] = {
                wrapperWidth: width,
                width: width / renderComponentItems.length,
                left: 0,
            };

            setSizePropsElement(aux);

            setStyle(elementRef.current[index], { width: `${widthElementValue}px` });
        });

        setWrapperWidth(width);

        sliderRef.current.forEach( (slider, i) => {
            setStyle(slider, {left: `${(widthElementValue * (i + 1))}px`});
        } );

    }, [wrapperRef]);

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp);
    }, []);

    const renderImgItem = (item, i) => {

        return (
            <div ref={el => elementRef.current[i] = el} className="image-compare__element">
                <div
                    className="image-compare__element__content"
                    style={{ width: `${wrapperWidth}px` }}
                >
                    {!!item && item(sizePropsElement[i])}
                </div>
            </div>
        );
    };

    const renderSliders = () => {

        let obj = [];
        for ( let x = 0; x < renderComponentItems.length - 1; x++ ) {
            obj.push(
                <div
                    ref={el => sliderRef.current[x] = el}
                    className="image-compare__slider"
                    onMouseDown={ e => onMouseDown(x)}
                />
            );
        }

        return obj;
    };

    return (
        <div
            ref={wrapperRef}
            className="image-compare"
            onMouseMove={onMouseMove}
        >
            { renderComponentItems.map( (renderItem, index) => {
                return renderImgItem(renderItem, index);
            }) }

            { renderSliders() }

        </div>
    );
};

export default ViewerImageCompare;
