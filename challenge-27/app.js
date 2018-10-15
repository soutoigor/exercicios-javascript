function DOM (elements){
    this.element = document.querySelectorAll(elements);
    
   
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

DOM.prototype.eachElement = function(){
    Array.prototype.forEach.apply(this.element, arguments );
}

DOM.prototype.mapElements = function(){
  Array.prototype.map.apply(this.element, arguments);
}

DOM.prototype.filterElements = function(){
    Array.prototype.filter.apply(this.element, arguments);
}

DOM.prototype.reduceElements = function(){
    Array.prototype.reduce.apply(this.element, arguments);
}

DOM.prototype.reduceRighElements = function(){
    Array.prototype.reduceRight.apply(this.element, arguments);
}

DOM.prototype.everyElement = function(){
    Array.prototype.every.apply(this.element, arguments);
}

DOM.prototype.someElements = function(){
    Array.prototype.some.apply(this.element, arguments);
}

DOM.prototype.isArray =  function isArray(element){
    return Object.prototype.toString.call(element) == '[object Array]';
}
DOM.prototype.isObject =  function isObject(element){
    return Object.prototype.toString.call(element) == '[object Object]';
}
DOM.prototype.isFunction =  function isFunction(element){
    return Object.prototype.toString.call(element) == '[object Function]';
}
DOM.prototype.isNumber =  function isNumber(element){
    return Object.prototype.toString.call(element) == '[object Number]';
}
DOM.prototype.isString =  function isString(element){
    return Object.prototype.toString.call(element) == '[object String]';
}
DOM.prototype.isBoolean =  function isBoolean(element){
    return Object.prototype.toString.call(element) == '[object Boolean]';
}
DOM.prototype.isNull =  function isNull(element){
    return Object.prototype.toString.call(element) == '[object Null]' || 
    Object.prototype.toString.call(element) == '[object Undefined]'; 
}
