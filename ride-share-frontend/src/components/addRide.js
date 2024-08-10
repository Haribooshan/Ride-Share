import './style.css';
import { useState, useEffect } from 'react';
import { userFields } from '../constants';
import { BsPlusSlashMinus } from "react-icons/bs";
import { addRideDetails, updateRideDetails } from '../api/ride-api';
import AutocompleteInput from './autocomplete';
import { useLocation } from 'react-router-dom';

const AddRide = ({ ride, setIsUpdateModalOpen }) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [timeFlexibility, setTimeFlexibility] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const route = location.pathname.slice(1);

  useEffect(()=>{
    if(route === 'my-rides'){
      setPhoneNo(ride.phoneNo);
      setSource(ride.src);
      setDestination(ride.dst);
      setDepartureTime(ride.departureTime);
      setTimeFlexibility(ride.timeFlexibility);
      setDateOfDeparture(ride.dateOfDeparture);
      setComments(ride.comments);
    }
  // eslint-disable-next-line
  }, []);  

  function clearState(){
    setPhoneNo("");
    setSource("");
    setDestination("");
    setDepartureTime("");
    setTimeFlexibility(0);
    setDateOfDeparture("");
    setComments("");
    setMessage("");
}
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const rideDetails = {phoneNo, src: source, dst: destination, departureTime, timeFlexibility, dateOfDeparture, comments}

    addRideDetails(rideDetails)
    .then(res=>{
      setIsError(false);
      setMessage(res.data.message);
      setTimeout(clearState, 2500);
    })
    .catch(err=>{
      if (err.response.data.message === 'Token provided is invalid or expired.') {
        localStorage.clear();
        window.location.href = "/";
      }
      setIsError(true);
      setMessage(err.response.data.message);
      console.log(err);
  })
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const rideDetails = {phoneNo, src: source, dst: destination, departureTime, timeFlexibility, dateOfDeparture, comments}

    updateRideDetails(rideDetails, ride._id)
    .then(res=>{
      setIsError(false);
      setMessage(res.data.message);
      setTimeout(()=>{setIsUpdateModalOpen(false)}, 2500);
      window.location.reload();
    })
    .catch(err=>{
      if (err.response.data.message === 'Token provided is invalid or expired.') {
        localStorage.clear();
        window.location.href = "/";
      }
      setIsError(true);
      setMessage(err.response.data.message);
      console.log(err);
  })
  };

  return (
    <div>
      <div className='card shadow mx-auto kanit-light' style={{width: "60vw", fontSize: "15px"}}>
        <div className="card-header text-center"> Ride Details </div>
        <form className='p-4'>

        {/*Name & Phone Number*/}
        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-4">
            <input type="text" id="name" className="form-control" value={localStorage.getItem(userFields.name)} 
            style={{fontSize: "15px", height: "1.75rem"}} disabled/>
          </div>
          <label htmlFor="phoneNo" className="col-sm-2 col-form-label">Phone Number:</label>
          <div className="col-sm-4">
            <input type="text" id="phoneNo" className="form-control" value={phoneNo} 
            onChange={(e) => setPhoneNo(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required/>
          </div>
        </div>

        {/*Start & End Location*/}
        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="source" className="col-sm-2 col-form-label">Start Location:</label>
          <div className="col-sm-4 position-relative">
            <AutocompleteInput id="source" value={source} onChange={setSource} isFilter={false}/>
          </div>
          <label htmlFor="destination" className="col-sm-2 col-form-label">End Location:</label>
          <div className="col-sm-4 position-relative">
            <AutocompleteInput id="destination" value={destination} onChange={setDestination} isFilter={false}/>
          </div>
        </div>

        {/*Departure Time & Time Flexibility*/}
        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="departureTime" className="col-sm-2 col-form-label">Departure Time:</label>
          <div className="col-sm-4">
            <input type="time" id="departureTime" className="form-control" value={departureTime} 
            onChange={(e) => setDepartureTime(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required/>
          </div>
          <label htmlFor="timeFlexibility" className="col-sm-2 col-form-label">Time Flexibility:</label>
          <div className="col-sm-4">
            <div className="input-group">
              <span className="input-group-text" style={{fontSize: "15px", height: "1.75rem"}}><BsPlusSlashMinus /></span>
              <select id="timeRange" className="form-select p-1 ps-3" value={timeFlexibility} 
              onChange={(e) => setTimeFlexibility(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required>
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
              <span className="input-group-text" style={{fontSize: "15px", height: "1.75rem"}}>minutes</span>
            </div>
          </div>
        </div>

        {/*Date of Departure*/}
        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="dateOfDeparture" className="col-sm-2 col-form-label">Date of Departure:</label>
          <div className="col-sm-10">
            <input type="date" id="dateOfDeparture" className="form-control" value={dateOfDeparture} 
            onChange={(e) => setDateOfDeparture(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required/>
          </div>
        </div>

        {/*Comments*/}
        <div className="row mb-3">
          <label htmlFor="comments" className="col-sm-2 col-form-label">Comments:</label>
          <div className="col-sm-10">
            <textarea id="comments" className="form-control" value={comments} style={{fontSize: "15px"}}
            onChange={(e) => setComments(e.target.value)} spellCheck="false" />
          </div>
        </div>
        {message && (
          <div style={isError ? {color: "#dc3545", fontSize: "15px"}: {color: "#28a745", fontSize: "15px"}} className="kanit-light text-center mb-3">{message}</div>
        )}
        {(route === 'my-rides')?
        <div className="text-center">
            <button type="submit" className="btn btn-primary py-1 px-2" style={{fontSize: "15px"}} onClick={handleUpdate}>Update</button>
        </div> :
        <div className="text-center">
            <button type="submit" className="btn btn-primary py-1 px-2" style={{fontSize: "15px"}} onClick={handleSubmit}>Submit</button>
        </div>}
      </form>
    </div>
    </div>
  );
};

export default AddRide;
