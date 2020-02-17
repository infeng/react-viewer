import { Document, Image, Page, StyleSheet } from '@react-pdf/renderer';
// tslint:disable-next-line
import React from 'react';
import { IWatermark, ImageDecorator } from './ViewerProps';

interface IProps {
    images: ImageDecorator[];
    watermark?: IWatermark;
}

const style = StyleSheet.create({
    page: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

const Watermark = ({ src, width, height, left, top }: IWatermark) => {
    return (
        <Image
            src={src}
            style={{
                position: 'absolute',
                left: !!left || left === 0 ? left : '0',
                top: !!top || top === 0 ? top : '0',
                width: !!width || width === 0 ? width : '100%',
                height: !!height || height === 0 ? height : '100%',
            }}
        />
    );
};

const ViewerDownloadPDF = ({ images, watermark }: IProps) => {
    const time = (new Date()).getTime();
    return (
        <Document>
            {images.map(({ src, hasWatermark}) => (
                <Page key={src} size="A4" style={style.page}>
                    <Image src={`${src}?v=${time}`} style={style.image}/>
                    {!!hasWatermark && !!watermark && (<Watermark {...watermark}/>)}
                </Page>
            ))}
        </Document>
    );
};

export { ViewerDownloadPDF };
