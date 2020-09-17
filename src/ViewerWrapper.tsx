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
    navBarSide: false,
};

const ViewerWrapper: React.FC<ViewerProps> = ({ noClose, customToolbar, ...props }: ViewerProps) => {
    const [showCompareImage, setShowCompareImage] = useState(false);
    const [items, setItems] = useState([]);

    const onCompareImages = (images) => {
        if (!images.length || images.length < 2) {
            return;
        }
        setItems(images);
        setShowCompareImage(true);
    };

    const onCloseCompare = () => {
        setItems([]);
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

    const itemsRender = items.map((image) => {
        return ((wrapperSizeProps) => (
            <ViewerCore
                {...props}
                {...compareViewerConfig}
                customToolbar={getCustomToolbar}
                onClose={onCloseCompare}
                images={[image]}
                wrapperSizeProps={wrapperSizeProps}
            />
        ));
    });

    return (
        <ViewerImageCompare
            minWidth={150}
            renderComponentItems={itemsRender}
        />
    );
};

export default ViewerWrapper;
