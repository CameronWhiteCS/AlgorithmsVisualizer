import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';



const Home = () => {

    const history = useHistory();

    const onClick = () => {
        const algorithms = ['bubble', 'heap', 'merge', 'bogo', 'dijkstra', 'astar', 'kmeans'];
        history.push('/' + algorithms[Math.floor(Math.random() * algorithms.length)]);
    };

    return (
        <>
            <h1>Algorithms Visualizer</h1>

            <hr />
            <div id="landing-container">
                <div style={{ flex: 1 }}>
                    <img src="https://i.imgur.com/9XN84Pp.png" alt="A* pathfinding algorithm" hover="A* pathfinding algorithm" style={{ width: '100%' }} />

                </div>
                <div style={{ flex: 1 }}>
                    <p>Hello, and welcome to my algorithms visualization tool!</p>
                    <p>The goal of this project is to make some commonly used algorithms easy to understand in a visual and interactive way. A brief technical description is also included with each demonstration. </p>
                    <p>For those interested, this tool was created with React and the soure code <a href="https://github.com/CameronWhiteCS/AlgorithmsVisualizer">is available on GitHub.</a></p>
                    <Button variant="primary" onClick={onClick}>Random Algorithm</Button>
                </div>
            </div>
        </>
    );
}

export default Home;