const express=require("express")  // express모듈을 가져옴
const app=express() //새로운 express 앱을 만듬
const port=5000  //백 서버. 이건 아무거나 해도 된다. 4000,5000 상관 없다.

const mongoose=require("mongoose")
const URL='mongodb+srv://lkh4317:dooli4317@boilerplate.hmxih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(URL)
.then(() =>console.log("MongoDB Connected..."))
.catch((e)=>console.log("MongoDB error: ",e))

app.get('/', (req,res)=>res.send("Hello World!")) //루트 디렉토리에 오면, Hello World를 출력해라
app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))
