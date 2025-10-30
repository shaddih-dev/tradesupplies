/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { memo } from "react"
import { DoubleSide } from "three"

const Ground = () => {
  return (
    <>
        <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial side={DoubleSide} transparent opacity={0.5}/>
        </mesh>
    </>
  )
}

export default memo(Ground)