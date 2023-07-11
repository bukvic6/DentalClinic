import { Box, Center, Flex, Grid, Spacer } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactBigCalendar from "../components/Calendar";
import HoursForm from "../components/HoursForm";
import Myschedules from "../components/UserSchedules";
import Schedule from "../services/Schedule";
import "./Schedules.css"




export default function Schedules(){
    const [events, setEvents] = useState([])
    const [futureEvents, setFutureEvents] = useState([])
    const [hour, setHour] = useState()
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
    const getFutureEvents = async () => {
        const {data} = await Schedule.GetFutureAppointments();
        data.forEach((e) => {
            e.start = new Date(e.start)
            e.end = new Date(e.end)
        })
        setFutureEvents(data)
    }
    const getHour = async () => {
        const {data} = await Schedule.GetCancellationHour();
        setHour(data)
    }
    const context = {
        events: events,
        futureEvents: futureEvents,
        hour: hour,
        getEvents: getEvents,
        getHour: getHour,
        getFutureEvents: getFutureEvents
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    };

    return (
        <>
        <Flex flexDirection={'column'} className="schedulesContainer">
        <Flex mt={5} mr={5} justify="end">
        <Button  onClick={handleLogout}>Logout</Button>
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