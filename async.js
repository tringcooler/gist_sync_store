// current-continuation
var cc = (function () {
    
    function coroutine (self) {
        this.pool = {};
        this.pool.self = self;
        this.pool.this = null;
    }
    
    
    coroutine.prototype.c = function (f) {
        var selfcc = this;
        var _cb = function() {
            var othis = selfcc.pool.this;
            selfcc.pool.this = this;
            selfcc.pool.ret = f.apply(selfcc.pool, arguments);
            selfcc.pool.this = othis;
            return selfcc.pool.ret;
        };
        return _cb;
    };
    
    coroutine.prototype.e = function () {
        var f = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var selfcc = this;
        var othis = selfcc.pool.this;
        selfcc.pool.this = this;
        selfcc.pool.ret = f.apply(selfcc.pool, args);
        selfcc.pool.this = othis;
        return selfcc.pool.ret;
    };
    
    return coroutine;
    
})();

/*
function test() {
    var ccc = new cc(this);
    setTimeout(ccc.c(function (a, b, c) {
        this.c = 123;
        console.log('c1');
    }), 100);
    setTimeout(ccc.c(function (a, b, c) {
        console.log('c2', this, this.this, this.c);
    }), 100);
    setTimeout(ccc.c((function (a, b, c) {
        console.log('c3', this, this.this, this.c, a, b, c);
    })).bind('abc', 1, 2, 3), 100);
}
*/
