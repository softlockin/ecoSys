
let products = [
    
    { 
        id: 50,
        productName: "Jobba",
        price: 50,
        hours: 40,
    },
    {
        id: 42,
        productName:"Annat",
        price: 45,
        hours: 145
    }

]


let customers =[

    { 
        id: 1,
        name: "Testkund",
        kontakt: "Åkeri",
        adress: "Gatan 1"
    },
    {
        id: 2,
        name: "testkund 2",
        kontakt: "Åkeri 2",
        adress: "Gatan 2"
    }

]


function menuAdd(){

    let b = document.querySelector("body");

    b.insertAdjacentHTML("afterbegin",` <header class="flex-container"> <h1>EcoS - Fakturasystem</h1> <!--- <a href="/">Skapa Faktura</a><a href="/customers.html">Kunder</a><a href="/products.html">Produkter</a><a href="reports.html">Rapporter</a> ---></header>`)



}

function populateCustomerList(){
    
    for (customer of customers){

        document.querySelector(".customerList").insertAdjacentHTML("beforeend", `<option value="${customer.id}" >${customer.id}: ${customer.name}</option>`)

    }
}

// productlist-function for future release

function populateProductList(){

    let productList = document.querySelector(".productList");

    for (product of products){
        productList.insertAdjacentHTML("beforeend",`<option value="${product.id}" class="choices" >${product.productName}</option>`)
    }

}

// Not done. Product detail function, auto load
function setProductDetails(){

    let lists = document.querySelectorAll(".productList")
    let choices = document.querySelectorAll(".choices")


    for (let list of lists){

        list.addEventListener("change", ()=>{

            for (let choice of choices){

                console.log(choice.attributes.id)
        
            }

            let index = list.selectedIndex-1
            console.log(index)




        })

    }


}



// Chose from the list and generate the right details
function getCustomerDetails(){

    let customerList = document.querySelector(".customerList");

    customerList.addEventListener("change", function (){
        
        console.log(customerList.value)

        for (let customer of customers){

            if ( customerList.value == customer.id ){
                let detailField = document.querySelector("#customerDetails");
                let cInfo = document.querySelector(".customerInfo")

                if (cInfo != null){ cInfo.remove() }
                detailField.insertAdjacentHTML("afterend", `<div class="customerInfo"><h2>${customer.name}</h2>
                
                <p>Name: ${customer.kontakt}</p>
                <p>Adress: ${customer.adress}</p>
                </div>`)
            }
        }
    })
}

function addRow(){

    let btn = document.querySelectorAll(".plus")
    let row = document.querySelector()

    btn.addEventListener("click", ()=>{

        
        
    })

}



function sendToInvoice() {    
}



menuAdd();
populateCustomerList();
getCustomerDetails();
addRow();