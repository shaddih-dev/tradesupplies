import { useEffect, useState } from "react";
import { PiMouseLeftClickFill, PiMouseRightClickFill, PiMouseMiddleClickFill } from "react-icons/pi";

const Guide = () => {
    const [isShowGuide, setIsShowGuide] = useState(false);
    const [zIndex, setZIndex] = useState(0);
    useEffect(() => {
        setTimeout(() => { setZIndex(1) }, 2000)
    }, []);
    return (
        <>
            <div className="absolute z-[1] top-2 right-2 p-1 bg-white bg-opacity-50 rounded-[50%] cursor-pointer hover:bg-opacity-100" onClick={() => setIsShowGuide(!isShowGuide)}>
                <img src="images/icons/i.png" alt="" className="w-6 h-6" />
            </div>
            <div className={`absolute z-[1] ${zIndex > 0 ? 'visible' : 'invisible'} top-2 right-[50px] bg-white p-2 rounded-lg shadow-lg min-w-[200px] max-w-[calc(100%-70px)] animate__animated ${isShowGuide ? 'animate__backInRight' : 'animate__backOutRight'}`}>
                <div className="flex flex-col gap-[8px]">
                    <div className="grid grid-cols-[20px_1fr] gap-[10px] items-center">
                        <div>
                            <PiMouseLeftClickFill className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="max-w-[160px] text-justify">
                            Click left mouse button and drag to rotate the camera
                        </div>
                    </div>
                    <div className="grid grid-cols-[20px_1fr] gap-[10px] items-center">
                        <div>
                            <PiMouseRightClickFill className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="max-w-[160px] text-justify">
                            Click right mouse button and drag to pan the camera
                        </div>
                    </div>
                    <div className="grid grid-cols-[20px_1fr] gap-[10px] items-center">
                        <div>
                            <PiMouseMiddleClickFill className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="max-w-[160px] text-justify">
                            Scroll middle mouse button to zoom in/out
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Guide;