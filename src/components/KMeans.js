import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import Point from 'classes/Point';
import KMeansCanvas from './KMeansCanvas';

const KMeans = () => {

    const WIDTH = 60;
    const HEIGHT = 60;
    const SCALE_FACTOR = 15;

    const [iterations, setIterations] = useState([{
        representatives: [],
        points: []
    }]);

    const [animating, setAnimating] = useState(false);
    const [tick, setTick] = useState(1);
    const [page, setPage] = useState(0);


    const formik = useFormik({
        initialValues: {
            numPoints: 500,
            clusters: 10,
            animationDelay: 500
        },
        onSubmit: (values) => {
            if (iterations.length > 1) {
                initialize();
            }
            setTimeout(() => {
                setAnimating(true);
            }, formik.values.animationDelay)

        }
    });

    /**
     * Generates n random points within the bounding box defined by width and height
     * @param {*} n 
     * @param {*} width 
     * @param {*} height 
     * @returns 
     */
    const generatePoints = (n, width = WIDTH, height = HEIGHT) => {
        let output = [];
        for (let i = 0; i < n; i++) {
            const x = width * Math.random();
            const y = height * Math.random();
            output.push(new Point(x, y));

        }
        return output;
    }

    /**
     * Input: Array<Point>
     *
     * @returns {Array<Point>} The input array with the .representative property added to each element.
     */
    const assignRepresentatives = (points, representatives) => {
        const output = [];

        points.forEach((point) => {
            output.push({ ...point, representative: undefined }); //TODO: This fixed the problem but why? Try to find a better solution other than
            //resetting the representative field.
        })

        output.forEach((point) => {
            representatives.forEach((representative) => {
                if (point.representative === undefined) {
                    point.representative = representative;
                } else if (point.distance(representative) < point.distance(point.representative)) {
                    point.representative = representative;
                }
            });
        });

        return output;
    }

    /**
     * Figures out where the new representatives should be based on current clustering.
     * @returns The updated representatives array 
     * @param {Array<Point>} points 
     * @param {Array<Point>} representatives 
     */
    const moveRepresentatives = (points, representatives) => {

        const output = [];
        representatives.forEach((rep) => {
            output.push({ ...rep });
        });

        const groupings = {};

        points.forEach((point) => {
            if (groupings[point.representative.id] === undefined) {
                groupings[point.representative.id] = [];
            }
            groupings[point.representative.id].push(point);
        });

        const averages = {};

        Object.keys(groupings).forEach((key) => {
            const pts = groupings[key];
            let averageX = 0;
            let averageY = 0;
            pts.forEach((pt) => {
                averageX += pt.x;
                averageY += pt.y;
            });
            averageX /= pts.length;
            averageY /= pts.length;
            averages[key] = {
                x: averageX,
                y: averageY
            };
        });

        output.forEach((representative) => {
            if (representative.id in averages) { //Check necessary for when a representative has no members. :(
                representative.x = averages[representative.id].x;
                representative.y = averages[representative.id].y;
            }
        })

        console.log(points.length + ' ' + output.length);

        return output;
    }

    /**
     * Initializes the state of the algorithm. Can be used to reset the state. 
     */
    const initialize = () => {

        let points = generatePoints(formik.values.numPoints);
        const representatives = generatePoints(formik.values.clusters);
        points = assignRepresentatives(points, representatives);

        const colors = ['#AA0000', '#FF5555', '#FFAA00', '#FFFF55', '#00AA00', '#55FF55', '#55FFFF', '#00AAAA', '#0000AA', '#5555FF', '#FF55FF', '#AA00AA'];

        representatives.forEach((rep, index) => {
            rep.color = colors[index % colors.length];
        });

        setPage(0);
        setIterations([{ points: points, representatives: representatives, error: calculateError(points, representatives) }]);
        setTick(0);
        setAnimating(false);
    }

    /**
     * Calculates the K-Means error hueristic
     * @param {*} points 
     * @param {*} representatives 
     * @returns 
     */
    const calculateError = (points, representatives) => {
        let output = 0;

        points.forEach((point) => {
            output += point.distance(point.representative);
        });

        return output;
    }

    /**
     * Plays the K-Means algorithm animation by updating the algorithm state every N frames.
     */
    const playAnimation = () => {

        if (animating) {
            const previousIteration = iterations[iterations.length - 1];
            const newRepresentatives = moveRepresentatives(previousIteration.points, previousIteration.representatives);
            const newPoints = assignRepresentatives(previousIteration.points, newRepresentatives);

            const newError = calculateError(newPoints, newRepresentatives);


            if (newError >= previousIteration.error) {
                setAnimating(false);
            } else {

                iterations.push({
                    representatives: newRepresentatives,
                    points: newPoints,
                    error: newError
                });

                setPage(page + 1);
                
                setTimeout(() => {
                    setTick(tick + 1);
                }, formik.values.animationDelay);

            }


        }
    }

    useEffect(initialize, [formik.values.numPoints, formik.values.clusters]);
    useEffect(playAnimation, [animating, tick])

    return (


        <>
            <h1>K-Means</h1>
            <p>
                K-Means is a <a href="https://developers.google.com/machine-learning/clustering/clustering-algorithms">data clustering algorithm</a> widely used in machine learning. Simply put, clustering algorithms attempt to take an input data set and divide its elements into clusters whose members are similar in some way. What exactly determines similarity is application specific, but in this demonstration it means geometric proximity.
            </p>
            <h2>K-Means Algorithm Description</h2>
            <p>
                <ol>
                    <li>Generate (or load) the data set to be clustered.</li>
                    <li>Randomly generate <b>N</b> group representatives (there are algorithms for creating initial representatives, but random generation works decently well). </li>
                    <li>Calculate the total error of the clusterings. In this case, the error is the sum of distances of points from their group representatives. </li>
                    <li>Relocate the group representatives to the average location of their associated points. </li>
                    <li>After the representatives have moved, assign each point to the new closest representative.</li>
                    <li>Repeat steps 3 - 5 until the error stops decreasing.</li>
                    <li>Repeat steps 1 - 6 <b>M</b> times on the same data set and choose the clustering with the lowest error (in this demonstration, <b>M</b> = 1). </li>
                </ol>
            </p>


            <Form onSubmit={formik.handleSubmit} >

                <fieldset>
                    <legend>K-Means Parameters</legend>
                    <Form.Group>
                        <Form.Label htmlFor="numPoints">
                            Number of points
                        </Form.Label>
                        <select name="numPoints" defaultValue={500} className="form form-control" onChange={formik.handleChange}>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="clusters">
                            Number of clusters
                        </Form.Label>
                        <select name="clusters" defaultValue={10} className="form form-control" onChange={formik.handleChange}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="animationDelay">
                            Animation delay (ms)
                        </Form.Label>
                        <select name="animationDelay" defaultValue={500} className="form form-control" onChange={formik.handleChange}>
                            <option value="0">0</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="2500">2500</option>
                            <option value="5000">5000</option>
                        </select>
                    </Form.Group>
                </fieldset>
                <br />
                <Button type="submit" disabled={Object.keys(formik.errors).length > 0 || animating}>{iterations.length === 1 ? "Visualize" : "New visualization"}</Button>
            </Form>
            <br />
            <Button variant={"secondary"} disabled={animating || page <= 0} onClick={() => { setPage(page - 1) }}>Previous iteration</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant={"secondary"} disabled={animating || page >= iterations.length - 1} onClick={() => { setPage(page + 1); }}>Next Iteration</Button>
            <hr />
            <p>Iteration: {iterations.length > 0 ? page : 'Click \'visualize\' to start.'} &nbsp; Error: {iterations[page].error}</p>
            <KMeansCanvas iterations={iterations} page={page} width={WIDTH} height={HEIGHT} scaleFactor={SCALE_FACTOR} />

        </>

    );

}

export default KMeans;