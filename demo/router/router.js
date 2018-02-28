module.exports=(router)=>{
	router.get('path1',ctx=>{
		ctx.res.setHeader('Set-Cookie',"name=aaa;age=1");
		ctx.body=`
			<html>
				<body></body>
				<button id='btn1'>clean</button>
				<script>
					const btn1=document.getElementById('btn1');
					btn1.onclick=()=>{
						const date=new Date().getTime()-1;
						const expires=new Date(date).toGMTString();
						 document.cookie='age=1;expires='+expires;
					}
				</script>
			</html>

		`

	});
	router.get('path2',ctx=>ctx.body='path2');
	router.get('path3',ctx=>ctx.body='path3');
	router.get('path4',async(ctx)=>{
		ctx.res.setHeader('Set-Cookie','age=11')
		ctx.body='path4Content'
	});
	router.get('path5',async(ctx)=>{

		ctx.body={a:1,b:3};
	})
	router.post('path5',async(ctx)=>{

		ctx.body=await new Promise(resolve=>{
			setTimeout(()=>resolve({a:1,b:4}),2000)
		}) 
	})
	return router;

}