var gss = (function () {
    
    gist_api_url = 'https://api.github.com/gists/';
    
    function gist_base() {}
    
    gist_base.prototype.create = function () {
        $.ajax
    };
    
    function gist_sync_store(gid = null, sid = null) {
        var ccc = new cc(this);
        ccc.r(function () {
            ctx = this;
            ctx.this.gbs = new gist_base();
            
        });
        
        if(gid === null) {
            gid = this.gbs.create();
        }
        if(sid === null) {
            
        }
        this.gid = gid;
        this.sid = sid;
        this.reload();
    }
    
    gist_sync_store.prototype.reload = function () {
        this.store_pool = {};
    };
    
    return gist_sync_store;
    
})();