//adding eventListener
document.querySelector("form").addEventListener("submit" , addMovie);
function addMovie(e) {
  e.preventDefault()
  let title = document.getElementById("title")
let plot = document.getElementById("plot")
let poster = document.getElementById("poster")

const movieObject = { 
  Title: title.value,
 description : plot.value,
  image: poster.value

}

// Fetching data 
fetch("http://localhost:3000/novels",{
  method: "POST",
  header: {'content-type':'application/json'},
  body:JSON.stringify(movieObject)
})
.then(res => res.json())
.then(data => {
  addMovies(data)
})

}







//step3. update the DOM
function addMovies(movie){
  

  
    let row = document.getElementById("card")
    let div = document.createElement("div")
    div.classList.add("col-3")
  div.style.marginBottom ="25px"
  div.style.paddingBottom= "25px"
 
  
  
    
    div.innerHTML = `<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        .card {
            position: relative;
            width: 350px;
            aspect-ratio: 16/9;
            background-color: #f2f2f2;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            perspective: 1000px;
            box-shadow: 0 0 0 5px #ffffff80;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card img {
            width: 100%;
            height:100%;
            fill: #333;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card__image {
            width: 100%;
            height: 100%;
        }

        .card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
        }

        .card__content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            background-color: #42A9DF;
            transform: rotateX(-90deg);
            transform-origin: bottom;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card:hover .card__content {
            transform: rotateX(0deg);
        }

        .card__title {
            margin: 0;
            font-size: 20px;
            color: #333;
            font-weight: 700;
        }

        .card:hover img {
            scale: 0;
        }

        .card__description {
            margin: 10px 0 10px;
            font-size: 0.9rem;
            color: #1B3561;
            line-height: 1.4;
              font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
        }

        .card__button {
            padding: 10px;
          
            background: #777;
            border: none;
            color: white;
        }
        .tit {
  font-family: "Mate SC", serif;
  font-weight: 600;
  font-style: normal;
        }
        .secondary {
            background: transparent;
            color: #777;
            border: 1px solid #777;
            padding: 9px;
            padding-left: 20px;
            padding-right: 20px;
        }
    </style>

    <div class="card">
        <img src="${movie.image}" alt="">
        <div class="card__content">
            <p class=" tit card__title">${movie.Title}</p>
            <p class="card__description">${movie.description}</p>
            <button class="card__button">skip</button>
            <button class=" btn btn-outline secondary card__button secondary">Download</button>
        </div>
    </div>`
  row.appendChild(div)
 div.querySelector("button").addEventListener("click", function(){
  div.remove()
  deleteData(movie.id);
  
  
})
}
function deleteData(id){
  fetch(`http://localhost:3000/novels/${id}`,{
    method : "DELETE",
    header: {'content-type':'application/json'},

  })
 
}

 


 //step2.Fetch the data
function getMovies(){
    fetch("http://localhost:3000/novels")
    .then(res => res.json())
    .then(movies=> {
        movies.forEach(addMovies)
    })
}


//step1.load the DOMcontent
document.addEventListener("DOMContentLoaded",() => {
  getMovies();

})





