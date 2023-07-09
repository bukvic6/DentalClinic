
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Schedule from "../services/Schedule";
import "./Home.css"

export default function Home() {
  const[email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = {email:email};
    try{
      const {data} = await Schedule.Login(login);
      console.log("ovde ce isprintati")
      console.log(data.is_dentist)
      const userDataJSON = JSON.stringify({
        userEmail : data.email,
        isDentist : data.is_dentist
      });
      localStorage.setItem('currentUser', userDataJSON)
      navigate("/schedules")
      } catch (error){
         console.log(error);
       }
    }
    return (
      <>
      <body>
      <div className="home_image">
        <div class="hero-text">
          <h1 >I am John Doe</h1>
          <p>And I'm a Photographer</p>
          <form onSubmit={handleSubmit}> 
            <input className="logininput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" name="uname" />
            <button className='buttonLogin' type="submit">Login</button>
          </form>
        </div>
        </div>

      </body>
      </>
    )
  
}
