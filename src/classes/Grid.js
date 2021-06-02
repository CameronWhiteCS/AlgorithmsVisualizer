import Tile from 'classes/Tile';

class Grid {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.destination = null;
        this.source = null;
        for (let j = 0; j < this.height; j++) {
            this.tiles[j] = [];
            for (let i = 0; i < this.width; i++) {
                this.tiles[j][i] = new Tile('empty', this);
                this.tiles[j][i].x = i;
                this.tiles[j][i].y = j;
            }
        }
    }

    getTile = (x, y) => {
        if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
            return this.tiles[y][x];
        }
    }

    setTileState(x, y, state) {
        this.tiles[y][x]?.setState(state);
    }

    setTile = (x, y, tile) => {
        this.tiles[y][x] = tile;
    }

    getCardinalNeighbors = (x, y) => {

        const output = [];

        const north = this.getTile(x, y + 1);
        const south = this.getTile(x, y - 1);
        const east = this.getTile(x + 1, y);
        const west = this.getTile(x - 1, y);

        const neighbors = [north, south, east, west];

        neighbors.forEach((neighbor) => {
            if (neighbor !== undefined) {
                output.push(neighbor);

            }
        });

        return output;
    }

    getNeighbors = (x, y) => {
        const output = [];

        const north = this.getTile(x, y + 1);
        const south = this.getTile(x, y - 1);
        const east = this.getTile(x + 1, y);
        const west = this.getTile(x - 1, y);

        const northEast = this.getTile(x + 1, y - 1);
        const southWest = this.getTile(x - 1, y + 1);
        const southEast = this.getTile(x + 1, y + 1);
        const northWest = this.getTile(x - 1, y - 1);

        const neighbors = [north, south, east, west, northEast, southWest, southEast, northWest];

        neighbors.forEach((neighbor) => {
            if (neighbor !== undefined) {
                output.push(neighbor);

            }
        });

        return output;
    }

    getFrontierTiles = (x, y) => {
       const frontierTiles = [
           this.getTile(x - 2, y),
           this.getTile(x + 2, y),
           this.getTile(x, y - 2),
           this.getTile(x, y + 2),
       ];
       const output = [];
       frontierTiles.forEach((tile) => {
           if(tile?.state === 'wall') output.push(tile);
       });
       return output;

    }

    getAccessableNeighbors = (x, y) => {

        const output = [];

        const north = this.getTile(x, y + 1);
        const south = this.getTile(x, y - 1);
        const east = this.getTile(x + 1, y);
        const west = this.getTile(x - 1, y);

        const northEast = this.getTile(x + 1, y - 1);
        const southWest = this.getTile(x - 1, y + 1);
        const southEast = this.getTile(x + 1, y + 1);
        const northWest = this.getTile(x - 1, y - 1);

        const neighbors = [north, south, east, west];

        if (north?.state !== 'wall' && east?.state !== 'wall') {
            neighbors.push(northEast);
        }

        if (north?.state !== 'wall' && west?.state !== 'wall') {
            neighbors.push(northWest);
        }

        if (south?.state !== 'wall' && east?.state !== 'wall') {
            neighbors.push(southEast);
        }

        if (south?.state !== 'wall' && west?.state !== 'wall') {
            neighbors.push(southWest);
        }

        neighbors.forEach((neighbor) => {
            if (neighbor !== undefined) {
                output.push(neighbor);

            }
        });

        return output;

    }

    clone = () => {

        const output = new Grid(this.width, this.height);

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                output.setTileState(x, y, this.getTile(x, y).state);
            }
        }

        const cloneDestination = output.getTile(this.destination.x, this.destination.y);
        const cloneSource = output.getTile(this.source.x, this.source.y);

        output.source = cloneSource;
        output.destination = cloneDestination;

        return output;
    }

}

export default Grid;