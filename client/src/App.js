import React, { useState, useEffect }  from "react";
import './App.css';
import Header from "./Components/Header";
import NumberPlate from "./Components/NumberPlate";
import ParkingSpots from "./Components/ParkingSpots";
import SearchCar from "./Components/SearchCar";

import * as api from "./api/index.js"; // import all from api

function App() {

    const [allPlates, setAllPlates] = useState([]);

    const getAllPlates = async () => {
        try {
            console.log("getAllPosts called");

            const { data } = await api.fetchPosts();

            console.log(data);

            // data.sort((obj1, obj2) => obj1.createdAt - obj2.createdAt);

            setAllPlates(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllPlates();
    }, []);

  return (
    <div>
      <Header />
      <NumberPlate allPlates={allPlates}/>
      <ParkingSpots />
      <SearchCar allPlates={allPlates} />

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6218.451959679004!2d77.03202660886484!3d28.611461657195193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2zMjjCsDM2JzM3LjIiTiA3N8KwMDInMTAuMCJF!5e0!3m2!1sen!2sin!4v1647890536570!5m2!1sen!2sin" width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy"></iframe>

      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m20!1m8!1m3!1d2014.5233474392903!2d77.03504540492392!3d28.611591054817886!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d28.585850999999998!2d77.08063899999999!4m3!3m2!1d28.6103126!2d77.0359957!5e0!3m2!1sen!2sin!4v1647894272339!5m2!1sen!2sin" width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy"></iframe> */}

    </div>
  );
}

export default App;
