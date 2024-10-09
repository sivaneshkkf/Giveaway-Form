const mainEl=document.querySelector("main")
const successfulUiEl = document.getElementById("formSubmitted")

const applyBtn = document.querySelector("main button")

//const formEl = document.forms.givewayForm
const formEl = document.querySelector('form')
const conListEl= document.getElementById("conList")

import conditionList from "../public/js/conditions.data";



(function injectCondition() {
    const fragment = document.createDocumentFragment()

    conditionList.forEach(condition => {
        const liEl = document.createElement("li");
        liEl.textContent=condition
        fragment.appendChild(liEl);
    })

    conListEl.appendChild(fragment)
})()


const validation = (e) => {
    [...formEl.elements].forEach((el) => {
        el.required = true;
    })

    formEl.addEventListener('submit',submitForm)
    return true;
}


formEl.btn.addEventListener("click", (e) => {
    validation()
})



const submitForm = (e)=>{
    e.preventDefault()
    const formData = new FormData(formEl);
    loadingAnim("show")
    if(validation()){
        const obj = Object.fromEntries(formData)
        createRecord(obj).then((result) => {
            loadingAnim("hide")
            console.log("Document written with ID: ", result.id);
            updateUI();
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }
}


// // login Btn
// const dashbordBtn =document.getElementById("dashbordBtn")

// dashbordBtn.addEventListener("click", (e) => {
//     window.location.replace("/dashboard.html")
// })


// functions

const updateUI = ()=>{
    mainEl.classList.add("hidden")
    mainEl.classList.add("lg:hidden")
    successfulUiEl.classList.remove("hidden")
}



// loading anim
function loadingAnim(state) {
    if(state === "hide"){
        formEl.btn.querySelector("svg").classList.replace("block","hidden")
    }else{
        formEl.btn.querySelector("svg").classList.replace("hidden","block")

    }
    
}