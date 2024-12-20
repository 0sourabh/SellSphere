import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function Home() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = `${API_URL}/get-products`;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
        axios.get(url)
            .then((res) => {
                setCproducts(res.data.products);
                setIsSearch(true);
            })
            .catch((err) => {
                alert('Server Error.');
            });
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => item.category === value);
        setCproducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.');
            return;
        }

        const url = `${API_URL}/like-product`;
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    };

    const handleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const truncateDescription = (description) => {
        return description.length > 10 ? description.slice(0, 10) + '...' : description;
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {isSearch && cproducts && 
                <h5>SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                </h5>
            }

            {isSearch && cproducts && cproducts.length === 0 && <h5>No Results Found</h5>}
            {isSearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts.map((item) => (
                    <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="300px" height="200px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger">Rs. {item.price}</h3>
                        <p className="m-2 text-success">{truncateDescription(item.pdesc)}</p> {/* Truncate description here */}
                    </div>
                ))}
            </div>}

            {!isSearch && <div className="d-flex justify-content-center flex-wrap">
                {products.map((item) => (
                    <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                        <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="250px" height="150px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                        <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <p className="m-2 text-success">{truncateDescription(item.pdesc)}</p> {/* Truncate description here */}
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default Home;
