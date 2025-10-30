/* eslint-disable react/prop-types */
import _ from "lodash";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";

const DoubleColourSelection = (
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
                            className="w-[30px] h-[30px] rounded-[50%] overflow-hidden cursor-pointer flex items-center justify-center relative"
                            style={{
                                backgroundColor: el.value
                            }}
                            onClick={() => {onChange(el)}}
                        >
                            {
                                el.colours.map((o, idx) => (
                                    <div
                                        key={`${o.value}-${idx}`}
                                        className="w-[15px] h-[30px]"
                                        style={{
                                            backgroundColor: o.value,
                                            borderWidth: 0,
                                            borderRightWidth: idx == 0 ? 1 : 0,
                                            borderLeftWidth: idx == 1 ? 1 : 0,
                                            borderColor: '#e8e8e8'
                                        }}
                                    >

                                    </div>
                                ))
                            }
                            {
                                value == el.value && 
                                <div
                                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                >
                                    <TiTick color="#00FF00" width='28px'/>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </label>
    </>
}

export default DoubleColourSelection