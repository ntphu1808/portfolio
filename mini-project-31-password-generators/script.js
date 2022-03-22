const lengthInput = document.getElementById("length")
const upperCheck = document.getElementById("upper")
const lowerCheck = document.getElementById("lower")
const numberCheck = document.getElementById("numbers")
const symbolCheck = document.getElementById("symbols")
const passwordEl = document.querySelector(".password-text")
const generateBtn = document.querySelector(".btn-generate")
const clipboardIcon = document.querySelector(".clipboard-icon")

clipboardIcon.addEventListener("click", () => {
    if (!passwordEl.innerText) return
    const passUnderneath = document.createElement("textarea")  // we have to use textarea element when we want to copy value to clipboard underneath
    passUnderneath.value = passwordEl.innerText
    document.body.appendChild(passUnderneath)
    passUnderneath.select()
    document.execCommand("copy")
    passUnderneath.remove() 
    alert("Password copied to clipboard!")
})

generateBtn.addEventListener("click", () => {
    const settings = [
        {upper: [upperCheck.checked, getRandomUpper]},
        {lower: [lowerCheck.checked, getRandomLower]},
        {number: [numberCheck.checked, getRandomNumber]},
        {symbol: [symbolCheck.checked, getRandomSymbol]},
    ]
    const applySettings = settings.filter(setting => Object.values(setting)[0][0])
    // Object.values(setting) returns [[upperCheck.checked, getRandomUpper]]
    generatePassword(applySettings, lengthInput.value)
})

function generatePassword(settingArr, length) {
    let passwordText = ""
    let indexes = getIndexArr(settingArr.length)

    for (let i = 0; i< length; i++) {
        const position = Math.floor(Math.random()*indexes.length)
        const idx = indexes.splice(position, 1)[0]  // it returns a list which contains the removed items
        
        passwordText += Object.values(settingArr[idx])[0][1]() //Object.values() returns an array, if the value is an array, then the result we'll get is [ [value] ] (nested array)
                                                               // because the value of an array[0][1] is a function, so we have to suffix by ()
        if (indexes.length === 0) {                            
            indexes = getIndexArr(settingArr.length)
        }
    }
    passwordEl.innerText = passwordText
}

function getIndexArr(length) {  // return the indexes as a list
    let j = 0                   // for example, if the setting array have the length of 3,
    const indexes = []          // then this function return [0, 1, 2]
    while (j < length) {
        indexes.push(j)
        j++
    }
    return indexes
}

function getRandomUpper() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26))
}

function getRandomLower() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26))
}

function getRandomNumber() {
    return String.fromCharCode(48 + Math.floor(Math.random() * 10))
}

function getRandomSymbol() {
    const symbols = "~`!@#$%^&*()_-+={[}]|\:;\"'<,>.?/"
    return symbols[Math.floor(symbols.length * Math.random())]
}



