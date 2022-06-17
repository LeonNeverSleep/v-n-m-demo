<template>
<div class="total"> 
    <div class="container">        
        <div class="showUsers">
            
            <h1>用户列表</h1>
            <table border="1" align="center">
                 <tr>
                    <td>编号</td>
                    <td>姓名</td>
                    <td>密码</td>
                    <td>元宝</td>
                    <td>操作</td>
                </tr>
                <tr v-for="user in users" :key='user.id'>
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.password}}</td>
                    <td>{{user.money}}</td>
                    <td><a href="" @click="delById(user.id)">删除</a></td>
                </tr>
            </table>
            
        </div>
        
        <div class="searchUsers">
            <h2>用户搜索</h2>
            <p>用户id: <input type="text" v-model="uid"></p>
            <button @click='searchUser()'>搜索用户</button> 
            <div v-if="user">
                用户id: {{user.id}} <br>
                用户姓名: {{user.name}} <br>
                元宝余额: {{user.money}} <br>
                密码: {{user.password}} <br>
            </div>
            <div>
                <h2>余额充值</h2>
                <p>充值: <input type="text" v-model="money">  <button @click="chargeMoney()">确定充值</button></p>
            </div>
        </div>
       
        <div class="registerUsers">
            <h2>新用户注册</h2>
            <form action="">
                <p>用户名: <input type="text" v-model="newUser.name"> </p>
                <p>密码: <input type="text" v-model="newUser.password"> </p>
                <button @click="registerUser()" >注册</button>
            </form>
        </div>
    </div>
</div>
   
</template>
<script setup>
    import {getUsers,getUser,reg,charge,delUser} from '@/http/user.js'
    import {ref} from 'vue'
    const uid = ref(1)
    const users = ref([])
    const user = ref()
    const mid = ref(1)
    const newUser = ref({})
    const money = ref(0)
    const errMsg=ref("")

    const loadUsers = function(){
        getUsers().then(res=>{
            if(res.status == 200){
                users.value=res.data.data
            }
        }).catch(err=>{console.log(err);})
    }

    function searchUser(){
        getUser({id:uid.value}).then(res=>{
            if(res.status==200){
                user.value = res.data.data[0]
            }else{
                user.value=null
            }
        }).catch(err=>{console.log(err);})
    }

    function registerUser(){
        if(!newUser.value.name){
            alert('必须填写用户名噢!')
            return false
        }
         if(!newUser.value.password){
            alert('必须填写密码噢!')
            return false
        }
        let m ={...newUser.value,money:100}
        reg(m).then(res=>{
            loadUsers()
        }).catch(err=>{
            errMsg.value = err
        })
    }

    function chargeMoney(){
        if(!money.value){
            alert('请输入充值金额!')
            return false
        }
        if(isNaN(money.value)){
            alert('充值金额必须是数字!')
            return false
        }
        if(!Number.isInteger(Number(money.value))){
            alert('充值金额必须是整数!')
            return false
        }
        charge({id:user.value.id,money:money.value}).then(res=>{
            errMsg.value="充值成功!"
            setTimeout(()=>{
                errMsg.value=""
                loadUsers()
            },1000)
        }).catch(err=>{
            errMsg.value = err
        })

    }
    function delById(id){
        if(!confirm('你真的要删除该用户吗?')){
            return false
        }
        delUser({id:id}).then(res=>{
            console.log(res);
            loadUsers()
        }).catch(err=>{
            errMsg.value = err
        })

    }
    
    loadUsers()
</script>
<style>
.total{
    background-image: url(https://t7.baidu.com/it/u=3893052629,2697609392&fm=193&f=GIF);
    background-repeat: no-repeat;
    background-size: 100%;
    width: 1500px;
    height: 700px;
}
.container{
    height: 100%;
    width: 1200px;
    margin: auto;
}
.showUsers{
    float: left;
    margin-right: 10px;
    border: 2px solid royalblue;
}
.searchUsers{
    float: left;
    margin-right: 10px;
    border: 2px solid royalblue;
}
.registerUsers{
    float: left;
    margin-right: 10px;
    border: 2px solid royalblue;
}
</style>