import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminWrapper({ children }) {

    const selector = useSelector((state) => state.user.userData);
    const navigate = useNavigate();

    console.log("----> ", selector);

    useEffect(()=>{
        {
            if(!selector) {
    
                navigate('/login');
            }
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    )

}