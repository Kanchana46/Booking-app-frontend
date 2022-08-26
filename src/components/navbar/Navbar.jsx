import { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [openLogout, setOpenLogout] = useState(false);
    const handleLogout = () => {
        setOpenLogout(false);
        dispatch({ type: "LOGOUT" });
    }
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">Tripsverse</span>
                </Link>
                {user ?
                    <div className="username" onClick={() => { setOpenLogout(!openLogout) }}>
                        {user.username}
                    </div> : (
                        <div className="navItems">
                            <button className="navButton" onClick={() => (navigate("/register"))}>Register</button>
                            <button className="navButton" onClick={() => (navigate("/login"))}>Login</button>
                        </div>
                    )}
                {openLogout && <div className="logoutContainer" style={{ position: "absolute", right: "220px", top: "36px" }}>
                    <div className="logout">
                        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default Navbar;