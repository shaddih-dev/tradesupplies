/* eslint-disable react/no-unknown-property */

import { Center, useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react"
import { Box3, Color, Vector3 } from "three"
import useConfigurator from "../../../../hooks/useConfigurator"
import { SCALE_3D } from "../../../../constants"
import Channels from "../channels/Channels"

useGLTF.preload(`/models/Posts/Round/post-50.glb`)
useGLTF.preload(`/models/Posts/Round/post-60.glb`)
useGLTF.preload(`/models/Posts/Round/post-76.glb`)
useGLTF.preload(`/models/Posts/Round/post-89.glb`)
useGLTF.preload(`/models/Posts/Round/post-102.glb`)
useGLTF.preload(`/models/Posts/Round/post-114.glb`)
useGLTF.preload(`/models/Posts/Square/post-50.glb`)
useGLTF.preload(`/models/Posts/Square/post-76.glb`)
useGLTF.preload(`/models/Posts/Square/post-100.glb`)

useGLTF.preload(`/models/Caps/Round/50mm_round_post_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Round/76mm_round_post_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Round/89mm_round_post_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Round/102mm_round_post_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Round/114mm_round_post_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Square/50mm_square_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Square/76mm_square_cap_2024.glb`)
useGLTF.preload(`/models/Caps/Square/100mm_square_cap_2024.glb`)

useGLTF.preload(`/models/Channel/medium_interlocking_sign_channel.glb`)
useGLTF.preload(`/models/Channel/medium_sign_channel.glb`)
useGLTF.preload(`/models/Channel/small_sign_channel.glb`)

useGLTF.preload(`/models/Clips/Round/50mm_dia_post_clip.glb`)
useGLTF.preload(`/models/Clips/Round/60mm_dia_post_clip.glb`)
useGLTF.preload(`/models/Clips/Round/76mm_dia_post_clip.glb`)
useGLTF.preload(`/models/Clips/Round/89mm_dia_post_clip.glb`)
useGLTF.preload(`/models/Clips/Round/102mm_dia_post_clip.glb`)
useGLTF.preload(`/models/Clips/Round/114mm_dia_post_clip.glb`)
useGLTF.preload(`/models/Clips/Square/50mm_square_post_clip.glb`)
useGLTF.preload(`/models/Clips/Square/76mm_square_post_clip.glb`)
useGLTF.preload(`/models/Clips/Square/100mm_square_post_clip.glb`)

useGLTF.preload(`/models/Person/Man2_opt.glb`)

const Posts = () => {
    const {
        postTotalLength,
        postLengthFromLand,
        postPositions,
        offsetPostToGround,
        postColourCode,
        postCapColourCode,
        postObjectUrl,
        postCapObjectUrl,
        previewPostVisibility
    } = useConfigurator()

    const postModel = useGLTF(postObjectUrl)
    const postCapModel = useGLTF(postCapObjectUrl)
    const basePlateModel = useGLTF('/models/universal_base_plate.glb')

    const postObjectSize = useMemo(() => {
        const box = new Box3().setFromObject(postModel.scene)
        return box.getSize(new Vector3())
    }, [postModel])

    const postCapObjectSize = useMemo(() => {
        const box = new Box3().setFromObject(postCapModel.scene)
        return box.getSize(new Vector3())
    }, [postCapModel])

    // const basePlateObjectSize = useMemo(() => {
    //     const box = new Box3().setFromObject(basePlateModel.scene)
    //     return box.getSize(new Vector3())
    // }, [basePlateModel])

    useEffect(() => {
        if(postModel.materials) {
            Object.keys(postModel.materials).forEach(key => {
                postModel.materials[key].color = new Color(postColourCode)
                postModel.materials[key].metalness = 0
                postModel.materials[key].needsUpdate = true
            })
        }

        postModel.scene.traverse(child => {
            if(child.isMesh) {
                child.castShadow = true
            }
        })
    }, [postColourCode, postModel])

    useEffect(() => {
        if(postCapModel.materials) {
            Object.keys(postCapModel.materials).forEach(key => {
                postCapModel.materials[key].color = new Color(postCapColourCode)
            })
        }
    }, [postCapColourCode, postCapModel])


    return <>
        <group>
            {/* Post 1 */}
            {/* <group scale={[1, (postTotalLength * SCALE_3D) / postObjectSize.y, 1]} position={[0, - offsetPostToGround * SCALE_3D, - postObjectSize.z / 2]}>
                <primitive object={postModel.scene.clone()} />
            </group> */}
            {
                postPositions && postPositions.map((el, index) => (
                    <group key={`post-group-${index}`} visible={previewPostVisibility}>
                        <group 
                            key={`post-${index}`} 
                            scale={[1, (postTotalLength * SCALE_3D) / postObjectSize.y, 1]} 
                            position={[el.x, el.y, el.z - postObjectSize.z / 2]}
                        >
                            <primitive object={postModel.scene.clone()}/>
                        </group>
                        <group
                            key={`post-cap-${index}`}
                            position={[el.x, postLengthFromLand * SCALE_3D, el.z - postObjectSize.z / 2]}
                        >
                            <primitive object={postCapModel.scene.clone()} />
                        </group>
                        <group
                            key={`post-base-plate-${index}`}
                            rotation={[0, Math.PI / 2, 0]}
                            position={[el.x, - offsetPostToGround * SCALE_3D, el.z - postObjectSize.z / 2]}
                        >
                            <primitive object={basePlateModel.scene.clone()} />
                        </group>
                    </group>
                ))
            }

            <Channels />
        </group>
    </>
}
export default Posts