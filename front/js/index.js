let api = 'http://localhost:3000/api/products';
localStorage.setItem("api", api);
getAPI(api);

async function getAPI(api_link){
    try{

        const res = await fetch(api_link)
        if (res.ok) {
            
            const datas = await res.json();
            console.log(datas);
            let cards_api = document.getElementById('items');
            for (let data of datas){
                let card = document.createElement("a");
                card.setAttribute('href', './product.html?id=' + data._id + '');
                cards_api.appendChild(card);
                card.innerHTML = 
                '<article>'+
                  '<img src="' + data.imageUrl + '" alt="' + data.altTxt + '">'+
                  '<h3 class="productName">'+ data.name +'</h3>'+
                  '<p class="productDescription">'+ data.description +'</p>'+
                '</article>';
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
