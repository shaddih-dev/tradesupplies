import { useEffect, useMemo, useState } from "react"
import { COLOURS, POST_TYPE, prefixMapKey, SHOPIFY_MAP } from "../../constants"
import _ from "lodash"
import useStore from "../../store"
import axios from "axios"
import { toast } from "react-toastify"
import global from "../../global"

const ConfigPage = () => {
    const [map, setMap] = useState({})
    const [isSaving, setIsSaving] = useState(false)
    const {
        shopifyMap,
        setShopifyMap
    } = useStore()

    const productsConfigs = useMemo(() => {
        const products = SHOPIFY_MAP.PRODUCTS_CONFIGS
        const items = []
        Object.keys(products).forEach(productId => {
            const path = ['PRODUCTS_CONFIGS', productId.toString(), 'value']
            const item = {
                productId,
                name: 'Panel Product Id',
                value: _.get(map, path),
                path,
                key: path.join('-')
            }
            items.push(item)
        })
        return items
    }, [map])

    const postArray = useMemo(() => {
        const posts = SHOPIFY_MAP.POSTS
        const items = []
        Object.keys(posts).forEach(postType => {
            const postSizes = Object.keys(posts[postType])
            postSizes.forEach(size => {
                const postColors = Object.keys(posts[postType][size])
                postColors.forEach(color => {
                    const postLengths = Object.keys(posts[postType][size][color])
                    postLengths.forEach(length => {
                        const path = ['POSTS', postType.toString(), size.toString(), color.toString(), length.toString(), 'value']
                        const item = {
                            postType,
                            size,
                            color,
                            length,
                            value: _.get(map, path),
                            path,
                            key: path.join('-')
                        }
                        items.push(item)
                    })
                })
            })
        })
        return items
    }, [map])

    const capArray = useMemo(() => {
        const caps = SHOPIFY_MAP.CAPS
        const items = []
        Object.keys(caps).forEach(postType => {
            const postSizes = Object.keys(caps[postType])
            postSizes.forEach(size => {
                const postColors = Object.keys(caps[postType][size])
                postColors.forEach(color => {
                    const path = ['CAPS', postType.toString(), size.toString(), color.toString(), 'value']
                    const item = {
                        postType,
                        size,
                        color,
                        value: _.get(map, path),
                        path,
                        key: path.join('-')
                    }
                    items.push(item)
                })
            })
        })
        return items
    }, [map])

    const clipArray = useMemo(() => {
        const caps = SHOPIFY_MAP.CLIPS
        const items = []
        Object.keys(caps).forEach(postType => {
            const postSizes = Object.keys(caps[postType])
            postSizes.forEach(size => {
                const postColors = Object.keys(caps[postType][size])
                postColors.forEach(color => {
                    const path = ['CLIPS', postType.toString(), size.toString(), color.toString(), 'value']
                    const item = {
                        postType,
                        size,
                        color,
                        value: _.get(map, path),
                        path,
                        key: path.join('-')
                    }
                    items.push(item)
                })
            })
        })
        return items
    }, [map])

    useEffect(() => {
        setMap(_.cloneDeep(shopifyMap || {}))
    }, [shopifyMap])

    const onChangeValue = (path, value) => {
        const data = _.cloneDeep(map)
        _.set(data, path, value)
        setMap(data)
    }

    const onSave = () => {
        const data = {
            shop: global.getShopifyShop,
            skuMap: map
        }
        setIsSaving(true)
        axios.post(
            `${process.env.REACT_API_END_POINT}/v1/shopify/update-shopify-map`,
            data
        ).then(response => {
            setShopifyMap(_.get(response, ['data', 'skuMap'], {}))
            toast('Successfully!', { type: 'success' })
            setIsSaving(false)
        }).catch(() => {
            toast('Fail to save shopify map!', { type: 'error' })
            setIsSaving(false)
        })
    }

    return <>
        <div className="max-w-7xl mx-auto pb-5 relative">
            <div className="mt-5 sticky top-0 z-[10] bg-white flex justify-between items-center px-2">
                <span className="text-[42px] font-[600] text-center leading-normal">OBJECT MAP</span>
                <button
                    type="button"
                    className="px-6 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    onClick={() => {onSave()}}
                    disabled={isSaving}
                >
                    {
                        isSaving && <span className="loading loading-spinner loading-xs"></span>
                    }
                    {
                        !isSaving && 'Save'
                    }
                </button>
            </div>
            <div className="mt-2 px-2">
                <div className="rounded-xl p-[20px] bg-[#DFF2EB]">
                    <h3 className="text-[24px] font-[600]">PRODUCT CONFIGURATION</h3>
                    <div className="overflow-x-auto">
                        <table className="table text-[14px]">
                            <thead className="text-[#4A628A]">
                                <tr>
                                    <th></th>
                                    <th className="text-center">Config name</th>
                                    <th className="text-center">Config value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   productsConfigs.map((el, index) => (
                                    <tr key={el.key}>
                                        <td className="text-center p-1">{index + 1}</td>
                                        <td className="text-center p-1">{el.name}</td>
                                        <td className="text-center p-1">
                                            <input
                                                type="text"
                                                value={el.value} 
                                                onChange={(e) => {onChangeValue(el.path, e.target.value)}}
                                                className="input input-bordered w-full input-sm" 
                                            />
                                        </td>
                                    </tr>
                                   )) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-2 px-2">
                <div className="rounded-xl p-[20px] bg-[#DFF2EB]">
                    <h3 className="text-[24px] font-[600]">POSTS</h3>
                    <div className="overflow-x-auto">
                        <table className="table text-[14px]">
                            <thead className="text-[#4A628A]">
                                <tr>
                                    <th></th>
                                    <th className="text-center">Post type</th>
                                    <th className="text-center">Post size (mm)</th>
                                    <th className="text-center">Post color</th>
                                    <th className="text-center">Post length</th>
                                    <th className="text-center">SKU</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   postArray.map((el, index) => (
                                    <tr key={el.key}>
                                        <td className="text-center p-1">{index + 1}</td>
                                        <td className="text-center p-1">{el.postType == `${prefixMapKey}-${POST_TYPE.DIA}` ? 'Dia' : 'Square'}</td>
                                        <td className="text-center p-1">{el.size.replace(`${prefixMapKey}-`, '')}</td>
                                        <td className="text-center p-1">{_.get(Object.values(COLOURS).find(color => color.value == el.color.replace(`${prefixMapKey}-`, '')), ['text'])}</td>
                                        <td className="text-center p-1">{el.length.replace(`${prefixMapKey}-`, '')}</td>
                                        <td className="text-center p-1">
                                            <input
                                                type="text"
                                                value={el.value} 
                                                onChange={(e) => {onChangeValue(el.path, e.target.value)}}
                                                className="input input-bordered w-full input-sm" 
                                            />
                                        </td>
                                    </tr>
                                   )) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-2 px-2">
                <div className="rounded-xl p-[20px] bg-[#DFF2EB]">
                    <h3 className="text-[24px] font-[600]">CAPS</h3>
                    <div className="overflow-x-auto">
                        <table className="table text-[14px]">
                            <thead className="text-[#4A628A]">
                                <tr>
                                    <th></th>
                                    <th className="text-center">Cap type</th>
                                    <th className="text-center">Cap size (mm)</th>
                                    <th className="text-center">Cap color</th>
                                    <th className="text-center">SKU</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   capArray.map((el, index) => (
                                    <tr key={el.key}>
                                        <td className="text-center p-1">{index + 1}</td>
                                        <td className="text-center p-1">{el.postType == `${prefixMapKey}-${POST_TYPE.DIA}` ? 'Dia' : 'Square'}</td>
                                        <td className="text-center p-1">{el.size.replace(`${prefixMapKey}-`, '')}</td>
                                        <td className="text-center p-1">{_.get(Object.values(COLOURS).find(color => color.value == el.color.replace(`${prefixMapKey}-`, '')), ['text'])}</td>
                                        <td className="text-center p-1">
                                            <input
                                                type="text"
                                                value={el.value} 
                                                onChange={(e) => {onChangeValue(el.path, e.target.value)}}
                                                className="input input-bordered w-full input-sm" 
                                            />
                                        </td>
                                    </tr>
                                   )) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-2 px-2">
                <div className="rounded-xl p-[20px] bg-[#DFF2EB]">
                    <h3 className="text-[24px] font-[600]">CLIPS</h3>
                    <div className="overflow-x-auto">
                        <table className="table text-[14px]">
                            <thead className="text-[#4A628A]">
                                <tr>
                                    <th></th>
                                    <th className="text-center">Clip type</th>
                                    <th className="text-center">Clip size (mm)</th>
                                    <th className="text-center">Clip color</th>
                                    <th className="text-center">SKU</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   clipArray.map((el, index) => (
                                    <tr key={el.key}>
                                        <td className="text-center p-1">{index + 1}</td>
                                        <td className="text-center p-1">{el.postType == `${prefixMapKey}-${POST_TYPE.DIA}` ? 'Dia' : 'Square'}</td>
                                        <td className="text-center p-1">{el.size.replace(`${prefixMapKey}-`, '')}</td>
                                        <td className="text-center p-1">{_.get(Object.values(COLOURS).find(color => color.value == el.color.replace(`${prefixMapKey}-`, '')), ['text'])}</td>
                                        <td className="text-center p-1">
                                            <input
                                                type="text"
                                                value={el.value} 
                                                onChange={(e) => {onChangeValue(el.path, e.target.value)}}
                                                className="input input-bordered w-full input-sm" 
                                            />
                                        </td>
                                    </tr>
                                   )) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default ConfigPage