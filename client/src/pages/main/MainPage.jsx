/* eslint-disable no-undef */
import CanvasContainer from "../../components/canvasContainer/CanvasContainer";
import ConfigTab from "../../components/configTab/ConfigTab";
import Header from "../../components/header/Header";

function MainPage() {
  return (
    <>
        <div className="py-6 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <a href="#" className="hover:underline hover:text-gray-600">
                    Home
                    </a>
                    <span>
                    <svg
                        className="h-5 w-5 leading-none text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                        />
                    </svg>
                    </span>
                    <a href="#" className="hover:underline hover:text-gray-600">
                    Custom Sign Blank with Channel
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="rounded-lg bg-gray-100 mb-4">
                            <CanvasContainer />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <ConfigTab />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default MainPage;
