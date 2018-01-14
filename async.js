// cc: current-continuation
var coroutine = (function () {
    
    function coroutine (self) {
        this.pool = {};
        this.pool.self = self;
        this.pool.this = null;
        this.rets = {};
        this.ret_id = 0;
        this.pool.__coroutine__ = this;
    }
    
    coroutine.prototype.pack = function () {
        return [this, this.pool];
    };
    
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
    
    coroutine.prototype.r = function () {
        
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

function test(a = null) {
    var [cc, ctx] = new coroutine(this).pack();
    ctx.c = 123;
    console.log('c1', ctx.self, ctx.this, ctx.c);
    if(a) {
        cc = cc.r();
        setTimeout(cc.w, 100);
        ccc(ctx);
    }
}
