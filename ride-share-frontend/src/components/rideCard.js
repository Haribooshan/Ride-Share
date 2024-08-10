import { useState, useEffect } from 'react';
import RideModal from './rideModal';
import { getUserById } from '../api/user-api';
import { ImInfo } from "react-icons/im";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { userFields } from '../constants';
import { deleteRideById, updateStar } from '../api/ride-api';
import { FaPencilAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import AddRide from './addRide';
import moment from 'moment-timezone';

const RideCard = ({ ride }) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [isStarred, setIsStarred] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [timeColor, setTimeColor] = useState('')

    const location = useLocation();
    const route = location.pathname.slice(1);

    useEffect(()=>{
        getUserById(ride.userId)
        .then(res=>{
            setUser(res.data);
        })
        .catch(err=>{
            if (err.response.data.message === 'Token provided is invalid or expired.') {
                localStorage.clear();
                window.location.href = "/";
            }
        })

        getUserById(localStorage.getItem(userFields.userId))
        .then(res=>{
            if(res.data.starredRides.includes(ride._id)){
                setIsStarred(true);
            }
        })
        .catch(err=>{
            if (err.response.data.message === 'Token provided is invalid or expired.') {
                localStorage.clear();
                window.location.href = "/";
            };
        })

        const calculateTimeLeft = () => {
            const now = moment().tz('Asia/Kolkata');
            const departure = moment(`${ride.dateOfDeparture} ${ride.departureTime}`);
            const duration = moment.duration(departure.diff(now));
            if (duration.asSeconds() > 0) {
                const days = Math.floor(duration.asDays());
                const hours = duration.hours();
                const minutes = duration.minutes();
                setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                if (days) setTimeColor('#DAF7A6');
                else if(hours) setTimeColor('#FFC300');
                else setTimeColor('#FF5733')
            } else {
                deleteRideById(ride._id)
                .then(()=>{
                    window.location.reload();
                })
                .catch(err=>{
                    if (err.response.data.message === 'Token provided is invalid or expired.') {
                        localStorage.clear();
                        window.location.href = "/";
                    }
                })
            }
        };

        calculateTimeLeft();
        const intervalId = setInterval(calculateTimeLeft, 60 * 1000);

        return () => clearInterval(intervalId);
    });
    
    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    }

    const truncateString = (str, maxLength) => {
        return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    };

    const onClickHandler = () => {
        updateStar(ride._id)
        .catch(err=>{
            if (err.response.data.message === 'Token provided is invalid or expired.') {
                localStorage.clear();
                window.location.href = "/";
            }
        })
        window.location.reload();
    }

    return (
        <div className="kanit-light card border shadow p-3 mx-2 mb-5" style={{width: "28vw"}}>
            <div className='d-flex justify-content-between align-items-center'>
                {(user.name) && <h5>{truncateString(user.name, 10)}</h5>}
                <div className='d-flex'>
                    <h5 className='me-4 mt-1 px-1 border shadow' style={{backgroundColor: timeColor}}>{timeLeft}</h5>
                    <h5 className='me-4' style={{cursor: "pointer"}} onClick={()=>{ setIsInfoModalOpen(true) }}><ImInfo/></h5>
                    {isStarred ? <h5 style={{cursor: "pointer"}}><FaStar onClick={onClickHandler}/></h5> : 
                    <h5 style={{cursor: "pointer"}}><FaRegStar onClick={onClickHandler}/></h5> }
                    {(route === "my-rides") && (
                        <h5 className='ms-4' style={{cursor: "pointer"}} onClick={()=>{ setIsUpdateModalOpen(true) }}><FaPencilAlt/></h5>
                    )}
                </div>
            </div>

            <RideModal
                show={isInfoModalOpen}
                onHide={handleCloseInfoModal}
                ride={ride}
                user={user}
            />

            <Modal show={isUpdateModalOpen} fullscreen onHide={handleCloseUpdateModal} className='kanit-light'>
                <Modal.Header closeButton className='mb-5'>
                    <h3>Update the Ride Details</h3>
                </Modal.Header>
                <Modal.Body>
                    <AddRide ride = {ride} setIsUpdateModalOpen = {setIsUpdateModalOpen}/>
                </Modal.Body>
            </Modal>

            <p style={{fontSize: "15px"}}><span className='kanit-regular'>Phone: </span>{ride.phoneNo}</p>
            <p style={{fontSize: "15px"}}><span className='kanit-regular'>Source: </span>{truncateString(ride.src, 100)}</p>
            <p style={{fontSize: "15px"}}><span className='kanit-regular'>Destination: </span>{truncateString(ride.dst, 100)}</p>
            <p style={{fontSize: "15px"}}><span className='kanit-regular'>Departure Date & Time: </span>{ride.dateOfDeparture}, {ride.departureTime}</p>     
        </div>
    );
};

export default RideCard;
