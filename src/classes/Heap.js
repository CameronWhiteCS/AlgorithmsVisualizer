/**
 * Array-based implementation of a heap. 
 */
class Heap {

    /**
     * @param {Array} elements optional initial elements used to construct to heap.
     * @param {Boolean} max Whether this heap is a max heap (true) or a min heap (false)
     */
    constructor(elements = [], max = false) {
        this.heapArray = [null];
        this.max = max;
        this.size = 0;
        this.partitionIndex = 0;
        this.iterations = [];
        elements.forEach((element) => {
            this.insert(element);
        });
    }

    /**
     * Mutates the heap array by swapping the value at index1 with the value at index2
     * @param {*} index1 
     * @param {*} index2 
     */
    swap = (index1, index2) => {
        const temp = this.heapArray[index1];
        this.heapArray[index1] = this.heapArray[index2];
        this.heapArray[index2] = temp;
        if(this.heapArray[index1] !== this.heapArray[index2]) {
            this.iterations.push([...this.heapArray]);
        }
    }

    /**
     * Trickles a value up the heap taking into account min/max heap and the value of the number at index
     * @param {*} index 
     */
    trickleUp = (index) => {

        while (
            (this.max === true && this.getParent(index) < this.heapArray[index] && this.getParent(index) !== null) ||
            (this.max === false && this.getParent(index) > this.heapArray[index] && this.getParent(index) !== null)
        ) {
            this.swap(index, Math.floor(index / 2));
            index = Math.floor(index / 2);
        }
    }

    /**
     * Trickles a value down the heap taking into account min/max heap. 
     * @param {Integer} [index=1] Node to trickle down
     */
    trickleDown = (index = 1) => {

        let left = this.getLeftChild(index);
        let right = this.getRightChild(index);

        while (
            (this.max === true && ((left > this.heapArray[index] && left !== undefined) || ((right > this.heapArray[index]) && right !== undefined))) ||
            (this.max === false && ((left < this.heapArray[index] && left !== undefined) || ((right < this.heapArray[index]) && right !== undefined)))
        ) {

            if (left === undefined && right !== undefined) {
                this.swap(index, index * 2 + 1);
                index = index * 2 + 1;
            } else if (right === undefined && left !== undefined) {
                this.swap(index, index * 2);
                index *= 2;
            } else {
                const larger = Math.max(left, right);
                const smaller = Math.min(left, right);

                if ((this.max === true && left === larger) || (this.max === false && left === smaller)) {
                    this.swap(index, index * 2);
                    index *= 2;
                } else if ((this.max === false && right === smaller) || (this.max === true && right === larger)) {
                    this.swap(index, index * 2 + 1);
                    index = index * 2 + 1;
                }


            }

            left = this.getLeftChild(index);
            right = this.getRightChild(index);
        }

    }

    /**
     * Inserts the input value into the heap
     * @param {*} value 
     */
    insert = (value) => {
        let index = this.size + 1;
        this.heapArray.splice(index, 0, value);
        this.trickleUp(index);
        this.size += 1;
        this.partitionIndex += 1;
        this.iterations.push([...this.heapArray]);
    }

    /**
     * Pops an element off the heap and then rebalances it
     * @returns The highest priority element in the heap
     */
    pop = () => {
        if (this.size === 0) return undefined;
        const output = this.heapArray[1];
        this.swap(1, this.partitionIndex);
        this.partitionIndex--;
        this.size -= 1;
        this.trickleDown();
        return output;
    }

    /**
     * 
     * @param {*} index 
     * @returns Parent node of the node located at index. Undefined if index <= 1
     */
    getParent = (index) => {
        if (index <= 1) return undefined
        return this.heapArray[Math.floor(index / 2)];
    }

    getLeftChild = (index) => {
        if (index * 2 > this.partitionIndex) return undefined;
        return this.heapArray[2 * index];
    }

    getRightChild = (index) => {
        if (index * 2 + 1 > this.partitionIndex) return undefined;
        return this.heapArray[(2 * index) + 1];
    }

    /**
     * Transforms the heap array into a sorted list.
     */
    sort = () => {
        let nextItem = this.pop();
        while(nextItem !== undefined) {
            nextItem = this.pop();
        }
    }

}

export default Heap;