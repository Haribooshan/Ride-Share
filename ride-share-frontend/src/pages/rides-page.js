import { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { getAllRides, getFilteredRides } from "../api/ride-api";
import RideCard from "../components/rideCard";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../components/filter";
import { LuArrowUpDown } from "react-icons/lu";
import SortModal from "../components/sort";
import moment from 'moment-timezone';

function RidesPage() {
    const [rides, setRides] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [srcFilter, setSrcFilter] = useState('');
    const [srcRadius, setSrcRadius] = useState(500);
    const [dstFilter, setDstFilter] = useState('');
    const [dstRadius, setDstRadius] = useState(500);
    const [dateOfDepartureFilter, setDateOfDepartureFilter] = useState('');
    const [departureTimeFilter, setDepartureTimeFilter] = useState('');
    const [message, setMessage] = useState("");
    const [isSort, setIsSort] = useState(false);
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        getAllRides()
        .then(res=>{
            setRides(res.data);
        })
        .catch(err=>{
            if (err.response.data.message === 'Token provided is invalid or expired.') {
                localStorage.clear();
                window.location.href = "/";
            }
        })
    }, []);

    const handleFilterModalClose = () => {
        setIsFilter(false);
    }

    const handleSortModalClose = () => {
        setIsSort(false);
    }

    const handleFilterSave = () => {
        const filterDetails = {srcFilter, srcRadius, dstFilter, dstRadius, dateOfDepartureFilter, departureTimeFilter};
        console.log(filterDetails);
        getFilteredRides(filterDetails)
        .then((res)=>{
            setRides(res.data);
            setMessage('');
            handleFilterModalClose();
        })
        .catch((err)=>{
            if (err.response.data.message === 'Token provided is invalid or expired.') {
                localStorage.clear();
                window.location.href = "/";
            }
            setMessage(err.response.data.message);
        })
    }

    const handleSortSave = () => {
        const sorted = [...rides].sort((a, b) => {
            const now = moment().tz('Asia/Kolkata');
            const departureA = moment(`${a.dateOfDeparture} ${a.departureTime}`);
            const departureB = moment(`${b.dateOfDeparture} ${b.departureTime}`);
            const timeLeftA = departureA.diff(now);
            const timeLeftB = departureB.diff(now);

            if (sortOrder === 'lowToHigh') {
                return timeLeftA - timeLeftB;
            } else {
                return timeLeftB - timeLeftA;
            }
        });

        setRides(sorted);
        handleSortModalClose();
    }


    return (
        <>
            <NavigationBar/>
            <div className="my-5 d-flex align-items-center">
                <h5 className='kanit-regular' style={{marginLeft: "44vw", marginRight: "30vw"}}>Find your Ideal Ride</h5>
                <h5 className="kanit-regular me-4" style={{cursor: "pointer"}} onClick={()=>{setIsSort(true)}}>
                    Sort <LuArrowUpDown size={"3vh"}/>  
                </h5>
                <h5 className="kanit-regular" style={{cursor: "pointer"}} onClick={()=>{setIsFilter(true)}}>
                    Filter <FaFilter size={"2.5vh"}/>  
                </h5>
            </div>

            <SortModal isSort={isSort} handleSortModalClose={handleSortModalClose}
            sortOrder={sortOrder} setSortOrder={setSortOrder} handleSave={handleSortSave}/>

            <FilterModal isFilter={isFilter} handleFilterModalClose={handleFilterModalClose} handleSave={handleFilterSave}
            srcFilter={srcFilter} srcRadius={srcRadius} dstFilter={dstFilter} dstRadius={dstRadius} 
            dateOfDepartureFilter={dateOfDepartureFilter} departureTimeFilter={departureTimeFilter}
            setSrcFilter={setSrcFilter} setDstFilter={setDstFilter} setSrcRadius={setSrcRadius} setDstRadius={setDstRadius}
            setDateOfDepartureFilter={setDateOfDepartureFilter} setDepartureTimeFilter={setDepartureTimeFilter}
            message={message} setMessage={setMessage}/>
            
            {(!rides.length) && (
                <div className="kanit-light text-center">
                    <h1>No Rides Available</h1>
                    <p>We're sorry. Please check back later or try adjusting your search criteria
                        or add your own ride. Thank you!.</p>
                </div>
            )}

            <div className="d-flex flex-wrap justify-content-evenly">
                {rides.map((ride) => (
                    <RideCard key={ride._id} ride={ride} />
                ))}
            </div>
        </>
    );
}

export default RidesPage;