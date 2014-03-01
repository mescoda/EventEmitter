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
    });
});
