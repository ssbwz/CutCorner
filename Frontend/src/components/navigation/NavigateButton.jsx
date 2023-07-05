import { MDBBtn as Button } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import '../styles/NavigateButton.css'
function NavigateButton(props) {
    const navigator = useNavigate()

    function navigate(e, link) {
        e.preventDefault();
        navigator(link);
    }

    return <>
        <Button className={'navigate-button'} onClick={e => navigate(e, props.link)}> {props.title}</Button>
    </>

}

export default NavigateButton;