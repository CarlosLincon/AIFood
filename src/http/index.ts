import axios from "axios";

const htpp = axios.create({
    baseURL:"http://localhost:8000/api/v2/"
})


export default htpp;