function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}
function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}
var world = new World();
world.NoOfSmellTypes = 5;
world.noOfCreatures = 6;
var creatures = [];
world.Things = Helper.MakeNoOfFoodItems(10, world);
var creatureForStats;
for (var i = 0; i < world.noOfCreatures; i++) {
    var creature = Helper.MakeARandomCreature();
    if (i == 0) {
        creatureForStats = creature;
        creature.fill = [244, 229, 255];
    }
}
var isFirstTime = true;
var aThingDiesInterval;
var thingPathLength = 20;
function draw() {
    world.draw();
    Helper.MoveThingsOnRandomPaths(world, thingPathLength);
    world.Things.forEach(c => {
        if (c instanceof Creature) {
            c.LiveTheNextMoment(world);
            c.wellbeing = c.wellbeing - 0.01;
        }
    });
    Helper.WorldStats(world);
    Helper.CreatureStats(creatureForStats);
    if (isFirstTime) {
        aThingDiesInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(0, world.Things.length - 1);
            var index = world.Things.indexOf(world.Things[rand]);
            if (!(world.Things[index] instanceof Creature)) {
                world.RemoveAndReplaceThing(world.Things[index]);
            }
        }, 20000);
        isFirstTime = false;
    }
}
function keyTyped() {
    if (p.key === 'r') {
        Helper.AddThing(world, 0, 0, 255, 0, 0);
    }
    else if (p.key === 'g') {
        Helper.AddThing(world, p.windowWidth, 0, 0, 255, 0);
    }
    else if (p.key === 'b') {
        Helper.AddThing(world, 0, p.windowHeight, 0, 0, 255);
    }
}
//# sourceMappingURL=sketch.js.map