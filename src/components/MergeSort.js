import SortingAlgorithm from 'components/SortingAlgorithm';

import { mergeSort } from 'sortingAlgorithms';

const MergeSort = () => {

    return (
        <>

            <h1>
                Merge Sort
            </h1>
            <p>
                Merge sort is a divide and conquer sorting algorithm notable for its worst case O(N * log(N)) time compleixty. It is typically implemented recursively, but as with all recursive algorithms, it can be implemented iteratively. 
            </p>
            <h2>
               Merge Sort Description
            </h2>
            <ol>
                <li>Iterate through an unsorted list and switch the position of any two adjacent items that are in the incorrect order.</li>
                <li>Repeat step 1 until it results in 0 elements having their positions changed. At this point, the list is sorted.</li>
            </ol>

            <SortingAlgorithm name="Merge Sort" sort={mergeSort} />
        </>
    );

}

export default MergeSort;