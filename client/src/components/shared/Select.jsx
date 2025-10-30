/* eslint-disable react/prop-types */

import _ from "lodash"
import { useEffect } from "react"

const Select = (
    {
        value = '',
        onChange = () => {},
        options = [],
        label = '',
        disabled = false
    }
) => {
    useEffect(() => {
        if(value && !options.find(el => el.value == value)) {
            onChange(_.get(options, [0]))
        }
    }, [onChange, options, value]);

    return <>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select 
                className="select select-bordered select-sm" 
                value={value} 
                disabled={disabled}
                onChange={(e) => {onChange(options.find(el => el.value == e.target.value))}
            }>
                {
                    options && options.map((el) => (
                        <option value={el.value} key={el.value}>{el.text}</option>
                    ))
                }
            </select>
        </label>
    </>
}

export default Select