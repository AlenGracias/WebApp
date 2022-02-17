//const tile = require("./tile");
import tile from "./tile";
import { TextBoxComponent } from "./component";

class Grid {
    tiles = [];
    components = [];
    static colors = ["black", "maroon", "green", "olive", "navy", "purple", "teal", "silver", "gray", "red", "lime", "yellow", "blue", "fuchsia", "cyan", "white"];
    constructor(ctx, w, h) {
        this.x = Math.floor(w / (22 * 0.52));
        this.y = Math.floor(h / 22);
        this.screenWidth = w;
        this.screenHeight = h;
        this.constructTiles();
        this.ctx = ctx;
        this.dumbyTile = new tile(-1, -1);
        this.initComponents();
    }
    getX() { return this.x }
    getY() { return this.y }
    initComponents() {
        this.components.push(new TextBoxComponent(3, 3, 20, 13, "Hello, my name is Alex Garcia. What is your name?", { textColor: 10 }));
        this.components[0].setAnimation();
    }
    update(w, h, mx, my) { //try to make more efficient
        let a = false;
        let b = false;
        if (w != this.screenWidth) {
            this.x = Math.floor(w / (22 * 0.52));
            this.screenWidth = w;
            a = true;
        }
        if (h != this.screenHeight) {
            this.y = Math.floor(h / 22);
            this.screenHeight = h;
            b = true;
        }
        if (a || b) {
            this.constructTiles();
        }

        this.updateComponents();
        this.renderComponents();
        this.drawScreen();

        let closestX = Math.floor(mx / this.screenWidth * this.x);
        let closestY = Math.floor(my / this.screenHeight * this.y);

        this.ctx.fillText("█", closestX * 11.4, 20 + closestY * 22);




    }
    updateComponents() {

    }
    renderComponents() {
        this.components.forEach(e => e.render(this));
        this.components.forEach(e => e.updateAnimation());
    }
    drawScreen() {
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.ctx.font = "20px Courier New";
        this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
        for (let j = 0; j < this.y; j++) {
            for (let i = 0; i < this.x; i++) {
                let _tile = this.getTile(i, j);
                if (_tile.getData().bgcolor > 0) {
                    this.ctx.fillStyle = Grid.colors[_tile.getData().bgcolor];
                    this.ctx.fillText("█", i * 11.4, 20 + j * 22);
                }
                this.ctx.fillStyle = Grid.colors[_tile.getData().color];
                this.ctx.fillText(_tile.getData().char, i * 11.4, 20 + j * 22);

            }
        }
    }
    constructTiles() {
        this.tiles = [];
        for (let j = 0; j < this.y; j++) {
            this.tiles.push([]);
            for (let i = 0; i < this.x; i++)
                this.tiles[j].push(new tile(i, j));
        }

        //console.log(this.tiles);
    }
    getTile(x, y) {
        if (y < this.y && x < this.x)
            return this.tiles[y][x];
        else
            return this.dumbyTile;
    }
    /*getString() {
        let string = '<p>';
        for (let j = 0; j < this.y; j++) {
            for (let i = 0; i < this.x; i++) {
                string += `<span `;
                if (this.getTile(i, j).isMouse())
                    string += `class="highlighted" `;
                string += `v-on:mouseover.stop="mouseover($event,${i},${j})">`
                string += this.getTile(i, j).getChar();
                string += `</span>`
            }
            string += `<br>`
        }
        string += `</p>`;
        return string;
    }*/
    getData() {
        return {
            x: this.x,
            y: this.y
        }
    }
}

export default Grid;