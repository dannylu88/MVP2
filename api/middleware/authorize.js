const jwt = require('jsonwebtoken');

module.exports = (request, response, next) =>{
	try{
		//need to send token to the header, cuz the body parse doesn't parse token
		/*
         token look like this    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbm55bHU4QG91dGxvb2suY29tIiwidXNlcklkIjoiNWI0Y2RmNTlkMGFmNWIzODQ1Mzc1MGMxIiwiaWF0IjoxNTMxNzczMTIwLCJleHAiOjE1MzE3NzM3MjB9.xsmQEMdOVjec8jZzf1MnBwGaR9gUtCP6AHOzmuQtVdo
         Bearer is an added thing from me on postman, so we just want the token use split


		*/
		const token = request.headers.authorization.split(' ')[1];
		console.log(token);
		                     //request change from request.body.token to just token above
		const decoded = jwt.verify(token, process.env.JWT_KEY);
	    request.userData = decoded;
	    next();
	} catch(error){
		return response.status(401).json({
			message: 'Authorization failed by token'
		});
	}
    
}