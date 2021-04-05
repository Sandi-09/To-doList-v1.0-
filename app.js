const express=require("express");
const bodyParser=require("body-parser");
const { static } = require("express");

const app=express();
let items=["Buy Food","Cook Food","Eat food"];
let workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
 

app.get("/",function(req,res){
  //res.send("Hello");
  let today=new Date();
 //var currentDay=today.getDay();
 let options={
   weekday:"long",
   day:"numeric", 
   month:"long"
 };
 
 let day=today.toLocaleDateString("en-US",options);
 
res.render("list", { ListTitle:day,NewListItems:items });
})

app.post("/",function(req,res){
 item= req.body.newItem;
 console.log(req.body); 
 if(req.body.list==="Work")
 {
  workItems.push(item);
  res.redirect("/work");
 }
 else
 {
  items.push(item); 
  res.redirect("/");
 }

});

app.get("/work",function(req,res){
res.render("list",{ListTitle:"Work List",NewListItems:workItems });  
});

app.post("/work",function(req,res){
let item=req.body.newItem;
workItems.push(item);
res.redirect("/work");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000,function(){
  console.log("Server is started on port --- 3000");
})