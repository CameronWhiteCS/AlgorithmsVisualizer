import PathfindingAlgorithm from 'components/PathfindingAlgorithm';

import { aStar } from 'pathfindingAlgorithms';

const AStar = () => {

    return (
        <>
            <h1>A* Pathfinding Algorithm</h1>
            <p>
                In Dijkstra's Algorithm, the next vertex to be visited is simply the unvisited vertex with the lowest cost.
                A* is an extension of Dijkstra's Algorithm where a heuristic function is introducted so that the next vertex can be selected more intelligently.
                In this implementation, the heuristic function is the Euclidian distance between an unvisited vertex and the destination vertex.
            </p>
            <p>
                The heuristic weight parameter specifies how strongly the algorithm should consider the heuristic function.
                The higher the value, the more "greedy" the A* algorithm becomes.
                If set to 0, A* becomes identical to Dijkstra's Algorithm. 
            </p>
            <PathfindingAlgorithm name="A*" algorithm={aStar} />
        </>
    );

}

export default AStar;