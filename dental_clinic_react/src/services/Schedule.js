import axios from "axios";

const SCHEDULE_BASE_API = "http://localhost:8081/api"

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// const headedrs = {
//     Authorization: `UserEmail ${currentUser.userEmail}`,
// };
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `UserEmail ${currentUser.userEmail}`
  }

class ScheduleService {
    
    Login(email){
        return axios.post(SCHEDULE_BASE_API + "/login", email)
    }
    ScheduleAppointment(appointment){
        return axios.post(SCHEDULE_BASE_API + "/scheduleAppointment",appointment)
    }
    GetAllAppointments(){
        return axios.get(SCHEDULE_BASE_API + "/getAllAppointments")
    }
    CancelAppointment(id){
        return axios.delete(SCHEDULE_BASE_API + `/cancelAppointment/${id}`)
    }
    GetAllUserAppointments(){
        return axios.get(SCHEDULE_BASE_API + `/getClientAppointments`, {headers: headers})
    }
}
export default new ScheduleService()