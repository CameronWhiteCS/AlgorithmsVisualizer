import SortingAlgorithm from 'components/SortingAlgorithm';

import { bogoSort } from 'sortingAlgorithms';

const BogoSort = () => {

    return (
        <>

            <h1>
                BogoSort
            </h1>
            <p>
               Bogosort is a humorous sorting algorithm described below. In the worst case, BogoSort never terminates. 
            </p>
            <h2>
                BogoSort Description
            </h2>
            <ol>
                <li>Take an unsorted list and put it into a random order. </li>
                <li>Check if the list is in order. If it is, terminate the algorithm.</li>
                <li>Repeat steps 1 and 2 until the list is sorted.</li>
            </ol>

            <SortingAlgorithm name="BogoSort" sort={bogoSort} />
        </>
    );

}

export default BogoSort;