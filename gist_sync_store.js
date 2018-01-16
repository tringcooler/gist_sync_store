var gss = (function () {
    
    gist_api_url = 'https://api.github.com/gists';
    
    function gist_base() {
        this.headers = {
            "Authorization": "Basic QlNvRFB1YjphMTExMTEx",
        };
    }
    
    gist_base.prototype.create = function (suc = null, err = null, timeout = 3, stt_rtry = 0) {
        $.ajax({
            type: "POST",
            headers: this.headers,
            url: gist_api_url,
            data: JSON.stringify({
                "description": "a gist sync store",
                "public": false,
                "files": {
                    "entries.json": {
                        "content": "{}"
                    },
                }
            }),
            dataType: "json",
        }).done(function (data, sta, xhr) {
            console.log(data);
            var gid = data.id;
            if(suc) suc(gid);
        }).fail(function (xhr, sta) {
            if(stt_rtry < timeout) return self.create(suc, err, timeout, stt_rtry + 1);
            console.log('err:', sta, xhr.status, xhr.statusText);
            if(err) err(xhr.status);
        });
    };
    
    gist_base.prototype.edit = function (gid, fdict, suc = null, err = null, timeout = 3, stt_rtry = 0) {
        var self = this;
        var fls = {};
        for(var fn in fdict) {
            if(typeof(fdict[fn]) == "string") {
                fls[fn] = {"content": fdict[fn]};
            } else {
                fls[fn] = fdict[fn];
            }
        }
        $.ajax({
            type: "PATCH",
            headers: this.headers,
            url: gist_api_url + '/' + gid,
            data: JSON.stringify({
                "description": "a gist sync store",
                "files": fls,
            }),
            dataType: "json",
        }).done(function (data, sta, xhr) {
            console.log(data);
            if(suc) suc();
        }).fail(function (xhr, sta) {
            if(stt_rtry < timeout) return self.edit(gid, fdict, suc, err, timeout, stt_rtry + 1);
            console.log('err:', sta, xhr.status, xhr.statusText);
            if(err) err(xhr.status);
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
    
    gist_sync_store.prototype.test = function () {
        var ccc = new cc(this);
        ccc.e(function () {
            var ctx = this;
            var rf = {}
            for(var i = 0; i < 3; i ++) {
                var fn = '#tst' + i + '.txt';
                //rf[fn] = '#test' + i;
                rf[fn] = null;
            }
            ctx.self.gbs.edit(ctx.self.gid, rf);
        });
    };
    
    return gist_sync_store;
    
})();