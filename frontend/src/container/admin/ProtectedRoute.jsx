import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const ProtectedRoute = () => {
    
    const authentication_user = useSelector(state => state.authentication_user)
    
    let auth = {'token': authentication_user.isAuthenticated}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute
