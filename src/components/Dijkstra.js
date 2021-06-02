import PathfindingAlgorithm from 'components/PathfindingAlgorithm';

import { dijkstra } from 'pathfindingAlgorithms';
import { Link } from 'react-router-dom';

const Dijkstra = () => {

    return (
        <>
            <h1>Dijkstra's Algorithm</h1>
            <p>
                <b>Dijkstra'a algorithm</b> (alternatively <b>Dijkstra'a shortest path algorithm</b>) is a pathfinding algorithm invented by the Dutch computer scientist Edgar Dijkstra. For a given graph whose edges have non-negative weights, the algorithm finds the shortest path between a start vertex and all other verticies.
            </p>
            <p>
                Dijkstra's algorithm is the foundation for the <Link to="/astar">A* pathfinding algorithm</Link>.
            </p>
            <h2>Dijkstra's Algorithm Description</h2>
            <ol>
                <li>Create a table with entries for earch vertex in the graph. Each row should contain the distance from the source vertex and the previous vertex used to access the row's associated vertex.</li>
                <li>Set the distance from the source vertex to infinity for all rows, except the row for the source vertex which has its distance value set to 0. The previous vertex for each row can be left unititialized, or set to null/undefined. </li>
                <li>Partition the verticies in the graph into two sets: explored and unexplored. Place the initial vertex into the exlored partition. </li>
                <li>While there are still verticies in the unexplored partition, </li>
                <ol>
                    <li>Visit the unexplored vertex closest to the source vertex that is also accessible.</li>
                    <li>Mark this vertex as visited, calculate its distance from the source, and set its previous vertex equal to the vertex used to access it. </li>
                </ol>
                <li>Using the table, construct a path from the source vertex to the destination. </li>

            </ol>
            <PathfindingAlgorithm name="Dijkstra's Algorithm" algorithm={dijkstra} />
        </>
    );

}

export default Dijkstra;