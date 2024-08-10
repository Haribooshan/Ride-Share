import { Button, Modal } from "react-bootstrap";

const SortModal = ({isSort, handleSortModalClose, sortOrder, setSortOrder, handleSave}) => {

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    }

    const handleClear = () => {
        setSortOrder('');
    }

    return (
        <Modal show={isSort} onHide={handleSortModalClose} className='kanit-light' size="md">
            <Modal.Header closeButton className='mb-2'>
                <h4>Sort based on time left</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-evenly kanit-light">
                    <div>
                        <input type="radio" id="lowToHigh" name="sortOrder" value="lowToHigh" checked={sortOrder === 'lowToHigh'}
                            onChange={handleSortChange}/>
                        <label className='ms-2'>Low to High</label>
                    </div>
                    <div>
                        <input type="radio" id="highToLow" name="sortOrder" value="highToLow" checked={sortOrder === 'highToLow'}
                            onChange={handleSortChange}/>
                        <label className='ms-2'>High to Low</label>
                    </div>
                </div>
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

export default SortModal;