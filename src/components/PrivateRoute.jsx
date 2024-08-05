// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute=({ children })=> {
  const {token} = useSelector((state) => state.auth)

 
 if (token === null) {
    return <Navigate to="/signin" />
  } else {
    return children
  }
}

export default PrivateRoute
