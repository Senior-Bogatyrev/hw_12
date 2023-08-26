const loadData = function(search, cb) {
    let request = new XMLHttpRequest();
    let url = 'https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=10&query=' + search;
    request.open('GET', url);
    // 
    request.setRequestHeader('X-API-KEY', 'ВВЕДИТЕ СВОЙ API-KEY');
    request.responseType = 'json'
    request.addEventListener(`load`, cb);
    request.send();
}

let searchBtn = document.getElementById('searchBtn');
let films = document.getElementById('films');
let btnCount

function searcher(){
    btnCount = 0
    let search = document.getElementById('title').value;
    loadData(search, function(evt){
        films.innerHTML = ''
        const result = evt.currentTarget.response;
        for (let i = 0; i < result['docs'].length; i++) {
            // if (result['docs'][i]['poster'] == null){
            //     continue
            // }else{
            films.innerHTML += `<div class="film"><div class="card"><div class="poster"><img src="${result['docs'][i]['poster']}" alt="poster" id="miniPoster"></div><div class="info"><h3 id="name">${result['docs'][i]['name']}</h3><br><h3 id="year">2015</h3><button class="details" id="btn${i}">Details</button></div></div></div>`
            btnCount++;
            // }
        }
        console.log(btnCount);
        let button = document.getElementById('btn8')
        button.addEventListener('click', function(e) {
            console.log(e);
        });
        let button1 = document.getElementById('btn0')
        button1.addEventListener('click', function(e) {
            console.log(e);
        });
    });
}
