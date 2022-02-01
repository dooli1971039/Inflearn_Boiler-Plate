const express=require("express")  // express모듈을 가져옴
const app=express() //새로운 express 앱을 만듬
const port=5000  //백 서버. 이건 아무거나 해도 된다. 4000,5000 상관 없다.
const bodyParser =require("body-parser"); //body-parser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 한다
const {User} = require("./models/User");

const config = require("./config/key");

//application/x-www-form-urlencoded  이렇게 된 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({extended: true}));

//application/json 타입으로 된 것을 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json());

const mongoose=require("mongoose")
mongoose.connect(config.mongoURI)
.then(() =>console.log("MongoDB Connected..."))
.catch((e)=>console.log("MongoDB error: ",e))

app.get('/', (req,res)=>res.send("Hello World")) //루트 디렉토리에 오면, Hello World를 출력해라

app.post("/register", (req,res)=> {

    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    const user=new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({  //status(200)은 성공했다는 표시
            success:true
        })
    })
})


app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))
