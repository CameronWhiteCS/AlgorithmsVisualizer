import Heap from 'classes/Heap';

/**
 * Generates a random list. Not guaranteed to be unsorted, but probably that it is unsorted is high. 
 * @param {*} [numElements=40] size of the newly generated unsorted list
 * @param {*} [maxSize=20] the maximum value of an element in the unsorted list
 * @returns {Array<number>} 
 */
const getUnsortedList = (numElements = 40, maxSize = 100) => {
    const output = [];
    for (let i = 0; i < numElements; i++) {
        output[i] = Math.floor((maxSize + 1) * Math.random());
    }
    return output;
}

/**
 * 
 * @param {*} input Unsorted list to be sorted
 * @param {*} [ascending=true] Should the list be sorted in ascending or descending order?
 * @returns {Array<Array<Number>>} List of increasingly sorted lists
 */
const bubbleSort = (input, ascending = true) => {

    /**
     * Performs one iteration of bubble sort.
     * Returns true if the list is sorted, false otherwise.
     * Mutates the input!
     */
    const sortOneIteration = (list) => {
        let output = true;
        for (let i = 0; i < list.length - 1; i++) {
            if ((ascending && list[i] > list[i + 1]) || (!ascending && list[i] < list[i + 1])) {
                const temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
                output = false;
                break;
            }
        }
        return output;
    }

    const output = [input];

    let sorted = false;

    while (sorted === false) {
        const nextIteration = [...output[output.length - 1]];
        sorted = sortOneIteration(nextIteration);
        if (!sorted) output.push(nextIteration);
    }

    return output;

}

/**
 * Internal variant of the merge sort algorithm used by the mergeSort fuction. This function is not exported as it does not use the same parameters as the other sorting algorithms.
 * @param {*} input 
 * @param {*} ascending 
 * @param {*} minIndex 
 * @param {*} maxIndex 
 * @param {*} iterations 
 * @returns 
 */
const internalMergeSort = (input, ascending = true, minIndex = undefined, maxIndex = undefined, iterations = []) => {

    if (minIndex === undefined) minIndex = 0;
    if (maxIndex === undefined) maxIndex = input.length - 1;

    if (minIndex === maxIndex) {
        return input;
    }

    let partitionIndex = Math.floor((minIndex + maxIndex) / 2); //If index >= partition index, it's part of the left half. 

    input = internalMergeSort(input, ascending, minIndex, partitionIndex, iterations);
    input = internalMergeSort(input, ascending, partitionIndex + 1, maxIndex, iterations);

    let leftPointer = minIndex;
    let rightPointer = partitionIndex + 1;

    while (leftPointer <= partitionIndex && rightPointer <= maxIndex) {

        if ((input[leftPointer] <= input[rightPointer] && ascending) || (input[leftPointer] >= input[rightPointer] && !ascending)) {
            leftPointer++;
        } else {
            let val = input[rightPointer];
            input.splice(leftPointer, 0, val);
            input.splice(rightPointer + 1, 1);
            iterations.push([...input]);
            leftPointer++;
            rightPointer++;
            partitionIndex++;
        }

    }

    return input;

};


/**
 * 
 * @param {*} input 
 * @param {*} [ascending=true]  
 * @returns 
 */

const mergeSort = (input, ascending = true) => {
    const output = [];
    internalMergeSort(input, ascending, undefined, undefined, output);
    return output;
}



/**
 * 
 * @param {*} input 
 * @param {*} [ascending=true]  
 * @returns 
 */
const heapSort = (input, ascending = true) => {
    let heap = new Heap(input, ascending);
    heap.sort();
    return [input, ...heap.iterations];
}

const bogoSort = (input, ascending = true) => {

    const output = [input];
    let attempts = 0;

    const shuffleArray = (array) => {
        let curId = array.length;
        while (0 !== curId) {
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    }

    const isOrdered = (input) => {
        for (let i = 0; i < input.length - 1; i++) {
            if ((ascending && input[i + 1] < input[i]) || !ascending && input[i + 1] > input[i]) {
                return false;
            }
        }
        return true;
    }

    while (!isOrdered(output[output.length - 1])) {
        if (attempts > 5000) {
            alert('Bogosort was not able to order the list after more than 5000 attempts. While this isn\'t surprising, the algorithm will now terminate to prevent the web page from crashing. If you want to see Bogosort succeed, try to sort only 5 items.');
            return [[...input]];
        }
        const nextIteration = shuffleArray([...output[output.length - 1]]);
        output.push(nextIteration);
        attempts++;
    }

    return output;

}

export { bubbleSort, mergeSort, heapSort, bogoSort, getUnsortedList }