const navButton = document.querySelectorAll(".dropDown_button")
const dropDownList = document.querySelectorAll(".dropDown-category")
const labelClicked = document.querySelectorAll(".status")

navButton[0].addEventListener('click', function () {
    if (dropDownList[0].classList.contains("clicked") === true) { // if Menu has already been clicked
        dropDownList[0].classList.remove("clicked")

        labelClicked[0].classList.add("show") // then shows the tripple dash
        labelClicked[1].classList.remove("show") // and hidden the X label
    } else {
        dropDownList[0].classList.add("clicked")
        
        labelClicked[0].classList.remove("show")
        labelClicked[1].classList.add("show")
        }
    }
)