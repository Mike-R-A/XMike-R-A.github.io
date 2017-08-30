class Thing extends Drawable {
    constructor(world, x, y, width, height, stroke, strokeWeight, fill, smell) {
        super(x, y, width, height, stroke, strokeWeight, fill);
        this._wellbeing = this.width;
        this._smell = [];
        this.age = 0;
        this.maxAge = 5;
        for (var i = 0; i < world.NoOfSmellTypes; i++) {
            this._smell.push(0);
        }
        this.smell = smell;
        if (this instanceof Creature) {
            console.log("creature thing constructor");
        }
    }
    get wellbeing() {
        return this._wellbeing;
    }
    set wellbeing(value) {
        this._wellbeing = value;
        if (!(this instanceof Creature)) {
            this.width = value;
            this.height = value;
        }
    }
    get smell() {
        return this._smell.map(s => s * this.width);
    }
    set smell(theSmell) {
        for (var i = 0; i < theSmell.length; i++) {
            this._smell[i] = theSmell[i];
        }
    }
    getEaten(world) {
        this.wellbeing--;
        if (this.wellbeing <= 1 && !(this instanceof Creature)) {
            world.RemoveAndReplaceThing(this);
        }
        return this.nutritionalValuePerBite;
    }
    move(world, pathLength) {
        if (!(this instanceof Creature)) {
            var randForWhetherToChangeDirection = Helper.RandomIntFromInterval(-1, pathLength);
            if (randForWhetherToChangeDirection < 0) {
                this.lastX = this.x;
                this.lastY = this.y;
                var minDistThing = this.FindTheNearestThing(world);
                var otherThing = minDistThing.thing;
                var distanceToOtherThing = minDistThing.distance;
                if (distanceToOtherThing == 0) {
                    distanceToOtherThing = 1;
                }
                var xToOther = (otherThing.x - this.x) / distanceToOtherThing;
                var yToOther = (otherThing.y - this.y) / distanceToOtherThing;
                if (otherThing.lastX != null && otherThing.lastY != null) {
                    var xChangeOfOther = otherThing.x - otherThing.lastX;
                    var yChangeOfOther = otherThing.y - otherThing.lastY;
                    xToOther = (xToOther + xChangeOfOther * 5) / 6;
                    yToOther = (yToOther + yChangeOfOther * 5) / 6;
                }
                if (otherThing instanceof Creature || distanceToOtherThing <= (this.width + otherThing.width) / 2) {
                    this.x = this.x - xToOther * 1.1;
                    this.y = this.y - yToOther * 1.1;
                }
                else {
                    this.x = this.x + xToOther;
                    this.y = this.y + yToOther;
                }
            }
            else {
                if (this.lastX == null) {
                    this.lastX = this.x;
                }
                if (this.lastY == null) {
                    this.lastY = this.y;
                }
                var xChange = this.x - this.lastX;
                var yChange = this.y - this.lastY;
                this.lastX = this.x;
                this.lastY = this.y;
                var asIsDistance = Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
                if (asIsDistance == 0) {
                    asIsDistance = 1;
                }
                this.x += xChange / asIsDistance;
                this.y += yChange / asIsDistance;
            }
            this.x += Helper.RandomIntFromInterval(-1, 1) / 10;
            this.y += Helper.RandomIntFromInterval(-1, 1) / 10;
        }
    }
    FindTheNearestThing(world) {
        var minDistThing;
        var minDist;
        var otherThings = world.GetOtherThings(this);
        otherThings.forEach(thing => {
            var dist = Helper.GetDistance(this, thing);
            if (minDistThing == null || dist < minDist) {
                minDistThing = thing;
                minDist = dist;
            }
        });
        return { thing: minDistThing, distance: minDist };
    }
}
//# sourceMappingURL=thing.js.map