import { useEffect, useState } from "react";
import Schedule from "../services/Schedule";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Center,
  Heading,
  Box,
} from '@chakra-ui/react'
import "./UserSchedules.css"

export default function Myschedules({context}){
  const events = context.events
  const userEvents = context.userEvents
  const getEventsFromUser = context.getEventsFromUser
  const hour = context.hour
  const getHour = context.getHour
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isDentist = currentUser && currentUser.isDentist;
    
    const cancelEvent = async (eventId, start) =>{
      console.log(eventId)
        try {
          const cancelRequest = { user_email: currentUser.userEmail, start:start};
          await Schedule.CancelAppointment(eventId, cancelRequest);
          getEventsFromUser();
        } catch (error) {
          console.log("Error cancelling appointment:", error);   
        }
    }
    useEffect(() => {
      getEventsFromUser();
      getHour();
    },[events]);

    const shouldShowCancel = (event) => {
      const check = hour * 60 * 60 * 1000;
      console.log(event.start)
      const timeDifference = event.start - new Date();
      console.log('Time Difference:', timeDifference); 
      return timeDifference > check;
    };
    

    return(
        <>
        <Box ml={6} className="myChedulesContainer">
        <Center>
          <Heading as='h2'>Appointments</Heading>
        </Center>
        <TableContainer>
          <Table variant='striped'>
            <Thead colorScheme='teal'>
              <Tr>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Cancellation</Th>
              </Tr>
            </Thead>

            <Tbody>
            {userEvents.map((event) => (
              <Tr className="table-row" key={event.id}>
                <Td className="col col-2" data-label="Date">
                  {event.start.toDateString()}
                </Td>
                <Td className="col col-4" data-label="Time">
                  {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                </Td>
                <Td className="col col-4" data-label="Cancel">
                  {shouldShowCancel(event) && (
                    <Button colorScheme='red' onClick={() => cancelEvent(event.event_id, event.start)}>Cancel</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
          </Table>
        </TableContainer>
        </Box>
        </>
    )
}