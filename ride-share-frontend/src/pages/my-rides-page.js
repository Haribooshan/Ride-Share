import { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { getMyRides } from "../api/ride-api";
import RideCard from "../components/rideCard";

function MyRidesPage() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        getMyRides()
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

    return (
        <>
            <NavigationBar/>
            <h5 className='kanit-regular text-center my-5'>Rides added by you</h5>

            {(!rides.length) && (
                <div className="kanit-light text-center">
                    <h1>No Rides Found</h1>
                    <p>You don't have any active rides added yet. Start adding rides to see them here. Thank you!.</p>
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

export default MyRidesPage;