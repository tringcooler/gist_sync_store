// current-continuation
var cc = (function () {
    
    function coroutine (self) {
        this.pool = {};
        this.pool.self = self;
        this.pool.this = null;
        this.rets = {};
        this.ret_id = 0;
    }
    
    coroutine.prototype.rpush = function (r) {
        var rid = ++this.ret_id;
        this.rets[rid] = r;
        return rid;
    };
    
    coroutine.prototype.rpop = function (rid) {
        var r = this.rets[rid];
        delete this.rets[rid];
        return r;
    };
    
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
    
    coroutine.prototype.e = function (f) {
        selfcc = this;
        othis = selfcc.pool.this;
        selfcc.pool.this = this;
        selfcc.pool.ret = f.call(selfcc.pool);
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
