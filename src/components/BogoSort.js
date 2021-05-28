import SortingAlgorithm from 'components/SortingAlgorithm';

import { bogoSort } from 'sortingAlgorithms';

const BogoSort = () => {

    return (
        <>

            <h1>
                Bogosort
            </h1>
            <p>
               Bogosort is a humorous sorting algorithm described below.
            </p>
            <p>
                Time complexity: O(&infin;)
            </p>
            <h2>
                Bogosort Description
            </h2>
            <ol>
                <li>Take an unsorted list and put it into a random order. </li>
                <li>Check if the list is in order. If it is, terminate the algorithm.</li>
                <li>Repeat steps 1 and 2 until the list is sorted.</li>
            </ol>

            <SortingAlgorithm name="Bogosort" sort={bogoSort} />
        </>
    );

}

export default BogoSort;