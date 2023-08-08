import { MDBCard as Card, MDBCardBody as CardBody, MDBCardText as CardText, MDBCardTitle as CardTitle, MDBInput as Input } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col }
   from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import usersServer from '../../../services/usersServer';
import '../../styles/Barber/BarbersPage.css'
import '../../../App.css'
import NavigateButton from '../../../components/navigation/NavigateButton';

import NotFoundPage from '../../NotFoundPage'
import Loading from '../../../components/General/Loading';


import Pagination from '../../../components/navigation/Pagination';



function BarbersPage() {
   const [barbers, setBarbers] = useState()
   const [isFounded, setIsFounded] = useState(true)
   const [searchedUsername, setSearchedUsername] = useState();
   const [searchedCity, setSearchedCity] = useState();
   const [searchedPageNumber, setSearchedPageNumber] = useState(1);
   const [lastPagecount, setLastPageNumber] = useState()

   function getBarbers(e) {
      if (e !== undefined)
         e.preventDefault();

      const searchRequest = {
         username: searchedUsername,
         city: searchedCity,
         pageNumber: searchedPageNumber
      }


      setBarbers([])
      setLastPageNumber(undefined)

      usersServer.getBarbers(searchRequest)
         .then((res) => {
            setLastPageNumber(res.data.pagesCount)
            setBarbers(res.data.barbers)
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

   useEffect(() => {
      getBarbers()
   }, [searchedPageNumber])

   function handleSearch(e) {
      e.preventDefault()
      setSearchedPageNumber(1)
      getBarbers()
   }
   const GenerateServicesText = (services) => {
      let servicesText = ''
      for (let index = 0; index < services.length; index++) {
         servicesText += ` ${services[index].title} ${services[index].price}${services[index].currencySign}` + ',';
      }
      return servicesText.slice(0, servicesText.length - 1)
   }


   if (barbers) {
      return <>
         <Container>

            <Card >
               <Row>
                  <Col md="3">
                     <Input onChange={e => setSearchedUsername(e.target.value.trim() === '' ? undefined : e.target.value)} label='Username' type='text' />
                  </Col>
                  <Col md="3">
                     <Input onChange={e => setSearchedCity(e.target.value.trim() === '' ? undefined : e.target.value)} label='City' type='text' />
                  </Col>
                  <Col md="3">
                     <Button onClick={handleSearch} title={''} >Search</Button>
                  </Col>
               </Row>
            </Card>

            <Row>
               {barbers.map((barber) =>
               (
                  <Col md="6" key={barber.username}>
                     <Card >
                        <Row>
                           <Col lg="4" md="2" sm='4'>
                              <img src={barber.profilePicture} className='img-fluid shortprofileImage' alt='Barber image' />
                           </Col>

                           <Col lg="8" md="10" xs={12}>
                              <CardBody>

                                 <CardTitle className='hero-username'>{barber.username}</CardTitle>
                                 <CardText>Name: {barber.firstname} {barber.midname} {barber.lastname}</CardText>

                                 <CardTitle className='section-title'>Services</CardTitle>
                                 <CardText>
                                    {GenerateServicesText(barber.services)}
                                 </CardText>

                                 <NavigateButton link={`/users/barbers/${barber.username}`} title={'Profile'} />

                              </CardBody>
                           </Col>
                        </Row>
                     </Card>
                  </Col>
               )
               )}
            </Row>

            <Pagination lastPageNumber={lastPagecount} setPageNumber={setSearchedPageNumber} pagenumber={searchedPageNumber} ></Pagination>

         </Container >

      </>
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

}

export default BarbersPage;