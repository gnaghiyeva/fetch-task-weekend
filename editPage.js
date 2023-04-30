import { editCategoryByID } from "./httpRequest.js";



let userIdEdit = userIdName;
let idEdit = idName;
let productTitleEdit = productTitleName;
let bodyEdit = bodyName;

let editingObj = {
 userId:userIdEdit,
 id:idEdit,
 title:productTitleEdit,
 body:bodyEdit
}

//edit button click
editButton.addEventListener("click",()=>{
  editUserIdInput.value = editingObj.name;
  editIdInput.value = editingObj.id;
  editTitleInput.value = editingObj.title;
  editBodyInput.value = editingObj.body;

 editBtn.addEventListener("click",(e)=>{
   e.preventDefault();
   let newUserId = editUserIdInput.value;
   let newId = editIdInput.value;
   let newTitle =  editTitleInput.value;
   let newBody = editBodyInput.value;

   let updatedaCategory={
     userId:newUserId,
     id:newId,
     title:newTitle,
     body:newBody
   }

   editCategoryByID(editingObj.id, updatedaCategory);

 })
})
