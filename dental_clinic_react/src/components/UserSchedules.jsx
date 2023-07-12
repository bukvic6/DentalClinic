import { useEffect } from "react";
import Schedule from "../services/Schedule";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Center,
  Heading,
  Box,
} from '@chakra-ui/react'
import "./UserSchedules.css"

export default function Myschedules({ context }) {
  const userEvents = context.userEvents
  const futureEvents = context.futureEvents
  const getEventsFromUser = context.getEventsFromUser
  const getFutureEvents = context.getFutureEvents
  const hour = context.hour
  const getHour = context.getHour
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const cancelEvent = async (eventId, start) => {
    console.log(eventId)
    try {
      // const startTimezoneOffset = start.getTimezoneOffset() * 60000;
      // const startWithOffset = new Date( start.getTime() - startTimezoneOffset);
      const cancelRequest = { user_email: currentUser.userEmail, start: start.toLocaleString() };
      await Schedule.CancelAppointment(eventId, cancelRequest);
      getEventsFromUser();
    } catch (error) {
      console.log("Error cancelling appointment:", error);
    }
  }
  useEffect(() => {
    getEventsFromUser();
    getFutureEvents()
    getHour();
  }, []);

  const shouldShowCancel = (event) => {
    const check = hour * 60 * 60 * 1000;
    const timeDifference = event.start - new Date();
    return timeDifference > check;
  };


  return (
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