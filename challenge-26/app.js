function DOM (nodeDom){
    this.element = document.querySelectorAll(nodeDom); 
    this.on = function(event, action){
        var el = this.element;
        el.forEach(function(item){
            return item.addEventListener(event, action, false);
        });
    }
    this.off = function(event, action){
        
    }
  }

