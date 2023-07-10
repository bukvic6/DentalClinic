import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactBigCalendar from "../components/Calendar";
import Myschedules from "../components/MySchedules";
import Schedule from "../services/Schedule";
import "./Schedules.css"




export default function Schedules(){
    const [events, setEvents] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isDentist = currentUser && currentUser.isDentist;
    const navigate = useNavigate();
    const getEvents = async () => {
        const {data} = await Schedule.GetAllAppointments();
        data.forEach((e) => {
            e.start = new Date(e.start)
            e.end = new Date(e.end)
        })
        setEvents(data)
    }

    const context = {
        events: events,
        getEvents: getEvents,
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    };

    return (
        <>
        <div className="schedulesContainer">
        <button onClick={handleLogout}>Logout</button>
        {!isDentist && (
            <>
            <ReactBigCalendar context={context} />
            <Myschedules context={context} />
            </>
        )}
        {isDentist && <ReactBigCalendar context={context} />}
        </div>
        </>
    )
}