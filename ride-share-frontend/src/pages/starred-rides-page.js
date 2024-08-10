import { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { getStarredRides } from "../api/ride-api";
import RideCard from "../components/rideCard";

function StarredRidesPage() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        getStarredRides()
        .then(res=>{
            setRides(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }, []);

    return (
        <>
            <NavigationBar/>
            <h5 className='kanit-regular text-center my-5'>Rides starred by you</h5>

            {(!rides.length) && (
                <div className="kanit-light text-center">
                    <h1>No Starred Rides</h1>
                    <p>You haven’t starred any rides yet. Browse through available rides and mark your favorites to see them here. Thank you!.</p>
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

export default StarredRidesPage;