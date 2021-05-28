import PathfindingAlgorithm from 'components/PathfindingAlgorithm';

import { dijkstra } from 'pathfindingAlgorithms';

const Dijkstra = () => {

    return (
        <>
            <h1>Dijkstra's Algorithm</h1>
            
            <PathfindingAlgorithm name="Dijkstra's Algorithm" algorithm={dijkstra} />
        </>
    );

}

export default Dijkstra;