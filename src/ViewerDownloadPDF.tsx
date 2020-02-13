import { Document, Image, Page } from '@react-pdf/renderer';
// tslint:disable-next-line
import React from 'react';

const ViewerDownloadPDF = ({ images }) => (
    <Document>
        {images.map(({ src }) => (
            <Page key={src} size="A4">
                <Image src={src}/>
            </Page>
        ))}
    </Document>
);

export { ViewerDownloadPDF };
