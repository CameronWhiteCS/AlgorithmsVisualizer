import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Info } from 'icon/info.svg';

const Navigation = (props) => {

    return (

        <nav id="navigation">

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
                        <li><Link to="/bogo">Bogo Sort</Link></li>
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


            <span id="navigation-help-icon">
                <Link to="/about">
                    <Info />
                </Link>
            </span>
        </nav>

    )

}

export default Navigation;