const express = require("express");

const app = express()

const db = require('./mysql.js')

app.use(express.json())
//显示所有用户
app.get('/users',function(req,res,next){
    db.querySql("select * from users",[],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'success'})
        }
    });
});
//查找
app.get('/user',function(req,res,next){
    db.querySql("select * from users where id=?",[req.query.id],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'success'})
        }
    });
});
//注册
app.post('/reg',function(req,res,next){
    console.log(req.body);
    let name=req.body.data.name
    let money=req.body.data.money
    let password=req.body.data.password

    let sql = `INSERT INTO users ( name,money,password ) VALUES ( '${name}','${money}','${password}' )`
    db.querySql(sql,[],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'success'})
        }
    });
});
//删除
app.post('/user/del',function(req,res,next){
    let id = req.body.data.id
    let sql = `delete from users where id=?`
    db.querySql(sql,[id],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'success'})
        }
    });
});

//余额充值
app.post('/charge',function(req,res,next){
    let id = req.body.data.id
    let money = req.body.data.money
    let sql = `UPDATE users SET money=money+? where id=?`
    db.querySql(sql,[money,id],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'success'})
        }
    })
});



const port = 3000
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})
