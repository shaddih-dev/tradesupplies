import { CameraControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import useConfigurator from "../../../hooks/useConfigurator"
import { useThree } from "@react-three/fiber"
import { SIGN_PANEL_GROUP_NAME } from "../../../constants"
import { Box3 } from "three"

const CameraControl = () => {
    const cameraControl = useRef()
    const timeOutChange = useRef(null)
    const { scene } = useThree()

    const {
        height,
        width,
        heightFromLandToPanel,
        eachPanelHeight,
        eachPanelWidth,
        numOfPanelRows,
        chanelLength,
        postPositions,
        selectedPanelShape,
        chanelOffsetYs,
        shapeSize,
        postTotalLength,
        postLengthFromLand,
        offsetPostToGround,
        panelRadiusValue,
        numOfPanelCols,
        numOfClips,
        channelInfos
    } = useConfigurator()

    useEffect(() => {
        if(timeOutChange.current) {
            clearTimeout(timeOutChange.current)
        }

        timeOutChange.current = setTimeout(() => {
            const group = scene.getObjectByName(SIGN_PANEL_GROUP_NAME)
            if(group) {
                const box = new Box3().setFromObject(group)
                cameraControl.current.fitToBox(box, true, {paddingLeft: 0.2, paddingRight: 0.2, paddingBottom: 0.2, paddingTop: 0.2})
            }
        }, 500)
    }, [width, height, heightFromLandToPanel, eachPanelHeight, eachPanelWidth, numOfPanelRows, chanelLength, postPositions, selectedPanelShape, chanelOffsetYs, shapeSize, postTotalLength, postLengthFromLand, offsetPostToGround, panelRadiusValue, numOfPanelCols, numOfClips, channelInfos, scene])


    return <>
        <CameraControls ref={cameraControl}/>
    </>
}

export default CameraControl