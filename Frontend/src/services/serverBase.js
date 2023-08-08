import axios from "axios";
const header = () => {
    if (localStorage.getItem("accessToken") !== null) {
        return {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }
    }
    else
        return {
            "Content-type": "application/json"
        }
}

export default axios.create({
    baseURL: "http://localhost:5000/",
    ...header()
}
);
