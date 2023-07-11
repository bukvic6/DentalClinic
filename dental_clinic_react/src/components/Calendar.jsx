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
    const futureEvents = context.futureEvents
    const getFutureEvents = context.getFutureEvents
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const [dentistModal, setDentistModal] = useState(false);
    const [modalData, setModalData] = useState({ event_id: '', start: '', end: '', title: '' });
    const [modalDentistData, setModalDentistData] = useState({ start: new Date, end: new Date});
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isDentist = currentUser && currentUser.isDentist;
      
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
      if (start < new Date()){
         return null
      } 
      const hasAppointmentOverlap = hasOverlap(start, end);
      const duration = end - start;
    
      if (hasAppointmentOverlap) {
        window.alert("There is an overlap with an existing appointment.");
        return;
      }
  
      if (duration > 3600000) {
        window.alert("The appointment should not last more than 1 hour.");
        return;

      }
      if (isDentist) {
        setModalDentistData({ start: start.toISOString(), end: end.toISOString()});
        toggleDentistModal();
        return;
      }
      try {
          console.log(currentUser.userEmail)
          const appointment = { title: currentUser.userEmail, start, end };
          const resp = await Schedule.ScheduleAppointment(appointment);
          await getEvents();
          await getFutureEvents();
        } catch (error) {
        console.log(error);
      }
    };

    const toggleModal = () => {
      setModal(!modal);
    };
    const toggleDentistModal = () => {
      setDentistModal(!dentistModal);
    };
    
    const handleSelectEvent = ({event_id, start, end, title}) => { 
      console.log(start)
      setModalData({ event_id:event_id, start:start.toISOString(), end:end.toISOString(), title:title });
      toggleModal();
    }
    
    const handleCancelAppointment = async () =>{
      try {
        const cancelRequest = { user_email: modalData.title, start:modalData.start};
        await Schedule.CancelAppointment(modalData.event_id,cancelRequest);
        await getEvents();
        await getFutureEvents();
        toggleModal();
      } catch (error) {
        console.log(error.response)
      }
    }
    const handleCreateAppointment = async (e) =>{
      e.preventDefault()
      try {    
        const appointment = { title: email, start: modalDentistData.start, end: modalDentistData.end};
        console.log(appointment.toString())
        await Schedule.ScheduleAppointment(appointment);
        await getEvents();
        await getFutureEvents();
        setEmail("")
        toggleDentistModal();
      } catch (error) {
        console.log(error.response)
      }
    }
    useEffect(() => {
        getEvents();
        getFutureEvents();
    },[]);
    return (
        <div className='Calendar'>
            <Calendar    
            dayLayoutAlgorithm={nooverlap}
            localizer={localizer}
            views={["day", "work_week"]}
            events={isDentist ? events : futureEvents}
            minDate={new Date()}
            defaultView="work_week"
            timeslots={1}
            selectable="ignoreEvents"
            onSelectEvent={isDentist ? handleSelectEvent : null}
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
              <p>{modalData.start}</p>
              <p>{modalData.end}</p>
              <button className="close-modal" onClick={handleCancelAppointment}>
                cancel appointment
              </button>
            </div>
          </div>
        )}
        {dentistModal && (
            <div className="modal">
            <div onClick={toggleDentistModal} className="overlay"></div>
            <div className="modal-content">
              <form onSubmit={handleCreateAppointment}>
                <p>{modalDentistData.start}</p>
                <p>{modalDentistData.end}</p>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" className="create-appointment">
                  Create appointment
                </button>
              </form>
            </div>
          </div>
        )}
          
          
      </div>
        
    )
    
}
