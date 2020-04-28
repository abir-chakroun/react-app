const mongoose= require('mongoose');

const product_schema = mongoose.Schema ({
   _id: mongoose.Schema.Types.ObjectId,
   title: {type:String, required: true},
   imagePath:{type:String, required: true},
   price:{type: Number, required: true},
   description:{type:String, required: true}

});

module.exports=mongoose.model('Product', product_schema);