class Graphic {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    getX() { return this.x }
    getY() { return this.y }
    getW() { return this.w }
    getH() { return this.h }
}

class AreaFill extends Graphic {
    constructor(x, y, w, h, c) {
        super(x, y, w, h);
        this.character = c;
    }
    render(grid) {
        for (let j = 0; j < this.h; j++) {
            for (let i = 0; i < this.w; i++) {
                grid.getTile(this.x + i, this.y + j).setChanges({ char: this.character });
            }
        }

    }
}

class AreaClear extends AreaFill {
    constructor(x, y, w, h) {
        super(x, y, w, h, " ");
    }
}

class TextBox extends Graphic {
    constructor(x, y, w, h, t) {
        super(x, y, w, h);
        this.text = t;
    }
    setText(t) {
        this.text = t;
    }

    render(grid, data) {
        var words = this.text.split(" ");
        var selectedWord = 0;
        for (let line = 0; line < this.h; line++) {
            let charsleft = this.w;
            while (words[selectedWord].length <= charsleft || words[selectedWord].length > this.w) {
                let chars = words[selectedWord].split("");
                for (let j = 0; j < chars.length; j++) {
                    grid.getTile(this.x + this.w - charsleft, this.y + line).setChanges({ char: chars[j], color: data.textColor, bgcolor: data.textBgColor });
                    charsleft -= 1;
                }
                if (charsleft >= 1 && selectedWord + 1 != words.length)
                    grid.getTile(this.x + this.w - charsleft, this.y + line).setChanges({ bgcolor: data.textBgColor });
                charsleft -= 1;
                selectedWord += 1;
                if (selectedWord >= words.length)
                    return;
            }
        }
    }
}

class Rect extends Graphic {
    TRcorner = '┐';
    TLcorner = '┌';
    BRcorner = '┘';
    BLcorner = '└';
    verticalSide = '│';
    horizontalSide = '─';
    currentFrame = 0;


    render(grid, data) {
        grid.getTile(this.x, this.y).setChanges({ char: this.TLcorner, color: data.color });
        grid.getTile(this.x + this.w - 1, this.y).setChanges({ char: this.TRcorner, color: data.color });
        grid.getTile(this.x, this.y + this.h - 1).setChanges({ char: this.BLcorner, color: data.color });
        grid.getTile(this.x + this.w - 1, this.y + this.h - 1).setChanges({ char: this.BRcorner, color: data.color });
        for (let i = 1; i < this.w - 1; i++) {
            grid.getTile(this.x + i, this.y).setChanges({ char: this.horizontalSide, color: data.color });
            grid.getTile(this.x + i, this.y + this.h - 1).setChanges({ char: this.horizontalSide, color: data.color });
        }
        for (let i = 1; i < this.h - 1; i++) {
            grid.getTile(this.x, this.y + i).setChanges({ char: this.verticalSide, color: data.color });
            grid.getTile(this.x + this.w - 1, this.y + i).setChanges({ char: this.verticalSide, color: data.color });
        }
    }


}




export { TextBox, Rect, AreaFill, AreaClear };