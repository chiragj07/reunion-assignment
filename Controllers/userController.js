const ReunionUser = require('../Models/reunionusers')

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    })
  }

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
  
    const userExists = await ReunionUser.findOne({ email })
  
    if (userExists) {
      res.status(400).json({erro: 'User already exists'})
    }
  
    const user = await ReunionUser.create({
      name,
      email,
      password,
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    } else {
      res.status(400).json({error:'Invalid user data'})
    }
  }

  const authUser = async (req, res) => {
    const { email, password } = req.body
  
    const user = await ReunionUser.findOne({ email })
  
    if (user && (await ReunionUser.matchPassword(password,user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({error:'Invalid email or password'})
    }
  }

const getUser= async(req,res)=>{
    try{
      const user= await ReunionUser.findById(req.user._id);
      if(!user){
        throw new Error('no such user');
      }
      else{
        res.status(200).json({username: user.email, followers: user.followers.length, following: user.following.length })
      }
    }
    catch(err){
      res.status(401).json({message: 'Invalid user'})

    }
  }


  const addFollower = async(req,res)=>{
    try{
        if(req.params.id === req.user._id){
            throw new Error('can not follow yourself')
        }
        const otherUser= await ReunionUser.findById(req.params.id);
        if(!otherUser){
          throw new Error('no such user');
        }
        else{
            await ReunionUser.findByIdAndUpdate(req.params.id, {
                $push: {followers: req.user._id}
            })

            await ReunionUser.findByIdAndUpdate(req.user._id,{
                $push: {following: req.params.id}
            })

          
          res.status(200).json({message:"successfully followed"})
        }
      }
      catch(err){
        res.status(401).json({message: 'Invalid user'})
  
      }
  }

  const removeFollower = async(req,res)=>{
    try{
        const otherUser= await ReunionUser.findById(req.params.id);
        if(!otherUser){
          throw new Error('no such user');
        }
        else{
            await ReunionUser.findByIdAndUpdate(req.params.id, {
                $pull: {followers: req.user._id}
            })

            await ReunionUser.findByIdAndUpdate(req.user._id,{
                $pull: {following: req.params.id}
            })

          
          res.status(200).json({message:"successfully unfollowed"})
        }
      }
      catch(err){
        res.status(401).json({message: 'Invalid user'})
  
      }
  }

module.exports= {authUser, registerUser, getUser,addFollower,removeFollower}