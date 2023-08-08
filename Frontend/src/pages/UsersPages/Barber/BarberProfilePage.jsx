import { React, useState } from 'react';

// style
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn }
    from 'mdb-react-ui-kit';
import '../../styles/Barber/BarberProfile.css'

// servers
import usersServer from '../../../services/usersServer'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextHolder from '../../../components/General/TextHolder';
import Loading from '../../../components/General/Loading';
import ActionButton from '../../../components/General/ActionButton';

import NotFoundPage from '../../NotFoundPage'

const BarberProfilePage = () => {

    const [barber, setBarber] = useState()
    const [isFounded, setIsFounded] = useState(true)

    const location = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        if (location.pathname === '/me') {
           
            usersServer.getCurrentProfile()
                .then((res) => {
                   
                    setBarber(res.data)
                })
                .catch((error) => {
                    
                    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
                        navigator("/exception", { state: { exceptionType: "serviceDown" } })
                        return
                    }
                   
                    if (error && error.response.status === 404) {
                        setIsFounded(false)
                    }
                })
        } else if (location.pathname.slice(0, 15) === '/users/barbers/') {
            const searchedUsername = location.pathname.slice(15)
            usersServer.getBarberByUsername(searchedUsername)
                .then((res) => {
                    setBarber(res.data)
                })
                .catch((error) => {
                    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
                        navigator("/exception", { state: { exceptionType: "serviceDown" } })
                        return
                    }
                    if (error && error.response.status === 404) {
                        setIsFounded(false)
                    }
                })

        }


    }, [location])


    function navigate(e, username) {
        e.preventDefault();
        navigator("/appointment/" + username);
    }

    if (barber) {

        const availabilities = () => {
            const elements = [];

            for (let availability = 0; availability < barber.availabilities.length; availability++) {
                if (barber.availabilities[availability].startTime) {
                    elements.push(<>
                        <MDBCol className='availability-element' key={barber.availabilities[availability]} lg="6" md="6" xs='12'>
                            {barber.availabilities[availability].day} : {barber.availabilities[availability].startTime} - {barber.availabilities[availability].endTime}
                        </MDBCol>
                    </>

                    );
                } else {
                    elements.push(
                        <MDBCol className='availability-element' key={barber.availabilities[availability]} lg="6" md="6" xs='12'>
                            {barber.availabilities[availability].day} : Not available
                        </MDBCol>
                    );
                }
            }
            return <>{elements}</>;
        };


        return (
            <MDBContainer>
                <MDBRow>

                    <img id="profileImagePhone" src={barber.profilePicture} className='img-fluid' alt='Barber image' />
                    <MDBCol md="12">
                        <MDBCard id='info'>
                            <MDBCardTitle className='hero-username'>{barber.username}</MDBCardTitle>
                            <div className='d-inline-flex'>

                                <MDBCol lg="2" md="2" sm='4'>
                                    <img id="profileImagePC" src={barber.profilePicture} className='img-fluid' alt='Barber image' />
                                </MDBCol>

                                <MDBCol lg="10" md="10" xs='12'>
                                    <MDBCardBody>
                                        <MDBCardText>Name: {barber.firstname} {barber.midname} {barber.lastname}</MDBCardText>
                                        <MDBCardText>Address: {barber.workAddress.city}, {barber.workAddress.street}, {barber.workAddress.postcode} </MDBCardText>
                                        <MDBCardText>Gender: {barber.gender}</MDBCardText>
                                        <ActionButton onClick={e => navigate(e, barber.username)} title={'Book an appointment'}></ActionButton>
                                    </MDBCardBody>
                                </MDBCol>

                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol>
                        <TextHolder title={"About me"}>
                            <MDBCardText style={{ fontFamily: 'Share Tech' }}>{barber.bio}</MDBCardText>
                        </TextHolder>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol>
                        <TextHolder title={"Services"}>
                            <MDBCardText>
                                {barber.services.map((service) => (
                                    <div key={service.title} className="services-element" >{service.title} {service.price}{service.currencySign}</div>
                                ))}
                            </MDBCardText>
                        </TextHolder>
                    </MDBCol>
                </MDBRow>

                <MDBRow >
                    <MDBCol>
                        <TextHolder title={"Availability"}>
                            <MDBRow>
                                {availabilities()}
                            </MDBRow>
                        </TextHolder>
                    </MDBCol >
                </MDBRow >

            </MDBContainer >
        );

    }
    else if (!isFounded) {
        return (<NotFoundPage />)
    }
    else {
        return <>
            <div className="text-center">
                <Loading />
            </div>
        </>
    }
};

export default BarberProfilePage;
