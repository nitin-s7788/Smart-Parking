import React, { useState } from "react";
// import * as api from "../api/index.js"; // import all from api
// import "./NumberPlate.css";
import moment from 'moment';
import { TextField, Button} from '@material-ui/core';
// import ParkingSpots from "./ParkingSpots";
import "./SearchCar.css";

const SearchCar = (props) => {

    const [plateToSearch, setPlateToSearch] = useState("");
    const [carsToShow, setCarsToShow] = useState([]);


    const getTime = (str)=>{
        // const t = Date(str);
        return(
            <div>
                {moment(str).fromNow()}
            </div>
        )
    }


    const showSearchedPlates = () => {
        
        console.log(carsToShow.length)
        if(carsToShow.length > 0)
        {

        return(
            
            <div>
                <div>
                    <h3> Car arrived at : </h3>
                </div>

                <div>
                    <ol>
                        {
                            // console.log("carsToShow", carsToShow)
                            carsToShow.map( (plate) => {
                                if(plate)
                                {
                                    return(
                                        <li>         
                                            <div className="time">
                                                { getTime(plate.createdAt) }
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ol>
                </div>
            </div>
        )

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setCarsToShow( props.allPlates.map( (plate) => {
            if(plate.numberPlate == plateToSearch)
            {
                return( 
                    plate
                )    
            }
        } ).reverse() )


    }

    return (

        <div style={{ margin: "2rem" }} >
            <h3>Search For a Car </h3>
            
            <div className="searchbar">
                <form autoComplete="off"  onSubmit={handleSubmit}>
                    <TextField className="search" name="searched" variant="outlined" label="searched"  value={plateToSearch} onChange={(e) => setPlateToSearch(e.target.value)} />
                    {/* <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} /> */}
                   
                    <Button className="submit" variant="contained" color="primary" size="large" type="submit" >Submit</Button>
                    {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
                </form>
            </div>
        
            <div style={{ margin: "2rem" }} >

            { showSearchedPlates() }
                
            </div>
        
        </div>
        
    );
};

export default SearchCar;