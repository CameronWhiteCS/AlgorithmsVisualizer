import { useEffect } from 'react';

/**
 * 
 * @param {Number} props.width Width of the visualization in tiles
 * @param {Number} props.height height of the visualization in tiles
 * @param {Number} props.scaleFactor scale factor of the canvas
 * @param {*} iterations 
 * @returns 
 */
const KMeansCanvas = (props) => {

    const renderBackground = () => {
        const canvas = document.getElementById('kmeans');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const renderPoints = () => {
        const canvas = document.getElementById('kmeans');
        const ctx = canvas.getContext('2d');

        props.iterations[props.page].points.forEach((point) => {
            ctx.fillStyle = '#000';
            ctx.fillRect(point.x * props.scaleFactor, point.y * props.scaleFactor, props.scaleFactor, props.scaleFactor);
        });

        props.iterations[props.page].representatives.forEach((representative) => {
            ctx.fillStyle = representative.color;
            ctx.fillRect(representative.x * props.scaleFactor, representative.y * props.scaleFactor, props.scaleFactor, props.scaleFactor);
        });
    }

    const renderLines = () => {

        const canvas = document.getElementById('kmeans');
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;

        props.iterations[props.page].points.forEach((point) => {
            ctx.strokeStyle = '#000';
            ctx.beginPath()
            ctx.moveTo(point.x * props.scaleFactor + props.scaleFactor / 2, point.y * props.scaleFactor + props.scaleFactor / 2);
            ctx.lineTo(point.representative.x * props.scaleFactor + props.scaleFactor / 2, point.representative.y * props.scaleFactor + props.scaleFactor / 2);
            ctx.stroke();
        });

    }

    /**
     * Paints the current state of the algorithm to the screen.
     * Does **not** perform state updates.
     */
    const render = () => {
        const canvas = document.getElementById('kmeans');
        if (canvas != null) {
            renderBackground();
            renderLines();
            renderPoints();
        }
    }

    useEffect(() => {
        window.requestAnimationFrame(render);
    });

    return (
        <canvas width={(props.width + 1) * props.scaleFactor} height={(props.width + 1) * props.scaleFactor} id="kmeans" />
    )

}

export default KMeansCanvas;