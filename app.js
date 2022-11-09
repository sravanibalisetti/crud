const express = require('express');
const mongoose = require('mongoose');
const Details= require('./model')
const bodyparser = require('body-parser')

const app = express();
app.use(express.json())

mongoose.connect("mongodb+srv://sravani:MY23SZc4s5PqCi4d@cluster0.fhbpngn.mongodb.net/sravani\?retryWrites=true&w=majority").then(
() => console.log('DB connected...'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//get(): to retrive the data.
//find(): retrive all the documents in the collections.
app.get('/get', async (req,res) => {
    try{
    const allData = await Details.find()
    return res.json(allData)
    }
    catch(err)
    {  
    console.log(err);
    }
    })
//post(): to insert the data
app.post('/post',(req,res)=>
{
var User=req.body;
    const newData = new Details(User)
     newData.save(function(err,data)
     {
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(data)
        }
     })
    res.send("okk")
 
}

)

//delete(): delete the particular data by the id
app.delete('/delete/:id',async (req,res)=>{
    try{
        await Details.findByIdAndDelete(req.params.id);
        return res.json(await Details.find())

    }
    catch(err)
{
    console.log(err.message);
}
})

//put(): update the data in the collection
app.put('/update/:id',async(req,res)=>{
    var uid=req.params.id
    await Details.findByIdAndUpdate({_id:uid},{cost:500})
    res.send("update")

})


//filter(): filter the particular data from the collection list.
app.get('/filter',async(req,res)=>{
    try{
   // await Details.find({$and:[{color:'sky'},{brandname:'oppo'},{cost:{$gte:500}}]}, function(err,data){
     await Details.find({cost:{$gte:200}},function(err,data){

    
   res.json(data)
        console.log("filter")
    })
}
catch(err){
    console.log(err)
}
})

//deletemany(): delete the total elements in the array.
app.delete('/del',(req,res)=>{
    Details.deleteMany({brandname:'oppo'},function(err,data){
res.json(data)
    })
})


app.listen(5021)
console.log("127.0.0.1:5021");
console.log("data received");

