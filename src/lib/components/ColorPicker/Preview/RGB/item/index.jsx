import React, { useCallback, useEffect, useState } from 'react';
import { rgbaTest,rgbTest } from 'lib/helpers/regexTest';
import { Input } from 'lib/components/UI';

export default function RGBItem({
    value, type, label, onChange,
}) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        if (value !== +inputValue && inputValue !== '') {
            setInputValue(value);
        }
    }, [inputValue, value]);

    const onChangeHandler = useCallback(event => {
        const value = +event.target.value;
        const value2 = event.target.value;
        const rgba = rgbaTest(value2);
        const rgb = rgbTest(value2);
        if ((Number.isNaN(value)&& (!rgba&&!rgb)) || (value.length > 3 && (!rgba&&!rgb)) || value < 0 || value > 255) {
            return;
        }
        if(rgba){
            onChange(value2);
        }else if(rgb){
            onChange(value2);
        }else{
            onChange(value);
        }
        setInputValue(value2);   
    }, [onChange]);

    const onBlur = useCallback(() => {
        !inputValue && inputValue !== 0 && setInputValue(value);
    }, [inputValue, setInputValue, value]);

    return (
        <Input
            value={inputValue}
            type={type}
            label={label}
            onChange={onChangeHandler}
            onBlur={onBlur}
            classes="rgb"
        />
    );
}
