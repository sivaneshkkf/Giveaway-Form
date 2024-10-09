const loginformEl=document.forms.loginForm;


const validation = (e) => {

    [...loginformEl.elements].forEach((el) => {
        el.required = true;
    })

    loginformEl.addEventListener('submit', handleloginFrom)


}

loginformEl.btn.addEventListener("click", (e) => {
    validation()
})

const handleloginFrom = (e) => {
    e.preventDefault()

    loadingAnim("show")
    const formData = new FormData(loginformEl);

    const obj = Object.fromEntries(formData);

    const {email, pw} = obj;

    loginUser(email,pw).then((user) => {
        loginformEl.reset()
        
        loadingAnim('hide')
       
        storeLocalStorage(user)

        window.location.replace("dashboard.html")
        
    }).catch(({errorCode}) => {

        if(errorCode === 'auth/invalid-credential'){
            alert("Username/password doesn't exist")
        }

        if(errorCode === 'auth/too-many-requests'){
            alert("Too many requests! Please try again later")
            
        }

        console.log(errorCode);
        loadingAnim("hide")
        
    });
}


function loadingAnim(state) {

    if(state === "hide"){
        loginformEl.btn.querySelector("svg").classList.replace("block","hidden")
        loginformEl.btn.querySelector("p").innerHTML="Login"
    }else{
        loginformEl.btn.querySelector("svg").classList.replace("hidden","block")
        loginformEl.btn.querySelector("p").innerHTML ="Loading..."

    }
    
}

function storeLocalStorage(userID){
    localStorage.setItem("userID",JSON.stringify(userID))
}


document.addEventListener("DOMContentLoaded", (e) => {
    const userObj= JSON.parse(localStorage.getItem("userID"));
    
    if(userObj){
        window.location.replace("dashboard.html")
    }else{
        return
    }
})


