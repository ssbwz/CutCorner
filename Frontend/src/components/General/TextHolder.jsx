// style
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText }
    from 'mdb-react-ui-kit';
import '../styles/TextHolder.css'

function TextHolder(props) {
    return <>
        <MDBCard >
            <MDBCardBody>
                <MDBCardTitle className='section-title'>{props.title}</MDBCardTitle>
                <div className='children'>
                    {props.children}
                </div>
            </MDBCardBody>
        </MDBCard>
    </>
}

export default TextHolder;