import { TextBoxComponent } from "./component";
import { Event, EventHandler } from "./event";
const components = {
    "box1": new TextBoxComponent(3, 3, 20, 13, "Hello, my name is Alex Garcia. What is your name?", { textColor: 14 }),
    "box2": new TextBoxComponent(24, 3, 20, 13, "Hello, my name is Sharon Pyne. Nice to meet you.", { textColor: 10 })

};



const events = {
    click: new Event()
}

const eventHandlers = [new EventHandler(events.click, function (eventData) {
    components.box1.alter({ x: eventData.x, y: eventData.y });
}),

]

export { components, events, eventHandlers }
