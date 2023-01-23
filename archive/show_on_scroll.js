//Function to check if an element is in the viewport
function isElementInViewport(element) {
    //Get the rectangle enclosing the element
    var rect = element.getBoundingClientRect();
    
    return (
    (rect.top <= 0
    && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}

//Function to loop through items to show on scroll
function loop() {
    //Grab the elements desired
    var elementsToShow = document.querySelectorAll(".showOnScroll");
    elementsToShow.forEach(function (element) {
        if (isElementInViewport(element)) {
            console.log(element.classList);
            //If the element isn't already part of the 'isVisible' class
            if (element.classList.item(2) != "isVisible") {
                //Add to the visible class if element in viewport
                element.classList.add("isVisible");
            }
            
        } else {
            //If the element is part of the 'isVisible' class
            if (element.classList.contains("isVisible")) {
            //Otherwise, remove the element from the visible class
            element.classList.remove("isVisible");
            }
        }
    });
    
    //Pass this as a callback to the helper function (requestAnimationFrame)
    scroll(loop);
}


//Apply the request animation method to the variable scroll. If it isn't supported, fallback to the second function
var scroll = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60)};

//Call the loop function
loop();