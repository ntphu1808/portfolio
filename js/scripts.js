const projectContainer = document.querySelector(".projects-container")
let currentPage = 0

renderProjectsOnPage(currentPage)

// render projects to the website
function renderProjectsOnPage (pageNumber) {
    let projectsOfPage
    if (pageNumber == 0) {
        projectsOfPage = projects.slice(0, 12)
    } else if (pageNumber == 1) {
        projectsOfPage = projects.slice(12, 24)
    } else if (pageNumber == 2) {
        projectsOfPage = projects.slice(24, 36)
    } else {
        projectsOfPage = projects.slice(36)
    }  
    renderProjects(projectsOfPage)
}

// check the current page and take action when the page number button is clicked.
const pageNumberEls = document.querySelectorAll(".page-link")

pageNumberEls.forEach((pageNum, idx) => {
    pageNum.addEventListener("click", (e) => {
        e.preventDefault() // prevent a tag from navigation to the specific page
        pageNumberEls[currentPage].parentNode.className="page-item"    // remove active class from the previous working <li></li>
        pageNumberEls[currentPage].className="page-link text-success"     // remove background color dark from the previous a tag


        currentPage = idx  //set the current page
        pageNum.className="page-link border-dark bg-dark"   //add background color dark to the current working a tag.
        pageNum.parentNode.className="page-item active"   // add active class to the current li
       
        renderProjectsOnPage(currentPage)
    })
})


// searching for search term.
const formSearchEl = document.querySelector(".form-search")

formSearchEl.addEventListener("submit", (event) => {
    event.preventDefault()

    const searchTerm = event.target.searchTerm.value.toLowerCase()
    
    const searchResults = projects.filter(project => (project.title.toLowerCase().includes(searchTerm) || project.overview.toLowerCase().includes(searchTerm)))
   
    renderProjects(searchResults)
})

// render projects function
function renderProjects(projectsData) {
    projectContainer.innerHTML=""
    projectsData.forEach(project => {
        const projectEl = document.createElement("div")
        projectEl.className = "col"
        projectEl.innerHTML = `<div class="card h-100 bg-dark text-light pb-4">
                                    <img src=${project.imgSrc} class="card-img-top img-thumbnail" alt="...">
                                    <div class="card-body align-self-stretch">
                                        <h5 class="card-title">${project.title}</h5>
                                        <p class="card-text">${project.overview}</p>
                                    </div>
                                    <a href=${project.link} class="btn btn-success w-50 align-self-center"><i class="fas fa-chevron-left"></i> <span>Check it out</span> <i class="fas fa-chevron-right"></i></a>
                                </div>`
    
        projectContainer.appendChild(projectEl)
    })
}