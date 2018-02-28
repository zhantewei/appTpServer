const Server=require('../ztwserver');
const Router=require('../ztwserver-router');
const Static=require('../ztwserver-static');
const bodyParse=require('./bodyParse.js');
const app=new Server();
const router=new Router();

const myRouter=require('./router/router.js')(router);
app.use(bodyParse);
app.use(async(ctx,next)=>{

	ctx.res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
	ctx.res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,DELETE');
	ctx.res.setHeader('Access-Control-Allow-Headers','cache-control,content-type,pragma,usercode,brandcode,accountcode,cache-control,content-type,positioncode,pragma,storecode,x-app-code,x-resource-code,x-track-code');
	ctx.res.setHeader('Access-Control-Allow-Credentials','true');
	if(ctx.req.method=='OPTIONS')return ctx.body='empty';
	await next();
})
app.use(myRouter.routes());
app.use(Static('static','assets',{
	etag:true,
	gzip:true
}));
app.use(async(ctx,next)=>{
	
	const now=new Date();
	let next0=new Date(now.getTime()+600000);
	let aaa='name=3;Path=/path2;Expires='+next0.toGMTString()+';Secure';

	ctx.body=`
		<html>
			<link href='/static/main.css' rel='stylesheet'>
			<header>
				<style>

				</style>
			</header>


			<body>
				<div class='container'>
					<button disabled>1</button>
					<button>2</button>
					<h3>Router</h3>
					<ul class='url1'>
						<li><a href='path1'>path1</a></li>
						<li><a href='path2'>path2</a></li>
						<li><a href='path3'>path3</a></li>
					</ul>

					<h3>static Html</h3>
				
					<p>
						<button id='btn1' onclick="click()"">click</button>
					</p>
				</div>
			</body>
			<script>
				btn1.onclick=()=>{
					const xhr=new XMLHttpRequest();
					xhr.open('get','http://localhost:3000');
					xhr.onload=function(){
						console.log(document.cookie)
					}
					xhr.send();
					}
			</script>
		</html>


	`;
})

app.listen(3000)