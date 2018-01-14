var gss = (function () {
    
    gist_api_url = 'https://api.github.com/gists';
    
    function gist_base() {}
    
    gist_base.prototype.create = function (suc) {
        $.ajax({
            type: "POST",
            url: gist_api_url,
            data: JSON.stringify({
                "description": "a gist sync store",
                "public": false,
                "files": {
                    "entries.json": {
                        "content": "{}"
                    }
                }
            }),
            success: function (data) {
                console.log(data);
                var gid = data.id;
                suc(gid);
            },
            dataType: "json",
        });
    };
    
    function gist_sync_store(gid = null, sid = null) {
        var ccc = new cc(this);
        ccc.e(function () {
            var ctx = this;
            ctx.self.gbs = new gist_base();
            if(gid === null) {
                ctx.self.gbs.create(ccc.c(_cr));
            } else {
                ccc.e(_cr, gid);
            }
            function _cr(gid) {
                var ctx = this;
                console.log('gid', gid);
                ctx.self.gid = gid;
                if(sid === null) {
                    console.log('sid null');
                }
                ctx.self.sid = sid;
                ctx.self.reload();
            }
        });
    }
    
    gist_sync_store.prototype.reload = function () {
        this.store_pool = {};
    };
    
    return gist_sync_store;
    
})();