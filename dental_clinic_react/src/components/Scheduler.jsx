import { Scheduler } from "@aldabil/react-scheduler";
import { TextField } from "@material-ui/core";
import { Dialog } from "@mui/material";
import {  useEffect, useState } from "react";

import Schedule from "../services/Schedule";

export default function SchedulingCalendar(){
    const [events, setEvents] = useState([]);
    

    const setNewAppointment = async (e) => {
        e.preventDefault();
        const appointment = { }
        try {
            const resp = await Schedule.ScheduleAppointment(appointment);
            fetchData()
        } catch (error) {
          console.log(error)
        }
    }

    
    // const handleSelectSlot = useCallback(
    //     ({ start, end }) => {
    //     const title = window.prompt('New Event Name')
    //     if (title) {
    //         setEvents((prev) => [...prev, { start, end, title }])
    //     }
    //     },
    //     [setEvents]
    // )
    const handleConfirm = async (
        event,
        action )=> {
        console.log("handleConfirm =", action, event.title);
    
        /**
         * Make sure to return 4 mandatory fields:
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         * ....extra other fields depend on your custom fields/editor properties
         */
        // Simulate http request: return added/edited event
        return new Promise((res, rej) => {
          if (action === "edit") {
            /** PUT event to remote DB */
          } else if (action === "create") {
            /**POST event to remote DB */
          }
    
          const isFail = Math.random() > 0.6;
          setTimeout(() => {
            if (isFail) {
              rej("Ops... Faild");
            } else {
              res({
                ...event,
                event_id: event.event_id || Math.random()
              });
            }
          }, 3000);
        });
      };
      const handleDelete = async (deletedId) => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res(deletedId);
          }, 3000);
        });
      };

    const fetchData = async () => {
        const {data} = await Schedule.GetAllAppointments();
        data.forEach((e,i) => {
            e.start = new Date(e.start)
            e.end = new Date(e.end)
            e.event_id = i
        })
        
        setEvents(data)
        console.log(`Fetched data: ${JSON.stringify(data)}`)
    }
    useEffect(() => {
        fetchData();
    },[]);

    if(!events || events.length == 0) {
        return <></>
    }

    return (
        <div className='Calendar'>
            <h1>hello</h1>
            <Scheduler
            view={["day", "week", "month"]}
            events={events}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5],
                weekStartOn : 6,
                startHour: 9,
                endHour: 17,
               
            }}
            />
        <Dialog
          title={`View/Edit Appointment of ${moment(this.state.start).format(
            "MMMM Do YYYY"
          )}`}
          actions={eventActions}
          modal={false}
          open={this.state.openEvent}
          onRequestClose={this.handleClose}
        >
          <TextField
            defaultValue={this.state.title}
            floatingLabelText="Title"
            onChange={e => {
              this.setTitle(e.target.value);
            }}
          />
          <br />
          <TextField
            floatingLabelText="Description"
            multiLine={true}
            defaultValue={this.state.desc}
            onChange={e => {
              this.setDescription(e.target.value);
            }}
          />
          <TextField
            format="ampm"
            floatingLabelText="Start Time"
            minutesStep={5}
            value={this.state.start}
            onChange={this.handleStartTime}
          />
          <TextField
            format="ampm"
            floatingLabelText="End Time"
            minutesStep={5}
            value={this.state.end}
            onChange={this.handleEndTime}
          />
        </Dialog>
        </div>
    )
}
