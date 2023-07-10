import axios from "axios";

const SCHEDULE_BASE_API = "http://localhost:8081/api"


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
    GetAllUserAppointments(headers){
        return axios.get(SCHEDULE_BASE_API + `/getClientAppointments`, {headers: headers})
    }
    ChangeCancellationHours(hours){
        return axios.put(SCHEDULE_BASE_API + `/changeHours/${hours}`)
    }
    GetCancellationHour(){
        return axios.get(SCHEDULE_BASE_API + `/getHour`)
    }
}
export default new ScheduleService()