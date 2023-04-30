import { getAllCategories, deleteCategoryByID, editCategoryByID } from "./httpRequest.js";


let productsRow = document.querySelector(".products-row")
let loading = document.querySelector(".loader")
let search = document.querySelector(".search");
let searchBtn = document.querySelector(".search-btn");

let select = document.querySelector(".select");
// let title = document.querySelector("#title");
// let id = document.querySelector("#id");

let editUserIdInput = document.querySelector("#edit-userId");
let editIdInput = document.querySelector("#edit-id");
let editTitleInput= document.querySelector("#edit-title");
let editBodyInput = document.querySelector("#edit-body");
let editBtn = document.querySelector(".edit-btn");


async function getProducts() {
    let products = await getAllCategories();
    products.forEach(category => {
        productsRow.innerHTML +=
            `<div class="col-3">
          <div class="card mb-3" style="height:400px">
          <div class="card-body">
            <h5 class="card-title"><b>UserID: </b> ${category.userId}</h5>
            <p class="card-text"><b>ID </b> ${category.id}</p>
            <p class="card-text"><b>Title: </b> ${category.title}</p>
            <p class="card-text"><b>Body: </b> ${category.body}</p>
            <a href="./editPage.html" class="btn btn-warning" data-id="${category.id}">Edit</a>
            <button class="btn btn-primary" data-id="${category.id}">Delete</button>
            
          </div>
        </div>
        </div>` 
    });

   Array.from(productsRow.children).forEach((item)=>{
        // console.log(item.children[0].children[0].children[5])

       let userIdName = item.children[0].children[0].children[0].textContent;
       let idName = item.children[0].children[0].children[1].textContent;
       let productTitleName = item.children[0].children[0].children[2].textContent;
       let bodyName = item.children[0].children[0].children[3].textContent;

       let deleteButton = item.children[0].children[0].children[5];
       let editButton = item.children[0].children[0].children[4];
       deleteButton.addEventListener("click",(e)=>{
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: `Are you sure to delete ? ${productTitleName}`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              let id = e.target.getAttribute("data-id");
              console.log(id)
              deleteCategoryByID(id);
              //delete from UI
            //   console.log(e.target.parentElement.parentElement.parentElement)
              e.target.parentElement.parentElement.parentElement.remove();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })


       });


      //  let userIdEdit = userIdName;
      //  let idEdit = idName;
      //  let productTitleEdit = productTitleName;
      //  let bodyEdit = bodyName;
       
      //  let editingObj = {
      //   userId:userIdEdit,
      //   id:idEdit,
      //   title:productTitleEdit,
      //   body:bodyEdit
      //  }

      //  //edit button click
      //  editButton.addEventListener("click",()=>{
      //    editUserIdInput.value = editingObj.name;
      //    editIdInput.value = editingObj.id;
      //    editTitleInput.value = editingObj.title;
      //    editBodyInput.value = editingObj.body;

      //   editBtn.addEventListener("click",(e)=>{
      //     e.preventDefault();
      //     let newUserId = editUserIdInput.value;
      //     let newId = editIdInput.value;
      //     let newTitle =  editTitleInput.value;
      //     let newBody = editBodyInput.value;

      //     let updatedaCategory={
      //       userId:newUserId,
      //       id:newId,
      //       title:newTitle,
      //       body:newBody
      //     }

      //     editCategoryByID(editingObj.id, updatedaCategory);

      //   })
      //  })




    });

}

// getProducts()
window.addEventListener("load", () => {
    loading.style.display = "none";
    getProducts();
})


