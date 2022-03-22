const formEl = document.querySelector(".form")
const searchEl = document.querySelector(".search-bar")
const apiUrl = "https://api.github.com/users/"
const container = document.querySelector(".container")

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const keyword = form.get("search").trim().split(" ").filter(string => string !== "").join(" ")
    searchEl.value = ""
    if (keyword !== "" && keyword.search(" ") == -1) {
        const proContainer = document.querySelector(".profile-container")
        if (proContainer) {proContainer.remove()}        
        RenderProfile(apiUrl+keyword)
    }
})

async function getApiData(url) {
    const resp = await fetch(url)
    if (resp.status == 200) {
        return await resp.json()
    } else {
        return "error"
    }
}

async function RenderProfile(url) {
    const user = await getApiData(url)

    const proContainer = document.createElement("div")
    proContainer.classList.add("profile-container")

    if (user === "error") {
        proContainer.innerText = "The username you put didn't match any usernames"
        container.appendChild(proContainer)
        return false
    }

    const repos = await getReposData(user.repos_url)

    const profileEl = `<div class="profile__avatar">
                            <img src="${user.avatar_url}" alt="" class="avatar__img">
                        </div>
                        <div class="profile__content">
                            <h1 class="content__name">${user.login}</h1>
                            <p class="content__extra">
                                <span class="followers">${user.followers} <strong>Followers </strong></span> 
                                <span class="following">${user.following} <strong>Following </strong></span> 
                                <span class="repos">${repos.length} <strong>Repos </strong></span>
                            </p>
                            <div class="content__repositories"></div>
                        </div>`

    proContainer.innerHTML = profileEl
    container.appendChild(proContainer)
    const repoContainer = document.querySelector(".content__repositories")

    repos.forEach(repo => {
        const repoName = repo.name
        const repoLink = repo.html_url
        createRepoEl(repoLink, repoName, repoContainer)
    })
}


async function getReposData(url) {
    const repos = await getApiData(url)
    return repos
}

function createRepoEl(url, name, parentEl) {
    const a = document.createElement("a")
    a.classList.add("repository")
    a.setAttribute("href", url)
    a.setAttribute("target", "_blank")
    a.innerText = name
    parentEl.appendChild(a)
}



