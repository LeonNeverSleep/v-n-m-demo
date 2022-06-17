import $http from "./index.js";

export function getUsers(){
    return $http.get('/users')
}

export function getUser(params){
    return $http.get('/user',{
        params
    })
}

export function reg(data){
    return $http.post('/reg',{
        data
    })
}

export function charge(data){
    return $http.post('/charge',{
        data
    })
}

export function delUser(data){
    return $http.post('/user/del',{
        data
    })
}