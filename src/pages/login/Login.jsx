import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_URL } from "../../constants/constants";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { user, loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const response = await axios.post(base_URL + "/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
            navigate("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            console.log(error)
        }
    }

    return <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="Username" id="username" onChange={handleChange} className="lInput" />
            <input type="password" placeholder="Password" id="password" onChange={handleChange} className="lInput" />
            <button className="lBtn" onClick={handleClick}>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
}

export default Login;