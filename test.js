const https=require('https');
const body=JSON.stringify({ruleName: "1001008", ruleValue: "1", storeCode: "11201", source: "dcis"});
console.log(body,Buffer.byteLength(body,'utf8'))
const cookie=
'cmt2_d_account_code=dd3hv0; cmt2_d_sale_code=CH1326; cmt2_d_position_code=D_PO_2019; cmt2_d_store_code=11201; cmt2_d_brand_code=22; cmt2_d_sign=00cc1cb46957986d8596a3882b8f8efb; cmt2_d_doss_brand_id=2; SGM_OAUTH_CODE=16032a2672ecc1ae229d07fb606b3ecf; DP_SELECT_POSITION_DCIS=CH1326#2200662#D_PO_2019#8e8db39d5613ca815f45ed00aa5ed8ac; JSESSIONID=vGjcmuEzCtHHOrMjQ0M7xdWZNg63Yl7JovhdhB5oztB4HschNBkg!1228844051';

const opts={
	hostname:'dmap.saic-gm.com',
	port:443,
	path:'/cmt2-dcis-dealer/pc/dcisRemoteService/dcis/common/rest/service/lost/rules',
	method:'POST',
	headers:{
		'Content-Type':'application/json',//'application/x-www-form-urlencoded'
		'Cookie':cookie,
		'Content-Length':Buffer.byteLength(body,'utf8')
	},
	rejectUnauthorized:false
}

const req=https.request(opts,(res)=>{
	let data='';
	console.log(res.headers)
	res.on('data',chunk=>data+=chunk.toString());
	res.on('end',()=>{
		console.log(data)
	})
})

req.write(body);
req.end();