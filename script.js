const electronicItem = document.getElementById('electronicItem'); 
const foodItem = document.getElementById('foodItem');
const skincareItem = document.getElementById('skincareItem'); 

const productname = document.getElementById('productname');
const sellprice = document.getElementById('sellprice');
const category= document.getElementById('category');

function addItem(){    
    let inproductname = productname.value;
    let insellprice = sellprice.value;
    let incategory = category.value;   

    let list = "";
    if (incategory==="electronic") list= electronicItem;
    else if (incategory==="food") list= foodItem;
    else list= skincareItem;

    let Details = {
        Product : inproductname,
        Price : insellprice,
        Category : incategory,        
    };

    axios.post("https://crudcrud.com/api/20d8550542f24cbd89d6486c0e10c9a8/ProductPage/",Details)  
        .then(res => console.log(res.statusText))
        .catch(err => console.log(err));
    addToScreen(Details,list)    
}

function addToScreen(obj,cat){
    //new list item      
    let li = document.createElement('li');      
    li.innerText = `${obj.Product}  ${obj.Price}`;       

    //Del button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";    
    deleteButton.onclick = function() {
        cat.removeChild(li);
        axios.delete(`https://crudcrud.com/api/20d8550542f24cbd89d6486c0e10c9a8/ProductPage/${obj._id}`)
        .then(res => console.log(res.statusText))
        .catch(err => console.log(err));
    };
    li.appendChild(deleteButton);

    cat.appendChild(li);
}

window.addEventListener('DOMContentLoaded', (event) => {
    axios.get("https://crudcrud.com/api/20d8550542f24cbd89d6486c0e10c9a8/ProductPage/")
    .then(res => {       

        for (let i=0; i<=res.data.length; i++){
            let cat = "";
            if (res.data[i].Category=="electronic") cat= electronicItem;
            else if (res.data[i].Category=="food") cat= foodItem;
            else cat= skincareItem;

            addToScreen(res.data[i],cat)                        
        }
    })
    .catch(err => console.log(err))    
})
    



