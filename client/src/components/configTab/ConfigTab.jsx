import NumberInput from "../shared/NumberInput"
import Select from "../shared/Select"
import useStore from "../../store"
import { CHANEL_COLOUR_OPTIONS, CHANNEL_SIZE_OPTIONS, CHANNEL_SIZE, COLOURS, FIXING_METHOD_OPTIONS, INTERLOCKING_COLOUR_OPTIONS, OPTION_TYPE, PANEL_MATERIAL_OPTIONS, POST_SIZE_OPTIONS, RADIUS_CORNER_OPTIONS, SHAPE_OPTIONS, TAB_OPTIONS, SHAPE } from "../../constants"
import ColourSelect from "../shared/ColourSelection"
import useConfigurator from "../../hooks/useConfigurator"
import { useEffect } from "react"
import DoubleColourSelection from "../shared/DoubleColourSelection"
import _ from "lodash"
import CheckBox from "../shared/CheckBox"

const ConfigTab = () => {
    const {
        selectedOptionTab,
        setSelectedOptionTab,
        width,
        height,
        setWidth,
        setHeight,
        selectedChannelSize,
        setSelectedChannelSize,
        selectedChannelColour,
        setSelectedChannelColour,
        selectedPanelMaterial,
        setSelectedPanelMaterial,
        selectedPanelColour,
        setSelectedPanelColour,
        selectedPanelShape,
        setSelectedPanelShape,
        selectedRadius,
        setSelectedRadius,
        selectedInterlockingColour,
        setSelectedInterlockingColour,
        selectedFixingMethod,
        setSelectedFixingMethod,
        selectedPostSize,
        setSelectedPostSize,
        selectedPostColour,
        setSelectedPostColour,
        selectedPostLength,
        setSelectedPostLength,
        selectedPostCapColour,
        setSelectedPostCapColour,
        selectedPostClipColour,
        setSelectedPostClipColour,
        checkedPostOption,
        checkedClipOption,
        setCheckedPostOption,
        setCheckedClipOption,
        postQuantity,
        setPostQuantity,
        specificChannelQuantity,
        setSpecificChannelQuantity,
        channelQuantity,
        setChannelQuantity,
        size,
        setSize
    } = useStore()

    const {
        panelColourOptions,
        isShapeIsFixedShape,
        postColourOptions,
        postLengthOptions,
        postCapColourOptions,
        postClipColourOptions,
        numOfPanelRows,
        numOfPanelCols,
        totalPrice,
        addToCart,
        saveDraft,
        openDraftOrder,
        sizeOptions
    } = useConfigurator()

    useEffect(() => {
        openDraftOrder()
    }, [])

    useEffect(() => {
        const defaultHeight = 2000
        const totalHeight = defaultHeight + height + (defaultHeight + height) * 0.25
        const nearestOption = postLengthOptions.find(el => el.value > totalHeight)
        if (nearestOption) {
            setSelectedPostLength(nearestOption)
        } else {
            setSelectedPostLength(postLengthOptions[postLengthOptions.length - 1])
        }
    }, [postLengthOptions, height, setSelectedPostLength])

    const onAddToCart = () => {
        addToCart()
    }

    const onSaveDraft = () => {
        saveDraft()
    }

    return <>
        <div className="flex flex-col gap-2">
            <div className="bg-base-200 w-full p-[14px] rounded-xl text-xl font-bold flex justify-between items-center" >
                <div>
                    Sign Price: <span className="text-[#FF0000]">£{_.round(totalPrice, 2)}</span>
                </div>
                {
                    selectedOptionTab === -1 && <button
                    type="button"
                    className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    onClick={() => setSelectedOptionTab(0)}
                >
                    Start
                </button>
                }
            </div>
            <div tabIndex={TAB_OPTIONS.PANEL} className="collapse bg-base-200 collapse-arrow">
                <input className="!cursor-default" type="checkbox" checked={selectedOptionTab === 0}/>
                <div className="collapse-title text-xl font-medium !cursor-default">Panel options</div>
                <div className="collapse-content">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="">
                            <div>
                                <Select
                                    label="Material"
                                    value={selectedPanelMaterial?.value}
                                    options={PANEL_MATERIAL_OPTIONS}
                                    onChange={(value) => { setSelectedPanelMaterial(value) }}
                                />
                            </div>
                            <div>
                                <DoubleColourSelection
                                    label={`Colour${selectedPanelColour?.text ? ` (${selectedPanelColour.text})` : ''}`}
                                    value={selectedPanelColour?.value}
                                    options={panelColourOptions}
                                    onChange={(value) => { setSelectedPanelColour(value) }}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Shape"
                                    value={selectedPanelShape?.value}
                                    options={SHAPE_OPTIONS}
                                    onChange={(value) => { setSelectedPanelShape(value) }}
                                />
                            </div>
                            {
                                selectedPanelShape?.type == OPTION_TYPE.TYPE &&
                                <>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <NumberInput
                                                label="Width"
                                                value={width}
                                                min={selectedPanelShape.minWidth || 150}
                                                max={selectedPanelShape.maxWidth || 30000}
                                                onChange={(value) => { setWidth(value) }}
                                            />
                                        </div>
                                        <div>
                                            <NumberInput
                                                label="Height"
                                                value={height}
                                                min={selectedPanelShape.minHeight || 150}
                                                max={selectedPanelShape.maxHeight || 30000}
                                                onChange={(value) => { setHeight(value) }}
                                            />
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                selectedPanelShape?.type == OPTION_TYPE.SELECT &&
                                <>
                                    <div>
                                        <Select
                                            label="Size"
                                            value={size}
                                            options={sizeOptions}
                                            onChange={(value) => {
                                                setSize(value.value)
                                            }}
                                        />
                                    </div>
                                </>
                            }
                            {!isShapeIsFixedShape && <div>
                                <Select
                                    label="Corner radius"
                                    value={selectedRadius?.value}
                                    options={RADIUS_CORNER_OPTIONS}
                                    onChange={(value) => { setSelectedRadius(value) }}
                                />
                            </div>}
                        </div>
                        <div className="w-full flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={() => setSelectedOptionTab(selectedOptionTab - 1)}
                            >
                                Collapse
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={() => setSelectedOptionTab(selectedOptionTab + 1)}
                                >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div tabIndex={TAB_OPTIONS.CHANNEL} className="collapse bg-base-200 collapse-arrow">
                <input className="!cursor-default" type="checkbox" checked={selectedOptionTab === 1}/>
                <div className="collapse-title text-xl font-medium !cursor-default">Channel options</div>
                <div className="collapse-content">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="">
                            <div className={`pt-3 px-2 flex items-center ${isShapeIsFixedShape && 'hidden'}`}>
                                <CheckBox
                                    title='Specific Channel Quantity'
                                    checked={specificChannelQuantity}
                                    onChange={(value) => setSpecificChannelQuantity(value)}
                                />
                            </div>
                            {
                               specificChannelQuantity && <div className={`${isShapeIsFixedShape && 'hidden'}`}>
                                <NumberInput
                                    label="Channel Rows"
                                    value={channelQuantity}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onChange={(value) => { setChannelQuantity(value) }}
                                />
                            </div>
                            }
                            <div>
                                <Select
                                    label="Size"
                                    value={selectedChannelSize?.value}
                                    options={(numOfPanelRows == 1 && numOfPanelCols == 1) ? CHANNEL_SIZE_OPTIONS : CHANNEL_SIZE_OPTIONS.filter(el => el.value != CHANNEL_SIZE.SMALL)}
                                    onChange={(value) => { setSelectedChannelSize(value) }}
                                />
                            </div>
                            <div>
                                <ColourSelect
                                    label={`Colour${selectedChannelColour?.text?` (${selectedChannelColour.text})`:''}`}
                                    value={selectedChannelColour?.value}
                                    options={(numOfPanelRows == 1 && numOfPanelCols == 1) ? CHANEL_COLOUR_OPTIONS : CHANEL_COLOUR_OPTIONS.filter(el => el.value == COLOURS.GREY.value)}
                                    onChange={(value) => { setSelectedChannelColour(value) }}
                                />
                            </div>
                            <div className="hidden">
                                <ColourSelect
                                    label={`Interlocking colour${selectedInterlockingColour?.text?` (${selectedInterlockingColour.text})`:''}`}
                                    value={selectedInterlockingColour?.value}
                                    options={INTERLOCKING_COLOUR_OPTIONS}
                                    onChange={(value) => { setSelectedInterlockingColour(value) }}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Fixing method"
                                    value={selectedFixingMethod?.value}
                                    options={FIXING_METHOD_OPTIONS}
                                    onChange={(value) => { setSelectedFixingMethod(value) }}
                                />
                            </div>
                            <div className="pt-3 px-2 flex items-center justify-end">
                                <CheckBox
                                    title='Posts and Fixings Required'
                                    checked={checkedPostOption}
                                    onChange={(value) => setCheckedPostOption(value)}
                                    inverseTitle
                                />
                            </div>
                            <div className="pt-3 px-2 flex items-center justify-end">
                                <CheckBox
                                    title='Clips Required'
                                    checked={checkedClipOption}
                                    onChange={(value) => setCheckedClipOption(value)}
                                    inverseTitle
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-2 items-center">
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={() => setSelectedOptionTab(selectedOptionTab - 1)}
                                >
                                Back
                            </button>
                            {
                                (checkedPostOption || checkedClipOption) ? <button
                                    type="button"
                                    className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                    onClick={() => setSelectedOptionTab(selectedOptionTab + 1)}
                                >
                                    Next
                                </button> :
                                <>
                                    <button
                                        type="button"
                                        className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                        onClick={() => onSaveDraft()}
                                        >
                                        Save Draft
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                        onClick={() => { onAddToCart() }}
                                        >
                                        Add to Cart
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div tabIndex={TAB_OPTIONS.POST} className={`collapse bg-base-200 collapse-arrow ${(!checkedPostOption && !checkedClipOption) && 'hidden'}`}>
                <input className="!cursor-default" type="checkbox" checked={selectedOptionTab === 2}/>
                <div className="collapse-title text-xl font-medium !cursor-default">Post & Fixings</div>
                <div className="collapse-content">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-2">
                            <div>
                                <Select
                                    label="Post Diameter"
                                    value={selectedPostSize?.value}
                                    options={POST_SIZE_OPTIONS}
                                    onChange={(value) => { setSelectedPostSize(value) }}
                                />
                            </div>
                            <div>
                                <ColourSelect
                                    label={`Colour${selectedPostColour?.text?` (${selectedPostColour.text})`:''}`}
                                    value={selectedPostColour?.value}
                                    options={postColourOptions}
                                    onChange={(value) => { setSelectedPostColour(value) }}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Post Length Supplied"
                                    value={selectedPostLength?.value}
                                    options={postLengthOptions}
                                    onChange={(value) => { setSelectedPostLength(value) }}
                                />
                            </div>
                            <div>
                                <ColourSelect
                                    label={`Post cap colour${selectedPostCapColour?.text ? ` (${selectedPostCapColour.text})` : ''}`}
                                    value={selectedPostCapColour?.value}
                                    options={postCapColourOptions}
                                    onChange={(value) => { setSelectedPostCapColour(value) }}
                                />
                            </div>
                            <div>
                                <ColourSelect
                                    label={`Post clip colour${selectedPostClipColour?.text ? ` (${selectedPostClipColour.text})` : ''}`}
                                    value={selectedPostClipColour?.value}
                                    options={postClipColourOptions}
                                    onChange={(value) => { setSelectedPostClipColour(value) }}
                                />
                            </div>
                            <div>
                                <NumberInput
                                    disabled={selectedPanelShape?.value != SHAPE.STANDARD_RECTANGLE}
                                    label="Post Quantity"
                                    value={postQuantity}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onChange={(value) => { setPostQuantity(value) }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={() => setSelectedOptionTab(selectedOptionTab - 1)}
                                >
                                Back
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={() => onSaveDraft()}
                                >
                                Save Draft
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={() => { onAddToCart() }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ConfigTab