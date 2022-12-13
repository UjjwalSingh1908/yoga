import axios from "axios";

const baseurl = "http://localhost:8000";

class ApiService {

    register(data){
        return axios.post(baseurl + "/register", data)
    }

    login(data){
        return axios.post(baseurl + "/login", data)
    }

    payfees(data){
        return axios.patch(baseurl + "/payment", data)
    }


}

export default new ApiService();