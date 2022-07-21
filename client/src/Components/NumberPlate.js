import React from "react";
import "./NumberPlate.css";
import moment from 'moment';

const NumberPlate = (props) => {

    const getTime = (str)=>{
        const t = Date(str);
        return(
            <div>
                {moment(str).fromNow()}
            </div>
        )
    }


    const showNumberPlates = () => {
        return(
            <div>
                <ol>
                    {
                        props.allPlates.map( (plate) => {return(
                            <li> 
                                <div className="plate">
                                    { plate.numberPlate }
                                </div>

                                <div className="time">
                                    { getTime(plate.createdAt) }
                                </div>
                            </li>
                        )} ).reverse()
                    }
                </ol>
            </div>
        )
    }

    return (
        <div style={{ margin: "2rem" }}>
            <h3>List of Cars Parked</h3>

            {showNumberPlates()}
{/* 
            <div>
                <ol>
                    <li>DL69</li>
                    <li>DL69</li>
                    <li>DL69</li>
                </ol>
            </div> */}
        </div>
    );
};

export default NumberPlate;