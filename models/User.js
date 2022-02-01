const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //입력값의 스페이스를 없애주는 역할
        unique:1 //유일해야 함
    },
    password:{
        type:String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        defalut:0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }

})

const User=mongoose.model("User",userSchema) //(모델 이름, 스키마)

module.exports={User} //다른 파일에서도 이 모듈을 쓸 수 있게 함