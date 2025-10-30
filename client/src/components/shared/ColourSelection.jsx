/* eslint-disable react/prop-types */
import _ from "lodash";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";

const ColourSelect = (
    {
        value = null,
        onChange = () => {},
        options = [],
        label = ''
    }
) => {

    useEffect(() => {
        if(value && !options.find(el => el.value == value)) {
            onChange(_.get(options, [0]))
        }
    }, [onChange, options, value])
    
    return <>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <div className="flex gap-2 flex-wrap items-center px-2">
                {
                    options && options.map((el) => (
                        <div 
                            key={el.value}
                            className="w-[30px] h-[30px] rounded-[50%] cursor-pointer flex items-center justify-center"
                            style={{
                                backgroundColor: el.value
                            }}
                            onClick={() => {onChange(el)}}
                        >
                            {
                                value == el.value && <TiTick color="#00FF00" width='28px'/>
                            }
                        </div>
                    ))
                }
            </div>
        </label>
    </>
}

export default ColourSelect