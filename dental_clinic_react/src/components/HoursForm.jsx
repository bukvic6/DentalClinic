import { useEffect, useState } from "react";
import Schedule from "../services/Schedule";

export default function HoursForm({context}){
    const hour = context.hour
    const getHour = context.getHour
    const initialValue = hour;
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangeHours = async (e) =>{
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
    },[]);

    return(
        <>
        <div className="hoursFormContainer">
        <form onSubmit={handleChangeHours} action="POST">
            <h2>Setup </h2>
            <label htmlFor="hour">Change cancellation hours: </label>
            <input type="number" id="hour" name="hour" defaultValue={hour} required />
            <button type="submit" className="cancellation-hours">
                Change
            </button>
        </form>
        {successMessage && <p>{successMessage}</p>}
            
        </div>
        </>
    )
}