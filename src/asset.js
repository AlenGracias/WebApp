const Render = {
    AreaFill: function (grid, data) {
        for (let j = 0; j < data.h; j++) {
            for (let i = 0; i < data.w; i++) {
                grid.getTile(data.x + i, data.y + j).setChanges({ char: data.character });
            }
        }

    },

    AreaClear: function (grid, data) {
        for (let j = 0; j < data.h; j++) {
            for (let i = 0; i < data.w; i++) {
                grid.getTile(data.x + i, data.y + j).setChanges({ char: " " });
            }
        }

    },

    TextBox: function (grid, data) {
        var words = data.text.split(" ");
        var selectedWord = 0;
        for (let line = 0; line < data.h; line++) {
            let charsleft = data.w;
            while (words[selectedWord].length <= charsleft || words[selectedWord].length > data.w) {
                let chars = words[selectedWord].split("");
                for (let j = 0; j < chars.length; j++) {
                    grid.getTile(data.x + data.w - charsleft, data.y + line).setChanges({ char: chars[j], color: data.textColor, bgcolor: data.textBgColor });
                    charsleft -= 1;
                }
                if (charsleft >= 1 && selectedWord + 1 != words.length)
                    grid.getTile(data.x + data.w - charsleft, data.y + line).setChanges({ bgcolor: data.textBgColor });
                charsleft -= 1;
                selectedWord += 1;
                if (selectedWord >= words.length)
                    return;
            }
        }
    },

    Rect: function (grid, data) {

        let TRcorner = '┐';
        let TLcorner = '┌';
        let BRcorner = '┘';
        let BLcorner = '└';
        let verticalSide = '│';
        let horizontalSide = '─';

        grid.getTile(data.x, data.y).setChanges({ char: TLcorner, color: data.color });
        grid.getTile(data.x + data.w - 1, data.y).setChanges({ char: TRcorner, color: data.color });
        grid.getTile(data.x, data.y + data.h - 1).setChanges({ char: BLcorner, color: data.color });
        grid.getTile(data.x + data.w - 1, data.y + data.h - 1).setChanges({ char: BRcorner, color: data.color });
        for (let i = 1; i < data.w - 1; i++) {
            grid.getTile(data.x + i, data.y).setChanges({ char: horizontalSide, color: data.color });
            grid.getTile(data.x + i, data.y + data.h - 1).setChanges({ char: horizontalSide, color: data.color });
        }
        for (let i = 1; i < data.h - 1; i++) {
            grid.getTile(data.x, data.y + i).setChanges({ char: verticalSide, color: data.color });
            grid.getTile(data.x + data.w - 1, data.y + i).setChanges({ char: verticalSide, color: data.color });
        }
    }
}







export { Render };