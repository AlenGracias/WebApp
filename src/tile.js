class Tile {
    constructor(x, y) {
        this.data = {
            x,
            y,
            char: ".",
            color: 8,
            bgcolor: 0
        }

    }
    getData() {
        return this.data;
    }
    setChanges(d) {
        this.data = { ...this.data, ...d };

    }

}

export default Tile;