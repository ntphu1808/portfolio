const imgEl = document.querySelector(".img")
const counterEl = document.querySelector(".counter")

let lastTime
let counterVal = 0

imgEl.addEventListener("click", (e) => {
    const clickTime = window.performance.now()
    const rangeTime = clickTime - lastTime

    lastTime = clickTime
    
    if (rangeTime < 800) {
        counterVal++
        if (counterVal > 1) {
            document.querySelector(".custom-effect").remove()
        }
        counterEl.textContent=`${counterVal}`
        heartBubbleEffect(e)
        lastTime = 0
    }
})

function heartBubbleEffect(event) {
    
    const xOfImg = imgEl.offsetLeft
    const yOfImg = imgEl.offsetTop

    const xOfHeart = event.clientX - xOfImg
    const yOfHeart = event.clientY - yOfImg

    const heart = document.createElement("i")
    heart.className = "fa-solid fa-heart custom-effect"
    heart.style.top = yOfHeart + "px"
    heart.style.left = xOfHeart + "px"
    imgEl.appendChild(heart)  
}