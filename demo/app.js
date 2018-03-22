const Server=require('../ztwserver');
const Router=require('../ztwserver-router');
const Static=require('../ztwserver-static');
const bodyParse=require('./bodyParse.js');
const app=new Server();
const router=new Router();

const myRouter=require('./router/router.js')(router);
app.use(bodyParse);
app.use(async(ctx,next)=>{

	// ctx.res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
	// ctx.res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,DELETE');
	// ctx.res.setHeader('Access-Control-Allow-Headers','cache-control,content-type,pragma,usercode,brandcode,accountcode,cache-control,content-type,positioncode,pragma,storecode,x-app-code,x-resource-code,x-track-code');
	// ctx.res.setHeader('Access-Control-Allow-Credentials','true');
	if(ctx.req.method=='OPTIONS')return ctx.body='empty';
	await next();
})
app.use(myRouter.routes());

app.use(Static('static/dist','assets/dist',{
	etag:true,
	gzip:true,
	index:'index.html'
}));

app.use(Static('static/dist2','assets/dist2',{
	etag:true,
	gzip:true,
	index:'index.html'
}))


app.use(async(ctx,next)=>{
	
	const now=new Date();
	let next0=new Date(now.getTime()+600000);
	let aaa='name=3;Path=/path2;Expires='+next0.toGMTString()+';Secure';

	ctx.body=`
		<html>
			hi
		</html>


	`;
})

app.listen(3001)
