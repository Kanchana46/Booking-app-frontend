import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_URL } from "../../constants/constants";

const Register = () => {
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
        try {
            await axios.post(base_URL + "/auth/register", credentials);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="register">
        <div className="rContainer">
            <input type="text" placeholder="Username" id="username" onChange={handleChange} className="rInput" />
            <input type="email" placeholder="Email" id="email" onChange={handleChange} className="rInput" />
            <input type="password" placeholder="Password" id="password" onChange={handleChange} className="rInput" />
            <button className="lBtn" onClick={handleClick}>Register</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
}

export default Register;