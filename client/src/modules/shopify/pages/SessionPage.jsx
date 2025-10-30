import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SectionPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/config")
    }, [navigate])

    return <>
        <div>SIGN</div>
    </>
}
export default SectionPage