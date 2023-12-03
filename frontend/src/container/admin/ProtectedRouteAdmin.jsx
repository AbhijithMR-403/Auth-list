import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const ProtectedRouteAdmin = () => {
    
    const authentication_user = useSelector(state => state.authentication_user)
    
    let auth = {'token': authentication_user.isAdmin}
    return(
        auth.token ? <Outlet/> : <Navigate to="/adminlogin"/>
    )
}

export default ProtectedRouteAdmin
