import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactBigCalendar from "../components/Calendar";
import HoursForm from "../components/HoursForm";
import Myschedules from "../components/UserSchedules";
import Schedule from "../services/Schedule";
import "./Schedules.css"




export default function Schedules() {
    const [events, setEvents] = useState([])
    const [futureEvents, setFutureEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [hour, setHour] = useState()
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isDentist = currentUser && currentUser.isDentist;
    const navigate = useNavigate();

    const getEvents = async () => {
        const { data } = await Schedule.GetAllAppointments();
        data.forEach((e) => {
            const start = new Date(e.start);
            const startTimezoneOffset = start.getTimezoneOffset() * 60000;
            e.start = new Date(start.getTime() + startTimezoneOffset);

            const end = new Date(e.end);
            const endTimezoneOffset = end.getTimezoneOffset() * 60000;
            e.end = new Date(end.getTime() + endTimezoneOffset);
        });
        setEvents(data)
    }
    const getFutureEvents = async () => {
        const { data } = await Schedule.GetFutureAppointments();
        data.forEach((e) => {
            const start = new Date(e.start);
            const startTimezoneOffset = start.getTimezoneOffset() * 60000;
            e.start = new Date(start.getTime() + startTimezoneOffset);

            const end = new Date(e.end);
            const endTimezoneOffset = end.getTimezoneOffset() * 60000;
            e.end = new Date(end.getTime() + endTimezoneOffset);
        })
        setFutureEvents(data)
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `UserEmail ${currentUser.userEmail}`
    }
    const getEventsfromUser = async () => {
        const { data } = await Schedule.GetAllUserAppointments(headers);
        data.forEach((e) => {
            const start = new Date(e.start);
            const startTimezoneOffset = start.getTimezoneOffset() * 60000;
            e.start = new Date(start.getTime() + startTimezoneOffset);

            const end = new Date(e.end);
            const endTimezoneOffset = end.getTimezoneOffset() * 60000;
            e.end = new Date(end.getTime() + endTimezoneOffset);
        })
        setUserEvents(data)
    }
    const getHour = async () => {
        const { data } = await Schedule.GetCancellationHour();
        setHour(data)
    }
    const context = {
        events: events,
        futureEvents: futureEvents,
        userEvents: userEvents,
        hour: hour,
        getEvents: getEvents,
        getHour: getHour,
        getFutureEvents: getFutureEvents,
        getEventsFromUser: getEventsfromUser,
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    };
    

    return (
        <>
            <Flex flexDirection={'column'} className="schedulesContainer">
                <Flex mt={5} mr={5} justify="end">
                    <Button onClick={handleLogout}>Logout</Button>
                </Flex>
                <Flex p='10' flexDirection={'row'}>
                    {!isDentist && (
                        <>
                            <ReactBigCalendar context={context} />
                            <Myschedules context={context} />
                        </>
                    )}
                    {isDentist && (
                        <>
                            <ReactBigCalendar context={context} />
                            <HoursForm context={context} />
                        </>
                    )}

                </Flex>
            </Flex>
        </>
    )
}