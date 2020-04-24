var mongoose= require('mongoose');

var user_schema = new mongoose.Schema ({

    email:
     {type:String,
    required: true},

    password:
    {type:String,
   required: true}

})

module.exports=mongoose.model('users', user_schema);