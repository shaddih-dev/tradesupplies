import ExitIframe from './pages/ExitIframe'
import SessionPage from './pages/SessionPage'

export default [
    {
        path: "/exitiframe",
        name: "ExitIframe",
        component: <ExitIframe/>
    },
    {
        path: "/home-shopify",
        name: "Session",
        component: <SessionPage/>
    },
]