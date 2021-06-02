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
                <li>Continuously partition the unsorted array into halves (and those halves into halves) until only partitions of size 1 remain.</li>
                <li>Merge neighboring partitions into sorted partitions. The order of the merges is determined by the position of the partitions on the call stack.</li>
                <ul>
                    <li>Merging two partitions is done by using two pointers, each one tracking the location of the next item in its associated partition that needs to be merged. Whether or not the list is being sorted in ascending or descending order determines which of two elements identified by the pointers is moved into the sorted segment of the new partition. After moving an element into the sorted segment of the new partition, the associated pointer is moved one element forward..</li>
                </ul>

            </ol>

            <SortingAlgorithm name="Merge Sort" sort={mergeSort} />
        </>
    );

}

export default MergeSort;