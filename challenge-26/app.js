function DOM (nodeDom){
    this.element = document.querySelectorAll(nodeDom); 
  }

  DOM.prototype.on = function(event, action){
    Array.prototype.forEach.call(this.element, function(item){
        return item.addEventListener(event, action, false);
    });
}

DOM.prototype.off = function(event, action){
    Array.prototype.forEach.call(this.element, function(item){
        return item.removeEventListener(event, action, false);
    });
}

DOM.prototype.get = function(){
    return this.element;
}
