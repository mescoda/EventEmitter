var EventEmitter = (function() {
    function EventEmitter() {
        this.events = {};
        this.on = this.bind;
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
            handler.call(this);
        }
        handler._remove = temp;
        this.bind(name, temp);
    };

    EventEmitter.prototype.trigger = function(/*name, param1, param2...*/) {
        var name = arguments[0],
            events = this.events[name] || [],
            params = Array.prototype.slice.call(arguments, 1);
        for(var i = 0, iLen = events.length; i < iLen; i++) {
            events[i].handler.apply(events[i].context || this, params);
        }
        return this;
    };

    EventEmitter.prototype.removeEvent = function(name, handler) {
        var events = this.events[name] || [];
        if(arguments.length === 0) {
            this.events = {};
            return this;
        }
        if(arguments.length === 1) {
            this.events[name] = [];
            return this;
        }
        for(var i = 0, iLen = events.length; i < iLen; i++) {
            if(events[i].handler == handler || events[i].handler._remove == handler) {
                events.splice(i, 1)
            }
        }
        return this;
    };

    return EventEmitter;
})();
