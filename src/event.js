class Event{
  constructor(){
    this.eventHandlers = [];
  }
  addEventHandler(eventHandler){
    this.eventHandlers.push(eventHandler);
  }
  trigger(eventData){
    this.eventHandlers.foreach(e => e.callBackFunction(eventData));
  }
}

class EventHandler{
  constructor(event, callBackFunction){
    this.callBack = callBackFunction;
    event.addEventHandler(this);
  }
  
  callBackFunction(eventData){
   this.callBack(eventData); 
  }
}