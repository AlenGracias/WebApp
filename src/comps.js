import { TextBoxComponent } from "./component";
import { Event, EventHandler } from "./event";
import { Blink } from './animation';


const components = {
    "box1": new TextBoxComponent(3, 3, 20, 13, "Hello, my name is Alex Garcia. What is your name?", { textColor: 14, info: {selected: false}      
    }),
    "box2": new TextBoxComponent(24, 3, 20, 13, "Hello, my name is Sharon Pyne. Nice to meet you.", { textColor: 10 })

};

function initAnimations(){
  components.box1.alter({animations: {blink: new Blink(this, 12, {
                textColor: 0,
                textBgColor: 14
            },
                {
                    textColor: 14,
                    textBgColor: 0
                })
                },
                animationActive: "",
                
                
                info: {updates:[function(){
                  console.log(components.box1.data.info);
                  if(components.box1.data.info.selected){
                    console.log("hi");
                    components.box1.alter({animationActive:"blink"})}
                  else components.box1.alter({animationActive:""})
                }]}
                
                
                
                }
                
                )
}

const events = {
    click: new Event()
    
}

const eventHandlers = [new EventHandler(events.click, function (eventData) {
     components.box1.inBoundingBox(eventData.x, eventData.y)
    if(components.box1.inBoundingBox(eventData.x, eventData.y)){
      components.box1.alter({info: {selected: !components.box1.data.info.selected}});
      console.log("clicked2");
      console.log(components.box1.data.info.selected);
    }
}),

]

export { components, events, eventHandlers, initAnimations }
