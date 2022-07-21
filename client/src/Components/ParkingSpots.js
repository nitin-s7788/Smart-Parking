import React, { useState, useEffect } from 'react';
import * as api from "../api/index.js"; // import all from api

const ParkingSpots = () => {

    const [allSlots, setAllSlots] = useState([]);

    const getAllSlots = async () => {
        try {
            console.log("getAllSlots called");

            const { data } = await api.fetchSlots();

            console.log(data);

            setAllSlots(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllSlots();
    }, []);


    const showSlots = () => {
        return(
            <div>
                <ol>
                    {
                        allSlots.map( (slot) => {return(
                            <li style = {{marginBottom:'20px'}}> 
                                <div style = {{marginLeft:'20px'}}> 
                                    {slot.slotNo} <span style = {{marginLeft:'30px'}}> {slot.free} </span>
                                </div>
                                
                            </li>
                        )} )
                    }
                </ol>
            </div>
        )
    }

  return (
      <div style = {{margin:'2rem'}}>
        <h3>List of Parking Slots</h3>

        {showSlots()}
        {/* <div>
          <ol>
            <li>102 <span>Empty</span></li>
            <li>202 <span>Empty</span></li>
            <li>302 <span>Empty</span></li>
          </ol>
        </div> */}
      </div>
  );
};

export default ParkingSpots;