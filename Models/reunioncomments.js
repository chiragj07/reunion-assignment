const mongoose = require('mongoose')

const reunionCommentSchema = mongoose.Schema(
  {
    
    comment:{
        type: String,
        required: true
    },

    author:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:'ReunionUser'
        },

    post: {
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:'ReunionPost'
    }
    

    },
  {
    timestamps: true,
  }
)

const ReunionComment = mongoose.model('ReunionComment', reunionCommentSchema)

module.exports = ReunionComment
