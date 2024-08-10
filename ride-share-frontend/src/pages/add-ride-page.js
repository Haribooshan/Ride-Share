import AddRide from "../components/addRide";
import NavigationBar from "../components/Navbar";


function AddRidePage() {
  return (
    <>
        <NavigationBar/>
        <h5 className='kanit-regular text-center my-5'>Add the Ride Details</h5>
        <AddRide/> 
    </>
  );
}

export default AddRidePage;