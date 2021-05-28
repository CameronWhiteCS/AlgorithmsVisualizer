import PathfindingAlgorithm from 'components/PathfindingAlgorithm';

import { aStar } from 'pathfindingAlgorithms';

const AStar = () => {

    return (
        <>
            <h1>A* Pathfinding Algorithm</h1>
            <p>
                In Dijkstra's algorithm, the next vertex to be visited is simply the unvisited vertex closest to the source.
                A* is an extension of Dijkstra's algorithm where a heuristic function is introducted so that the next vertex can be selected more intelligently.
                In this implementation, the heuristic function is the Euclidian distance between an unvisited vertex and the destination vertex.
            </p>
            <PathfindingAlgorithm name="A*" algorithm={aStar} />
        </>
    );

}

export default AStar;