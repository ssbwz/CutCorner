
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/button';
import usersServer from '../../services/usersServer'
import { TempusDominus } from '@eonasdan/tempus-dominus';
import { useNavigate } from 'react-router-dom';
import authorization from '../../services/authorization';

var datepicker9 = undefined

function ReigsterPage() {

  const userInfo = usersServer.getUserRegisterInfo()

  const [firstName, setFirstName] = useState(userInfo.first_name)
  const [midName, setMidName] = useState()
  const [lastName, setLastName] = useState(userInfo.last_name)
  const [username, setUsername] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [birthDate, setBirthDate] = useState()
  const [gender, setGender] = useState()
  const [isAgreed, setIsAgreed] = useState(false)
  const [isSubmited, SetIsSubmited] = useState(false)

  const navigator = useNavigate()

  async function registerUser(e) {
    e.preventDefault()

    //todo
    //validation

    if (!IsFirstNameValid()) {
      alert("Please fill the first name")
      return
    }

    if (!IsLastNameValid()) {
      alert("Please fill the last name")
      return
    }
    if (await ValidateUsername() === "This username has been taken.") {
      alert("This username has been taken.")
      return
    }
    if (await ValidateUsername() === "Invalid") {
      alert("This username is invalid")
      return
    }
    if (!IsBirthDateValid()) {
      alert("Please fill the birth date.")
      return
    }
    if (!IsPhoneNumberValid()) {
      alert("Please fill valid phone number.")
      return
    }
    if (!IsGenderValid()) {
      alert("Please fill gender field.")
      return
    }
    if (!IsAgreedValid()) {
      alert("You have to agree on the terms and coditions.")
      return
    }



    // save the user in the db
    const registerUserRequest = {
      firstName: firstName,
      midName: midName,
      lastName: lastName,
      username: username,
      email: userInfo.email,
      phoneNumber: phoneNumber,
      birthDate: birthDate,
      gender: gender
    }
    const res = await usersServer.registerUser(registerUserRequest)
    if (res.status !== 201) {
      navigator("/exception", { state: { message: "We couldn't register you try again later." } })
    }

    const loginWithGoogle = {
      first_name: firstName,
      last_name: lastName,
      email: userInfo.email,
      accountPhotoUrl: "accountPhotoUrl"
    }

    localStorage.removeItem('userInfo')
    await authorization.loginWithGoogle(loginWithGoogle)
  }

  const IsGenderValid = () => {
    return gender !== undefined
  }

  const IsFirstNameValid = () => {
    return firstName !== undefined
  }

  const IsLastNameValid = () => {
    return lastName !== undefined
  }

  const IsBirthDateValid = () => {
    return birthDate !== undefined
  }
  const IsPhoneNumberValid = () => {
    if (!phoneNumber) {
      return true
    }
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber)
  }

  const IsAgreedValid = () => {
    return isAgreed
  }


  useEffect(() => {

    datepicker9 = new TempusDominus(document.getElementById('datetimepicker9'),
      {
        display: {
          viewMode: 'years',
          components: {
            clock: false,
          },
          theme: 'light'
        },
        localization: {
          format: 'L'
        },
        restrictions: {
          minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 118)),
          maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        },
        viewDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
      })

  }, []);

  useEffect(() => {
    setBirthDate(datepicker9 === undefined ? undefined : datepicker9.viewDate)
    SetIsSubmited(false)
  }, [isSubmited])



  function handleSetPhoneNumer(e) {
    e.preventDefault()
    if (e.target.value.trim() === '') {
      setPhoneNumber(undefined)
      return
    }
    setPhoneNumber(e.target.value)
  }


  async function ValidateUsername() {
    if (!username) {
      return "Invalid"
    }
    if (username.length < 3) {
      return "Invalid"
    }
    if (username !== '') {
      var response = undefined
      try {
        response = await usersServer.ValidateUsername(username)
        if (response.data.isUsernameValid) {
          return
        }
      } catch (err) {

      }
      return "This username has been taken."

    }
  }

  function HandleSetFirstName(e) {
    e.preventDefault()
    setFirstName(e.target.value.trim() === '' ? undefined : e.target.value)
  }
  function HandleSetLastName(e) {
    e.preventDefault()
    setLastName(e.target.value.trim() === '' ? undefined : e.target.value)
  }

  return <>
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">Sign up</p>
            <MDBCol md='3' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput onChange={HandleSetFirstName} value={firstName} label='first Name' id='form1' type='text' className='w-100' required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput onChange={HandleSetLastName} value={lastName} label='last Name' id='form1' type='text' className='w-100' required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Email' id='form2' type='email' value={userInfo.email} readonly />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="mobile-alt me-3" size='lg' />
                <MDBInput onChange={e => handleSetPhoneNumer(e)} label='Phone number' id='form2' type='tel' />
              </div>

            </MDBCol>

            <MDBCol md='3' lg='3' className='order-2 order-lg-1 d-flex flex-column align-items-center'>


              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput onChange={e => setMidName(e.target.value.trim() === '' ? undefined : e.target.value)} label='middle Name' id='form1' type='text' className='w-100' />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput onChange={e => setUsername(e.target.value.trim() === '' ? undefined : e.target.value)} label='Username' id='form2' type='text' required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="birthday-cake me-3" size='lg' />
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className='input-group date ' id='datetimepicker9' style={{ width: '28vh' }}>
                      <input type='text' className="form-control" />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar">
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="transgender me-3" size='lg' />
                <Form.Select onChange={e => setGender(e.target.value === 'Gender' ? undefined : e.target.value)} style={{ width: '28vh' }} required>
                  <option >Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="PREFER_NOT_SAY">Prefer not say</option>
                </Form.Select>
              </div>

              <div className='mb-4'>
                <MDBCheckbox onChange={e => setIsAgreed(e.target.checked)} name='flexCheck' value='' id='flexCheckDefault' label='I agree on the terms and conditions.' />
              </div>


              <Button onClick={e => {
                SetIsSubmited(true)
                registerUser(e)
              }} className='mb-4' size='lg'>Register</Button>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  </>
}

export default ReigsterPage;
