import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimage, setPimage] = useState(null);
    const [pimage2, setPimage2] = useState(null);
    const [address, setAddress] = useState(''); // State for address
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        if (!pname || !pdesc || !price || !category || !pimage || !pimage2 || !address) {
            alert("Please fill in all fields and select both images before submitting.");
            return;
        }

        setIsLoading(true); // Start loading state

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const formData = new FormData();
                formData.append('plat', position.coords.latitude);
                formData.append('plong', position.coords.longitude);
                formData.append('pname', pname);
                formData.append('pdesc', pdesc);
                formData.append('price', price);
                formData.append('category', category);
                formData.append('pimage', pimage);
                formData.append('pimage2', pimage2);
                formData.append('address', address); // Add address to form data
                formData.append('userId', localStorage.getItem('userId'));

                const url = `${API_URL}/add-product`;
                axios.post(url, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.error("Error:", err.response ? err.response.data : err);
                    alert('Server error, please try again later.');
                })
                .finally(() => setIsLoading(false)); // End loading state
            },
            (error) => {
                console.error("Geolocation Error:", error);
                alert("Failed to retrieve location. Please enable location services.");
                setIsLoading(false); // End loading state
            }
        );
    };

    return (
        <div className="p-3">
            <h2>ADD PRODUCT HERE:</h2>
            
            <label>Product Name</label>
            <input 
                className="form-control" 
                type="text" 
                value={pname} 
                onChange={(e) => setPname(e.target.value)} 
            />

            <label>Product Description</label>
            <input 
                className="form-control" 
                type="text" 
                value={pdesc} 
                onChange={(e) => setPdesc(e.target.value)} 
            />

            <label>Product Price</label>
            <input 
                className="form-control" 
                type="text" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
            />

            <label>Product Category</label>
            <select 
                className="form-control" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="" disabled>Select a category</option>
                {categories && categories.length > 0 && categories.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>

            <label>Pickup Address</label>
            <input 
                className="form-control" 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} // Handle address input
            />

            <label>Product Image</label>
            <input 
                className="form-control" 
                type="file" 
                onChange={(e) => setPimage(e.target.files[0])} 
            />

            <label>Product Second Image</label>
            <input 
                className="form-control" 
                type="file" 
                onChange={(e) => setPimage2(e.target.files[0])} 
            />

            <button 
                onClick={handleApi} 
                className="btn btn-primary mt-3" 
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : 'SUBMIT'}
            </button>
        </div>
    );
}

export default AddProduct;
