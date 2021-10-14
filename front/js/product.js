var url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);
if(search_params.has('id')) {
    let id = search_params.get('id');
} else {
    alert('No product selected !');
    console.error('No product selected !');
}

getProduct(localStorage.getItem('api'), id);

async function getProduct(api, id){

    try{

        const res = await fetch(api + '/' + id);

        if (res.ok) {
            
            const data = await res.json();
            console.log(data);
            let img = document.createElement('img');
            img.setAttribute('id', 'image');
            img.setAttribute('src', data.imageUrl);
            img.setAttribute('alt', data.altTxt);
            document.getElementById('img').appendChild(img);
            document.getElementById('title').innerText = data.name;
            document.getElementById('description').innerText = data.description;
            document.getElementById('price').innerText = data.price;
            let colors = document.getElementById('colors');
            for (let c of data.colors){
                let color = document.createElement('option');
                color.setAttribute('value', c);
                color.innerText = c;
                colors.appendChild(color);
            }

        } else {

            console.error('Retour du serveur : ', res.status);
            alert('Erreur rencontrée : ' + res.status);

        } 
    }
    catch(error){

        alert("Erreur : " + error);

    }

}

document.getElementById('addToCart').addEventListener('click', function(event){

    if (document.getElementById('quantity').value > 0){

        let product = {
            id : id,
            quantity : parseInt(document.getElementById('quantity').value),
            color : document.getElementById('colors').value,
            name : document.getElementById('title').textContent,
            imageUrl : document.getElementById('image').getAttribute('src'),
            price : parseFloat(document.getElementById('price').textContent),
        }

        let panier = JSON.parse(localStorage.getItem("panier"));

        if (panier){

            let addStack = true;
            for (let i = 0; i < panier.length; i++){
                if ((product.id == panier[i].id) && (product.color == panier[i].color)){
                    panier[i].quantity = Math.min(panier[i].quantity + product.quantity, 100);
                    addStack = false;
                    break;
                }
            }
            if (addStack){
                panier.push(product);
            }

        } else {

            panier = [product];

        }
        
        localStorage.setItem("panier", JSON.stringify(panier));
        console.table(panier);

    } else {

        localStorage.removeItem("panier");

    }

})