import { MDBBtn }
    from 'mdb-react-ui-kit';
import '../styles/ActionButton.css'

function ActionButton(props) {
    return <>
        <MDBBtn className='action-button' onClick={props.onClick}>{props.title}</MDBBtn>
    </>
}

export default ActionButton;