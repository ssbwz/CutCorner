import { MDBCard as Card, MDBCardBody as CardBody, MDBCardText as CardText, MDBCardTitle as CardTitle } from 'mdb-react-ui-kit';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col }
   from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import usersServer from '../../../servers/usersServer';
import '../../styles/Barber/BarberProfile.css'
import NavigateButton from '../../../components/navigation/NavigateButton';


function BarbersPage() {
   const [barbers, setBarbers] = useState()
   const [isFounded, setIsFounded] = useState()

   useEffect(() => {
      usersServer.getBarbers(1)
         .then((res) => {
            setBarbers(res.data)

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
   }, [])

   const GenerateServicesText = (services) => {
      let servicesText = ''
      for (let index = 0; index < services.length; index++) {
         servicesText += services[index] + ',';
      }
      return servicesText.slice(0, servicesText.length - 1)
   }

   const GenerateAvailabilitiesText = (availabilities) => {
      let availabilitiesText = ''
      for (let index = 0; index < availabilities.length; index++) {
         if (availabilities[index].startTime === undefined) {
            availabilitiesText += `${availabilities[index].day} : Closed, `;
         } else {
            availabilitiesText += `${availabilities[index].day} : ${availabilities[index].startTime} - ${availabilities[index].endTime}, `;
         }
      }
      return availabilitiesText.slice(0, availabilitiesText.length - 2)
   }


   if (barbers) {
      return <>
         {barbers.map((barber) =>
         (
            <Col md="12" key={barber.username}>
               <Row>
                  <Card >
                     <Container>
                        <Row>
                           <Col lg="2" md="2" sm='4'>
                              <img id="shortprofileImage" src={barber.profilePicture} className='img-fluid' alt='Barber image' />
                           </Col>
                           <Col lg="10" md="10" xs={12}>
                              <CardBody>
                                 <CardTitle>Username: {barber.username}</CardTitle>
                                 <CardText>Name: {barber.firstname} {barber.midname} {barber.lastname}</CardText>

                                 <CardTitle>Services</CardTitle>
                                 <CardText>
                                    {GenerateServicesText(barber.services)}
                                 </CardText>

                                 <CardTitle>
                                    Availabilities
                                 </CardTitle>
                                 <CardText>
                                    {GenerateAvailabilitiesText(barber.availability)}
                                 </CardText>
                                 <NavigateButton link={`/users/barbers/${barber.username}`} title={'Profile'} />
                              </CardBody>
                           </Col>
                        </Row>
                     </Container>
                  </Card>
               </Row>
            </Col>
         )
         )}
      </>
   }
   else if (!isFounded) {
      return (<>Not found</>)
   }
   else {
      return <>Loading...</>
   }

}

export default BarbersPage;