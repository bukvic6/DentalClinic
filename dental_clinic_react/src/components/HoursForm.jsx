import { Box, Button, Center, Flex, Input} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Schedule from "../services/Schedule";

export default function HoursForm({ context }) {
    const hour = context.hour
    const getHour = context.getHour
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangeHours = async (e) => {
        e.preventDefault()
        try {
            await Schedule.ChangeCancellationHours(e.target.hour.value);
            getHour()
            setSuccessMessage('Successfully changed hour!');
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getHour();
    }, []);

    return (
        <>

            <Box p='10' className="hoursFormContainer">
                <form onSubmit={handleChangeHours} action="POST">
                    <Flex flexDirection='column'>
                        <h2>Preferences</h2>
                        <Center>
                            <label htmlFor="hour">Cancellation hours</label>
                        </Center>
                        <Input min={1} type="number" id="hour" name="hour" defaultValue={hour} required />
                        <Button m='3' type='submit' colorScheme='teal' variant='solid'>Submit</Button>
                    </Flex>
                </form>
                {successMessage && <p>{successMessage}</p>}

            </Box>
        </>
    )
}