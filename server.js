const { json } = require("express");
const express= require("express")
const users =require("./MOCK_DATA.json")

const app=express();

app.use(express.json())



app.get("/",function(request,response){

    return response.send("Welcome to Home page")
})

app.get("/users",function(request,response){

    return response.send({data:users})
})
let user;
app.post("/users",function(request,response){
 let data1={data:users};
   let req=request.body ;
   data1.data.push(req)       
 return response.send(data1)
})

app.patch("/users/:id",function(request,response){
    let data2={data:users};
    let id=request.params.id
    let body=request.body
    let name=body.first_name
    let reqObj;
    for(let i=0;i<data2.data.length;i++){
        if(data2.data[i].id==id){
            reqObj=data2.data[i]
            break;
        }
    }
    reqObj.first_name=name
    response.status(200).json({
        updated:reqObj
    })
    
})

app.delete("/users/:id",function(request,response){
    let data3={data:users};
    let id=request.params.id;
    let arr=[]
    for(let i=0;i<data3.data.length;i++){
        if(data3.data[i].id!=id){
            arr.push(data3.data[i]);
        }
    }
    return response.send(arr)
   
})

app.listen(2345,()=>{

    console.log("listing to port 2345");
})