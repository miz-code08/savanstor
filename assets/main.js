window.onload = function() {
    const underLine = document.querySelectorAll(`.underLine`);
    const navLink = document.querySelectorAll(`.navbar-link`);
    const navId = document.querySelectorAll(`.navId`);
    const panel = document.querySelectorAll(`.panel`);

    const menu = document.querySelector(`.menu`);
    const menuBtn = document.querySelector(`.fa-bars`);
    const menuBtnClose = document.querySelector(`.fa-xmark`);

    let cntSlide = 0;
    let timeSlide = 10000;


    // thêm active thanh navbar
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

    function removeActive() {
        panel.forEach(val => {
            val.classList.remove("active");
        }) 
    }

    // chạy slide ảnh home
    if (window.innerWidth >= 768) 
        setInterval(slidePicture, timeSlide)    

    function slidePicture() {
        panel.forEach(val => val.addEventListener("click", () => {
            return;
        }));
        cntSlide++;
        if(cntSlide > panel.length - 1)
            cntSlide = 0;
        removeActive();
        panel[cntSlide].classList.add("active");
    }

    // mở đóng menu
    menuBtn.addEventListener("click", function() {
        menu.style.opacity = "1";
        menu.style.visibility = "visible";
        menuBtn.style.display = "none";
        menuBtnClose.style.display = "block";
    });

    menuBtnClose.addEventListener("click", function() {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menuBtn.style.display = "block";
        menuBtnClose.style.display = "none";
    });
};