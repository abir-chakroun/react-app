var mongoose= require('mongoose');

var product_schema = new mongoose.Schema ({

  title:
     {type:String,
    required: true},

    imagePath:
     {type:String,
    required: true},

    price:
    {type: Number,
   required: true},

    description:
    {type:String,
   required: true}

})

module.exports=mongoose.model('Product', product_schema);