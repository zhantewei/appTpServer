const bodyParse=ctx=>{
	Object.defineProperty(ctx,'reqBody',{
		get:()=>new Promise((resolve,reject)=>{
			let data='';
			ctx.req.on('data',chunk=>data+=chunk);
			ctx.req.on('end',()=>{
					resolve(data)
				}
			);
		})
	})
}

module.exports=async(ctx,next)=>{
	bodyParse(ctx);
	await next();
}