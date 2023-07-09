import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./Calendar.css"
import { useEffect,useCallback, useState, useMemo } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Schedule from '../services/Schedule';

const localizer = momentLocalizer(moment)
export default function ReactBigCalendar({context}){
    const events = context.events
    const getEvents = context.getEvents
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({ event_id: '', start: '', end: '', title: '' });
      
    const {defaultDate, minDate, maxDate, nooverlap} = useMemo(() => ({
        defaultDate: new Date(),
        minDate: new Date(2018, 0, 1, 9),
        maxDate: new Date(2018, 0, 1, 17),
        nooverlap: "no-overlap"

    }))
    const hasOverlap = useCallback((start, end ) => {
        const overlappingEvents = events.filter(event => {
            return (
                ((event.start >= start && event.start < end) || (event.end > start && event.end <= end)) ||
                ((start >= event.start && start < event.end) || (end > event.start && end <= event.end))
              );
          });
          return overlappingEvents.length > 0;
        }, [events]);

    const setNewAppointment = async ({ start, end }) => {
        if (hasOverlap(start, end)) {
          window.alert("You cannot book already reserved appointment.");
          return;
        }
        const appointment = { title: "bukvic6@gmail.com", start, end };
        const duration = end - start;
        try {
          if (duration <= 3600000) {
            const resp = await Schedule.ScheduleAppointment(appointment);
            await getEvents();
          } else {
            window.alert("The appointment should not last more than 1 hour.");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const toggleModal = () => {
        setModal(!modal);
      };
    
    const handleSelectEvent = ({event_id,start, end, title}) => { 
      console.log(event_id)
        setModalData({ event_id, start, end, title });
         setModal(!modal);
    }

    const handleCancelAppointment = async () =>{
      try {
        await Schedule.CancelAppointment(modalData.event_id);
        await getEvents();
        toggleModal();
      } catch (error) {
        console.log(error.response)
      }
    }
    
    useEffect(() => {
        getEvents();
    },[]);
    return (
        <div className='Calendar'>
            <h1>hello</h1>
            <Calendar
            dayLayoutAlgorithm={nooverlap}
            localizer={localizer}
            views={["day", "work_week"]}
            events={events}
            minDate={new Date()}
            defaultView="work_week"
            timeslots={1}
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={setNewAppointment}
            defaultDate={defaultDate}
            min={minDate}
            max={maxDate}
            />

          
      {modal && (
          <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{modalData.title}</h2>
            <p>{modalData.event_id}</p>
            <button className="close-modal" onClick={handleCancelAppointment}>
              cancel appointment
            </button>
          </div>
        </div>
      )}
          
          
        </div>
        
    )
    
}
