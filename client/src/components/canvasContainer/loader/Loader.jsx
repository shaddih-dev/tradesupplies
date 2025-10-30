import { Html, useProgress } from "@react-three/drei"

export default function Loader() {
    const { progress } = useProgress()
  
    return (
      <Html center wrapperClass="preloader">
        {progress.toFixed(0)} % loaded
        <div className="progress-bar">
          <span className="bar">
            <span
              className="progress"
              style={{
                width: `${progress}%`,
                background: '#959da5',
                padding: '5px'
              }}></span>
          </span>
        </div>
      </Html>
    )
}