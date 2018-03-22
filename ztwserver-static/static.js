const fs=require('fs');
const switchHeader=require('ztwserver-switchheader');
const staticOpts=require('./options.js');
module.exports=(urlPath,nativePath,opts={},disSize=100)=>{
	urlPath=urlPath?'/'+urlPath+'/':'/';
	nativePath=nativePath+'/';
	const runOpts=staticOpts(opts);

	return async(ctx,next)=>{

		if(ctx.req.url.indexOf(urlPath)==0){

			const pathName=ctx.req.url.slice(urlPath.length);
				
			if(pathName){
				const result=await new Promise((resolve,reject)=>{

					const view=(readPath,skip)=>{
						fs.open(readPath,'r+',(err,fd)=>{
						if(err&&!skip){
								if(opts.index){
									//send main index:
									//ctx.sendFile(nativePath+'/'+opts.index)
									return view(nativePath+'/'+opts.index,true);
									
								}else{
									return resolve(false);
								}
							};
						switchHeader(pathName,ctx.res);

						fs.fstat(fd,(err,data)=>{
							//run options;
							if(runOpts(data,ctx)){
								fs.close(fd,()=>resolve(true));
								return;
							}

							let 
							nowDis=disSize,
							nowSize=0,
							totalSize=data.size,
							buffer,
							isBreak,
							endSize;
							const read=()=>{

								endSize=totalSize-nowSize;
								if(totalSize-nowDis<=nowSize){
									isBreak=true;
									nowDis=endSize;
								};
								buffer=Buffer.alloc(nowDis);
								
								fs.read(fd,buffer,0,nowDis,nowSize,(err,byt,bf)=>{

									nowSize+=nowDis;
									ctx.res.write(bf);
									if(isBreak){
										buffer=null;	
										fs.close(fd,()=>{
											ctx.res.end();
											resolve(true);
										});
									}else{
										read();
									}
								})
							}
							read();
						})
						})
					}
					view(nativePath+pathName)

					/*
					const rs=fs.createReadStream(nativePath+pathName);
					
					rs.on('error',e=>resolve(false));
					
					rs.pipe(ctx.res);
					*/
				})
				if(!result){
					await next()
				}else{
					return;
				}
			}else{
				await next();
			}
		}else{
			await next();
		}
	}
}
