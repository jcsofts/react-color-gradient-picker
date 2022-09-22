# React Color Gradient Picker
this repo is fork from arthay/react-color-gradient-picker and change some things 

## Table of Contents

* [Installation](#installation)
* [Examples](#examples)
* [Demos](#demo)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):


    $ npm install react-solid-gradient-picker
    $ yarn add react-solid-gradient-picker

## Examples

Here is a simple examples of react-solid-gradient-picker being used in an app:

### Color Picker
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ColorPicker } from 'react-solid-gradient-picker';
import 'react-solid-gradient-picker/dist/index.css';

const color = {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
};

function App() {
    const [colorAttrs, setColorAttrs] = useState(color);
    
    const onChange = (colorAttrs) => {
        setColorAttrs(colorAttrs);
    };
  
    return (
        <ColorPicker
            onStartChange={onChange}
            onChange={onChange}
            onEndChange={onChange}
            color={colorAttrs}
        />

    );
}

ReactDOM.render(<App />, document.getElementById('app-id'));
```

### Gradient Color Picker
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ColorPicker } from 'react-solid-gradient-picker';
import 'react-solid-gradient-picker/dist/index.css';

const gradient = {
    points: [
        {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
        },
    ],
    degree: 0,
    type: 'linear',
};

function App() {
    const [gradientAttrs, setGradientAttrs] = useState(gradient);
    
    const onChange = (gradientAttrs) => {
        setGradientAttrs(gradientAttrs);
    };
  
    return (
        <ColorPicker
            onStartChange={onChange}
            onChange={onChange}
            onEndChange={onChange}
            gradient={gradientAttrs}
            isGradient
        />

    );
}

ReactDOM.render(<App />, document.getElementById('app-id'));
```
