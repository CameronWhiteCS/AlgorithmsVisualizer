import SortingAlgorithm from 'components/SortingAlgorithm';

import { bubbleSort } from 'sortingAlgorithms';

const BubbleSort = () => {

    return (
        <>

            <h1>
                Bubble Sort
            </h1>
            <p>
                Bubble sort is a toy sorting algorithm. It's not particularly efficient with a worst case time complexity of O(N<sup>2</sup>), and its primary purpose is to be taught to computer science undergrads. Despite this, its one redeeming quality is that it's extremely easy to implement, making it a suitable choice for sorting lists of a known, small size.
            </p>
            <h2>
                Bubble Sort Description
            </h2>
            <ol>
                <li>Iterate through an unsorted list and switch the position of any two adjacent items that are in the incorrect order.</li>
                <li>Repeat step 1 until it results in 0 elements having their positions changed. At this point, the list is sorted.</li>
            </ol>

            <SortingAlgorithm name="Bubble Sort" sort={bubbleSort} />
        </>
    );

}

export default BubbleSort;