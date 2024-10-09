
let index = 0
document.addEventListener("DOMContentLoaded", (e) => {
    const userObj= JSON.parse(localStorage.getItem("userID"));
   
    if(!userObj){
        window.location.replace("/Giveaway-Form-Firebase/login.html")
    }else{
        refreshUI(index)
    }
})

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("userID")
    window.location.replace("login.html")
})


// loading animation
const mainEl = document.querySelector('main')
const tableEl = mainEl.querySelector("table")



function loadingAnim (state) {

  const height = tableEl.getBoundingClientRect().height;

const h=`max-h-[${height}px]`

  if(state == "hide"){
    mainEl.querySelector("svg").classList.add("hidden")
    
     //mainEl.querySelector("#table").classList.replace("tablehide", "tablevisible")
     mainEl.querySelector("#table").style.height=`${height}px`;
   // mainEl.querySelector("#table").classList.replace("h-0", h)
   //mainEl.querySelector("#table").classList.add("open")

  }else{
    mainEl.querySelector("svg").classList.replace("hidden","block")
  }
 
}


// delete data

function deleteData(id) {
  const deleteBtn = document.getElementById("deleteBtn")
  console.log(id);
  

  db.collection(COLLECTION_NAME).doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
    refreshUI(index);
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}


function refreshUI(index) {
  getAllRequest().then((d) => {
     
    const tdata= document.getElementById("tdata")
    tdata.innerHTML=""
  
    const fragment =document.createDocumentFragment()

    if(d.size === 0){
      tableEl.classList.add("hidden")
      nodata.classList.replace("hidden","flex")
    }else{
      tableEl.classList.remove("hidden")
      nodata.classList.replace("flex","hidden")
    }
    
    d.forEach(element => {
        const data = element.data();

        index++;

        const trEl = document.createElement("tr")
        trEl.className = "tr"
        trEl.innerHTML=`
         <td class="td">${index}</td>
         <td class="td">${data.fullName}</td>
         <td class="td">
           <div>
             <span class="p-1 bg-orange-400 text-white mr-1 rounded">${data.gender}</span>${data.dob}
           </div>
         </td>
         <td class="td">${data.skill}</td>
         <td class="td"><a href="mailto:sivanesh@gmail.com">${data.email}</a></td>
         <td class="td"><a href="tel:5465465465">${data.phnumber}</a></td>
         <td class="td flex items-center justify-center flex-wrap gap-1">
           <button class="bg-indigo-700 py-1 px-2 w-12 rounded text-white mr-1 hover:bg-indigo-600" >View</button>
           <button id="deleteBtn" class="bg-red-500 py-1 px-2 w-12 rounded text-white hover:bg-red-600">
           <div class="flex items-center justify-center mx-auto">
            <svg class="animate-spin hidden text-center" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C16.97 3 21 7.03 21 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3Z" stroke="white" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Delete</p>
           </div>
           
           </button>
         </td>
       `

        const deleteBtn = trEl.querySelector("#deleteBtn");
        deleteBtn.addEventListener("click", () => {
          deleteBtn.querySelector("p").classList.add("hidden")
          deleteBtn.querySelector("svg").classList.replace("hidden","block")
          deleteData(element.id)
        });

       fragment.appendChild(trEl)
    });
   
    
    tdata.appendChild(fragment)



    loadingAnim("hide")

    }).catch(e => {
        alert("error" + e)
    })
}