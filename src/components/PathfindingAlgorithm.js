import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import Grid from 'classes/Grid.js';
import PathfindingGrid from './PathfindingGrid';
import PathfindingHelpModal from './PathfindingHelpModal';

const formGroupStyle = {
    flex: '1',
    margin: '5px'
}

/**
 * "binary tree" maze generation -- highly unorthodox but surprisingly effective. 
 * Name seems to be a misnomer. Original source: https://hurna.io/academy/algorithms/maze_generator/binary.html
 * This implementation doesn't use a binary tree as it isn't needed.
 * */
const generateMaze = (grid) => {

    for (let y = 1; y < grid.width; y += 2) {
        for (let x = 1; x < grid.width; x += 2) {
            const tile = grid.getTile(x, y);
            tile.setState('empty');
            const north = grid.getTile(tile.x, tile.y - 2);
            const west = grid.getTile(tile.x - 2, tile.y);

            if (north?.state !== 'empty' && west?.state !== 'empty') {
                tile.setState('empty');
            } else if (north?.state === 'empty' && west?.state !== 'empty') {
                grid.getTile(tile.x, tile.y - 1).setState('empty');
            } else if (north?.state !== 'empty' && west?.state === 'empty') {
                grid.getTile(tile.x - 1, tile.y).setState('empty');
            } else if (north?.state === 'empty' && west?.state === 'empty') {
                let north = false;
                if (Math.floor(Math.random() * 2) === 1) {
                    north = !north;
                }
                if (north) {
                    grid.getTile(tile.x, tile.y - 1).setState('empty');
                } else {
                    grid.getTile(tile.x - 1, tile.y).setState('empty');
                }
            }

        }
    }

}

const eraseWalls = (grid, setIterations) => {
    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            const tile = grid.getTile(x, y);
            if (tile.state === 'wall') tile.setState('empty');
        }
    }
    setIterations([grid]);
}

/**
 * 
 * @param {Function} props.algorithm Pathfinding algorithm used
 * @param {String} props.name Name of algorithm
 * @returns 
 */
const PathfindingAlgorithm = (props) => {

    const [iterations, setIterations] = useState([new Grid(25, 25)]);
    const [page, setPage] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [tileSize, setTileSize] = useState(25);
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const formik = useFormik({
        initialValues: {
            editMode: "wall",
            animationDelay: 25,
            heuristicWeight: 100,
            showAnimation: true
        },
        onSubmit: () => {

        }
    });

    const initialize = () => {
        const newGrid = new Grid(25, 25);
        for (let x = 0; x < newGrid.width; x++) {
            for (let y = 0; y < newGrid.height; y++) {
                newGrid.setTileState(x, y, 'wall');
            }
        }
        generateMaze(newGrid);
        newGrid.getTile(1, 1).setState('source');
        newGrid.getTile(newGrid.width - 2, newGrid.height - 2).setState('destination');
        setIterations([newGrid]);
        setPage(0);

    }

    const pathfind = () => {

        if(formik.values.showAnimation) {
            setLoading(true);
        }

        setTimeout(() => {
            if (iterations[0].source === null || iterations[0].destination === null) {
                alert('You need both a source and a destination to perform a pathfinding algorithm.');
                return;
            }

            const newIterations = props.algorithm(iterations[0], formik.values.showAnimation, formik.values.heuristicWeight);
            setLoading(false);
            setIterations(newIterations);
            setAnimating(true);

            for (let i = 1; i < newIterations.length; i++) {
                setTimeout(() => {
                    setPage(i);
                }, i * formik.values.animationDelay);
            }

            setTimeout(() => {
                setAnimating(false);
            }, newIterations.length * formik.values.animationDelay);


        }, 0);

    }

    useEffect(initialize, []);

    return (
        <>
            <PathfindingHelpModal setShowHelp={setShowHelp} show={showHelp} />
            <Form style={{ display: 'fllex', flexDirection: 'column' }}>

                <fieldset>
                    <legend> {props.name} Parameters (<a href="#" onClick={() => setShowHelp(true)}>Help</a>)</legend>
                
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group style={formGroupStyle}>
                        <Form.Label htmlFor="editMode">
                            Edit mode
                    </Form.Label >
                        <select name="editMode" onChange={formik.handleChange} className="form form-control">
                            <option value="wall">Wall</option>
                            <option value="empty">Erase</option>
                            <option value="source">Source</option>
                            <option value="destination">Destination</option>
                        </select>
                    </Form.Group>

                    <Form.Group style={formGroupStyle}>
                        <Form.Label>Animation delay (ms)</Form.Label>
                        <select name="animationDelay" defaultValue={25} onChange={formik.handleChange} className="form form-control">
                            <option value="0">0</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </Form.Group>
                </div>

    

                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    {
                        !props.name.toLowerCase().includes("dijkstra")
                        &&
                        <Form.Group style={formGroupStyle}>
                            <Form.Label>
                                Heuristic weight
                        </Form.Label>
                            <select name="heuristicWeight" defaultValue={100} onChange={formik.handleChange} className="form form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="100">100</option>
                            </select>
                        </Form.Group>
                    }

                    <Form.Group style={formGroupStyle}>
                        <Form.Label>
                            Show detailed animation?
                    </Form.Label>
                        <select name="showAnimation" defaultValue={"true"} className="form form-control" onChange={(e) => { formik.setFieldValue('showAnimation', !formik.values.showAnimation) }}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </Form.Group>
                </div>

                <br />

                </fieldset>

            </Form>

            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyItems: 'space-between'}}>

                <Button disabled={iterations.length > 1 || animating || loading} className="pathfinding-button" type="submit" onClick={pathfind}>
                    Find path
                </Button>

                <Button disabled={page === 0 || animating || loading} className="pathfinding-button" variant="secondary" onClick={() => setPage(page - 1)}>
                    Previous step
                </Button>

                <Button disabled={page >= (iterations.length - 1) || animating || loading} className="pathfinding-button" variant="secondary" onClick={() => setPage(page + 1)}>
                    Next step
                </Button>

                <Button disabled={animating || loading} className="pathfinding-button" variant="danger" onClick={initialize}>
                    New maze
                </Button>

                <Button disabled={animating || iterations.length > 1 || loading} className="pathfinding-button" variant="danger" onClick={() => eraseWalls(iterations[0], setIterations)}>
                    Erase all walls
                </Button>

                <Button disabled={animating || iterations.length === 1 || loading} className="pathfinding-button" variant="danger" onClick={() => { setPage(0); setIterations([iterations[0]]) }}>
                    Reset
                </Button>

            </div>

            {
                loading && <p>Generating animation frames...</p>
            }

            <hr />

            <PathfindingGrid
                iterations={iterations}
                page={page}
                editMode={formik.values.editMode}
                tileSize={tileSize}
            />

            <br />
        </>
    );

}

export default PathfindingAlgorithm;

