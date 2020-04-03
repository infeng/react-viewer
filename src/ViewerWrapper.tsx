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
};

const ViewerWrapper: React.FC<ViewerProps> = ({ noClose, ...props }: ViewerProps) => {
    const [showCompareImage, setShowCompareImage] = useState(false);
    const [imageLeft, setImageLeft] = useState([]);
    const [imageRight, setImageRight] = useState([]);

    const onCompareImages = (images) => {
        if (!images.length || images.length < 2) {
            return;
        }
        setImageLeft(images[0]);
        setImageRight(images[1]);
        setShowCompareImage(true);
    };

    const onCloseCompare = () => {
        setImageLeft([]);
        setImageRight([]);
        setShowCompareImage(false);
    };

    if (!showCompareImage) {
        return (
            <ViewerCore
                {...props}
                noClose={noClose || true}
                onCompareImages={onCompareImages}
            />
        );
    }

    return (
        <ViewerImageCompare
            renderComponentLeft={() => (
                <ViewerCore
                    {...props}
                    {...compareViewerConfig}
                    onCloseCompare={onCloseCompare}
                    images={imageLeft}
                />
            )}
            renderComponentRight={() => (
                <ViewerCore
                    {...props}
                    {...compareViewerConfig}
                    onCloseCompare={onCloseCompare}
                    images={imageRight}
                />
            )}
        />
    );
};

export default ViewerWrapper;
