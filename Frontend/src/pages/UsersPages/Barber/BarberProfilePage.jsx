import { React, useState } from 'react';

// style
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText }
    from 'mdb-react-ui-kit';
import '../../styles/Barber/BarberProfilePage.css'

// servers
import usersServer from '../../../servers/usersServer'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BarberProfilePage = () => {

    const [barber, setBarber] = useState()
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/me') {

            usersServer.getCurrentProfile()
                .then((res) => {
                    setBarber(res.data)
                })
                .catch((error) => {
                    console.log(error)
                    if (error) {
                        return ("Not found")
                    }
                })
        } else if(location.pathname.slice(0,15) === '/users/barbers/'){
            const searchedUsername = location.pathname.slice(15)     
            usersServer.getUserByUsername(searchedUsername)
                .then((res) => {
                    setBarber(res.data)
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                    if (error) {
                        return ("Not found")
                    }
                })

        }
        

    }, [location])


    if (barber) {
        return (
            <MDBContainer>
                <h1 className="mt-4">Barber Profile</h1>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBRow>
                            <MDBCard >
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol lg="2" md="2" sm='4'>
                                            <img id="profileImage" src={barber.profilePicture} className='img-fluid rounded' alt='' />
                                        </MDBCol>
                                        <MDBCol lg="10" md="10" xs={12}>
                                            <MDBCardBody>
                                                <MDBCardTitle>{barber.firstName} {barber.midname} {barber.lastName}</MDBCardTitle>
                                                <MDBCardText>username: {barber.username}</MDBCardText>
                                                <MDBCardText>Address: {barber.address}</MDBCardText>
                                                <MDBCardText>Gender: {barber.gender}</MDBCardText>
                                            </MDBCardBody>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBCard>
                        </MDBRow>

                    </MDBCol>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>About Me</MDBCardTitle>
                                <MDBCardText>{barber.bio}</MDBCardText>
                                <MDBCardTitle>Services</MDBCardTitle>
                                <MDBCardText>
                                    {barber.services.map((service) => (
                                        <>{service + " "}</>
                                    ))}
                                </MDBCardText>
                                <MDBCardTitle>Availability</MDBCardTitle>
                                <ul>
                                    {barber.availability.map((availability) => {
                                        if (availability.startTime) {
                                         return   (
                                                <li key={availability}>
                                                    {availability.day} : {availability.startTime} - {availability.endTime}
                                                </li>
                                            )
                                        }
                                        return   (
                                            <li key={availability}>
                                                {availability.day} : {"Closed"}
                                            </li>
                                        )
                                    })}
                                </ul>
                                <MDBCardText>Current Location: {barber.workAddress}</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
    else {
        return <>Loading...</>
    }
};

export default BarberProfilePage;
