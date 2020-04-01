import React from 'react';

import ViewerImageCompare from './ViewerCompareImage';
import ViewerCore from './ViewerCore';
import ViewerProps from './ViewerProps';

interface ViewerWrapperState {
    showCapareImage: boolean;
}

export default class ViewerWrapper extends React.Component<ViewerProps, ViewerWrapperState> {
    public state: ViewerWrapperState;

    constructor(props) {
        super(props);
        this.state = {
            showCapareImage: false,
        };
    }

    render() {
        return (
            <ViewerImageCompare
                renderComponentLeft={() => (
                    <ViewerCore
                        {...this.props}
                        noClose={this.props.noClose || true}
                    />
                )}
                renderComponentRight={() => (
                    <ViewerCore
                        {...this.props}
                        noClose={this.props.noClose || true}
                    />
                )}
            />
        );
    }
}
