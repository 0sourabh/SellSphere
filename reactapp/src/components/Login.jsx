import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    return (
        <div className="p-3 m-3">
            <h3>Welcome to Login Page</h3>
            <br />
            <label>USERNAME</label>
            <input 
                className="form-control" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            />
            <br />
            <label>PASSWORD</label>
            <input 
                className="form-control" 
                type="password"  // Changed input type to "password" for security
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <br />
            <button className="btn btn-primary mr-3" onClick={handleApi}>LOGIN</button>
            <Link className="m-3" to="/signup">SIGNUP</Link>
        </div>
    );
}

export default Login;
