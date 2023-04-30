import { postCategory } from "./httpRequest.js";

    let newProductCard = document.querySelector(".new-product-card")
    let newUserID = document.querySelector("#new-userId");
    let newID = document.querySelector("#new-id");
    let newTitle = document.querySelector("#new-title");
    let newBody = document.querySelector("#new-body");
    let submitBtn = document.querySelector("#submit");
    
    submitBtn.addEventListener("click",function(e){
        e.preventDefault();

        if(newUserID.value =="" || newID.value =="" || newTitle.value==""  || newBody.value==""){
            alert("Please fill in all the fields");
        }
        else{
            const category = {
                userId: newUserID.value,
                id: newID.value,
                title:newTitle.value,
                body:newBody.value
            }
            //reset inputs
            newUserID.value = "";
            newID.value = "";
            newTitle.value = "";
            newBody.value = "";
            postCategory(category);
            // window.location.href = "http://127.0.0.1:5500/index.html";
        
            //add product UI
            newProductCard.innerHTML +=
                    `<div class="col-3">
                  <div class="card mb-3" style="height:400px">
                  <div class="card-body">
                    <h5 class="card-title"><b>UserID: </b> ${category.userId}</h5>
                    <p class="card-text"><b>ID </b> ${category.id}</p>
                    <p class="card-text"><b>Title: </b> ${category.title}</p>
                    <p class="card-text"><b>Body: </b> ${category.body}</p>
                  </div>
                </div>
                </div>` 
                 
        }
        
            
    })
