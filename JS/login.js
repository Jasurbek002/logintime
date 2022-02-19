var loginform = document.querySelector('.fonlogin__box')
var loginemail = document.querySelector('.box__email__input')
var loginpassword = document.querySelector('.box__password__input')
var loginbtn = document.querySelector('.box__btn')

const APIKEY = 'https://reqres.in/api'

async function getlogin(credentalis){
    new Promise ((resolve,reject)=>{
        fetch(`${APIKEY}/login`,{
            method:'POST',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify(credentalis),
        })
        .then(res=>{
        if(res.status===400)reject(res)
            return res.json()
        
        })
        .then(res=>{
            if(res.token){
                window.localStorage.setItem('token',res.token)
                window.location.replace('index.html')
            }
            alert(JSON.stringify(res.error))
        })
        .catch(err=>{
            alert(err)
        })

        
    })
}

loginform.addEventListener('click',(event)=>{
    event.preventDefault()
    console.log(event.target.matches(".box__btn"))

    const body = {
        email:loginemail.value,
        password:loginpassword.value
    }
    try{
        getlogin(body)
    }catch{
        alert(error)
    }
    
})