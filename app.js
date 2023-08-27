let onFilms = document.getElementById('onFilms');
onFilms.style.visibility="hidden";
let onInfo = document.getElementById('onInfo');
onInfo.style.visibility="hidden";

const loadData = function(search, cb) {
    let request = new XMLHttpRequest();
    let url = 'https://api.kinopoisk.dev/v1.3/movie?&page=1&limit=10&name=' + search;
    request.open('GET', url);
    // ВВЕДИТЕ СВОЙ API-KEY
    request.setRequestHeader('X-API-KEY', 'ВВЕДИТЕ СВОЙ API-KEY');
    request.responseType = 'json';
    request.addEventListener(`load`, cb);
    request.send();
}

let searchBtn = document.getElementById('searchBtn');
let films = document.getElementById('films');
let detailsView = document.getElementById('detailsView');

function searcher(){
    let search = document.getElementById('title').value;
    loadData(search, function(evt){
        onFilms.style.visibility = '';
        films.innerHTML = '';
        const result = evt.currentTarget.response;
        for (let i = 0; i < result['docs'].length; i++) {
            if (result['docs'][i]['poster']['url'] == null){
                films.innerHTML += `<div class="film"><div class="card"><div class="poster"><img src="https://user-images.githubusercontent.com/134081634/263476846-951c3cc2-361d-4d13-a3c1-ae1e4df9657b.jpg" alt="poster" id="miniPoster"></div><div class="info"><h3 id="name">${result['docs'][i]['name']}</h3><br><h3 id="year">${result['docs'][i]['year']}</h3><button class="details" id="${i}">Details</button></div></div></div>`;
            }else{
                films.innerHTML += `<div class="film"><div class="card"><div class="poster"><img src="${result['docs'][i]['poster']['url']}" alt="poster" id="miniPoster"></div><div class="info"><h3 id="name">${result['docs'][i]['name']}</h3><br><h3 id="year">${result['docs'][i]['year']}</h3><button class="details" id="${i}">Details</button></div></div></div>`;
            };
        }
        var btns = document.querySelectorAll('button');
        btns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
            if (e.target.id == "searchBtn"){
                return;
            }
            let x = Number(e.target.id);
            onInfo.style.visibility = '';
            let genr = result['docs'][x]['genres']
            let genres = '';
            for (let i = 0; i < genr.length; i++){
                genres += genr[i]['name'] + ' ';
            }
            let country = result['docs'][x]['countries']
            let countries ='';
            for (let i=0; i < country.length; i++){
                countries += country[i]['name'] + ' ';
            }
            if (result['docs'][x]['poster']['url'] == null){
                detailsView.innerHTML = `<div><img src="https://user-images.githubusercontent.com/134081634/263476846-951c3cc2-361d-4d13-a3c1-ae1e4df9657b.jpg" alt="poster" id="fullPoster"></div><div class="filmInfo"><div class="line"><div class="headers"><p>Название:</p></div><div class="items"><p>${result['docs'][x]['name']}/${result['docs'][x]['alternativeName']}</p></div></div><div class="line"><div class="headers"><p>Релиз:</p></div><div class="items"><p>${result['docs'][x]['year']}</p></div></div><div class="line"><div class="headers"><p>Жанр:</p></div><div class="items"><p>${genres}</p></div></div><div class="line"><div class="headers"><p>Страна:</p></div><div class="items"><p>${countries}</p></div></div><div class="line"><div class="headers"><p>Рейтинг КиноПоиска:</p></div><div class="items"><p>${result['docs'][x]['rating']['kp']}</p></div></div><div class="line"><div class="headers"><p>Описание:</p></div><div class="items"><p>${result['docs'][x]['description']}</p></div></div>`;
            } else {
                detailsView.innerHTML = `<div><img src="${result['docs'][x]['poster']['url']}" alt="poster" id="fullPoster"></div><div class="filmInfo"><div class="line"><div class="headers"><p>Название:</p></div><div class="items"><p>${result['docs'][x]['name']}/${result['docs'][x]['alternativeName']}</p></div></div><div class="line"><div class="headers"><p>Релиз:</p></div><div class="items"><p>${result['docs'][x]['year']}</p></div></div><div class="line"><div class="headers"><p>Жанр:</p></div><div class="items"><p>${genres}</p></div></div><div class="line"><div class="headers"><p>Страна:</p></div><div class="items"><p>${countries}</p></div></div><div class="line"><div class="headers"><p>Рейтинг КиноПоиска:</p></div><div class="items"><p>${result['docs'][x]['rating']['kp']}</p></div></div><div class="line"><div class="headers"><p>Описание:</p></div><div class="items"><p>${result['docs'][x]['description']}</p></div></div>`;
            }
            })
        })
    })
}
