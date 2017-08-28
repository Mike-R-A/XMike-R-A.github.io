class Drawable {
    constructor(x, y, width, height, stroke, strokeWeight, fill) {
        this.x = x;
        this.y = y;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.fill = fill;
        this.width = width;
        this.height = height;
    }
    ;
    draw() {
        if (this.x < Math.abs(this.width / 2)) {
            this.x = Math.abs(this.width / 2);
        }
        if (this.x > p.windowWidth - Math.abs(this.width / 2)) {
            this.x = p.windowWidth - Math.abs(this.width / 2);
        }
        if (this.y < Math.abs(this.height / 2)) {
            this.y = Math.abs(this.height / 2);
        }
        if (this.y > p.windowHeight - Math.abs(this.height / 2)) {
            this.y = p.windowHeight - Math.abs(this.height / 2);
        }
        p.stroke(this.stroke);
        p.strokeWeight(this.strokeWeight);
        p.fill(this.fill);
        p.ellipse(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=drawable.js.map