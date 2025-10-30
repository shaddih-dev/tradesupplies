import { useEffect, useMemo } from "react"
import useStore from "../store"
import { Vector3 } from "three"
import { CHANNEL_SIZE, CIRCLE_SIZE, COLOURS, DRAFT_ORDER_KEY, EVENT_TYPES, FIXING_METHOD, OCTAGON_SIZE, PANEL_COLOURS, PANEL_MATERIAL, POST_LENGTH, POST_TYPE, prefixMapKey, SCALE_3D, SHAPE, TAB_OPTIONS, TRIANGLE_SIZE } from "../constants"
import _ from "lodash"
import global from "../global"
import { toast } from "react-toastify"

const useConfigurator = () => {
    const {
        selectedOptionTab,
        height,
        width,
        selectedChannelSize,
        selectedChannelColour,
        selectedPanelMaterial,
        selectedPanelShape,
        selectedRadius,
        selectedPostSize,
        selectedPostLength,
        selectedPanelColour,
        selectedPostColour,
        selectedInterlockingColour,
        selectedPostCapColour,
        selectedPostClipColour,
        selectedFixingMethod,
        channelInfos,
        shopifyMap,
        cartId,
        checkoutUrl,
        numOfClips,
        variantMapSku,
        specificChannelQuantity,
        size,
        channelQuantity,
        postQuantity,
        setPostQuantity,
        checkedPostOption,
        setChannelQuantity,
        checkedClipOption,
        setSelectedPanelMaterial,
        setSelectedPanelColour,
        setSelectedPanelShape,
        setWidth,
        setHeight,
        setSize,
        setSelectedRadius,
        setSpecificChannelQuantity,
        setSelectedChannelSize,
        setSelectedChannelColour,
        setSelectedFixingMethod,
        setCheckedPostOption,
        setCheckedClipOption,
        setSelectedPostSize,
        setSelectedPostColour,
        setSelectedPostLength,
        setSelectedPostCapColour,
        setSelectedPostClipColour,
        setSelectedInterlockingColour,
        setNumOfClips,
        setSelectedOptionTab
    } = useStore()

    const selectedPostLengthValue = useMemo(() => {
        return _.get(selectedPostLength, ['value'], 1000)
    }, [selectedPostLength])

    const offsetPostToGround = useMemo(() => {
        const minOffset = selectedPostLengthValue * 0.25
        return minOffset
    }, [selectedPostLengthValue])

    const postLengthFromLand = useMemo(() => {
        return selectedPostLengthValue - offsetPostToGround
    }, [selectedPostLengthValue, offsetPostToGround])

    const heightFromLandToPanel = useMemo(() => {
        return Math.max(0, postLengthFromLand - height)
    }, [height, postLengthFromLand])

    const sizeInfos = useMemo(() => {
        if(!selectedPanelShape) {
            return {};
        }

        switch (selectedPanelShape.value) {
            case SHAPE.CIRCLE:
                return CIRCLE_SIZE
            case SHAPE.TRIANGLE:
                return TRIANGLE_SIZE
            case SHAPE.OCTAGON:
                return OCTAGON_SIZE
            default:
                return {}
        }
    }, [selectedPanelShape]);


    const sizeOptions = useMemo(() => {
        return Object.keys(sizeInfos).map(key => ({ value: key, text: key }))
    }, [sizeInfos]);
    
    const shapeSize = useMemo(() => {
        return sizeInfos[size]
    }, [size, sizeInfos])

    const isShapeIsFixedShape = useMemo(() => {
        const value = selectedPanelShape?.value
        return value == SHAPE.CIRCLE || value == SHAPE.OCTAGON || value == SHAPE.TRIANGLE
    }, [selectedPanelShape])

    const numOfPanelRows = useMemo(() => {
        if(isShapeIsFixedShape) {
            return 1
        } else {
            const maxEachPanelHeight = _.get(selectedPanelShape, ['eachHeight'], 2400)
            return Math.ceil(height / maxEachPanelHeight)
        }
    }, [height, isShapeIsFixedShape, selectedPanelShape])

    const numOfPanelCols = useMemo(() => {
        if(isShapeIsFixedShape) {
            return 1
        } else {
            const maxEachPanelWidth = _.get(selectedPanelShape, ['eachWidth'], 1200)
            return Math.ceil(width / maxEachPanelWidth)
        }
    }, [isShapeIsFixedShape, selectedPanelShape, width])

    const chanelLength = useMemo(() => {

        if(!isShapeIsFixedShape) {
            return width - 50;
        }

        return (shapeSize?.width || width) - 50

    }, [width, shapeSize, isShapeIsFixedShape])

    const chanelObjectUrl = useMemo(() => {
        return _.get(selectedChannelSize, ['objectUrl'], '/models/Channel/medium_sign_channel.glb')
    }, [selectedChannelSize])

    const frontPanelColourCode = useMemo(() => {
        return _.get(selectedPanelColour, ['colours', 0, 'value'], '#808080')
    }, [selectedPanelColour])

    const backPanelColourCode = useMemo(() => {
        return _.get(selectedPanelColour, ['colours', 1, 'value'], '#808080')
    }, [selectedPanelColour])

    const chanelColourCode = useMemo(() => {
        return _.get(selectedChannelColour, ['value'], '#808080')
    }, [selectedChannelColour])

    const postCapColourCode = useMemo(() => {
        return _.get(selectedPostCapColour, ['value'], '#808080')
    }, [selectedPostCapColour])

    const postClipColourCode = useMemo(() => {
        return _.get(selectedPostClipColour, ['value'], '#808080')
    }, [selectedPostClipColour])

    const postColourCode = useMemo(() => {
        return _.get(selectedPostColour, ['value'], '#808080')
    }, [selectedPostColour])

    const interlockingColourCode = useMemo(() => {
        return _.get(selectedInterlockingColour, ['value'], '#808080')
    }, [selectedInterlockingColour])

    const panelColourOptions = useMemo(() => {
        return _.get(selectedPanelMaterial, ['colours'], [PANEL_COLOURS.WHITE_GREY])
    }, [selectedPanelMaterial])

    const panelRadiusValue = useMemo(() => {
        return _.get(selectedRadius, ['value'], 0)
    }, [selectedRadius])

    const postColourOptions = useMemo(() => {
        return _.get(selectedPostSize, ['colours'], [COLOURS.GREY])
    }, [selectedPostSize])

    const postLengthOptions = useMemo(() => {
        return _.get(selectedPostSize, ['lengths'], [POST_LENGTH["3M"]])
    }, [selectedPostSize])

    const postCapColourOptions = useMemo(() => {
        return _.get(selectedPostSize, ['capColours'], [COLOURS.GREY])
    }, [selectedPostSize])
    
    const postClipColourOptions = useMemo(() => {
        return _.get(selectedPostSize, ['clipColours'], [COLOURS.STAINLESS])
    }, [selectedPostSize])

    const postObjectUrl = useMemo(() => {
        if(selectedPostSize.type == POST_TYPE.DIA) {
            return `/models/Posts/Round/post-${selectedPostSize.size}.glb`
        } else {
            return `/models/Posts/Square/post-${selectedPostSize.size}.glb`
        }
    }, [selectedPostSize.size, selectedPostSize.type])

    const postClipObjectUrl = useMemo(() => {
        if(selectedPostSize.type == POST_TYPE.DIA) {
            return `/models/Clips/Round/${selectedPostSize.size}mm_dia_post_clip.glb`
        } else {
            return `/models/Clips/Square/${selectedPostSize.size}mm_square_post_clip.glb`
        }
    }, [selectedPostSize.size, selectedPostSize.type])

    const postCapObjectUrl = useMemo(() => {
        if(selectedPostSize.type == POST_TYPE.DIA) {
            return `/models/Caps/Round/${selectedPostSize.size}mm_round_post_cap_2024.glb`
        } else {
            return `/models/Caps/Square/${selectedPostSize.size}mm_square_cap_2024.glb`
        }
    }, [selectedPostSize.size, selectedPostSize.type])

    const acreage = useMemo(() => {
        return width * height / 1000000
    }, [height, width])

    const sizeCategoryPricePerUnit = useMemo(() => {
        if(acreage < 0.009) {
            return 1265
        } else if(acreage < 0.019) {
            return 632.50
        } else if(acreage < 0.029) {
            return 316.25
        } else if(acreage < 0.039) {
            return 210.83
        } else if(acreage < 0.049) {
            return 158.13
        } else if(acreage < 0.059) {
            return 126.50
        } else if(acreage < 0.069) {
            return 105.42
        } else if(acreage < 0.079) {
            return 90.36
        } else if(acreage < 0.089) {
            return 86.25
        } else if(acreage < 0.1) {
            return 83.06
        } else if(acreage < 0.2) {
            return 76.67
        } else if(acreage < 0.3) {
            return 48.30
        } else if(acreage < 0.4) {
            return 36.14
        } else if(acreage < 0.5) {
            return 35.78
        } else if(acreage < 0.6) {
            return 31.36
        } else if(acreage < 0.7) {
            return 28.31
        } else if(acreage < 0.8) {
            return 27.60
        } else if(acreage < 0.9) {
            return 27.06
        } else if(acreage < 1) {
            return 26.63
        } else {
            return 18.78
        }
    }, [acreage])

    const materialPricePerUnit = useMemo(() => {
        if(selectedPanelMaterial.value == PANEL_MATERIAL.ACM) {
            if(selectedPanelColour.value == PANEL_COLOURS.WHITE_GREY.value) {
                return 28.27
            } else if(selectedPanelColour.value == PANEL_COLOURS.WHITE_WHITE.value) {
                return 28.27
            } else if(selectedPanelColour.value == PANEL_COLOURS.BLACK_BLACK.value) {
                return 28.61
            }

            return 28.61
        } else {
            return 70.17
        }
        
    }, [selectedPanelColour.value, selectedPanelMaterial.value])

    const chanelPricePerUnit = useMemo(() => {
        if(selectedChannelSize.value == CHANNEL_SIZE.SMALL) {
            if(selectedChannelColour.value == COLOURS.MILL.value) {
                return 3.63
            } else if(selectedChannelColour.value == COLOURS.GREY.value) {
                return 4.43
            } else if(selectedChannelColour.value == COLOURS.BLACK.value) {
                return 4.75
            } else if(selectedChannelColour.value == COLOURS.WHITE.value) {
                return 4.75
            }

            return 4.75
        } else {
            if(selectedChannelColour.value == COLOURS.MILL.value) {
                return 4.88
            } else if(selectedChannelColour.value == COLOURS.GREY.value) {
                return 5.60
            } else if(selectedChannelColour.value == COLOURS.BLACK.value) {
                return 6.39
            } else if(selectedChannelColour.value == COLOURS.WHITE.value) {
                return 6.39
            }

            return 6.39
        }
    }, [selectedChannelColour.value, selectedChannelSize.value])

    const interlockingPricePerUnit = useMemo(() => {
        return 7.06
    }, [])

    const basePriceAlias = useMemo(() => {
        if(selectedFixingMethod.value == FIXING_METHOD.FLUSH_RIVET && acreage < 0.25) {
            return 1.25
        }
        return 1
    }, [acreage, selectedFixingMethod.value])

    const totalPrice = useMemo(() => {
        const totalChannelLength = channelInfos.channels.reduce((total, current) => total + current.length, 0)
        const totalInterlockingLength = channelInfos.interlockings.reduce((total, current) => total + current.length, 0)
        return (
            sizeCategoryPricePerUnit * acreage
            + materialPricePerUnit * acreage
            + totalChannelLength * chanelPricePerUnit
            + totalInterlockingLength * interlockingPricePerUnit
        ) * basePriceAlias
    }, [acreage, basePriceAlias, chanelPricePerUnit, channelInfos.channels, channelInfos.interlockings, interlockingPricePerUnit, materialPricePerUnit, sizeCategoryPricePerUnit])

    const saveDraft = () => {
        const draftOrder = {
            selectedOptionTab,
            checkedPostOption,
            checkedClipOption,
            width,
            height,
            size,
            postQuantity,
            numOfClips,
            selectedChannelSize,
            selectedChannelColour,
            selectedPanelMaterial,
            selectedPanelColour,
            selectedPanelShape,
            selectedRadius,
            selectedInterlockingColour,
            selectedFixingMethod,
            selectedPostSize,
            selectedPostColour,
            selectedPostLength,
            selectedPostCapColour,
            selectedPostClipColour,
            channelQuantity,
            specificChannelQuantity,
        }

        localStorage.setItem(DRAFT_ORDER_KEY, JSON.stringify(draftOrder))

        toast("Save successfully", {type: 'success'})
    }

    const openDraftOrder = () => {
        let draftOrder = localStorage.getItem(DRAFT_ORDER_KEY)
        if(draftOrder) {
            draftOrder = JSON.parse(draftOrder)

            const {
                selectedOptionTab,
                checkedPostOption,
                checkedClipOption,
                width,
                height,
                size,
                postQuantity,
                numOfClips,
                selectedChannelSize,
                selectedChannelColour,
                selectedPanelMaterial,
                selectedPanelColour,
                selectedPanelShape,
                selectedRadius,
                selectedInterlockingColour,
                selectedFixingMethod,
                selectedPostSize,
                selectedPostColour,
                selectedPostLength,
                selectedPostCapColour,
                selectedPostClipColour,
                channelQuantity,
                specificChannelQuantity,
            } = draftOrder

            setSelectedPanelMaterial(selectedPanelMaterial)
            setSelectedPanelColour(selectedPanelColour)
            setSelectedPanelShape(selectedPanelShape)
            setWidth(width)
            setHeight(height)
            setSize(size)
            setSelectedRadius(selectedRadius)
            setSpecificChannelQuantity(specificChannelQuantity)
            setChannelQuantity(channelQuantity)
            setSelectedChannelSize(selectedChannelSize)
            setSelectedChannelColour(selectedChannelColour)
            setSelectedFixingMethod(selectedFixingMethod)
            setCheckedPostOption(checkedPostOption)
            setCheckedClipOption(checkedClipOption)
            setSelectedPostSize(selectedPostSize)
            setSelectedPostColour(selectedPostColour)
            setSelectedPostLength(selectedPostLength)
            setSelectedPostCapColour(selectedPostCapColour)
            setSelectedPostClipColour(selectedPostClipColour)
            setSelectedInterlockingColour(selectedInterlockingColour)
            setPostQuantity(postQuantity)
            setNumOfClips(numOfClips)
            setSelectedOptionTab(selectedOptionTab)

            // localStorage.removeItem(DRAFT_ORDER_KEY)
        }
    }

    const addToCart = async () => {
        if(!global.getShopifyShop) {
            return
        }

        const postCode = _.get(
            shopifyMap, 
            [
                'POSTS',
                `${prefixMapKey}-${selectedPostSize.type}`, 
                `${prefixMapKey}-${selectedPostSize.size}`, 
                `${prefixMapKey}-${selectedPostColour.value}`,
                `${prefixMapKey}-${selectedPostLength.value}`,
                'value'
            ]
        )

        const postCapCode = _.get(
            shopifyMap, 
            [
                'CAPS',
                `${prefixMapKey}-${selectedPostSize.type}`, 
                `${prefixMapKey}-${selectedPostSize.size}`, 
                `${prefixMapKey}-${selectedPostCapColour.value}`,
                'value'
            ]
        )

        const postClipCode = _.get(
            shopifyMap, 
            [
                'CLIPS',
                `${prefixMapKey}-${selectedPostSize.type}`, 
                `${prefixMapKey}-${selectedPostSize.size}`, 
                `${prefixMapKey}-${selectedPostClipColour.value}`,
                'value'
            ]
        )

        const panelProductId = _.get(shopifyMap, ['PRODUCTS_CONFIGS', 'PanelProductId', 'value'])

        const totalChannelLength = channelInfos.channels.reduce((total, current) => total + current.length, 0)
        const totalInterlockingLength = channelInfos.interlockings.reduce((total, current) => total + current.length, 0)
        const customPanelProduct = {
            merchandiseId: panelProductId,
            id: panelProductId,
            quantity: 1,
            properties: {
                // Panel Dimensions
                'Panel Width': `${width} mm`,
                'Panel Height': `${height} mm`,
                'Acreage': `${acreage.toFixed(2)} m²`,
                'Panel Shape': selectedPanelShape.text,
                
                // Material Details
                'Material': selectedPanelMaterial.text,
                'Material Price per m²': `£${materialPricePerUnit.toFixed(2)}`,
                
                // Channel Configuration
                'Channel Size': selectedChannelSize.text,
                'Channel Colour': selectedChannelColour.text,
                'Number of Channels': channelInfos.channels.length,
                'Total Channel Length': `${totalChannelLength.toFixed(2)} m`,
                'Channel Price per m': `£${chanelPricePerUnit.toFixed(2)}`,
                'Total Interlocking Length': `${totalInterlockingLength.toFixed(2)} m`,
                'Interlocking Price per m': `£${interlockingPricePerUnit.toFixed(2)}`,
                'Fixing Method': selectedFixingMethod.text,
                
                // Pricing Breakdown (underscore prefix hides from customer view)
                '_Size Category Price per m²': `£${sizeCategoryPricePerUnit.toFixed(2)}`,
                '_Base Price Multiplier': basePriceAlias.toFixed(2),
                '_Calculated Subtotal': `£${totalPrice.toFixed(2)}`,
                '_Calculated Total': `£${totalPrice.toFixed(2)}`,
                
                // Timestamp
                '_Configured On': new Date().toLocaleString('en-GB'),
            }
        }

        if(selectedPanelMaterial.value == PANEL_MATERIAL.ACM) {
            customPanelProduct.properties['Panel Colour'] = selectedPanelColour.text
        }

        const body = {
            shop: global.getShopifyShop,
            products: [
                customPanelProduct
            ]
        }

        if(postCode) {
            if(checkedPostOption) {
                body.products.push({
                    merchandiseId: postCode,
                    id: postCode,
                    quantity: postQuantity
                })
            }
        } else {
            toast("Can't find post sku!", {type: 'warning'})
        }

        if(postCapCode) {
            if(checkedPostOption) {
                body.products.push({
                    merchandiseId: postCapCode,
                    id: postCapCode,
                    quantity: postQuantity
                })
            }
        } else {
            toast("Can't find post cap sku!", {type: 'warning'})
        }

        if(postClipCode) {
            if(checkedClipOption) {
                body.products.push({
                    merchandiseId: postClipCode,
                    id: postClipCode,
                    quantity: numOfClips
                })
            }
        } else {
            toast("Can't find post clip sku!", {type: 'warning'})
        }

        body.products =  body.products.map((el) => {
            const variantMap = variantMapSku.find(o => o.sku == el.id)
            el.id = variantMap && variantMap.id ? variantMap.id : el.id
            return el
        })

        if(window.parent) {
            console.log('post', {
                type: EVENT_TYPES.ADD_TO_CART,
                content: body
            })
            window.parent.postMessage(
                {
                    type: EVENT_TYPES.ADD_TO_CART,
                    content: body
                },
                '*'
            )
        }

        // const response = await axios.post("v1/shopify/create-cart", body)
        // const data = response.data
        // const newCartId = _.get(data, ['cartCreate', 'cart', 'id'])
        // const newCheckoutUrl = _.get(data, ['cartCreate', 'cart', 'checkoutUrl'])
        // if(newCartId && newCheckoutUrl) {
        //     setCartId(newCartId)
        //     setCheckoutUrl(newCheckoutUrl)
        //     toast('Successfully!', { type: 'success' })
        // } else {
        //     toast('Fail!', { type: 'error' })
        // }
    }

    const checkout = () => {
        if(checkoutUrl && cartId) {
            const a = document.createElement("a")
            a.href = checkoutUrl
            a.target = "_blank"
            a.click()
            a.remove()
        }
    }

    const previewPostVisibility = useMemo(() => {
        return selectedOptionTab === TAB_OPTIONS.POST && checkedPostOption
    }, [checkedPostOption, selectedOptionTab]);

    const previewPostClipVisibility = useMemo(() => {
        return selectedOptionTab === TAB_OPTIONS.POST && checkedClipOption
    }, [checkedClipOption, selectedOptionTab]);

    const previewAccessoriesVisibility = useMemo(() => {
        return selectedOptionTab === TAB_OPTIONS.CHANNEL || selectedOptionTab === TAB_OPTIONS.POST
    }, [selectedOptionTab])

    const getNumOfChannels = (panelHeight, minimumChannels = 2) => {
        if (panelHeight > 450 + minimumChannels * 50) {
            return minimumChannels + Math.ceil((panelHeight - (450 + minimumChannels * 50)) / 450)
        } else {
            return minimumChannels
        }
    }

    const currentWidth = useMemo(() => {
        return isShapeIsFixedShape && shapeSize ? shapeSize.width : width;
    }, [width, isShapeIsFixedShape, shapeSize]) 

    const currentHeight = useMemo(() => {
        return isShapeIsFixedShape && shapeSize ? shapeSize.height : height;
    }, [height, isShapeIsFixedShape, shapeSize]);

    // const offsetPostToGround = useMemo(() => {
    //     return (currentHeight + mountHeight) * 0.25
    // }, [currentHeight, mountHeight])

    // const postLengthFromLand = useMemo(() => {
    //     return (currentHeight + mountHeight)
    // }, [currentHeight, mountHeight])

    const postTotalLength = useMemo(() => {
        return offsetPostToGround + postLengthFromLand
    }, [offsetPostToGround, postLengthFromLand])

    const eachPanelWidth = useMemo(() => {
        return currentWidth / numOfPanelCols
    }, [numOfPanelCols, currentWidth])

    const eachPanelHeight = useMemo(() => {
        return currentHeight / numOfPanelRows
    }, [numOfPanelRows, currentHeight])

    const postPositions = useMemo(() => {
        const postDistance = currentWidth / postQuantity
        return new Array(postQuantity).fill(null).map((el, index) => {
            return new Vector3((- currentWidth / 2 + (index + 0.5) * postDistance) * SCALE_3D, -offsetPostToGround * SCALE_3D, 0)
        })
    }, [currentWidth, postQuantity, offsetPostToGround])

    useEffect(() => {
        if(selectedPanelShape?.value == SHAPE.STANDARD_RECTANGLE) {
            if(postQuantity < numOfPanelCols) {
                setPostQuantity(numOfPanelCols)
            }
        } else {
            setPostQuantity(numOfPanelCols)
        }
        
    }, [numOfPanelCols, postQuantity, selectedPanelShape?.value, setPostQuantity])
    
    const chanelOffsetYs = useMemo(() => {

        if(isShapeIsFixedShape && shapeSize) {
            return shapeSize.channelOffset || [];
        }

        if(specificChannelQuantity) {
            const offsets = [];
            if(numOfPanelRows === 1) {
                if(channelQuantity == 1) {
                    offsets.push(currentHeight/2 * SCALE_3D)
                } else if(channelQuantity == 2) {
                    offsets.push(50 * SCALE_3D)
                    offsets.push((currentHeight - 50) * SCALE_3D)
                } else {
                    const offsets = [
                        50 * SCALE_3D,
                        (currentHeight - 50) * SCALE_3D
                    ]
    
                    const restChannels = channelQuantity - 2
                    const distance = (currentHeight - 50 * 2) / (restChannels + 1)
                    for (let i = 0; i < restChannels; i++) {
                        offsets.push(
                            50 * SCALE_3D + (i + 1) * distance * SCALE_3D
                        )
                    }
    
                    return offsets
                }
            }
            else {
                if(channelQuantity == 1) {
                    offsets.push(50 * SCALE_3D)
                } else if(channelQuantity == 2) {
                    offsets.push(50 * SCALE_3D)
                    offsets.push((currentHeight - 50) * SCALE_3D)
                } else {
                    // Maximum numOfPanelRows is 2
                    const chanelInEachPanel = Math.floor(channelQuantity / numOfPanelRows)
                    let residual = channelQuantity % numOfPanelRows
                    const numOfChanel1 = chanelInEachPanel + (residual > 0 ? 1 : 0)
                    const numOfChanel2 = chanelInEachPanel + (residual > 1 ? 1 : 0)

                    residual = Math.max(0, residual - 2)

                    for (let i = 0; i < numOfPanelRows; i++) {
                        const startY = i * eachPanelHeight
                        if (i == 0) {
                            const restChannels = numOfChanel1 - 1
                            const distance = (eachPanelHeight - 50) / (restChannels + 1)
        
                            offsets.push(50 * SCALE_3D)
                            for (let i = 0; i < restChannels; i++) {
                                offsets.push(
                                    startY * SCALE_3D + 50 * SCALE_3D + (i + 1) * distance * SCALE_3D
                                )
                            }
                        } else if (i == numOfPanelRows - 1) {
                            const restChannels = numOfChanel2 - 1
                            const distance = (eachPanelHeight - 50) / (restChannels + 1)
        
                            offsets.push(startY * SCALE_3D + eachPanelHeight * SCALE_3D - 50 * SCALE_3D)
                            for (let i = 0; i < restChannels; i++) {
                                offsets.push(
                                    startY * SCALE_3D + (i + 1) * distance * SCALE_3D
                                )
                            }
                        } else {
                            const numOfChannelsForEachPanel = chanelInEachPanel + (residual > 0 ? 1 : 0)
                            residual--
                            const restChannels = numOfChannelsForEachPanel
                            const distance = (eachPanelHeight - 50) / (restChannels + 1)

                            for (let i = 0; i < restChannels; i++) {
                                offsets.push(
                                    startY * SCALE_3D + (i + 1) * distance * SCALE_3D
                                )
                            }
                        }
                    }
                }
            }
            return offsets
        } 

        if (numOfPanelRows == 1) {
            const numOfChannelsForEachPanel = getNumOfChannels(currentHeight, 2)
            if (numOfChannelsForEachPanel > 2) {
                const offsets = [
                    50 * SCALE_3D,
                    (currentHeight - 50) * SCALE_3D
                ]

                const restChannels = numOfChannelsForEachPanel - 2
                const distance = (currentHeight - 50 * 2) / (restChannels + 1)
                for (let i = 0; i < restChannels; i++) {
                    offsets.push(
                        50 * SCALE_3D + (i + 1) * distance * SCALE_3D
                    )
                }
                setChannelQuantity(offsets.length)
                return offsets
            } else {
                setChannelQuantity(2)
                return [
                    50 * SCALE_3D,
                    (currentHeight - 50) * SCALE_3D
                ]
            }
        } else {
            const offsets = []
            for (let i = 0; i < numOfPanelRows; i++) {
                const startY = i * eachPanelHeight
                if (i == 0) {
                    const numOfChannelsForEachPanel = getNumOfChannels(eachPanelHeight, 1)
                    const restChannels = numOfChannelsForEachPanel - 1
                    const distance = (eachPanelHeight - 50) / (restChannels + 1)

                    offsets.push(50 * SCALE_3D)
                    for (let i = 0; i < restChannels; i++) {
                        offsets.push(
                            startY * SCALE_3D + 50 * SCALE_3D + (i + 1) * distance * SCALE_3D
                        )
                    }
                } else if (i == numOfPanelRows - 1) {
                    const numOfChannelsForEachPanel = getNumOfChannels(eachPanelHeight, 1)
                    const restChannels = numOfChannelsForEachPanel - 1
                    const distance = (eachPanelHeight - 50) / (restChannels + 1)

                    offsets.push(startY * SCALE_3D + eachPanelHeight * SCALE_3D - 50 * SCALE_3D)
                    for (let i = 0; i < restChannels; i++) {
                        offsets.push(
                            startY * SCALE_3D + (i + 1) * distance * SCALE_3D
                        )
                    }
                } else {
                    const numOfChannelsForEachPanel = getNumOfChannels(eachPanelHeight, 1)
                    const restChannels = numOfChannelsForEachPanel
                    const distance = (eachPanelHeight - 50) / (restChannels + 1)

                    for (let i = 0; i < restChannels; i++) {
                        offsets.push(
                            startY * SCALE_3D + (i + 1) * distance * SCALE_3D
                        )
                    }
                }
            }
            setChannelQuantity(offsets.length)
            return offsets
        }

    }, [isShapeIsFixedShape, shapeSize, specificChannelQuantity, numOfPanelRows, channelQuantity, currentHeight, setChannelQuantity, eachPanelHeight])

    return {
        width: currentWidth, 
        height: currentHeight,
        postTotalLength,
        offsetPostToGround,
        postLengthFromLand,
        postPositions,
        chanelLength,
        selectedChannelSize,
        selectedPanelShape,
        interlockingColourCode,
        postColourCode,
        postCapColourCode,
        postClipColourCode,
        frontPanelColourCode,
        backPanelColourCode,

        chanelObjectUrl,
        chanelColourCode,
        panelColourOptions,
        isShapeIsFixedShape,
        panelRadiusValue,
        postColourOptions,
        postLengthOptions,
        postCapColourOptions,
        postClipColourOptions,

        numOfPanelCols,
        numOfPanelRows,
        eachPanelWidth,
        eachPanelHeight,

        postObjectUrl,
        postClipObjectUrl,
        postCapObjectUrl,
        totalPrice,

        openDraftOrder,
        saveDraft,
        addToCart,
        checkout,
        previewPostVisibility,
        previewAccessoriesVisibility,
        chanelOffsetYs,
        sizeOptions,
        shapeSize,

        numOfClips,
        channelInfos,
        heightFromLandToPanel,
        previewPostClipVisibility
    }
}

export default useConfigurator