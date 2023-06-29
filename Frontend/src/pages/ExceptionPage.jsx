import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ExceptionPage() {
    const location = useLocation();
    const navigator = useNavigate();
    const [returnComponent, setReturnComponent] = useState();
    const state = location.state;


    useEffect(() => {
        if (state !== null) {
            if (state.exceptionType === "serviceDown") {
                setReturnComponent(<>
                    <h1>Sorry, the service is down.</h1>
                </>)
            }
        } else
            navigator('/')
    }, [location.state])

    return returnComponent
}

export default ExceptionPage;