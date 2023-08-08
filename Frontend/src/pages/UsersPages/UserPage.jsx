import { React } from "react";
import BarberProfilePage from "./Barber/BarberProfilePage";
import CustomerProfilePage from './Customer/CustomerProfilePage'
import authorisation from '../../services/authorization.js'

function UserPage() {

    if (authorisation.AuthRole(authorisation.userTypes.BARBER)) {
        return <BarberProfilePage />
    }
    else if (authorisation.AuthRole(authorisation.userTypes.CUSTOMER)) {
        return <CustomerProfilePage />
    }
}

export default UserPage;