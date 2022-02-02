const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const saltRounds=10; //salt를 이용해서 비밀번호를 암호화함, saltRounds는 salt가 몇글자인지

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

userSchema.pre("save",function(next){ //index.js에서 저장하기 전에(pre) function을 수행
    var user =this;
    
    if(user.isModified("password")){ //비밀번호가 바뀌었을 때만... (이름이나 이메일이 바뀌었을땐 비번 암호화 다시 하면 안됨)
        //비밀번호를 암호화 한다.
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next(err)
        
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password=hash //DB에는 해쉬된 비밀번호가 들어가게 된다.
                next()
            })
        })
    }else{ //비밀번호를 안 바꾸면 그냥 save로 넘어갈 수 있게 next()하기
        next()
    }
})

userSchema.methods.comparePassword=function(plainPassword,cb){
    //plainPassword 1234567  암호화된 비번 $2b~~~
    bcrypt.compare(plainPassword,this.password, function(err,isMatch){
        if(err) return cb(err),
        cb(null, isMatch) //비번이 서로 같으면 err는 없고, isMatch(true)를 보냄
    })
}

const User=mongoose.model("User",userSchema) //(모델 이름, 스키마)

module.exports={User} //다른 파일에서도 이 모듈을 쓸 수 있게 함