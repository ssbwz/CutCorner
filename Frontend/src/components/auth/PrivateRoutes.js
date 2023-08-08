import { Navigate, Outlet } from 'react-router-dom'
import authorization from '../../services/authorization'
export default  () => {
    let auth = { 'token': authorization.isAuthorizied() }
    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}