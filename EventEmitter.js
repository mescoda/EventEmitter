var EventEmitter = (function() {
    function EventEmitter() {
        this.events = {};
        this.on = this.bind;
        this.off = this.removeEvent;
        this.emit = this.trigger;
    }

    EventEmitter.prototype.bind = function(name, handler, context) {
        var event,
            events;
        this.events[name] = this.events[name] || [];
        events = this.events[name];
        event = {
            handler: handler,
            context: context
        };
        events.push(event);
        return this;
    };

    EventEmitter.prototype.once = function(name, handler, context) {
        var self = this;
        function temp() {
            self.removeEvent(name, temp);
            handler.apply(this, arguments);
        }
        this.bind(name, temp, context);
        return this;
    };

    EventEmitter.prototype.trigger = function(/*name, param1, param2...*/) {
        var name = arguments[0],
            events = this.events[name] || [],
            params = Array.prototype.slice.call(arguments, 1);
        events = Array.prototype.slice.call(events, 0);
        for(var i = 0, iLen = events.length; i < iLen; i++) {
            events[i].handler.apply(events[i].context || this, params);
        }
        return this;
    };

    EventEmitter.prototype.removeEvent = function(name, handler) {
        var events = this.events[name] || [],
            index = -1;
        if(arguments.length === 0) {
            this.events = {};
            return this;
        }
        if(arguments.length === 1) {
            this.events[name] = [];
            return this;
        }
        for(var i = 0, iLen = events.length; i < iLen; i++) {
            if(events[i].handler === handler) {
                index = i;
            }
        }
        if(index !== -1) {
            events.splice(index, 1)
        }
        return this;
    };

    return EventEmitter;
})();
