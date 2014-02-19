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

    EventEmitter.prototype.trigger = function(/*name, param1, param2...*/) {
        var name = arguments[0],
            events = this.events[name] || [],
            params = Array.prototype.slice.call(arguments, 1);
        for(var i = 0, iLen = events.length; i < iLen; i++) {
            events[i].apply(events[i].context || this, params);
        }
        return this;
    };

    EventEmitter.prototype.removeEvent = function(name, handler) {
        var events = this.events[name] || [];
        for(var i = 0, iLen = events.length; i < iLen; i++) {
            if(events[i].handler = handler) {
                events[i] = null;
            }
        }
        return this;
    };

    EventEmitter.prototype.removeAllEvents = function(name) {
        if(name) {
            this.events[name] = [];
        } else {
            this.events = {};
        }
        return this;
    };
})();
