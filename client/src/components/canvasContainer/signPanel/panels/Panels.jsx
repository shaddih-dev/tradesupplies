/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei"
import useConfigurator from "../../../../hooks/useConfigurator"
import { SCALE_3D, SHAPE } from "../../../../constants"
import { useMemo, useState } from "react"
import { Box3, BoxGeometry, Color, DoubleSide, PlaneGeometry, TextureLoader, Vector2, Vector3 } from "three"
import { useLoader } from "@react-three/fiber"
import { getCathedralSignPanel, getCircleSignPanel, getDomTopSignPanel, getOctagonSignPanel, getStandardPanel, getTriangleSignPanel } from "../../../../utils/utils"

const Panels = () => {
    const {
        width,
        height,
        panelRadiusValue,
        frontPanelColourCode,
        backPanelColourCode,
        chanelObjectUrl,
        heightFromLandToPanel,
        numOfPanelCols,
        numOfPanelRows,
        eachPanelHeight,
        eachPanelWidth,
        selectedPanelShape,
        shapeSize
    } = useConfigurator()

    const chanelModel = useGLTF(chanelObjectUrl)

    const normalMap = useLoader(TextureLoader, `/textures/metal/normal.jpg`)
    const roughnessMap = useLoader(TextureLoader, `/textures/metal/roughness.jpg`)
    const aoMap = useLoader(TextureLoader, `/textures/metal/ao.jpg`)
    const [thickness3d] = useState(1.5 * SCALE_3D)

    const chanelObjectSize = useMemo(() => {
        const box = new Box3().setFromObject(chanelModel.scene)
        return box.getSize(new Vector3())
    }, [chanelModel])

    const standardRectangleShapes = useMemo(() => {
        const geos = []
        for(let i = 0; i < numOfPanelRows; i++) {
            for(let j = 0; j < numOfPanelCols; j++) {
                const position = new Vector3(
                    (- width / 2 + eachPanelWidth * (j + 0.5)) * SCALE_3D,
                   ( height / 2 - eachPanelHeight * (i + 0.5)) * SCALE_3D,
                    0
                )

                const geo = getStandardPanel(
                    eachPanelWidth, 
                    eachPanelHeight, 
                    panelRadiusValue, 
                    thickness3d,
                    position,
                    {
                        tl: i == 0 && j == 0,
                        tr: i == 0 && j == numOfPanelCols - 1,
                        bl: i == numOfPanelRows - 1 && j == 0,
                        br: i == numOfPanelRows - 1 && j == numOfPanelCols - 1
                    }
                )
                geos.push(geo)
            }
        }
        return geos
    }, [numOfPanelRows, numOfPanelCols, width, eachPanelHeight, height, eachPanelWidth, panelRadiusValue, thickness3d])

    const standardReactangleSplitShapes = useMemo(() => {
        const geos = []
        for(let i = 0; i < numOfPanelRows; i++) {
            for(let j = 0; j < numOfPanelCols; j++) {
                const position = new Vector3(
                    (- width / 2 + eachPanelWidth * j) * SCALE_3D,
                   0,
                    0
                )

                const geo = new BoxGeometry(1 * SCALE_3D, height * SCALE_3D, 6 * SCALE_3D)
                geo.translate(position.x, position.y, position.z)
                if(j > 0) {
                    geos.push(geo)
                }
            }
        }
        return geos
    }, [numOfPanelRows, numOfPanelCols, width, height, eachPanelWidth])

    const domTopSignShapes = useMemo(() => {
        return [
            getDomTopSignPanel(
                eachPanelWidth, 
                eachPanelHeight, 
                panelRadiusValue, 
                thickness3d,
                new Vector3(0, 0, 0),
                {
                    tl: true,
                    tr: true,
                    bl: true,
                    br: true
                }
            )
        ]
    }, [eachPanelHeight, eachPanelWidth, panelRadiusValue, thickness3d])

    const cathedralSignShapes = useMemo(() => {
        return [
            getCathedralSignPanel(
                eachPanelWidth, 
                eachPanelHeight, 
                panelRadiusValue, 
                thickness3d,
                new Vector3(0, 0, 0),
                {
                    tl: true,
                    tr: true,
                    bl: true,
                    br: true
                }
            )
        ]
    }, [eachPanelHeight, eachPanelWidth, panelRadiusValue, thickness3d])

    const circleSignShapes = useMemo(() => {
        return [
            getCircleSignPanel(
                eachPanelWidth,
                thickness3d,
                new Vector3(0, 0, 0)
            )
        ]
    }, [eachPanelWidth, thickness3d])

    const triangleSignShapes = useMemo(() => {
        if(!shapeSize) {
            return [];
        }

        const { width, height } = shapeSize;

        return [
            getTriangleSignPanel(
                width,
                height,
                thickness3d,
                new Vector3(0, 0, 0)
            )
        ]
    }, [shapeSize, thickness3d])

    const octagonSignShapes = useMemo(() => {
        return [
            getOctagonSignPanel(
                eachPanelWidth,
                eachPanelHeight,
                thickness3d,
                new Vector3(0, 0, 0)
            )
        ]
    }, [eachPanelHeight, eachPanelWidth, thickness3d])

    const shapes = useMemo(() => {
        if(selectedPanelShape.value == SHAPE.STANDARD_RECTANGLE) {
            return standardRectangleShapes
        } else if(selectedPanelShape.value == SHAPE.DOME_TOP_SIGN) {
            return domTopSignShapes
        } else if(selectedPanelShape.value == SHAPE.CATHEDRAL_SIGN) {
            return cathedralSignShapes
        } else if(selectedPanelShape.value == SHAPE.CIRCLE) {
            return circleSignShapes
        } else if(selectedPanelShape.value == SHAPE.TRIANGLE) {
            return triangleSignShapes
        } else if(selectedPanelShape.value == SHAPE.OCTAGON) {
            return octagonSignShapes
        } else {
            return []
        }
    }, [cathedralSignShapes, circleSignShapes, domTopSignShapes, octagonSignShapes, selectedPanelShape.value, standardRectangleShapes, triangleSignShapes])

    const splitShapes = useMemo(() => {
        if(selectedPanelShape.value == SHAPE.STANDARD_RECTANGLE) {
            return standardReactangleSplitShapes
        } else {
            return []
        }
    }, [selectedPanelShape.value, standardReactangleSplitShapes])

    return <>
        <group position={[0, heightFromLandToPanel * SCALE_3D + height * SCALE_3D / 2, chanelObjectSize.y]}>
                {
                    shapes.map((el, index) => (
                        <>
                            <mesh key={`shape-1-${index}`} position={[0, 0, thickness3d]} castShadow>
                                <primitive object={el.clone()} attach='geometry' />
                                <meshStandardMaterial 
                                    side={DoubleSide} 
                                    normalMap={normalMap}
                                    normalScale={new Vector2(1.4, 1.4)}
                                    roughnessMap={roughnessMap}
                                    aoMap={aoMap}
                                    aoMapIntensity={0.5}
                                    metalness={0}
                                    roughness={1}
                                    color={frontPanelColourCode}
                                />
                            </mesh>
                            <mesh key={`shape-2-${index}`} castShadow>
                                <primitive object={el.clone()} attach='geometry' />
                                <meshStandardMaterial 
                                    side={DoubleSide} 
                                    normalMap={normalMap}
                                    normalScale={new Vector2(1.4, 1.4)}
                                    roughnessMap={roughnessMap}
                                    aoMap={aoMap}
                                    aoMapIntensity={0.5}
                                    metalness={0}
                                    roughness={1}
                                    color={backPanelColourCode}
                                />
                            </mesh>
                        </>
                    ))
                }
                {
                    splitShapes.map((el, index) => (
                        <>
                            <mesh key={`shape-split-${index}`} position={[0, 0, thickness3d]}>
                                <primitive object={el.clone()} attach='geometry' />
                                <meshStandardMaterial 
                                    side={DoubleSide} 
                                    metalness={0}
                                    roughness={1}
                                    color={new Color(0x808080)}
                                />
                            </mesh>
                        </>
                    ))
                }
                
        </group>
    </>
}
export default Panels