const fs = require("fs")
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
    static:"./build"
  })
const port = process.env.PORT ||5000;



const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

let userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));


server.use(middlewares)
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(
    jsonServer.rewriter({
        "/api/*":"/$1",
    })
)



const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthorized({ email }) {
   return !(userdb.users.some((user) => user.email === email));
}

function isLoginAuthenticated({ email, password }) {
  return userdb.users.some(
      (user) => user.email === email && user.password === password); 
}

server.use((req, res, next) => {
  if (req.method === 'POST' ) {

  if(req.body.name){
    const {email,password,name} = req.body;

   if (isAuthorized({email}))
    { 
     console.log("authorised user");
     const access_token = createToken({ email,password,name });
     req.body.token = access_token;
     next();
     userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

     
  }

   else {
     const status = 401
     const message = "username already exist"
     res.status(401).json({status,message})
   }
  }
   else{
    const { email, password } = req.body;
    if (!isLoginAuthenticated({ email, password })) {
      const status = 401;
      const message = "Incorrect Email or Password";
      res.status(status).json({ status, message });
      return;
    }
    else if(email === "prasannapinnam999@gmail.com"){
    const access_token = createToken({ email, password });
    res.status(200).json({ access_token, isAdmin:true });
    return;
    }
    
    const access_token = createToken({ email, password });
    res.status(200).json({ access_token});
    
   }
  }

   else{
     next()
   }
  })
  
  


server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running on ${port}`)
})