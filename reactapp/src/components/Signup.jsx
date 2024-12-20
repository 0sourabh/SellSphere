import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState(''); // State for address

    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email, address };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch(() => {
                alert('SERVER ERR');
            });
    };

    return (
        <div className="p-3 m-3">
            <h3>Welcome to Signup Page</h3>
            <br />
            <label>USERNAME</label>
            <input
                className="form-control"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>MOBILE</label>
            <input
                className="form-control"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <br />
            <label>EMAIL</label>
            <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>PASSWORD</label>
            <input
                className="form-control"
                type="password" // Password input type for security
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>ADDRESS</label>
            <input
                className="form-control"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Handle address input
            />
            <br />
            <button className="btn btn-primary mr-3" onClick={handleApi}>
                SIGNUP
            </button>
            <Link className="m-3" to="/login">LOGIN</Link>
        </div>
    );
}

export default Signup;
