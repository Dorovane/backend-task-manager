const jwt= require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY

module.exports=(req,res,next)=>{
  const authHeader=req.headers.authorization
  if(authHeader && authHeader.startsWith('Bearer ')){
    const token=authHeader.split(' ')[1]
    try{
      const decodeToken=jwt.verify(token,SECRET_KEY)
      req.user=decodeToken
      next()
    }
    catch(error){
      console.error(error)
      res.status(400).json({
        message:'Token Invalid'
      })
    }
  }
  else{
    res.status(400).json({
      message:'Token manquant ou mal envoyé'
    })
  }
}