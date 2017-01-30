const Redis  = require  ("ioredis");
const Store = require  ("koa-session2").Store;

 class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis();
    }
    //返回查出来的结果

    async get(sid) {
        return await this.redis.get(`SESSION:${sid}`);
    }
    //opts是一个对象 1 opts就是个对象  然后返回一个对象
    async set(session, opts) {
        if(!opts.sid) {
            opts.sid = this.getID(24);
        }
        await this.redis.set(`SESSION:${opts.sid}`, session);
        return opts.sid;
    }

    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports=RedisStore;
