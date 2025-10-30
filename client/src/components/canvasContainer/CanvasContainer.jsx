import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Posts from "./signPanel/posts/Posts"
import { Vector3 } from "three"
import Ground from "./ground/Ground"
import Panels from "./signPanel/panels/Panels"
import Loader from "./loader/Loader"
import Person from "./person/Person"
import { SIGN_PANEL_GROUP_NAME } from "../../constants"
import CameraControl from "./control/CameraControl"
import Guide from "../guide/Guide"

const CanvasContainer = () => {
    return (
        <>
            <div className="h-[500px] rounded-lg overflow-hidden relative">
                <Canvas
                    orthographic={false}
                    gl={{
                        antialias: true,
                        alpha: true,
                        preserveDrawingBuffer: false,
                        localClippingEnabled: true,
                        powerPreference: 'high-performance',
                    }}
                    frameloop="always"
                    className="canvas"
                    camera={{
                        position: new Vector3(0, 3, -3),
                        near: 0.01
                    }}
                    shadows={true}
                >
                    {/* <Environment preset="sunset"/> */}
                    <ambientLight intensity={1.5} />
                    <directionalLight intensity={1} position={[10, 30, 20]} castShadow />
                    {/* <directionalLight intensity={1} position={[0, 3, -2]} castShadow /> */}
                    <Suspense fallback={<Loader />}>
                        <group name={SIGN_PANEL_GROUP_NAME}>
                            <Posts />
                            <Panels />
                            <Person />
                        </group>
                        <CameraControl />
                        <Ground />
                    </Suspense>
                </Canvas>
                <Guide />
            </div>
        </>
    )
}
export default CanvasContainer