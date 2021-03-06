var EventEmitter = (function() {
    function EventEmitter() {
        this.events = {};
        this.on = this.bind;
        this.off = this.remove;
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
            self.remove(name, temp);
            handler.apply(this, arguments);
        }
        temp.handler = handler;
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

    EventEmitter.prototype.remove = function(name, handler) {
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
            if(events[i].handler === handler || events[i].handler.handler === handler) {
                events.splice(i, 1);
                break;
            }
        }
        return this;
    };

    return EventEmitter;
})();
