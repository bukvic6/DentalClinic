import axios from "axios";

const SCHEDULE_BASE_API = "http://localhost:8081/api"

class ScheduleService {
    ScheduleAppointment(appointment){
        return axios.post(SCHEDULE_BASE_API + "/scheduleAppointment",appointment)
    }
    GetAllAppointments(){
        return axios.get(SCHEDULE_BASE_API + "/getAllAppointments")
    }
    CancelAppointment(id){
        return axios.delete(SCHEDULE_BASE_API + `/cancelAppointment/${id}`)
    }
}
export default new ScheduleService()