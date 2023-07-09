import ReactBigCalendar from "../components/Calendar";
import Schedule from "../services/Schedule";



export default function Schedules(){
    const [events, setEvents] = useState([])
    function deleteEvent(eventId) {
    }

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
        setEvents: setEvents,
        deleteEvent: deleteEvent
    }

    return (
        <>
        <div className="schedulesContainer">
            <h1>Hello</h1>
            <ReactBigCalendar context={context}></ReactBigCalendar>
            <Myschedules context={context}></Myschedules>
        </div>
        </>
    )
}