window.onload = function() {
    const underLine = document.querySelectorAll(`.underLine`);
    const navLink = document.querySelectorAll(`.navbar-link`);
    const navId = document.querySelectorAll(`.navId`);
    const panel = document.querySelectorAll(`.panel`);
    let cntSlide = 0;
    let timeSlide = 10000;

    navLink.forEach((val, idx) => {
        val.addEventListener("mouseenter", function() {
            underLine[idx].style.opacity = "1";            
        });
        val.addEventListener("mouseleave", function() {
            underLine[idx].style.opacity = "0";
        });
    });

    panel.forEach((val, idx) => {
        val.addEventListener("click", function() {
            removeActive();
            val.classList.add("active");
            cntSlide = idx;
        });
    });

    setInterval(slidePicture, timeSlide)    

    function removeActive() {
        panel.forEach(val => {
            val.classList.remove("active");
        }) 
    }

    function slidePicture() {
        panel.forEach(val => val.addEventListener("click", () => {
            return;
        }));
        cntSlide++;
        if(cntSlide > panel.length - 1)
            cntSlide = 0;
        removeActive();
        panel[cntSlide].classList.add("active");
        // console.log(cntSlide);
    }
};