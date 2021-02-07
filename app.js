require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser')
const request=require('request')
const app=express()
const https=require('https')
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})
    

app.post('/',(req,res)=>{
    // frontend data translated to server
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const listId = '994716766d'
    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName
               }}
        ]
    }
    const jsonData=JSON. stringify(data)
// use http request send to another API
    const url='https://us7.api.mailchimp.com/3.0/lists/994716766d'
    const options={
        method:'POST',
        auth:`ranyou:${process.env.API_KEY}`
    }
   const request= https.request(url,options,(response)=>{
       if (response.statusCode===200){
           res.sendFile(__dirname+'/sucess.html')
       }
       else {
        res.sendFile(__dirname+'/failure.html')
       }
       response.on('data', (data)=>{
            console.log(JSON.parse(data))
        })
    })
request.write(jsonData)
request.end();  


});

app.post ('/sucess', (req,res)=>{
    res.redirect('/')
})


app.post('/failure', (req,res)=>{
    res.redirect('/')
})


app.listen(5500,()=>{
    console.log('server listening at 5500')
})