class Event {
  constructor() {
    this.eventHandlers = [];
  }
  addEventHandler(eventHandler) {
    console.log(this.eventHandlers);
    this.eventHandlers.push(eventHandler);
    console.log(this.eventHandlers);
  }
  trigger(eventData) {
    if (this.eventHandlers.length > 0) {
      //console.log(Object.values(this.eventHandlers));
      for (let i = 0; i < this.eventHandlers.length; i++)
        this.eventHandlers[i].callBackFunction(eventData);
    }
  }
}

class EventHandler {
  constructor(event, callBackFunction) {
    this.callBack = callBackFunction;
    event.addEventHandler(this);
    console.log(callBackFunction);
  }

  callBackFunction(eventData) {
    this.callBack(eventData);
  }
}

export { Event, EventHandler }