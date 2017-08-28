class World {
    constructor() {
        this.noOfCreatures = 1;
        this.maxFoodItems = 100;
        this.NoOfSmellTypes = 3;
        this.goodness = [];
        for (var i = 0; i < this.NoOfSmellTypes; i++) {
            if (i < 3) {
                this.goodness.push(Helper.RandomIntFromInterval(-2, 2));
            }
            else {
                this.goodness.push(0);
            }
        }
        if (this.goodness[0] <= 0 && this.goodness[1] <= 0 && this.goodness[2] <= 0) {
            var choice = Helper.RandomIntFromInterval(0, 2);
            this.goodness[choice] = Helper.RandomIntFromInterval(1, 2);
        }
        if (this.goodness[0] >= 0 && this.goodness[1] >= 0 && this.goodness[2] >= 0) {
            var choice = Helper.RandomIntFromInterval(0, 2);
            this.goodness[choice] = Helper.RandomIntFromInterval(-2, -1);
        }
    }
    draw() {
        p.background([176, 224, 255]);
    }
    GetSmellAtPosition(x, y, creature) {
        var smellAtPosition = [];
        for (var i = 0; i < this.NoOfSmellTypes; i++) {
            smellAtPosition.push(0);
            var index = this.Things.indexOf(creature);
            var otherThings = this.Things.slice();
            otherThings.splice(index, 1);
            otherThings.forEach(thing => {
                var distanceSquared = Math.pow(thing.x - x, 2) + Math.pow(thing.y - y, 2);
                if (distanceSquared < 1) {
                    distanceSquared = 1;
                }
                smellAtPosition[i] += thing.smell[i] / distanceSquared;
            });
        }
        return smellAtPosition;
    }
    GetThingsInReach(creature) {
        var index = this.Things.indexOf(creature);
        var otherThings = this.Things.slice();
        otherThings.splice(index, 1);
        var thingsInReach = otherThings.filter(thing => {
            var distanceBetween = Helper.GetDistance(thing, creature); // Math.sqrt(Math.pow(thing.x - creature.x, 2) + Math.pow(thing.y - creature.y, 2));
            return distanceBetween < (thing.width + creature.width) / 2;
        });
        return thingsInReach;
    }
    RemoveAndReplaceThing(thing) {
        var index = this.Things.indexOf(thing);
        this.Things.splice(index, 1);
        var noOfFoodItemsLeft = world.Things.length - world.noOfCreatures;
        if (noOfFoodItemsLeft == 0) {
            for (var i = 0; i < Helper.RandomIntFromInterval(1, 20); i++) {
                var replacementThing = Helper.MakeRandomFoodItem(world);
                this.Things.push(replacementThing);
            }
        }
        else if (noOfFoodItemsLeft < this.maxFoodItems - 3) {
            for (var i = 0; i < Helper.RandomIntFromInterval(0, 3); i++) {
                var replacementThing = Helper.MakeRandomFoodItem(world);
                this.Things.push(replacementThing);
            }
        }
    }
    GetOtherThings(thing) {
        var index = this.Things.indexOf(thing);
        var otherThings = this.Things.slice();
        otherThings.splice(index, 1);
        return otherThings;
    }
}
//# sourceMappingURL=world.js.map