
const postMessageToApp = (type, content) => {
    const contentWindow = document.getElementById('signPanelAppId').contentWindow
    if(contentWindow) {
        contentWindow.postMessage({
            type,
            content
        }, '*')
    }
}

const handleAddToCart = async (products) => {
    if(!products) {
        postMessageToApp('ADD_TO_CART_RESULT', { status: false, message: 'Products is null!' })
        return
    }

    if(products.length == 0) {
        postMessageToApp('ADD_TO_CART_RESULT', { status: true, message: 'Successfully!' })
        return 
    }

    // Extract custom price from first product (the custom panel)
    const customPanel = products[0];
    const customPriceMatch = customPanel.properties?.['_Calculated Total']?.match(/£([\d.]+)/);
    const customPrice = customPriceMatch ? parseFloat(customPriceMatch[1]) * 100 : null; // Convert to cents

    const formData = {
        items: products.map((el) => {
            return {
                id: el.id,
                quantity: el.quantity,
                properties: el.properties || {}
            }
        })
    }

    // Get shop name from current URL
    const shopName = window.Shopify.shop;
    
    // Get the backend API endpoint
    const apiEndpoint = 'https://meggan-drouthiest-bureaucratically.ngrok-free.dev/v1/shopify/create-draft-order';

    try {
        console.log('Creating draft order with products:', products);
        
        // Create draft order with custom pricing
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shop: shopName,
                products: products
            })
        });

        if(!response.ok) {
            const error = await response.json();
            console.error('Draft order error:', error);
            postMessageToApp('ADD_TO_CART_RESULT', { 
                status: false, 
                message: error.message || 'Failed to create order' 
            });
            return;
        }

        const result = await response.json();
        console.log('Draft order created:', result);

        // Redirect to checkout URL
        if(result.invoiceUrl || result.checkoutUrl) {
            postMessageToApp('ADD_TO_CART_RESULT', { status: true, message: 'Redirecting to checkout...' });
            window.top.location.href = result.invoiceUrl || result.checkoutUrl;
        } else {
            postMessageToApp('ADD_TO_CART_RESULT', { status: false, message: 'No checkout URL received' });
        }
    } catch(error) {
        console.error('Cart error:', error);
        postMessageToApp('ADD_TO_CART_RESULT', { 
            status: false, 
            message: error?.message || `Can't add to cart` 
        });
    }
}

const registerEvent = () => {
    window.addEventListener(
        "message",
        (event) => {
          if(event.data?.type == 'ADD_TO_CART') {
            handleAddToCart(event.data?.content?.products)
          }
        },
        false,
    );
}

registerEvent()