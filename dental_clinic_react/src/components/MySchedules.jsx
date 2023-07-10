import { useEffect, useState } from "react";
import Schedule from "../services/Schedule";
import "./MySchedules.css"

export default function Myschedules({context}){
  const events = context.events
  const getEvents = context.getEvents


    const [myevents, setMyEvents] = useState([])    

    const getEventsfromClient = async () => {
        const {data} = await Schedule.GetAllUserAppointments();
        data.forEach((e) => {
            e.start = new Date(e.start)
            e.end = new Date(e.end)
        })
        setMyEvents(data)
    }
    const cancelEvent = async (eventId) =>{
      console.log(eventId)
        try {
          await Schedule.CancelAppointment(eventId);
          getEvents();
          getEventsfromClient();
        } catch (error) {
          console.log(error.response)
        }
    }
    useEffect(() => {
      getEventsfromClient();
    },[]);
    

    return(
        <>
        <div className="myChedulesContainer">
        <div class="container">
            <h2>My Schedules</h2>
            <ul class="responsive-table">
                <li class="table-header">
                <div class="col col-2">Date</div>
                <div class="col col-4">Time</div>
                <div class="col col-4">Cancel</div>

                </li>
                {myevents.map((event) => (
              <li className="table-row" key={event.id}>
                <div className="col col-2" data-label="Date">
                  {event.start.toDateString()}
                </div>
                <div className="col col-4" data-label="Time">
                  {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                </div>
                <div className="col col-4" data-label="Cancel">
                  <button onClick={() => cancelEvent(event.event_id)}>Cancel</button>
                </div>
              </li>
            ))}
            </ul>
            </div>
        </div>
        </>
    )
}