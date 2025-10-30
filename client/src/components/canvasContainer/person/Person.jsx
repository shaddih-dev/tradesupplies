import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const Person = () => {
    const manModel = useGLTF('/models/Person/Man2_opt.glb')
    useEffect(() => {
        manModel.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
            }
        })
    }, [manModel])
    return <>
        <group position={[0.5, 0, 0.5]}>
            <primitive object={manModel.scene} />
        </group>
    </>
}
export default Person;