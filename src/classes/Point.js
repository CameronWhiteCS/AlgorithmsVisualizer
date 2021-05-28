import {v4 as uuidv4} from 'uuid';

class Point  {

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.id = uuidv4();
    }

    /**
     * 
     * @param {Point} point 
     * @returns Goemetic distance between this point and the input point
     */
    distance = (point) => {
        return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2));
    }




}

export default Point;