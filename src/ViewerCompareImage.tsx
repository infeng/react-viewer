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

    const wrapperRef = useRef<any>();
    const sliderRef = useRef<any>(Array.from({length: renderComponentItems.length - 1}, () => React.createRef()));
    const elementRef = useRef<any>(Array.from({length: renderComponentItems.length}, () => React.createRef()));

    const [positionSliders, setPositionSliders] = useState(new Array(renderComponentItems.length - 1));

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
        }

        const difPositionSlider = sliderInitialPosition - cursorPos;

        let widthElementLeft = widthElement;
        let widthElementRight = widthElement;

        /* Pegando as configs dos slider vizinhos */
        const sliderLeftPosition = positionSliders[sliderClicked - 1];
        const sliderRightPosition = positionSliders[sliderClicked + 1];

        if (sliderLeftPosition) {
            if (sliderLeftPosition > 0) {
                widthElementLeft += Math.abs(sliderLeftPosition);
            } else {
                widthElementLeft -= Math.abs(sliderLeftPosition);
            }
        }

        if (sliderRightPosition) {
            if (sliderRightPosition > 0) {
                widthElementRight -= Math.abs(sliderRightPosition);
            } else {
                widthElementRight += Math.abs(sliderRightPosition);
            }
        }

        /* Calculo da posição atual do slider para as duas imagens */
        if (difPositionSlider < 0) {
            widthElementLeft += Math.abs(difPositionSlider);
            widthElementRight -= Math.abs(difPositionSlider);
        } else if (difPositionSlider > 0) {
            widthElementLeft -= Math.abs(difPositionSlider);
            widthElementRight += Math.abs(difPositionSlider);
        }

        let aux = sizePropsElement;

        aux[sliderClicked] = {
            wrapperWidth: wrapperWidth,
            width: widthElementLeft,
            left: 0,
        };

        aux[sliderClicked + 1] = {
            wrapperWidth: wrapperWidth,
            width: widthElementRight,
            left: 0,
        };

        /* Checa o tamanho minimo do container da imagem */
        if (!!minWidth && (widthElementLeft <= minWidth || widthElementRight <= minWidth)) {
            return;
        }

        setSizePropsElement(aux);

        let slideAux = positionSliders;
        slideAux[sliderClicked] = difPositionSlider;

        setPositionSliders(slideAux);

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
            <div
                ref={el => elementRef.current[i] = el}
                className={`image-compare__element image-compare__element_${i}`} key={`elementCompare-${i}`}
            >
                <div className="image-compare__element__content">
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
