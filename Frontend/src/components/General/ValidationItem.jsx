import '../styles/ValidationItem.css'

function ValidationItem(props){
    if(props.IsValid){
        return<></>
    }
    return <>
    <div className="alert">
        {props.message}
    </div>
    </>
}

export default ValidationItem