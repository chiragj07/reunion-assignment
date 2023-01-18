const jwt = require('jsonwebtoken');
const ReunionUser =  require('../Models/reunionusers');

const protect = async (req,res,next)=>{

    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        req.user = await ReunionUser.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.error(error)
        res.status(401).json({error:'Not authorized, token failed'})
      }
    }
  
    if (!token) {
      res.status(401).json({error:'Not authorized, no token'})
    }

}


module.exports = {protect}