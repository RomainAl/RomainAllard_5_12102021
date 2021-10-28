let panier = JSON.parse(localStorage.getItem("panier"));

let str = window.location.href;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);

if(search_params.has('orderId')) {
    
    // PAGE CONFIRMATION :
    document.getElementById('orderId').textContent = search_params.get('orderId');

} else {

    // PAGE PANIER :
    if (panier){
        getPanier(panier);
    }

    document
        .getElementById("form")
        .addEventListener("submit", send);

    // Chargement des produits du panier :
    async function getPanier(panier){
        let cart__items = document.getElementById('cart__items');
        while (cart__items.firstChild) {
            cart__items.removeChild(cart__items.firstChild);
        }

        for (let i = 0; i < panier.length; i++){
            let cart__item = document.createElement('article');
            cart__item.classList.add('cart__item');
            cart__item.setAttribute("data-id", i);
            cart__item.innerHTML =
                '<div class="cart__item__img">' +
                    '<img src="' + panier[i].imageUrl + '" alt="Photographie d\'un canapé">' +
                '</div>' +
                '<div class="cart__item__content">' +
                    '<div class="cart__item__content__titlePrice">' +
                        '<h2>' + panier[i].name + '</h2>' +
                        '<p>' + panier[i].price + ' €</p>' +
                    '</div>' +
                    '<div class="cart__item__content__settings">' +
                        '<div class="cart__item__content__settings__quantity">' +
                            '<p>Qté :</p>' +
                            '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' + panier[i].quantity + '">' +
                        '</div>' +
                        '<div class="cart__item__content__settings__color">' +
                            '<p>Color : ' + panier[i].color + '</p><br>' +
                        '</div>' +
                        '<div class="cart__item__content__settings__delete">' +
                            '<p class="deleteItem">Supprimer</p>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            cart__items.appendChild(cart__item);
        }

        // Mis à jour des "listeners" à chaque fois qu'on charge les produits :
        updateEventListeners();

        // Recalcule à chaque changement :
        calculations();
    }

    // Fonction qui ajoute les listeners aux boutons :
    function updateEventListeners(){
        let suppr_btn = document.getElementsByClassName('deleteItem');
        let quantity = document.getElementsByClassName('itemQuantity');

        for (let i = 0; i < suppr_btn.length; i++){

            suppr_btn[i].addEventListener('click', function(e){
                panier.splice(e.target.closest('article').dataset.id, 1);
                localStorage.setItem("panier", JSON.stringify(panier));
                getPanier(panier);
            })

            quantity[i].addEventListener('change', function(e){
                panier[e.target.closest('article').dataset.id].quantity = Math.max(Math.min(parseInt(e.target.value),100), 1);
                localStorage.setItem("panier", JSON.stringify(panier));
                getPanier(panier);
            })

        }
    }

    // Fonction qui calcule les informations du panier :
    function calculations(){
        let totalPrice = 0;
        let totalQuantity = 0;
        for (let p of panier){
            totalQuantity += p.quantity;
            totalPrice += p.price * p.quantity;
        }
        document.getElementById('totalQuantity').innerText = totalQuantity;
        document.getElementById('totalPrice').innerText = totalPrice;
    }

    // Fonction qui envoie les informations du formulaire au serveur après avoir vérifiée les informations :
    async function send(e) {
        e.preventDefault();
        try{
            const res = await fetch(localStorage.getItem('api')+'/order', {

                method: "POST",
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "contact" : 
                    {
                        "firstName": document.getElementById("firstName").value,
                        "lastName": document.getElementById("lastName").value,
                        "address": document.getElementById("address").value,
                        "city": document.getElementById("city").value,   
                        "email": document.getElementById("email").value, 
                    }, 

                    "products" : 
                    ["107fb5b75607497b96722bda5b504926", "107fb5b75607497b96722bda5b504926"]
                })

            })

            if (res.ok) {
                
                const datas = await res.json();
                window.location.href='./confirmation.html?orderId=' + datas.orderId;
                localStorage.removeItem("panier");

            }
        }
        catch(error){

            alert("Erreur : " + error);

        }
    }

    // Check les informations du formulaire :
    let iname = ["firstName", "lastName", "city"];
    for (let i of iname){
        document
        .getElementById(i)
        .addEventListener("input", function(e) {
            if (/^[a-zA-Z-]{3,}$/.test(e.target.value)) {
                document.getElementById(i+"ErrorMsg").innerText = "";
                disableSubmit(false);
            } else {
                document.getElementById(i+"ErrorMsg").innerText = "Invalide";
                disableSubmit(true);
            }
        });
    }
}

// Désactive le bouton "submit" si les informations sont pas bonnes :
function disableSubmit(disabled) {
    if (disabled) {
        document
            .getElementById("order")
            .setAttribute("disabled", true);
    } else {

        document
            .getElementById("order")
            .removeAttribute("disabled");
    }
}