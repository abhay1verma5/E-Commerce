import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { filterByCategory, sortByPrice } from "../redux/Slices/ProductSlice";
import { clearToken } from "../redux/Slices/AuthSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const { token } = useSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    setTotal(totalQuantity);
  }, [cart]);

  const handleLogout = () => {
   
    localStorage.removeItem('token');

    
    dispatch(clearToken());

   
    toast.success('Logged out successfully!');

   

   
     navigate('/');
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-800">
        <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-5">
          <NavLink to="/">
            <div className="ml-5">
              <img src="../logo.png" className="h-14" alt="Logo" />
            </div>
          </NavLink>

          <div className="flex space-x-6">
            <NavLink to="/" className="text-gray-200 hover:text-gray-400">
              <button onClick={() => { dispatch(filterByCategory("clothing")) }}>Clothing</button>
            </NavLink>

            <NavLink to="/" className="text-gray-200 hover:text-gray-400">
              <button onClick={() => { dispatch(filterByCategory("electronics")) }}>Electronics</button>
            </NavLink>

            <NavLink to="/" className="text-gray-200 hover:text-gray-400">
              <button onClick={() => { dispatch(filterByCategory("jewelery")) }}>Jewelery</button>
            </NavLink>

            <NavLink to="/" className="text-gray-200 hover:text-gray-400">
              <button onClick={() => { dispatch(sortByPrice()) }}>Price Wise</button>
            </NavLink>
          </div>

          <div className="flex items-center font-medium text-white space-x-6">
            {token?.length > 0 ? (
              <button onClick={handleLogout} className="text-gray-200 hover:text-gray-400">
                Sign Out
              </button>
            ) : (
              <NavLink to="/signup" className="text-gray-200 hover:text-gray-400">
                Sign In
              </NavLink>
            )}

            <NavLink to="/cart" className="relative text-gray-200 hover:text-white">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                  {total}
                </span>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;