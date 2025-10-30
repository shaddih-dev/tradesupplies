//use global instead of redux because redux can only be used in Component
export function isShopify(){
    const host = new URLSearchParams(window.location.search).get("host")
    const shop = new URLSearchParams(window.location.search).get("shop")
    const match = /myshopify.com/.test(host) || /myshopify.com/.test(shop)

    return match
}

export const getShopifyShop = () => {
    const shop = new URLSearchParams(window.location.search).get("shop")
    const shopName = new URLSearchParams(window.location.search).get("shopName")
    let value = shop ? shop : shopName
    if(!value && document.location.ancestorOrigins.length > 0) {
        value = document.location.ancestorOrigins.item(0).replace('https://', '')
    }
    
    return value
}

export const inIframe = () => {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}


export default {
    IS_SHOPIFY: isShopify(),
    getShopifyShop: getShopifyShop(), 
    inIframe
}