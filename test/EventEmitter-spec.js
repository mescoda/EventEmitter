describe('EventEmitter', function() {
    describe('event bind', function() {
        it('single bind', function() {
            var em = new EventEmitter(),
                test = true;
            em.bind('test', function() {
                test = false;
            })
            expect(test).toBeTruthy();
            em.trigger('test');
            expect(test).toBeFalsy();
        });
        it('multi bind', function() {
            var em = new EventEmitter(),
                result = [1];
            em.bind('test', function() {
                result.push(2);
            });
            em.bind('test', function()  {
                result.push(3);
            });
            em.trigger('test');
            expect(result).toEqual([1, 2, 3]);
        });
        it('bind with param', function() {
            var em = new EventEmitter(),
                result = [];
            em.bind('test', function(param) {
                result.push(param);
            });
            em.trigger('test', 'first');
            expect(result).toEqual(['first']);
            em.bind('foo', function(param1, param2) {
                result.push(param1, param2);
            });
            em.trigger('foo', 'second', 'third');
            expect(result).toEqual(['first', 'second', 'third']);
        });
        it('bind with context', function() {
            var em = new EventEmitter(),
                result = [];
            var object = {
                lor: 'first'
            };
            em.bind('bar', function() {
                result.push(this.lor);
            }, object);
            em.trigger('bar');
            expect(result).toEqual(['first']);
        });
        it('bind inside function', function() {
            var em = new EventEmitter(),
                result = [];
            var param = 'out';
            var object = {
                param: 'in',
                init: function() {
                    var self = this;
                    em.bind('foo', function() {
                        result.push(self.param);
                    });
                }
            };
            object.init();
            em.trigger('foo');
            expect(result).toEqual(['in']);
        });
    });
    describe('event remove', function() {
        it('remove whole event', function() {
            var em = new EventEmitter(),
                result = [];
            em.bind('foo', function() {
                result.push('first');
            });
            em.trigger('foo');
            em.removeEvent('foo');
            em.trigger('foo');
            expect(result).toEqual(['first']);
        });
        it('remove one handler form event', function() {
            var em = new EventEmitter(),
                result = [];
            em.bind('bar', function() {
                result.push('first');
            });
            em.bind('bar', function(param) {
                result.push(param);
            });
            var handler = function() {
                result.push('ending');
            };
            em.bind('bar', handler);
            em.trigger('bar', 'second');
            expect(result).toEqual(['first', 'second', 'ending']);
            em.removeEvent('bar', handler);
            em.trigger('bar', 'second');
            expect(result).toEqual(['first', 'second', 'ending', 'first', 'second']);
        });
        it('remove all events', function() {
            var em = new EventEmitter(),
                result = [];
            em.bind('bar', function() {
                result.push('first');
            });
            em.bind('foo', function() {
                result.push('second');
            });
            em.trigger('bar');
            em.trigger('foo');
            expect(result).toEqual(['first', 'second']);
            em.removeEvent();
            em.trigger('bar');
            em.trigger('foo');
            expect(result).toEqual(['first', 'second']);
        });
        it('remove inside function', function() {
            var em = new EventEmitter(),
                result = [];
            var a = function() {
                em.off('foo', b);
            };
            var b = function() {
                result.push(1);
            };
            em.on('foo', a);
            em.on('foo', b);
            em.emit('foo');
            expect(result).toEqual([1]);
            em.emit('foo');
            expect(result).toEqual([1]);
        });
    });
    describe('event once', function() {
        it('bind once event', function() {
            var em = new EventEmitter(),
                result = [];
            em.once('foo', function() {
                result.push(1);
            });
            em.bind('foo', function() {
                result.push('first');
            });
            em.once('foo', function() {
                result.push(2);
            });
            em.trigger('foo');
            expect(result).toEqual([1, 'first', 2]);
            em.trigger('foo');
            expect(result).toEqual([1, 'first', 2, 'first']);
        });
        it('bind once with fn name', function() {
            var em = new EventEmitter(),
                result = [];
            var handler = function() {
                result.push(1);
            };
            em.once('bar', handler);
            em.bind('bar', function() {
                result.push('first');
            });
            em.trigger('bar');
            expect(result).toEqual([1, 'first']);
            em.trigger('bar');
            expect(result).toEqual([1, 'first', 'first']);
        });
        it('bind once with context', function() {
            var em = new EventEmitter(),
                result = [];
            var object = {
                lor: 'first',
                zol: 1
            };
            em.bind('foo', function() {
                result.push(this.lor);
            }, object);
            em.once('foo', function() {
                result.push(this.zol);
            }, object);
            em.trigger('foo');
            expect(result).toEqual(['first', 1]);
            em.trigger('foo');
            expect(result).toEqual(['first', 1, 'first']);
        });
        it('bind once with param', function() {
            var em = new EventEmitter(),
                result = [];
            em.once('bar', function(value) {
                result.push(value);
            });
            em.trigger('bar', 1);
            em.trigger('bar', 2);
            expect(result).toEqual([1]);
        });
    });
});
