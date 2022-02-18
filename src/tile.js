class Tile {
    static default = {
        char: ".",
        color: 8,
        bgcolor: 0
    }
    constructor(x, y) {
        this.data = { ...Tile.default, x, y }

    }
    getData() {
        return this.data;
    }
    setChanges(d) {
        this.data = { ...this.data, ...d };
        if (!Object.keys(d).includes("bgcolor"))
            this.data = { ...this.data, bgcolor: 0 }

    }

    clearData() {
        this.data = { ...this.data, ...Tile.default }
    }

}

export default Tile;