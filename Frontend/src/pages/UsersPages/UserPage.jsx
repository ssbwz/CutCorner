import { React } from "react";
import BarberProfilePage from "./Barber/BarberProfilePage";
import CustomerProfilePage from './Customer/CustomerProfilePage'
import authorisation from '../../servers/authorisation.js'

function UserPage() {

    if (authorisation.IsBarber()) {
        return <BarberProfilePage />
    }
    else if (authorisation.IsCustomer()) {
        return <CustomerProfilePage />
    }
}

export default UserPage;