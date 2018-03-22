const https=require('https');
const pem=require('https-pem');
https.createServer(pem,(req,res)=>{
	if(req.method=='POST'){
		req.on('data',chunk=>console.log(chunk.toString()))
	}
	res.end('hello')
}).listen(443)