import { Render } from './asset';

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
            children: [],
            info: {updates:[]},                          
            }
        }
    

    alter(newData) {
        if(Object.keys(newData).includes("info")){
          let _info = {...this.data.info, ...newData.info}
          this.data = { ...this.data, ...newData, info: _info}
          } else this.data = { ...this.data, ...newData}
    }

    getData() {
        return this.data;
    }

    getBoundingBox() {
        return { x: this.data.x, y: this.data.y, w: this.data.w, h: this.data.h };
    }
    
    inBoundingBox(x, y) {
        let r = false;
        let _box = this.getBoundingBox();
        if ((_box.x < x && _box.x + _box.w > x) && (_box.y < y && _box.y + _box.h > y))
          r=true;
        

        return r;

    }
    
    update(){
      if(this.data.info.updates != null){
      if(Object.values(this.data.info.updates).length > 0){
        for(let i = 0; i<Object.values(this.data.info.updates).length; i++){
          
          this.data.info.updates[i]();}
      }
    }}
}

class TextBoxComponent extends Component {

    static default = {
        ...Component.default,
        textColor: 15,
        textBgColor: 0,
        borderColor: 15,
        hasBorder: true,
        animations: {},
        animationActive: ""

    }

    constructor(x, y, w, h, t, s) {
        super(x, y, w, h);
        this.data = {
            ...this.data,
            text: t
        }

        this.alter(TextBoxComponent.default)
        this.alter(s);


    }

    render(grid) {

        let d = this.data;
        //console.log(this.data.animationActive);
        if (this.data.animationActive != "") {
            let animationAug = this.data.animations[this.data.animationActive].getFrame();
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
        if (this.data.animationActive != "")
            this.data.animations[this.data.animationActive].moveFrame();
    }


}

export { TextBoxComponent }