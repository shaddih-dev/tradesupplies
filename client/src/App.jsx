import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import global from './global'
import shopifyRoutes from './modules/shopify/routes'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useRef } from "react";
import ConfigPage from "./pages/config/ConfigPage";
import axios from "axios";
import useStore from "./store";
import _ from "lodash";
import { SHOPIFY_MAP } from "./constants";

function App() {
  const  {
    setShopifyMap,
    setVariantMapSku
  } = useStore()
  const isInit = useRef(true)
  const handlePostMessage = (e) => {
    if(e.data?.type == 'ADD_TO_CART_RESULT') {
      if(e.data.content.status) {
        toast('Successfully!', { type: 'success' })
      } else {
        toast('Fail!', { type: 'error' })
      }
    }
  }
  useEffect(() => {
    window.addEventListener(
      "message",
      handlePostMessage,
      false,
    );

    return () => {
      window.removeEventListener(
        "message",
        handlePostMessage,
        false,
      );
    }
  }, [])

  useEffect(() => {
    if(!isInit.current) {
      return
    }
    if(isInit.current) {
      isInit.current = false
    }
    axios.get(
      `${process.env.REACT_API_END_POINT}/v1/shopify/get-shopify-map?shop=${global.getShopifyShop}`
    ).then(response => {
      const skuData = Object.keys(_.get(response, ['data', 'skuMap'], SHOPIFY_MAP)).length == 0 ? SHOPIFY_MAP : _.get(response, ['data', 'skuMap'], SHOPIFY_MAP)
      setShopifyMap(skuData)
      setVariantMapSku(_.get(response, ['data', 'variantMapSku'], []))
      toast('Get shopify map successfully!', { type: 'success' })
    }).catch(() => {
      toast('Fail to get shopify map!', { type: 'error' })
    })
}, [setShopifyMap])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" index element={<MainPage />}/>
        <Route path="/config" index element={<ConfigPage />}/>
        {global.IS_SHOPIFY && shopifyRoutes.map(route => <Route key={route.name} path={route.path} element={route.component}/>)}
      </Routes>
    </>
  );
}

export default App;
