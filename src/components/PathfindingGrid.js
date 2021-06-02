import { useState, useEffect } from 'react';

const getTileCoordinates = (event, tileSize) => {
    const pathfindingCanvas = document.getElementById('pathfindingCanvas');
    const rect = pathfindingCanvas.getBoundingClientRect();

    const widthScaleFactor =  pathfindingCanvas.width / pathfindingCanvas.clientWidth;
    const heightScaleFactor = pathfindingCanvas.height / pathfindingCanvas.clientHeight;

    console.log(widthScaleFactor + ' ' + heightScaleFactor);

    const x = Math.floor((event.clientX - rect.left) / tileSize * widthScaleFactor) ;
    const y = Math.floor((event.clientY - rect.top)  / tileSize * heightScaleFactor) ;

    return [x, y];
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
 * @param {Grid} props.grid Grid being rendered
 */
const PathfindingGrid = (props) => {


    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => renderCanvas(props.iterations[props.page], props.tileSize));

    return (
        <div id="pathfindingCanvasContainer">
            <canvas
                width={props.iterations[props.page].width * props.tileSize}
                height={props.iterations[props.page].height * props.tileSize}
                id="pathfindingCanvas"
                style={{ margin: '0 auto', display: 'block', maxWidth: '100%'}}
                onMouseDown={(e) => {
                    setMouseDown(true)
                    if (props.iterations.length === 1) {
                        const [x, y] = getTileCoordinates(e, props.tileSize);
                        props.iterations[props.page].getTile(x, y).setState(props.editMode);

                    }
                    renderCanvas(props.iterations[props.page], props.tileSize);
                }}
                onMouseUp={(e) => {
                    setMouseDown(false);
                    renderCanvas(props.iterations[props.page], props.tileSize);
                }}
                onMouseMove={(e) => {
                    const [x, y] = getTileCoordinates(e, props.tileSize);
                    if (props.iterations.length === 1 && mouseDown) {
                        props.iterations[props.page].setTileState(x, y, props.editMode);
                    }
                    renderCanvas(props.iterations[props.page], props.tileSize);
                }}
            />
        </div>
    );

}

export default PathfindingGrid;