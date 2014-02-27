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
                test = [1];
            em.bind('test', function() {
                test.push(2);
            });
            em.bind('test', function()  {
                test.push(3);
            });
            em.trigger('test');
            console.log(test);
            expect(test).toEqual([1, 2, 3]);
        });
        it('bind with param', function() {

        });
    });
});
