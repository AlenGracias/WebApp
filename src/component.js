import { Render } from './asset';
import { Blink } from './animation';

class Component {
    static default = {

    }
    constructor(x, y, w, h) {
        this.data = {
            x,
            y,
            w,
            h,
            visible: true,
            transparent: false,
            relative: false,
            parent: null,
            children: []
        }
    }

    alter(newData) {
        this.data = { ...this.data, ...newData }
    }

    getData() {
        return this.data;
    }

    getBoundingBox() {
        return { x: this.x, y: this.y, w: this.w, h: this.h };
    }
}

class TextBoxComponent extends Component {

    static default = {
        ...Component.default,
        textColor: 15,
        textBgColor: 0,
        borderColor: 15,
        hasBorder: true,
        animations: {
            blink: new Blink(this, 12, {
                textColor: 0,
                textBgColor: 14
            },
                {
                    textColor: 14,
                    textBgColor: 0
                })
        },
        animationActive: null

    }

    constructor(x, y, w, h, t, s) {
        super(x, y, w, h);
        this.data = {
            ...this.data,
            text: t
        }

        this.data = { ...this.data, ...TextBoxComponent.default, ...s };


    }

    setAnimation() {
        this.data.animationActive = this.data.animations["blink"];
    }

    render(grid) {

        let d = this.data;
        //console.log(this.data.animationActive);
        if (this.data.animationActive != null) {
            let animationAug = this.data.animationActive.getFrame();
            d = { ...d, ...animationAug }
        }

        let size = { x: d.x, y: d.y, w: d.w, h: d.h }

        if (!this.data.visible)
            return;
        if (!this.data.transparent)
            Render.AreaClear(grid, size);
        Render.TextBox(grid, { ...{ x: size.x + 1, y: size.y + 1, w: size.w - 2, h: size.h - 2 }, textColor: d.textColor, textBgColor: d.textBgColor, text: d.text });
        if (this.data.hasBorder)
            Render.Rect(grid, { ...size, color: d.borderColor });

    }

    updateAnimation() {
        if (this.data.animationActive != null)
            this.data.animationActive.moveFrame();
    }


}

export { TextBoxComponent }