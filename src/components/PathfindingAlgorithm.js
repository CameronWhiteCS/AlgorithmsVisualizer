import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import Grid from 'classes/Grid.js';

const buttonStyle = {
    width: '150px',
    marginRight: '10px'
}

const onResize = (grid, setTileSize) => {
    let size = Math.min(document.body.offsetWidth / (2 * grid.width), document.body.offsetHeight / (2 * grid.height));
    //setTileSize(size);
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
            
            if(north?.state != 'empty' && west?.state != 'empty') {
                tile.setState('empty');
            } else if (north?.state === 'empty' && west?.state !== 'empty') {
                grid.getTile(tile.x, tile.y - 1).setState('empty');
            } else if (north?.state !== 'empty' && west?.state === 'empty') {
                grid.getTile(tile.x - 1, tile.y).setState('empty');
            } else if(north?.state === 'empty' && west?.state === 'empty') {
                let north = false;
                if(Math.floor(Math.random() * 2) == 1) {
                    north = !north;
                }
                if(north) {
                    grid.getTile(tile.x, tile.y - 1).setState('empty');
                } else {
                    grid.getTile(tile.x - 1, tile.y).setState('empty');
                }
            }

        }
    }

}

const wipeBoard = (grid, setIterations) => {
    for(let x = 0; x < grid.width; x++) {
        for(let y = 0; y < grid.height; y++) {
            const tile = grid.getTile(x, y);
            if(tile.state === 'wall') tile.setState('empty');
        }
    }
    setIterations([grid]);
}

const renderCanvas = (grid, tileSize) => {
    const canvas = document.getElementById('pathfindingCanvas');
    if (canvas == null) return;
    const ctx = canvas.getContext('2d');

    //background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            const tile = grid.getTile(x, y);
            ctx.fillStyle = tile.getColor();
            ctx.fillRect(x * tileSize + 1, y * tileSize + 1, tileSize - 1, tileSize - 1);
        }
    }
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
    const [mouseDown, setMouseDown] = useState(false);

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

    const getTileCoordinates = (event) => {
        const pathfindingCanvas = document.getElementById('pathfindingCanvas');
        const rect = pathfindingCanvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / tileSize);
        const y = Math.floor((event.clientY - rect.top) / tileSize);
        return [x, y];
    }

    const pathfind = () => {

        if (iterations[0].source === null || iterations[0].destination === null) {
            alert('You need both a source and a destination to perform a pathfinding algorithm.');
            return;
        }

        const newIterations = props.algorithm(iterations[0], formik.values.showAnimation, formik.values.heuristicWeight);
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

    }

    useEffect(initialize, []);
    useEffect(() => renderCanvas(iterations[page], tileSize));
    useEffect(() => {
        window.onresize = () => onResize(iterations[page], setTileSize);
    }, []);
    useEffect(() => onResize(iterations[page], setTileSize), []);


    return (
        <>
            <h2>{props.name} Parameters</h2>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="editMode">
                        Edit mode
                    </Form.Label>
                    <select name="editMode" onChange={formik.handleChange} className="form form-control">
                        <option value="wall">Wall</option>
                        <option value="empty">Erase</option>
                        <option value="source">Source</option>
                        <option value="destination">Destination</option>
                    </select>
                </Form.Group>
                <Form.Group>
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
                <Form.Group>
                    <Form.Label>
                        Heuristic weight
                    </Form.Label>
                    <select name="heuristicWeight" defaultValue={100} onChange={formik.handleChange} className="form form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="100">100</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Show detailed animation? (Can be slow for more complex paths)
                    </Form.Label>
                    <select name="showAnimation" defaultValue={"true"} className="form form-control" onChange={(e) => { formik.setFieldValue('showAnimation', !formik.values.showAnimation) }}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </Form.Group>
                <br />

            </Form>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <Button disabled={iterations.length > 1 || animating} style={buttonStyle} type="submit" onClick={pathfind}>
                    Find Path
                </Button>

                <Button disabled={page === 0 || animating} style={buttonStyle} variant="secondary" onClick={() => setPage(page - 1)}>
                    Previous Step
                </Button>

                <Button disabled={page >= (iterations.length - 1) || animating} style={buttonStyle} variant="secondary" onClick={() => setPage(page + 1)}>
                    Next Step
                </Button>

                <Button disabled={animating} style={buttonStyle} variant="danger" onClick={initialize}>
                    New Maze
                </Button>

                <Button disabled={animating || iterations.length > 1} style={buttonStyle} variant="danger" onClick={() => wipeBoard(iterations[0], setIterations)}>
                    Wipe Grid
                </Button>

                <Button disabled={animating || iterations.length === 1} style={buttonStyle} variant="danger" onClick={() => {setPage(0); setIterations([iterations[0]])}}>
                    Reset State
                </Button>

            </div>

            <hr />

            <div id="pathfindingCanvasContainer">
                <canvas
                    width={iterations[page].width * tileSize}
                    height={iterations[page].height * tileSize}
                    id="pathfindingCanvas"
                    style={{ margin: '0 auto' }}
                    onMouseDown={(e) => {
                        setMouseDown(true)
                        if (iterations.length === 1) {
                            const [x, y] = getTileCoordinates(e);
                            iterations[page].getTile(x, y).setState(formik.values.editMode);

                        }
                        renderCanvas(iterations[page], tileSize);
                    }}
                    onMouseUp={(e) => {
                        setMouseDown(false);
                        renderCanvas(iterations[page], tileSize);
                    }}
                    onMouseMove={(e) => {
                        if (iterations.length === 1 && mouseDown) {
                            const [x, y] = getTileCoordinates(e);
                            iterations[page].setTileState(x, y, formik.values.editMode);

                        }
                        renderCanvas(iterations[page], tileSize);
                    }}
                />
            </div>
            <br />
        </>
    );

}

export default PathfindingAlgorithm;

