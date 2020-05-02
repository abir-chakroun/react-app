var mongoose= require('mongoose');

var user_schema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,

    firstName:
    {type:String,
        required: true},

    lastName:
    {type:String,
        required: true},

    email:
     {type:String,
    required: true},

    password:
     {type:String,
    required: true},

    isDeleted:
    {type:Boolean,
   default: false}

})


module.exports=mongoose.model('users', user_schema);