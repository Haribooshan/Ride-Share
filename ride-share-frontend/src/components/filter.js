import { Button, Modal } from "react-bootstrap";
import AutocompleteInput from "./autocomplete";
import { useEffect } from "react";

const FilterModal = ({isFilter, handleFilterModalClose, srcFilter, srcRadius, dstFilter, dstRadius, dateOfDepartureFilter, 
    departureTimeFilter, setSrcFilter, setDstFilter, setSrcRadius, setDstRadius, setDateOfDepartureFilter, setDepartureTimeFilter, 
    handleSave, message, setMessage
}) => {

    useEffect(() => {
        if(srcFilter === '') {
            setSrcRadius(500);
        }
        if(dstFilter === '') {
            setDstRadius(500);
        }
        if(dateOfDepartureFilter === '') {
            setDepartureTimeFilter('');
        }
    // eslint-disable-next-line
    }, [srcFilter, dstFilter, dateOfDepartureFilter]);

    const handleClear = () => {
        setSrcFilter(''); 
        setDstFilter('');
        setDateOfDepartureFilter('');
        setMessage('');
    }

    return (
        <Modal show={isFilter} onHide={handleFilterModalClose} className='kanit-light' size="xl">
            <Modal.Header closeButton className='mb-2'>
                <h4>Add Filters</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="row mb-3 d-flex align-items-center">
                    <label htmlFor="src-filter" className="col-sm-2 col-form-label">Start Location:</label>
                    <div className="col-sm-5 position-relative">
                        <AutocompleteInput id="src-filter" value={srcFilter} onChange={setSrcFilter} isFilter={isFilter}/>
                    </div>
                    <label htmlFor="src-rad-filter" className="col-sm-2 col-form-label">Search Radius:</label>
                    <div className="col-sm-3">
                        <div className="input-group">
                            <input type="number" id="src-rad-filter" className="form-control" value={srcRadius} min={0}
                            onChange={(e) => setSrcRadius(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required
                            disabled = {(srcFilter === '')}/>
                            <span className="input-group-text" style={{fontSize: "15px", height: "1.75rem"}}>meters</span>
                        </div>
                    </div>
                </div>
                <div className="row mb-3 d-flex align-items-center">
                    <label htmlFor="dst-filter" className="col-sm-2 col-form-label">End Location:</label>
                    <div className="col-sm-5 position-relative">
                        <AutocompleteInput id="dst-filter" value={dstFilter} onChange={setDstFilter} isFilter={isFilter}/>
                    </div>
                    <label htmlFor="dst-rad-filter" className="col-sm-2 col-form-label">Search Radius:</label>
                    <div className="col-sm-3">
                        <div className="input-group">
                            <input type="number" id="dst-rad-filter" className="form-control" value={dstRadius} min={0}
                            onChange={(e) => setDstRadius(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required
                            disabled = {(dstFilter === '')}/>
                            <span className="input-group-text" style={{fontSize: "15px", height: "1.75rem"}}>meters</span>
                        </div>
                    </div>
                </div>
                <div className="row mb-3 d-flex align-items-center">
                    <label htmlFor="date-filter" className="col-sm-2 col-form-label">Date of Departure:</label>
                    <div className="col-sm-4">
                        <input type="date" id="date-filter" className="form-control" value={dateOfDepartureFilter} 
                        onChange={(e) => setDateOfDepartureFilter(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required/>
                    </div>
                    <label htmlFor="time-filter" className="col-sm-2 col-form-label">Time of Departure:</label>
                    <div className="col-sm-4">
                        <input type="time" id="time-filter" className="form-control" value={departureTimeFilter} 
                        onChange={(e) => setDepartureTimeFilter(e.target.value)} style={{fontSize: "15px", height: "1.75rem"}} required
                        disabled = {(dateOfDepartureFilter === '')}/>
                    </div>
                </div>
                <div style={{color: "#dc3545"}} className="kanit-light text-center">{message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClear}>
                    Clear
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>           
    )
}

export default FilterModal;