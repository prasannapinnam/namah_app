import http from "./httpService";


export function register(user){
  return http.post("http://localhost:5000/users",{
        email:user.username,
        password: user.password,
        name:user.name
    });
}

export function login(username,password){
  return http.post("http://localhost:5000/users",{
    email:username,
    password:password
});
}
