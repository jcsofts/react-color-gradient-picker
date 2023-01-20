import React from 'react';

import { ColorPicker } from './lib';

function App() {
    const onChange = (attrs, name) => {
        console.log(attrs, name);
    };

    const button=(
        <div style={{ position: 'absolute',top:-8,right:-8,zIndex:"1" }}><i className="far fa-times-circle"></i></div>
    );

    return (
        <div style={{ display: 'flex', textAlign: 'center' }}>
            <div style={{ marginRight: '50px' }}>
                <p>Solid</p>
                <ColorPicker
                    onStartChange={color => onChange(color, 'start')}
                    onChange={color => onChange(color, 'change')}
                    onEndChange={color => onChange(color, 'end')}
                    extraControl={button}
                    //color={null}
                />
            </div>
            <div>
                <p>Gradient</p>
                <ColorPicker
                    onStartChange={color => onChange(color, 'start')}
                    onChange={color => onChange(color, 'change')}
                    onEndChange={color => onChange(color, 'end')}
                    isGradient
                    extraControl={button}
                />
            </div>
        </div>
    );
}

export default App;
