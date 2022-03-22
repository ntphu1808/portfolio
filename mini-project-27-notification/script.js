const btnEl = document.querySelector(".btn")
const notifiContainer = document.querySelector(".notification-container")

btnEl.addEventListener("click", showNotification)
const messArray = ["Message One", "Message Two", "Message Three"]
const colorArray = ["primary", "dangerous", "warning"]

function showNotification() {
    const notifEl = document.createElement("span")
    notifEl.classList.add("notification")
    const message = messArray[Math.floor(Math.random()*messArray.length)]
    const color = colorArray[Math.floor(Math.random()*colorArray.length)]
    notifEl.innerText = message
    notifEl.classList.add(color)
    notifiContainer.appendChild(notifEl)

    setTimeout(() => notifEl.remove(), 3000)
}