import { TextBox, Rect, AreaFill, AreaClear } from './asset';
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
        }
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
            border: new Rect(x, y, w, h),
            textBox: new TextBox(x + 1, y + 1, w - 2, h - 2, t),
            bg: new AreaClear(x, y, w, h)
        }
        this.xx = new AreaFill(x, y, w, h, " ");

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

        if (!this.data.visible)
            return;
        if (!this.data.transparent)
            this.data.bg.render(grid);
        this.data.textBox.render(grid, { textColor: d.textColor, textBgColor: d.textBgColor });
        if (this.data.hasBorder)
            this.data.border.render(grid, { color: d.borderColor });

    }

    updateAnimation() {
        if (this.data.animationActive != null)
            this.data.animationActive.moveFrame();
    }


}

export { TextBoxComponent }