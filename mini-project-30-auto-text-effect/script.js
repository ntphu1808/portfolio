const textEl = document.getElementById("text")
const speedEl = document.getElementById("speed")

let text = "Hello everyone, welcome to my page"
let idx = 0
let speed = 300
textEl.innerText = text[idx]

addLetter()

function addLetter() {
    idx++
    if (idx > text.length) {idx=0}
    textEl.innerText = text.slice(0, idx)
    setTimeout(addLetter, speed)
}
 
speedEl.addEventListener("input", (e) => speed = 300 / e.target.value)