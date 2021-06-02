import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Info } from 'icon/info.svg';
import { FormCheck } from 'react-bootstrap';

const Navigation = (props) => {

    return (

        <nav id="navigation">

            <label id="navigation-checkbox-label" htmlFor="navigation-checkbox">☰</label>
            <input id="navigation-checkbox" type="checkbox" />


            <div id="navigation-links">
                <div className="navigation-category">
                    <Link to="/">Home</Link>
                </div>
                <div className="navigation-category">
                    Sorting
                    <ul>
                        <li><Link to="/bubble">Bubble Sort</Link></li>
                        <li><Link to="/heap">Heap Sort</Link></li>
                        <li><Link to="/merge">Merge Sort</Link></li>
                        <li><Link to="/bogo">BogoSort</Link></li>
                    </ul>
                </div>

                <div className="navigation-category">
                    Pathfinding
                    <ul>
                        <li><Link to="/dijkstra">Dijkstra</Link></li>
                        <li><Link to="/astar">A*</Link></li>
                    </ul>
                </div>

                <div className="navigation-category">
                    Data Clustering
                    <ul>
                        <li><Link to="/kmeans">K-Means</Link></li>
                    </ul>
                </div>

            </div>




        </nav>

    )

}

export default Navigation;