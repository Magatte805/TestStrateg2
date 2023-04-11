const express = require("express")
const app = express()
const path = require("path")
const user = require("./mongodb")
const templatePath = path.join(__dirname,'../templates')





app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.set("view engine", "hbs")
app.set("views", templatePath)


app.get("/",(req,res)=> {
    res.render("home")
})
app.get("/login",(req,res)=> {
    res.render("login")
})
app.get("/register",(req,res)=> {
    res.render("register")
})



app.post("/register",async(req,res)=>{ 
    const email = req.body.email;
    const password = req.body.password;


    if (!email || !password) {
        return res.status(400).json({error: "email et mot de passe exite déja "});}   
const data = {
    email:req.body.email,
    password:req.body.password
}
await user.insertMany([data])
return  res.redirect("/users");

}) 
app.get("/users", async (req, res) => {
    try {
        const users = await user.find({});
        res.render("users", { users: users }); // Pass the users data to the view
    } catch (err) {
        res.send("Une erreur s'est produite : " + err.message);
    }
});

app.post("/login",async(req,res)=>{ 
    try {
        const check = await user.findOne({email:req.body.email})
       
        if (!check) {
            return res.status(401).send("Adresse e-mail ou mot de passe incorrect");}
        if (check.password== req.body.password){
            
            res.redirect("/users"); // Pass the users data to the view
                
                
    
    }
        else{
            res.send("Mot de passe incorrect");
        }
        
    } 

    catch(err) { 
        res.send("Une erreur s'est produite lors de l'authentification : " + err.message) 
    }
            }
   
    ) 
 
    

    app.listen(3000, () => {
        console.log("app running at 3000 port");
    }) 
