import { v4 as uuidv4 } from 'uuid';

const permittedStates = ['empty', 'wall', 'source', 'destination', 'visiting', 'visited', 'path'];

class Tile {
    /**
     * 
     * @param {*} state "wall" || "empty" || "source" || "destination"
     */

    constructor(state = 'empty', grid = null) {
        this.grid = grid;
        this.setState(state);
        this.id = uuidv4();
        this.x = null;
        this.y = null;

    }

    setState = (state) => {

        if (!permittedStates.includes(state)) throw new Error(`Invalid tile state: ${state}`);

        if (state === 'source' && this.grid != null) {

            this.grid.source?.setState('empty');
            this.grid.source = this;


        } else if (state === 'destination' && this.grid !== null) {

            this.grid.destination?.setState('empty');
            this.grid.destination = this;

        } else {

            if (this.grid?.destination === this) {
                this.grid.destination = null;
            } else if (this.grid?.source === this) {
                this.grid.source = null;
            }

        }

        this.state = state;

    }

    getColor = () => {
        switch (this.state) {
            case 'wall':
                return 'black';
            case 'source':
                return 'lime';
            case 'destination':
                return 'red';
            case 'empty':
                return '#4a8ad2';
            case 'path':
                return '#4c2581';
            case 'visiting':
                return '#2e44b3';
            default:
                return '#f0f';
        }
    }

    distance = (tile) => {
        return Math.sqrt(Math.pow(tile.x - this.x, 2) + Math.pow(tile.y - this.y, 2));
    }
}

export default Tile;