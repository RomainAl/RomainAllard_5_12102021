let api = 'http://localhost:3000/api/products';
let url = window.location.href;
let search_params = new URLSearchParams(url);
let id;
if(search_params.has('id')) {
    id = search_params.get('id');
    console.log(id);
} else{
    id = null;
    console.log("null");
}
id = "107fb5b75607497b96722bda5b504926";
getProduct(api, id);

async function getProduct(api, id){

    try{

        const res = await fetch(api + '/' + id);

        if (res.ok) {
            
            const data = await res.json();
            console.log(data);
            let img = document.createElement('img');
            img.setAttribute('src', data.imageUrl);
            img.setAttribute('atl', 'Photographie du canapé ' + data.name);
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