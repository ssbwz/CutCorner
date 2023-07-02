import { MDBBtn as Button } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function NavigateButton(props) {
    const navigator = useNavigate()

    return <>
        <Button onClick={e => navigator(props.link)}> {props.title}</Button>
    </>

}

export default NavigateButton;