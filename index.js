


//adding eventListener
document.querySelector("form").addEventListener("submit" , addMovie);
function addMovie(e) {
  e.preventDefault()
  let title = document.getElementById("title")
let plot = document.getElementById("plot")
let poster = document.getElementById("poster")

const movieObject = { 
  title: title.value,
 description : plot.value,
  imageAddress: poster.value

}

// Fetching data 
fetch("http://localhost:3000/courses",{
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
 
  
  
    
    div.innerHTML = `
    <style> 
    @import url('https://fonts.googleapis.com/css2?family=Playwrite+DE+Grund:wght@100..400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Acme&family=Cardo:ital,wght@0,400;0,700;1,400&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&family=Merienda:wght@300..900&family=Pacifico&family=Sedan+SC&display=swap');
.font {
  font-family: "Sedan SC", serif;
  font-weight: 600;
  font-style: normal;
}
  .font22{
    font-family: "Josefin Slab", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color:black;
  }
.skip {
  font-family: "Playwrite DE Grund", cursive;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
    </style>
    <div class="card "style = "color:#189D37 " >
    <img src="${movie.imageAddress}" height= "280px"  width = "280px" class="card-img-top" alt="...">
    <div class="card-body" style = "background: #F6E9D0">
      <h5 class=" font card-title" style="color:#1D4876;">${movie.title}</h5>
      <p class="font22 card-text">${movie.description}</p>
   
   <button class=" skip btn bg-info <i class="bi bi-play-circle-fill"></i>skip </button>
   <button class=" skip btn bg-info <i class="bi bi-play-circle-fill"></i>Get started →</button>
      
    </div>
  </div>`
  row.appendChild(div)
 div.querySelector("button").addEventListener("click", function(){
  div.remove()
  deleteData(movie.id);
  
  
})
}
function deleteData(id){
  fetch(`http://localhost:3000/courses/${id}`,{
    method : "DELETE",
    header: {'content-type':'application/json'},

  })
 
}

 


 //step2.Fetch the data
function getMovies(){
    fetch("http://localhost:3000/courses")
    .then(res => res.json())
    .then(movies=> {
        movies.forEach(addMovies)
    })
}


//step1.load the DOMcontent
document.addEventListener("DOMContentLoaded",() => {
  getMovies();

})





