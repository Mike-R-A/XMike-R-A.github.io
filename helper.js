var Helper;
(function (Helper) {
    function MakeNoOfFoodItems(no, world) {
        var things = [];
        for (var i = 0; i < no; i++) {
            var thing = MakeRandomFoodItem(world);
            things.push(thing);
        }
        return things;
    }
    Helper.MakeNoOfFoodItems = MakeNoOfFoodItems;
    function MakeRandomFoodItem(world) {
        var randomSide = Helper.RandomIntFromInterval(1, 4);
        var x;
        var y;
        switch (randomSide) {
            case 1:
                x = 0;
                y = Helper.RandomIntFromInterval(0, p.windowHeight);
                break;
            case 2:
                x = Helper.RandomIntFromInterval(0, p.windowWidth);
                y = 0;
                break;
            case 3:
                x = Helper.RandomIntFromInterval(0, p.windowWidth);
                y = p.windowHeight;
                break;
            case 4:
                x = p.windowWidth;
                y = Helper.RandomIntFromInterval(0, p.windowHeight);
                break;
        }
        var diameter = RandomIntFromInterval(10, 50);
        var strokeR = RandomIntFromInterval(0, 255);
        var strokeG = RandomIntFromInterval(0, 255);
        var strokeB = RandomIntFromInterval(0, 255);
        var fillR = RandomIntFromInterval(0, 255);
        var fillG = RandomIntFromInterval(0, 255);
        var fillB = RandomIntFromInterval(0, 255);
        var rand = RandomIntFromInterval(-1, 10);
        if (rand > 0) {
            var colourChoice = Helper.RandomIntFromInterval(0, 2);
            var vicinitySpread = 20;
            switch (colourChoice) {
                case 0:
                    fillG = 0;
                    fillB = 0;
                    x = Helper.RandomIntFromInterval(world.redVicinityX - vicinitySpread, world.redVicinityX + vicinitySpread);
                    y = Helper.RandomIntFromInterval(world.redVicinityY - vicinitySpread, world.redVicinityY + vicinitySpread);
                    break;
                case 1:
                    fillB = 0;
                    fillR = 0;
                    x = Helper.RandomIntFromInterval(world.greenVicinityX - vicinitySpread, world.greenVicinityX + vicinitySpread);
                    y = Helper.RandomIntFromInterval(world.greenVicinityY - vicinitySpread, world.greenVicinityY + vicinitySpread);
                    break;
                case 2:
                    fillR = 0;
                    fillG = 0;
                    x = Helper.RandomIntFromInterval(world.blueVicinityX - vicinitySpread, world.blueVicinityX + vicinitySpread);
                    y = Helper.RandomIntFromInterval(world.blueVicinityY - vicinitySpread, world.blueVicinityY + vicinitySpread);
                    break;
            }
        }
        var strokeWeight = 1;
        var thing = new Thing(world, x, y, diameter, diameter, [strokeR, strokeG, strokeB], strokeWeight, [fillR, fillG, fillB], [fillR, fillG, fillB]);
        thing.wellbeing = diameter;
        var totalFill = fillR + fillG + fillB;
        if (totalFill == 0) {
            totalFill = 1;
        }
        thing.nutritionalValuePerBite = (fillR * world.goodness[0] + fillG * world.goodness[1] + fillB * world.goodness[2]) / totalFill;
        return thing;
    }
    Helper.MakeRandomFoodItem = MakeRandomFoodItem;
    function GenerateNewVicinities(world) {
        world.redVicinityX = Helper.RandomIntFromInterval(0, p.windowWidth);
        world.redVicinityY = Helper.RandomIntFromInterval(0, p.windowHeight);
        world.greenVicinityX = Helper.RandomIntFromInterval(0, p.windowWidth);
        world.greenVicinityY = Helper.RandomIntFromInterval(0, p.windowHeight);
        world.blueVicinityX = Helper.RandomIntFromInterval(0, p.windowWidth);
        world.blueVicinityY = Helper.RandomIntFromInterval(0, p.windowHeight);
    }
    Helper.GenerateNewVicinities = GenerateNewVicinities;
    function AddThing(world, x, y, r, g, b) {
        var thing = Helper.MakeRandomFoodItem(world);
        var diameter = RandomIntFromInterval(10, 100);
        thing.maxAge = Helper.RandomIntFromInterval(1, 100) / 2;
        thing.x = x;
        thing.y = y;
        thing.stroke = [r, g, b];
        thing.fill = [r, g, b];
        world.Things.push(thing);
    }
    Helper.AddThing = AddThing;
    function MakeARandomCreature() {
        var x = Helper.RandomIntFromInterval(0, p.windowWidth);
        var y = Helper.RandomIntFromInterval(0, p.windowHeight);
        var r = Helper.RandomIntFromInterval(0, 255);
        var g = Helper.RandomIntFromInterval(0, 255);
        var b = Helper.RandomIntFromInterval(0, 255);
        var longTermImportanceFactor = Helper.RandomIntFromInterval(1, 20000);
        var minMemoryTime = Helper.RandomIntFromInterval(1, 2000);
        var maxMemoryTime = Helper.RandomIntFromInterval(minMemoryTime, 20000);
        var flip = Helper.RandomIntFromInterval(0, 1);
        var smell1;
        var smell2;
        if (flip == 1) {
            smell1 = 0;
            smell2 = 255;
        }
        else {
            smell1 = 255;
            smell2 = 0;
        }
        var creature = new Creature(world, x, y, 25, 25, [244, 229, 66], [0, 0, 0, smell1, smell2], longTermImportanceFactor, minMemoryTime, maxMemoryTime);
        creature.label = "creature";
        creature.nutritionalValuePerBite = 0;
        world.Things.push(creature);
        return creature;
    }
    Helper.MakeARandomCreature = MakeARandomCreature;
    function MoveThingsOnRandomPaths(world, pathLength) {
        world.Things.forEach(t => {
            if (!(t instanceof Creature)) {
                t.move(world, pathLength);
                t.draw();
            }
        });
    }
    Helper.MoveThingsOnRandomPaths = MoveThingsOnRandomPaths;
    function RandomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    Helper.RandomIntFromInterval = RandomIntFromInterval;
    function WorldStats(world) {
        GraphGoodness(world.goodness);
    }
    Helper.WorldStats = WorldStats;
    function CreatureStats(creature) {
        p.stroke([0, 0, 0]);
        p.fill([0, 0, 0]);
        p.text("Stats for creature " + creature.label, 150, 10, 500, 50);
        p.text("longTermImportance: " + creature.longTermImportanceFactor.toString(), 150, 30, 500, 60);
        p.text("minMemoryTime: " + creature.minMemoryTime.toString(), 150, 50, 500, 70);
        p.text("maxMemoryTime: " + creature.maxMemoryTime.toString(), 150, 70, 500, 80);
        p.text("score: " + creature.score.toString(), 150, 90, 500, 80);
        GraphAssociations(creature.associations);
        GraphDesireForSmell(creature.desireForSmell);
        GraphSmell(creature.whatICanSmell);
        GraphWellbeing(creature.wellbeing);
    }
    Helper.CreatureStats = CreatureStats;
    function Graph(arrayToGraph, barColours, weightFactor, barWidth, leftOffset, topOffset, title) {
        if (arrayToGraph) {
            p.stroke(0);
            p.strokeWeight(1);
            var total = arrayToGraph.reduce((total, num) => {
                return Math.abs(total) + Math.abs(num);
            });
            if (total == 0) {
                total = 1;
            }
            for (var i = 0; i < arrayToGraph.length; i++) {
                p.fill(barColours[i] || [0, 0, 0]);
                var barHeight = arrayToGraph[i] * weightFactor / total;
                var x = i * (barWidth + 20) + leftOffset;
                p.rect(x, topOffset - barHeight, barWidth, barHeight);
            }
            p.text(title, leftOffset, topOffset, barWidth, topOffset);
        }
    }
    Helper.Graph = Graph;
    function GraphGoodness(goodness) {
        Graph(goodness, [[255, 0, 0], [0, 255, 0], [0, 0, 255]], 100, 20, 10, 100, "Nutritional Value");
    }
    Helper.GraphGoodness = GraphGoodness;
    function GraphAssociations(associations) {
        Graph(associations, [[255, 0, 0], [0, 255, 0], [0, 0, 255]], 100, 20, 310, 100, "Association with Nutritional Value");
    }
    Helper.GraphAssociations = GraphAssociations;
    function GraphDesireForSmell(desireForSmell) {
        Graph(desireForSmell, [[255, 0, 0], [0, 255, 0], [0, 0, 255]], 100, 20, 610, 100, "Current Thoughts");
    }
    Helper.GraphDesireForSmell = GraphDesireForSmell;
    function GraphSmell(smell) {
        Graph(smell, [[255, 0, 0], [0, 255, 0], [0, 0, 255]], 100, 20, 910, 100, "Current Smell");
    }
    Helper.GraphSmell = GraphSmell;
    function GraphWellbeing(wellbeing) {
        p.stroke(0);
        p.strokeWeight(1);
        p.fill([255, 67, 104]);
        var rightOffset = 50;
        var bottomOffset = p.windowHeight / 2;
        var barWidth = 20;
        var barHeight = wellbeing;
        var x = p.windowWidth - rightOffset;
        p.rect(x, p.windowHeight - barHeight - bottomOffset, barWidth, barHeight);
        p.text(Math.floor(wellbeing).toString(), x, p.windowHeight - bottomOffset, barWidth, bottomOffset);
    }
    Helper.GraphWellbeing = GraphWellbeing;
    function GetTotalOfArray(array) {
        return array.reduce((total, num) => {
            return total + num;
        });
    }
    Helper.GetTotalOfArray = GetTotalOfArray;
    function GetDistance(thing1, thing2) {
        return Math.sqrt(Math.pow(thing2.x - thing1.x, 2) + Math.pow(thing2.y - thing1.y, 2));
    }
    Helper.GetDistance = GetDistance;
})(Helper || (Helper = {}));
//# sourceMappingURL=helper.js.map