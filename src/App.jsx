import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import SignUpForm from "./components/Signup";
import SignInForm from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (<div>
        <div className="bg-slate-900">
          <Navbar/>
        </div>
      
        <div className="p-12">
        <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} />
      </Routes>
        </div>
  </div>)
};

export default App;
