import { Modal, Button } from 'react-bootstrap';

/**
 * 
 * @param {Function} setShowHelp 
 * @returns 
 */
const PathfindingHelpModal = (props) => {
    return (
        <Modal show={props.show}>
            <Modal.Dialog >
                <Modal.Header>
                    <Modal.Title>Pathfinding Help</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>For the pathfinding algorithm demonstrations, you're able to edit the grid by selecting an option from the "edit mode" drop down.</p>
                    <p>When editing the grid, you can click and drag over multiple tiles at once -- no need to click each tile individually. </p>
                    <p>The algorithm will find the shortest path between the source (green) and the destination (red). Walls are colored black.</p>
                    <p>Squares the algorithm has explored are highlighted in dark blue. The shortest path is highlighted in purple. Unexplored tiles remain light blue.</p>
                    <p>Diagonal movement is allowed assuming this doesn't cause the algorithm to go through a wall.</p>
                
    
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShowHelp(false)}>Got it!</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default PathfindingHelpModal;