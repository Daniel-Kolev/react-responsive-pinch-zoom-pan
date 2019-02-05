import React from "react";
import { render } from "react-dom";
import PinchZoomPan from "../../src/PinchZoomPan";

const isDevelopment = () => process.env.NODE_ENV !== 'production';

const SizedContainerView = ({menu, width, height}) => (
    <div>
        <nav>{menu}</nav>
        <main style={{ width: `${width}px`, height: `${height}px` }}>
            <PinchZoomPan doubleTapBehavior='zoom' debugView={isDevelopment()}>
                <img alt='Demo Image' src={`http://picsum.photos/${width * 2}/${height * 2}?random`} />
            </PinchZoomPan>
        </main>
    </div>
)

const flexContentStyle = {
    fontSize: 20,
    margin: 'auto',
}
const FlexContainerView = ({menu}) => (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <nav style={{flex: 'none'}}>{menu}</nav>
        <div style={{flex: 'none', textAlign: 'center'}}><span style={flexContentStyle}>The image fills 100% of the flex item in which it is container</span></div>
        <main style={{flex: 'auto', overflow: 'hidden', display: 'flex'}}>
            <div style={{flex: 'none', alignSelf: 'center'}}>
                <span style={flexContentStyle}>Sidebar</span>
            </div>
            <div style={{flex: 'auto', overflow: 'hidden', position: 'relative'}}>
                <div style={{position: 'absolute', height: '100%', width: '100%'}}>
                    <PinchZoomPan debugView={isDevelopment()}>
                        <img alt='Demo Image' src='http://picsum.photos/2560/1440?random' />
                    </PinchZoomPan>
                </div>
            </div>
        </main>
    </div>
)

const Menu = ({viewId, onViewChange}) => {
    const getLinkStyle = linkViewId => {
        return {
            padding: 10,
            color: viewId === linkViewId
                ? 'orange'
                : 'blue',
        };
    };

    return (
        <React.Fragment>
            <span style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>Demo</span>
            <a href='#' onClick={() => onViewChange(0)} style={getLinkStyle(0)}>Small</a>
            <a href='#' onClick={() => onViewChange(1)} style={getLinkStyle(1)}>Medium</a>
            <a href='#' onClick={() => onViewChange(2)} style={getLinkStyle(2)}>Full-screen Flex</a>
        </React.Fragment>
    );
}

class App extends React.Component {
    state = {
        viewId: 0
    }
    
    handleViewChange = viewId => {
        this.setState({
            viewId
        });
    }

    render() {
        const { viewId } = this.state;
        const menu = <Menu viewId={viewId} onViewChange={this.handleViewChange} />
        return (
            viewId === 2 ? <FlexContainerView menu={menu} />
            : viewId === 1 ? <SizedContainerView menu={menu} width={500} height={800} />
            : <SizedContainerView menu={menu} width={300} height={500} />
        );
    }
}

render(<App />, document.getElementById("root"));