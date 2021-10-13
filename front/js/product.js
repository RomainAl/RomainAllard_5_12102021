async function getAPI(api_link){
    try{
        const res = await fetch(api_link)
        if (res.ok) {
            
            const datas = await res.json();
            console.log(datas);
            let cards_api = document.getElementById('items');
            for (let data of datas){
                let card = document.createElement("div");
                cards_api.appendChild(card);
                card.innerHTML = 
                '<a href="./product.html?id=42">'+
                '<article>'+
                  '<img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">'+
                  '<h3 class="productName">Kanap name1</h3>'+
                  '<p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>'+
                '</article>'+
              '</a>';
            }

            console.log(datas);
            return datas;

        } else {
            console.error('Retour du serveur : ', res.status);
            alert('Erreur rencontrée : ' + res.status);
        } 
    }
    catch(error){
        alert("Erreur : " + error);
    }
}

const datas_ted = getAPI("http://localhost:3000/api/products");
//const datas_cam = getAPI("http://localhost:3000/api/cameras");
//const datas_fur = getAPI("http://localhost:3000/api/furniture");
