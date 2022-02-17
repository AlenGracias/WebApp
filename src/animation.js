class Animation {
    constructor(component, length, frames) {
        this.data = {
            component,
            frame: 0,
            length,
            frames,
            animationAug: {}
        }
    }

    moveFrame() {
        this.data.frame += 1;
        if (this.data.frame >= this.data.length)
            this.data.frame = 0;
    }

    getFrame() {
        if (this.data.frames[this.data.frame] != null)
            this.data.animationAug = this.data.frames[this.data.frame];
        return this.data.animationAug;
    }
}

class Blink extends Animation {
    constructor(component, delay, s1, s2) {
        let r = [];
        r[0] = s1;
        r[delay] = s2;
        super(component, delay * 2, r)
    }
}

export { Blink };