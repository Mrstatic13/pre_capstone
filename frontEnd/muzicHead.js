const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3406df7205msh5fe2aedf825acb2p10c1dajsnc55a4bfe9047',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

//let getLyrics = false;

const userInput = document.getElementById('input');
const btn = document.getElementById('button');

let params = '';
// calls the fetch
const callParams = () => {
    params = userInput.value;
    fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${params}`, options)
	.then(response => response.json())
	.then(data => {
        let output = '';
        data.hits.map(hit => {
            output += `
            <tr>
            <td>${hit.result.title}</td>
            <td>${hit.result.full_title}</td>
            <td>${hit.result.artist_names}</td>
            </tr>
            `;
            console.log(hit.result.title)
            console.log(hit.result.full_title)
            console.log(hit.result.artist_names)
        }) 
        document.getElementById('results').innerHTML = output;
    })
	.catch(err => console.log(err));
   

    //makes the input clear once clicked
    userInput.value = '';
}

btn.addEventListener('click', callParams)

let input = document.getElementById('input')

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('button').click();
    }
})


// let form = document.getElementById('form')

// form.addEventListener('submit', function(e){
//     //auto submission of the form by calling prevent
//     e.preventDefault()

//     let artist = document.getElementById('artist').value;
//     let title = document.getElementById('title').value;
//     let genre = document.getElementById('genre').value;

//     fetch('data.json', {
//         method : 'POST',
//         body:JSON.stringify(
//         {
//             "artist": "artist",
//             "title":"title",
//             "genre": "genre"
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// })


// const callLyrics = () => {
//     params = userInput.value;
//     fetch(`https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${params}`, options)
// 	.then(response => response.json())
// 	.then(data => {
//         let output = '';
//         data.lyrics.lyrics.body.html;
//         document.getElementById('lyrics').innerHTML = output;
//     })
// 	.catch(err => console.log(err));
   

//     //makes the input clear once clicked
//     userInput.value = '';
// }

// const form = document.getElementById('form');
// const search = document.getElementById('search');
// const result = document.getElementById('result');

// const apiURL = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/';


// form.addEventListener('submit', e => {
//     e.preventDefault();
//     searchValue = search.nodeValue.trim()

//     if (!searchValue) {
//         alert('Nothing to search')
//     } else {
//         beginSearch(searchValue);
//     }
// })

//code meant for clicking the value into the console

// btn.addEventListener('click', callLyrics)

// fetch('https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=1629', options)
// 	.then(response => response.json())
//     .then(response => console.log(response.lyrics))
// 	// .then(response => console.log(response.lyrics.lyrics.body.html))
// 	.catch(err => console.log(err));

// fetch('https://genius-song-lyrics1.p.rapidapi.com/search/multi/?q=rihanna', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response.sections))
// 	.catch(err => console.error(err));
