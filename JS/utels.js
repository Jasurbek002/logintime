let token =window.localStorage.getItem('token')

if(!token){
    window.location.replace('login.html')
    alert('Sizda token yoq')
}
// if(!token==undefined){
//     window.location.replace('index.html')
//     alert('Sizda token yoq')
// }
