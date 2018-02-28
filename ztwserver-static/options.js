/***
 	opts:{
		etag:boolean;
		cache:millisecond;
		
 	}

***/

module.exports=(opts)=>{
	let run=(stat,ctx)=>{};

	//etag:

	if(opts.etag!==undefined){
		const old=run;
		run=(stat,ctx)=>{
			let mtime=Date.parse(stat.mtime);
			const last=ctx.req.headers['if-none-match'];

			if(ctx.req.headers['if-none-match']==mtime){
				ctx.res.writeHead(304);
				ctx.res.end();
				return true;
			}
			ctx.res.setHeader('Etag',mtime);
			return old(stat,ctx);
		}
	}

	//cache:

	if(opts.maxAge!==undefined){
		const old=run;
		run=(stat,ctx)=>{
			ctx.res.setHeader('Cache-Control','max-age='+opts.maxAge);
			return old(stat,ctx);
		}
	}
	if(opts.gzip){
		const old=run;
		run=(stat,ctx)=>{
			ctx.res.setHeader('Content-Encoding','gzip');
			return old(stat,ctx);
		}
	}
	return run;

}