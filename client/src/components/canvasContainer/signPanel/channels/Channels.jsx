/* eslint-disable react/no-unknown-property */
import { Html, useGLTF } from "@react-three/drei"
import useConfigurator from "../../../../hooks/useConfigurator"
import { useEffect, useMemo, useRef } from "react"
import { Box3, Color, DoubleSide, Vector3 } from "three"
import { INTERLOCKING_LOCK_HEIGHT, OBJECT_TYPES, SCALE_3D, SHAPE, SIGN_PANEL_GROUP_NAME } from "../../../../constants"
import { getCircleSignPolygon, getIntersectOfLineInOffsetWidthPolygon, getOctagonPolygon, getTrianglePolygon } from "../../../../utils/utils"
import useStore from "../../../../store"
import { useThree } from "@react-three/fiber"

const Channels = () => {
    const {
        setChannelInfos,
        setNumOfClips
    } = useStore()
    const {
        height,
        width,
        heightFromLandToPanel,
        eachPanelHeight,
        eachPanelWidth,
        numOfPanelRows,
        chanelLength,
        postPositions,
        chanelObjectUrl,
        chanelColourCode,
        interlockingColourCode,
        postClipColourCode,
        postClipObjectUrl,
        isShapeIsFixedShape,
        selectedPanelShape,
        previewAccessoriesVisibility,
        chanelOffsetYs,
        shapeSize,
        previewPostClipVisibility,
    } = useConfigurator()

    const chanelModel = useGLTF(chanelObjectUrl)
    const postClipModel = useGLTF(postClipObjectUrl)
    const interlockingModel = useGLTF('/models/Channel/medium_interlocking_sign_channel.glb')

    const groupRef = useRef()
    const updateTimeout = useRef()

    const { scene } = useThree()

    useEffect(() => {
        if(postClipModel.materials) {
            Object.keys(postClipModel.materials).forEach(key => {
                postClipModel.materials[key].color = new Color(postClipColourCode)
                postClipModel.materials[key].side = DoubleSide
                postClipModel.materials[key].emissive = new Color('#333333')
            })
        }
    }, [postClipColourCode, postClipModel])

    useEffect(() => {
        if(chanelModel.materials) {
            Object.keys(chanelModel.materials).forEach(key => {
                chanelModel.materials[key].color = new Color(chanelColourCode)
                chanelModel.materials[key].emissive = new Color('#333333')
            })
        }
    }, [chanelColourCode, chanelModel])

    useEffect(() => {
        if(interlockingModel.materials) {
            Object.keys(interlockingModel.materials).forEach(key => {
                interlockingModel.materials[key].color = new Color(interlockingColourCode)
                interlockingModel.materials[key].emissive = new Color('#333333')
            })
        }
    }, [interlockingColourCode, interlockingModel])

    const chanelObjectSize = useMemo(() => {
        const box = new Box3().setFromObject(chanelModel.scene)
        return box.getSize(new Vector3())
    }, [chanelModel])

    const postClipObjectSize = useMemo(() => {
        const box = new Box3().setFromObject(postClipModel.scene)
        return box.getSize(new Vector3())
    }, [postClipModel])

    const interlockingObjectSize = useMemo(() => {
        const box = new Box3().setFromObject(interlockingModel.scene)
        return box.getSize(new Vector3())
    }, [interlockingModel])

    const interLockingOffsetYs = useMemo(() => {
        const offsets = []
        for(let i = 1; i < numOfPanelRows; i++) {
            offsets.push(
                i * eachPanelHeight * SCALE_3D
            )
        }
        return offsets
    }, [eachPanelHeight, numOfPanelRows])

    const getCurrentPolygon = () => {
        if(isShapeIsFixedShape) {
            if(selectedPanelShape.value == SHAPE.CIRCLE) {
                return getCircleSignPolygon(width)
            } else if(selectedPanelShape.value == SHAPE.TRIANGLE) {
                return getTrianglePolygon(shapeSize.width,shapeSize.height)
            } else {
                return getOctagonPolygon(width, height)
            }
        } else {
            return []
        }
    }

    const getChannelLength = (initialLength, initOffset) => {
        if(isShapeIsFixedShape) {
            const height3d = height * SCALE_3D
            const offset = height3d / 2 - initOffset

            const polygon = getCurrentPolygon()
            const intersects = getIntersectOfLineInOffsetWidthPolygon(width, offset, polygon)
            if(intersects.length >= 2) {
                return Math.max(0.05, intersects[0].distanceTo(intersects[1]) - 0.05)
            } else {
                return initialLength
            }
        } else {
            return initialLength
        }
    }

    useEffect(() => {
        if(updateTimeout.current) {
            clearTimeout(updateTimeout.current)
        }
        updateTimeout.current = setTimeout(() => {
            const infos = {
                channels: [],
                interlockings: []
            }
            const clips = []

            groupRef.current.traverse(el => {
                if(el.userData.type == OBJECT_TYPES.CHANNEL) {
                    infos.channels.push({
                        length: el.userData.length
                    })
                }
                if(el.userData.type == OBJECT_TYPES.INTERLOCKING) {
                    infos.interlockings.push({
                        length: el.userData.length
                    })
                }
                if(el.userData.type == OBJECT_TYPES.CLIP) {
                    clips.push(el)
                }
            })

            setNumOfClips(clips.length)
            setChannelInfos(infos)
        }, 500)
    }, [chanelOffsetYs, postPositions, chanelLength, interLockingOffsetYs, width, height, setChannelInfos, setNumOfClips])

    return <>
        <group 
            position={[0, heightFromLandToPanel * SCALE_3D + height * SCALE_3D, 0]}
            ref={groupRef}
        >
            {
                chanelOffsetYs.map(offsetY => {
                    return {
                        offsetY,
                        length: getChannelLength(chanelLength * SCALE_3D, offsetY)
                    }
                }).map((el) => (
                    <group 
                        key={`chanel-${el.offsetY}`} 
                        position={[0, -el.offsetY, chanelObjectSize.y]} 
                        rotation={[- Math.PI / 2, Math.PI / 2, 0]}
                        scale={[1, 1, el.length / chanelObjectSize.z]}
                        userData={{
                            type: OBJECT_TYPES.CHANNEL,
                            length: el.length
                        }}
                        visible={previewAccessoriesVisibility}
                    >
                        <primitive object={chanelModel.scene.clone()} />
                    </group>
                    
                ))
            }
            {
                interLockingOffsetYs.map((offsetY) => (
                    <>
                        <group 
                            key={`interlocking-1-${offsetY}`} 
                            position={[ -chanelLength * SCALE_3D / 2, - offsetY + interlockingObjectSize.x / 2 - INTERLOCKING_LOCK_HEIGHT, interlockingObjectSize.y]} 
                            rotation={[- Math.PI / 2, Math.PI / 2, 0]}
                            scale={[1, 1, chanelLength * SCALE_3D / interlockingObjectSize.z]}
                            userData={{
                                type: OBJECT_TYPES.INTERLOCKING,
                                length: chanelLength * SCALE_3D
                            }}
                            visible={previewAccessoriesVisibility}
                        >
                            <primitive object={interlockingModel.scene.clone()} />
                        </group>

                        <group 
                            key={`interlocking-2-${offsetY}`} 
                            position={[ -chanelLength * SCALE_3D / 2, - offsetY - interlockingObjectSize.x / 2 + INTERLOCKING_LOCK_HEIGHT, interlockingObjectSize.y]} 
                            rotation={[- Math.PI / 2, Math.PI / 2, 0]}
                            scale={[1, 1, chanelLength * SCALE_3D / interlockingObjectSize.z]}
                            userData={{
                                type: OBJECT_TYPES.INTERLOCKING,
                                length: chanelLength * SCALE_3D
                            }}
                            visible={previewAccessoriesVisibility}
                        >
                            <primitive object={interlockingModel.scene.clone()} />
                        </group>
                    </>
                    
                ))
            }
            {/* Interlocking isn’t required on vertical panel joins. */}
            {/* {
                numOfPanelCols > 1 && new Array(numOfPanelCols - 1).fill(null).map((el, index) => (
                    <>
                        <group 
                            key={`interlocking-vertical-1-${index}`} 
                            position={[-width / 2 * SCALE_3D + (index + 1) * (eachPanelWidth * SCALE_3D) + interlockingObjectSize.x / 2 - INTERLOCKING_LOCK_HEIGHT, - 25 * SCALE_3D, interlockingObjectSize.y]} 
                            rotation={[- Math.PI / 2, Math.PI, 0]}
                            scale={[1, 1, (height - 50) * SCALE_3D / interlockingObjectSize.z]}
                            userData={{
                                type: OBJECT_TYPES.INTERLOCKING,
                                length: (height - 50) * SCALE_3D 
                            }}
                        >
                            <primitive object={interlockingModel.scene.clone()} />
                        </group>

                        <group 
                            key={`interlocking-vertical-2-${index}`} 
                            position={[-width / 2 * SCALE_3D + (index + 1) * (eachPanelWidth * SCALE_3D) - interlockingObjectSize.x / 2 + INTERLOCKING_LOCK_HEIGHT, - 25 * SCALE_3D, interlockingObjectSize.y]} 
                            rotation={[- Math.PI / 2, Math.PI, 0]}
                            scale={[1, 1, (height - 50) * SCALE_3D / interlockingObjectSize.z]}
                            userData={{
                                type: OBJECT_TYPES.INTERLOCKING,
                                length: (height - 50) * SCALE_3D 
                            }}
                        >
                            <primitive object={interlockingModel.scene.clone()} />
                        </group>
                    </>
                ))
            } */}
            {
                chanelOffsetYs.map((offsetY) => (
                    <group 
                        key={`chanel-clip-group-${offsetY}`} 
                        position={[0, -offsetY, 0]} 
                        visible={previewPostClipVisibility}
                    >
                        {
                            postPositions.map((el, idx) => (
                                <group
                                    key={`chanel-clip-${idx}`}
                                    rotation={[0, Math.PI, 0]}
                                    position={[el.x, - postClipObjectSize.y / 2, - postClipObjectSize.z / 2 + 3 * SCALE_3D]}
                                    userData={{
                                        type: OBJECT_TYPES.CLIP,
                                    }}
                                    
                                >
                                    <primitive object={postClipModel.scene.clone()} />
                                </group>
                            ))
                        }
                    </group>
                ))
            }
             {
                interLockingOffsetYs.map((offsetY) => (
                    <group 
                        key={`chanel-clip-interlocking-group-${offsetY}`} 
                        position={[0, -offsetY, 0]} 
                        visible={previewPostClipVisibility}
                    >
                        {
                            postPositions.map((el, idx) => (
                                <>
                                    <group
                                        key={`chanel-clip-1-${idx}`}
                                        rotation={[0, Math.PI, 0]}
                                        position={[el.x, - postClipObjectSize.y / 2 + interlockingObjectSize.x / 2 - INTERLOCKING_LOCK_HEIGHT, - postClipObjectSize.z / 2 + 3 * SCALE_3D]}
                                        userData={{
                                            type: OBJECT_TYPES.CLIP,
                                        }}
                                    >
                                        <primitive object={postClipModel.scene.clone()} />
                                    </group>
                                    <group
                                        key={`chanel-clip-2-${idx}`}
                                        rotation={[0, Math.PI, 0]}
                                        position={[el.x, - postClipObjectSize.y / 2 - interlockingObjectSize.x / 2 + INTERLOCKING_LOCK_HEIGHT, - postClipObjectSize.z / 2 + 3 * SCALE_3D]}
                                        userData={{
                                            type: OBJECT_TYPES.CLIP,
                                        }}
                                    >
                                        <primitive object={postClipModel.scene.clone()} />
                                    </group>
                                </>
                            ))
                        }
                    </group>
                ))
            }
        </group>
    </>
}
export default Channels
