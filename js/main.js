

let budget = document.querySelector("#budget");
let budget_btn = document.querySelector("#budget-btn");
let t_budget = document.getElementById("total-budget");
let title = document.getElementById("title");
let cost = document.getElementById("cost");
let product_btn = document.getElementById("product-btn");
let expence_list = document.getElementById("expence-list");
let expence = document.getElementById("expence");
let balance = document.getElementById("balance");


budget_btn.onclick = function (e) {
    e.preventDefault();
    if (budget.value != "") {
        localStorage.setItem("budget", budget.value);
        location.href = location.href
    } else {
        alert("Budget is empty !")
    }

}

// store product in localstorage

product_btn.onclick = function (e) {
    e.preventDefault()
    if (title.value != "" && cost.value != "") {
        let p_title = title.value;
        let p_cost = cost.value;
        let data = {
            p_title: p_title,
            p_cost: p_cost
        }

        let string = JSON.stringify(data);
        localStorage.setItem("budget_" + title.value, string);
        location.href = location.href;
    } else {
        alert("Field is Empty !")
    }
}

// retrive data from localstorage
function all_data() {
    let i;
    for (i = 0; i < localStorage.length; i++) {

        let all_keys = localStorage.key(i);
        if (all_keys.match("budget_")) {
            let json_data = localStorage.getItem(all_keys);
            let json_parse = JSON.parse(json_data)
            expence_list.innerHTML += '<div class="row mt-3 mb-3 b-border" ><div class="col-md-6 mt-3 d-flex justify-content-between"><h5>' + json_parse.p_title + '</h5><h5 class="price">' + json_parse.p_cost + '</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i class="fa fa-edit edit-btn"></i>&nbsp; &nbsp; &nbsp;<i class="fa fa-trash delete-btn" ></i></i></div></div>'
        }
    }
    let price = []
    let price_tag = document.getElementsByClassName("price")
    for (i = 0; i < price_tag.length; i++) {

        price[i] = price_tag[i].innerHTML
    }

    var price_int = [];
    for (i = 0; i < price.length; i++) {
        price_int.push(parseInt(price[i]))
    }

    let final_price = 0;

    for (i = 0; i < price_int.length; i++) {
        final_price += price_int[i]
    }
    // show final price
    expence.innerHTML = final_price
    t_budget.innerHTML = localStorage.getItem("budget")
    let t_bgt = t_budget.innerHTML;
    let t_expenence = expence.innerHTML
    balance.innerHTML = t_bgt - t_expenence;

    // start delete codding
let delete_btns = document.getElementsByClassName("delete-btn")

for(i = 0; i < delete_btns.length; i++){
    delete_btns[i].onclick = function(){
       let cnf = window.confirm("Do you wanna delete it ?");

       if(cnf){
        let del_perent = this.parentElement;
        let div_perent = del_perent.parentElement;
        let h5 = div_perent.firstChild.childNodes[0].innerHTML;
        localStorage.removeItem("budget_"+h5);
        location.href = location.href
       }else{
        alert("your data is save")
       }
    }
}

// start edit-btn codding
let edit_btn = document.getElementsByClassName("edit-btn");


for(i = 0; i < edit_btn.length; i++){
    edit_btn[i].onclick = function(){
        let cnf = window.confirm("Do you wanna update it ?");

        if(cnf == true){
             let edit_parent = this.parentElement;
             let col_parent = edit_parent.parentElement;

             let h5_data = col_parent.firstChild.childNodes[0].innerHTML
             let h5_price = col_parent.firstChild.childNodes[1].innerHTML

             title.value = h5_data;
             cost.value = h5_price;
                title.focus();
                product_btn.innerHTML = "update your data";
                product_btn.style.background = "red";

                product_btn.onclick = function(){
                    localStorage.removeItem("budget_"+h5_data)
                    let p_title = title.value;
                    let p_cost = cost.value;
                    let data = {
                        p_title: p_title,
                        p_cost: p_cost
                    }
            
                    let string = JSON.stringify(data);
                    localStorage.setItem("budget_" + title.value, string);
                    location.href = location.href;
                }

        }else{
            alert("your data is save !")
        }
    }
}
    
}

all_data()