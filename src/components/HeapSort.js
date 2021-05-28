import { heapSort } from 'sortingAlgorithms';
import SortingAlgorithm from 'components/SortingAlgorithm';

const HeapSort = () => {

    return (
        <>
            <h1>
                Heap Sort (In Place)
            </h1>
            <p>
               Heap sort is a sorting algorithm that exploits the properties of the <a href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/MIT6_006F11_lec04.pdf">heap data structure</a> (also known as a priority queue) to perform sorts in O(N * log(N)) time in the worst case. In this visualization, both the construction of the heap and the creation of a sorted list from said heap are shown. 
            </p>
            <h2>
                Heap Sort Description
            </h2>
            <ol>
                <li>Create a heap using an unsorted list.</li>
                <li>Repeatedly pop elements off the heap and place them into the sorted partition of the heap's array until the heap contains no more elements to be popped. The result is a sorted list.</li>
            </ol>

            <SortingAlgorithm name="Heap Sort" sort={heapSort} />
        </>
    );

}

export default HeapSort;