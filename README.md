# EventEmitter

A JS event emitter

## API and Usage

### new EventEmitter

New an `EventEmitter` instance

```js
var em = new EventEmitter();
```

### Register an event handler

`EventEmitter.bind(event, fn[, context])` alias for `EventEmitter.on`

####

```js
em.bind('foo', function() {
    console.log('bar');
});
```

```js
var fn = function() {
    console.log('bar');
};
em.bind('foo', bar);
```

```js
em.bind('foo', function() {
    console.log(this.bar);
}, {
    bar: 'lorem'
});
```

### Register a single-shot event handler

`EventEmitter.once(event, fn[, context])`

```js
em.once('foo', function() {
    console.log('bar');
});
```

### Emit an event

`EventEmitter.trigger(event[, arg, arg, ...])` alias for `EventEmitter.emit`

```js
em.trigger('foo');
```

```js
em.trigger('foo', 'arg1', 'arg2');
```

### Remove event or listener

`EventEmitter.remove([event[, listener]])` alias for `EventEmitter.off`

```js
// remove all events
em.remove();
```

```js
// remove all listeners on the event
em.remove('foo');
```

```js
// remove the listener on the event
em.remove('foo', bar);
```

## Browser support

* Chrome
* Firefox
* IE 6+
