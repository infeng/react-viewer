import React, { useState } from 'react';

import ViewerImageCompare from './ViewerCompareImage';
import ViewerCore from './ViewerCore';
import ViewerProps from './ViewerProps';

const compareViewerConfig = {
    noClose: true,
    noNavbar: true,
    changeable: false,
    fullScreen: false,
    showExport: false,
    compareImages: false,
    upToolbar: true,
};

const ViewerWrapper: React.FC<ViewerProps> = ({ noClose, customToolbar, ...props }: ViewerProps) => {
    const [showCompareImage, setShowCompareImage] = useState(false);
    const [imageLeft, setImageLeft] = useState([]);
    const [imageRight, setImageRight] = useState([]);

    const onCompareImages = (images) => {
        if (!images.length || images.length < 2) {
            return;
        }
        setImageLeft([images[0]]);
        setImageRight([images[1]]);
        setShowCompareImage(true);
    };

    const onCloseCompare = () => {
        setImageLeft([]);
        setImageRight([]);
        setShowCompareImage(false);
    };

    const getCustomToolbar = (toolbars) => [
        ...(!!customToolbar ? customToolbar(toolbars) : toolbars),
        {
            key: 'close',
            actionType: 8,
            title: 'Fechar comparação',
            onClick: onCloseCompare,
        },
    ];

    if (!showCompareImage) {
        return (
            <ViewerCore
                {...props}
                customToolbar={customToolbar}
                noClose={noClose || true}
                onCompareImages={onCompareImages}

            />
        );
    }

    return (
        <ViewerImageCompare
            minWidth={150}
            renderComponentLeft={(wrapperSizeProps) => (
                <ViewerCore
                    {...props}
                    {...compareViewerConfig}
                    customToolbar={getCustomToolbar}
                    onClose={onCloseCompare}
                    images={imageLeft}
                    wrapperSizeProps={wrapperSizeProps}
                />
            )}
            renderComponentRight={(wrapperSizeProps) => (
                <ViewerCore
                    {...props}
                    {...compareViewerConfig}
                    customToolbar={getCustomToolbar}
                    onClose={onCloseCompare}
                    images={imageRight}
                    wrapperSizeProps={wrapperSizeProps}
                />
            )}
        />
    );
};

export default ViewerWrapper;
