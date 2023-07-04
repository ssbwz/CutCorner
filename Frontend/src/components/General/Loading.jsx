
import { MDBSpinner } from 'mdb-react-ui-kit';
import '../styles/Loading.css'

function Loading(){

    return<>
    <div style={{height: '100vh'}} className=''>
    <MDBSpinner className='spinner' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
    </div>
    </>
}

export default Loading;