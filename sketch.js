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
    creature.label = i.toString();
    creature.wellbeing = 100;
    if (i == 0) {
        creatureForStats = creature;
        creature.fill = [244, 229, 255];
    }
}
var isFirstTime = true;
var refreshGoodnessInterval;
var thingPathLength = 20;
function draw() {
    world.draw();
    Helper.MoveThingsOnRandomPaths(world, thingPathLength);
    var scoreHeight = 0;
    world.Things.forEach(t => {
        if (t instanceof Creature) {
            var c = t;
            c.LiveTheNextMoment(world);
            c.wellbeing = c.wellbeing - 0.01;
            if (Math.floor(c.wellbeing) == Math.floor(c.idealWellbeing)) {
                c.score++;
            }
            p.stroke(0);
            p.fill(0);
            p.text("creature " + c.label + ":", p.windowWidth - 200, scoreHeight * 10 + 10, p.windowWidth, scoreHeight * 20 + 20);
            p.text(c.score.toString(), p.windowWidth - 100, scoreHeight * 10 + 10, p.windowWidth, scoreHeight * 20 + 20);
            scoreHeight = scoreHeight + 2;
        }
        else {
            if (t.age >= t.maxAge) {
                world.RemoveAndReplaceThing(t);
            }
        }
        t.age += 1 / 1000;
    });
    Helper.WorldStats(world);
    Helper.CreatureStats(creatureForStats);
    if (isFirstTime) {
        refreshGoodnessInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(1, 280);
            if (rand == 1) {
                world.GenerateGoodnessValues();
            }
        }, 1000);
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
function mouseClicked() {
    for (var i = 0; i < world.Things.length; i++) {
        var thing = world.Things[i];
        if (thing instanceof Creature) {
            if (p.mouseX > thing.x - thing.width / 2 && p.mouseX < thing.x + thing.width / 2 &&
                p.mouseY > thing.y - thing.height / 2 && p.mouseY < thing.y + thing.height / 2) {
                creatureForStats = thing;
            }
        }
    }
    p.mouseX;
}
//# sourceMappingURL=sketch.js.map