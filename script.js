fetch("https://ghibliapi.herokuapp.com/films")
    .then((res) => res.json())
    .then((data) => {
        let movieList = data;
        for(let movie of movieList){
            let { title } = movie;
            let select = document.querySelector("#movie-selector select");
            let option = document.createElement("option");
            option.textContent = title;
            option.value = title;
            select.append(option);
        }

        let movieForm = document.querySelector("form#movie-selector");
        movieForm.addEventListener("change", (e) => {
            e.preventDefault();
            let movieTitle = document.querySelector("#movie-title");
            let movieYear = document.querySelector("#movie-year");
            let movieSummary = document.querySelector("#movie-summary");

            movieTitle.textContent = e.target.value;

            for(let studio of data){
                if(e.target.value === studio.title){
                    movieYear.textContent = studio.release_date;
                    movieSummary.textContent = studio.description;
                }   
            }
            
            let textInput = document.querySelector("#user-review");
            textInput.addEventListener("input", (e) => {
                textInput.textContent = e.target.value;
            });

            let reviewForm = document.querySelector("#movie-review");
            reviewForm.addEventListener("submit", (e) => {
                e.preventDefault();
                let ul = document.querySelector("ul");
                let li = document.createElement("li");
                let strong = document.createElement("strong");
                strong.textContent = `${movieTitle.textContent}: `;
                li.textContent = `${textInput.value}`;
                ul.append(li);
                li.prepend(strong);
                textInput.value = ""; 
            })
        })
    })
    .catch((err) => {
        console.log(err);
    });