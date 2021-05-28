const INFINITY = 100000;

class PriorityQueueNode {
    constructor(tile, value) {
        this.tile = tile;
        this.value = value;
    }
}

class PriorityQueue {

    constructor(elements = []) {
        this.heapArray = [null];
        this.size = 0;
        this.partitionIndex = 0;
        elements.forEach((element) => {
            this.insert(element);
        });
    }

    pop = () => {
        if (this.size === 0) return undefined;
        const output = this.heapArray[1];
        this.swap(1, this.partitionIndex);
        this.partitionIndex--;
        this.size -= 1;
        this.trickleDown();
        return output;
    }

    swap = (index1, index2) => {
        const temp = this.heapArray[index1];
        this.heapArray[index1] = this.heapArray[index2];
        this.heapArray[index2] = temp;
        if(this.heapArray[index1] !== this.heapArray[index2]) {
        }
    }

    insert = (element) => {
        let index = this.size + 1;
        this.heapArray.splice(index, 0, element);
        this.trickleUp(index);
        this.size += 1;
        this.partitionIndex += 1;
    }

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

    insert = (value) => {
        let index = this.size + 1;
        this.heapArray.splice(index, 0, value);
        if(this.size > 0) this.trickleUp(index); //@@@@@@@@@@@@@@@
        this.size += 1;
        this.partitionIndex += 1;
    }

    trickleUp = (index) => {
        while (this.getParent(index)?.value > this.heapArray[index].value && this.getParent(index) !== null) {
            this.swap(index, Math.floor(index / 2));
            index = Math.floor(index / 2);
        }
    }

    trickleDown = (index = 1) => {

        let left = this.getLeftChild(index);
        let right = this.getRightChild(index);

        while ((left?.value < this.heapArray[index].value && left !== undefined) || (right?.value < this.heapArray[index].value) && right !== undefined) {

            if (left === undefined && right !== undefined) {
                this.swap(index, index * 2 + 1);
                index = index * 2 + 1;
            } else if (right === undefined && left !== undefined) {
                this.swap(index, index * 2);
                index *= 2;
            } else {

                let larger;
                let smaller;

                if(right.value < left.value) {
                    smaller = right;
                    larger = left;
                } else {
                    smaller = left;
                    larger = right;
                }

                if (right === smaller)  {
                    this.swap(index, index * 2 + 1);
                    index = index * 2 + 1;   
                } else if (left === smaller) {
                    this.swap(index, index * 2);
                    index = index * 2;   
                }


            }

            left = this.getLeftChild(index);
            right = this.getRightChild(index); 
        }

    }


}

/**
 * 
 * @param {*} grid 
 * @param {Function} distanceHueristic Function used for A*. Defaults to a function that always returns 0 if undefined. In this case, the resulting algorithm is Dijkstra's. 
 * @returns 
 */
const dijkstra = (grid, showAnimation, heuristicWeight, heuristicFunction) => {

    if (heuristicFunction == undefined) {
        heuristicFunction = () => 0;
    }

    const output = [grid];

    const allTiles = [];

    const distSource = {}; //tile.id ==> num
    const previousTile = {}; //tile.id ==> tile; key's previous tile is value
    const heuristicTable = {}; //tile.id ==> Number

    const priorityQueue = new PriorityQueue([new PriorityQueueNode(grid.source, 0)]);

    /**
     * Linear search. replace with priority queue. 
     * @returns The unvisited tile closest to the source and then marks it as visited.
     */
    const getClosestUnvisitedTile = () => {

        let closestTile = priorityQueue.pop()?.tile;

        if (showAnimation && closestTile != null) {
            const frame1 = output[output.length - 1].clone();
            if (frame1.getTile(closestTile.x, closestTile.y).state === 'empty') {
                frame1.setTileState(closestTile.x, closestTile.y, 'visiting');
                output.push(frame1);
            }
        }

        return closestTile;
    }


    //Initialize
    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            const tile = grid.getTile(x, y);
            allTiles.push(tile);
            distSource[tile.id] = INFINITY;
            previousTile[tile.id] = null;
            heuristicTable[tile.id] = heuristicFunction(tile, grid.destination) * heuristicWeight;
        
        }
    }

    distSource[grid.source.id] = 0;

    //main loop
    let looping = true;
    let closestTile = getClosestUnvisitedTile();
    while (closestTile != undefined && looping) {

        const neighbors = grid.getAccessableNeighbors(closestTile.x, closestTile.y);

        for(let i = 0; i < neighbors.length; i++){
            const neighbor = neighbors[i];
            if (distSource[closestTile.id] + closestTile.distance(neighbor) < distSource[neighbor.id] && neighbor.state !== 'wall') {
                previousTile[neighbor.id] = closestTile;
                distSource[neighbor.id] = distSource[closestTile.id] + closestTile.distance(neighbor);
                priorityQueue.insert(new PriorityQueueNode(neighbor, distSource[neighbor.id] + heuristicTable[neighbor.id]));
                if (neighbor === grid.destination) {
                    looping = false;
                    break;
                }
            }
        }

        closestTile = getClosestUnvisitedTile();

    }

    //Construct path from computed dijkstra table
    let prev = previousTile[grid.destination.id];
    while (prev !== null) {
        if (prev.state !== 'source') {
            if(showAnimation) output.push(output[output.length - 1].clone());
            output[output.length - 1].getTile(prev.x, prev.y).setState('path');
        }
        prev = previousTile[prev.id];
    }

    return output;

}

const aStar = (grid, showAnimation, heuristicWeight) => {
    const heuristic = (tile, destination) => {
        return tile.distance(destination);
    }
    return dijkstra(grid, showAnimation, heuristicWeight, heuristic);
}

export { dijkstra, aStar }