//sort section
select.addEventListener("change", (e) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            productsRow.innerHTML = "";

            if (select.value === 'id-0') {
                let sorteredData = data.sort(function (a, b) {
                    return (a.id) - (b.id)
                })

                sorteredData.forEach((category) => {
                    productsRow.innerHTML +=
                        `<div class="col-3">
                    <div class="card mb-3" style="height:400px">
                     <div class="card-body">
                       <h5 class="card-title"><b>UserID: </b>${category.userId}</h5>
                       <p class="card-text"><b>ID </b>${category.id}</p>
                       <p class="card-text"><b>Title: </b>${category.title}</p>
                       <p class="card-text"><b>Body: </b>${category.body}</p>
                       <a href="#" class="btn btn-warning">Edit</a>
                       <button class="btn btn-primary">Delete</button>
                       
                     </div>
                   </div>
                   </div>`
                })
            }


            else if (select.value === 'id-1') {
                let sorteredData = data.sort(function (a, b) {
                    return (b.id) - (a.id)
                })

                sorteredData.forEach((category) => {
                    productsRow.innerHTML +=
                        `<div class="col-3">
                    <div class="card mb-3" style="height:400px">
                     <div class="card-body">
                       <h5 class="card-title"><b>UserID: </b>${category.userId}</h5>
                       <p class="card-text"><b>ID </b>${category.id}</p>
                       <p class="card-text"><b>Title: </b>${category.title}</p>
                       <p class="card-text"><b>Body: </b>${category.body}</p>
                       <a href="#" class="btn btn-warning">Edit</a>
                       <button class="btn btn-primary">Delete</button>
                      
                     </div>
                   </div>
                   </div>`
                })
            }

            else if (select.value === 'title-aZ') {
                let sorteredData = data.sort(function (a, b) {
                    return a.title.localeCompare(b.title)
                })
                sorteredData.forEach((category) => {
                    productsRow.innerHTML +=
                        `<div class="col-3">
                    <div class="card mb-3" style="height:400px">
                     <div class="card-body">
                       <h5 class="card-title"><b>UserID: </b>${category.userId}</h5>
                       <p class="card-text"><b>ID </b>${category.id}</p>
                       <p class="card-text"><b>Title: </b>${category.title}</p>
                       <p class="card-text"><b>Body: </b>${category.body}</p>
                       <a href="#" class="btn btn-warning">Edit</a>
                       <button class="btn btn-primary">Delete</button>
                      
                     </div>
                   </div>
                   </div>`
                })
            }

            else if (select.value === 'title-Za') {
                let sorteredData = data.sort(function (a, b) {
                    return b.title.localeCompare(a.title)
                })
                sorteredData.forEach((category) => {
                    productsRow.innerHTML +=
                        `<div class="col-3">
                    <div class="card mb-3" style="height:400px">
                     <div class="card-body">
                       <h5 class="card-title"><b>UserID: </b>${category.userId}</h5>
                       <p class="card-text"><b>ID </b>${category.id}</p>
                       <p class="card-text"><b>Title: </b>${category.title}</p>
                       <p class="card-text"><b>Body: </b>${category.body}</p>
                       <a href="#" class="btn btn-warning">Edit</a>
                       <button class="btn btn-primary">Delete</button>
                       
                     </div>
                   </div>
                   </div>`
                })
            }



        })


})

// search section
searchBtn.addEventListener("click", () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then(data => {
            productsRow.innerHTML = ""
            let searchedData = search.value;
            
            let searchesItems = data.filter(x => x.title.includes(searchedData))
                searchesItems.forEach((data) => {
                  search.value=""
            productsRow.innerHTML +=
                        `<div class="col-3">
          <div class="card mb-3" style="height:400px">
          <div class="card-body">
            <h5 class="card-title"><b>UserID: </b>${data.userId}</h5>
            <p class="card-text"><b>ID </b>${data.id}</p>
            <p class="card-text"><b>Title: </b>${data.title}</p>
            <p class="card-text"><b>Body: </b>${data.body}</p>
            <a href="#" class="btn btn-warning">Edit</a>
            <button class="btn btn-primary">Delete</button>
            
          </div>
        </div>
        </div>`
})   

            
        })
})


//delete button click event

// console.log(productsRow.children).forEach((item)=>{
//     console.log(item)
// })

// console.log(productsRow.children).forEach((item)=>{
//     console.log(item)
// })





