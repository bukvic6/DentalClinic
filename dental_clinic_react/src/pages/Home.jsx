
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Schedule from "../services/Schedule";
import { Input, Button, ButtonGroup, Box, Center, AbsoluteCenter } from "@chakra-ui/react";
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
      <Box position='relative' className="home_image">
        <AbsoluteCenter w='30%' p='4' color='white' axis='both'>
          <form onSubmit={handleSubmit}> 
            <Input backgroundColor='gray.200' borderColor='gray.400' variant='outline' size='lg' required color='gray.700' placeholder='Email'   type="email" value={email} onChange={(e) => setEmail(e.target.value)}  name="uname" />
            <Button mt='1.5' colorScheme='teal' variant='solid' type="submit">Login</Button>
          </form>
        </AbsoluteCenter>
      </Box>

      </body>
      </>
    )
  
}
