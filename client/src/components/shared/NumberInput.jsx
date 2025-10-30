/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"

const NumberInput = (
    {
        disabled = false,
        value = null,
        onChange = () => {},
        label = '',
        min = 0,
        max = 10000,
        step=50
    }
) => {
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    useEffect(() => {
        if(value < min) {
            onChange(min)
        }
    }, [min, onChange, value])

    useEffect(() => {
        if(value > max) {
            onChange(max)
        }
    }, [max, onChange, value])

    return <>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input
                disabled={disabled}
                type="number"
                value={localValue} 
                onChange={(e) => {setLocalValue(e.target.value)}}
                onBlur={(e) => {
                    let value = Math.max(min, e.target.value)
                    value = Math.min(max, value)
                    setLocalValue(value)
                    onChange(value)
                }}
                onKeyDown={(e) => {
                    if(e.code == 'Enter') {
                        let value = Math.max(min, e.target.value)
                        value = Math.min(max, value)
                        setLocalValue(value)
                        onChange(value)
                    }
                }}
                step={step}
                className="input input-bordered w-full input-sm" />
        </label>
        
    </>
}

export default NumberInput