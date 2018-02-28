const  fs=require('fs');
const switchHeader=require('ztwserver-switchheader');

module.exports=function(req,res){
	const ctx={};
	Object.defineProperty(ctx,'body',{
		get:()=>null,
		set:(value)=>{
			res.end(typeof value == 'object'?JSON.stringify(value):value);
		}
	})
	ctx.req=req;
	ctx.res=res;
	ctx.sendFile=(path)=>{
		switchHeader(path,res);
		fs.createReadStream(path).pipe(res);
	}
	return ctx;
}