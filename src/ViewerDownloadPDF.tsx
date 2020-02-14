import { Document, Image, Page } from '@react-pdf/renderer';
// tslint:disable-next-line
import React from 'react';

const ViewerDownloadPDF = ({ images }) => {
    const time = (new Date()).getTime();
    return (
        <Document>
            {images.map(({ src }) => (
                <Page key={src} size="A4">
                    <Image src={`${src}?v=${time}`}/>
                </Page>
            ))}
        </Document>
    );
};

export { ViewerDownloadPDF };
