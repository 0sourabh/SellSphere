import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";

function MyProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
        if (!userId) {
            alert('User not logged in.');
            return;
        }
        const url = `${API_URL}/my-profile/${userId}`; // Use template literals for clarity
        axios.get(url)
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    setUser(res.data.user);
                } else {
                    alert('User not found.');
                }
            })
            .catch((err) => {
                console.error(err); // Log the error for debugging
                alert('Server Error.');
            });
    }, []); // Run once on mount

    return (
        <div>
            <Header />
            <div className="m-3 p-3">
                <h3 className="text-center mt-2">USER PROFILE</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>USERNAME</td>
                            <td>EMAIL ID</td>
                            <td>MOBILE</td>
                            <td>PICK-UP ADDRESS</td> {/* Add Address Header */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile ? user.mobile : 'Not available'}</td>
                            <td>{user.address ? user.address : 'Not available'}</td> {/* Display Address */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyProfile;
