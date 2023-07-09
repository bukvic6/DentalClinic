import { useState } from "react";
import ReactBigCalendar from "../components/Calendar";
import Myschedules from "../components/MySchedules";
import Schedule from "../services/Schedule";
import "./Schedules.css"




export default function Schedules(){
    const [events, setEvents] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isDentist = currentUser && currentUser.isDentist;

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

    return (
        <>
        <div className="schedulesContainer">
        {isDentist && <ReactBigCalendar context={context} />}
        {!isDentist && <Myschedules context={context} />}
        </div>
        </>
    )
}