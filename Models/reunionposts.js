const mongoose = require('mongoose')

const reunionPostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ReunionUser',
    },

    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:'ReunionUser'
        }
    ]

    },
  {
    timestamps: true,
  }
)

const ReunionPost = mongoose.model('ReunionPost', reunionPostSchema)

module.exports= ReunionPost
