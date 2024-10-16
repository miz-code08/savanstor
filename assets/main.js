window.onload = function() {
    const underLine = document.querySelectorAll(`.underLine`);
    const navLink = document.querySelectorAll(`.navbar-link`);
    const navId = document.querySelectorAll(`.navId`);
    const panel = document.querySelectorAll(`.panel`);

    const menu = document.querySelector(`.menu`);
    const menuBtn = document.querySelector(`.fa-bars`);
    const menuBtnClose = document.querySelector(`.fa-xmark`);
    const menuLinks = document.querySelectorAll(`.menu-link`);
    let menuCntSlide = 0;
    let menuTimeSlide = 10000;

    const memberLinks = document.querySelectorAll(`.member-link`);
    const memberBtnLeft = document.querySelector(`.member__btn--left`);
    const memberBtnRight = document.querySelector(`.member__btn--right`);
    let memberCnt = 1;


    let memberTimeSlide = 5000;
    let memberTimeWait = 0;
    

    // under thanh navbar
    navLink.forEach((val, idx) => {
        val.addEventListener("mouseenter", () => {
            underLine[idx].style.opacity = "1";            
        });
        val.addEventListener("mouseleave", () => {
            underLine[idx].style.opacity = "0";
        });
    });

    // thêm class panelActive vào slide ảnh home
    panel.forEach((val, idx) => {
        val.addEventListener("click", () => {
            removePanelActive();
            val.classList.add("panelActive");
            menuCntSlide = idx;
        });
    });

    function removePanelActive() {
        panel.forEach(val => {
            val.classList.remove("panelActive");
        }) 
    }

    // chạy slide ảnh home
    if (window.innerWidth >= 768) 
        setInterval(menuAutoSlide, menuTimeSlide)    

    function menuAutoSlide() {
        panel.forEach(val => val.addEventListener("click", () => {
            return;
        }));
        menuCntSlide++;
        if(menuCntSlide > panel.length - 1)
            menuCntSlide = 0;
        removePanelActive();
        panel[menuCntSlide].classList.add("panelActive");
    }

    // mở đóng menu
    menuBtn.addEventListener("click", () => {
        menu.style.opacity = "1";
        menu.style.visibility = "visible";
        menuBtn.style.display = "none";
        menuBtnClose.style.display = "block";
    });

    menuBtnClose.addEventListener("click", () => {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menuBtn.style.display = "block";
        menuBtnClose.style.display = "none";
    });

    menuLinks.forEach(val => {
        val.addEventListener("click", () => {
            menu.style.opacity = "0";
            menu.style.visibility = "hidden";
            menuBtn.style.display = "block";
            menuBtnClose.style.display = "none";
        })
    })

    // chạy member slide bằng nút bấm
    memberBtnRight.addEventListener("click", () => {
        if(memberCnt + 2 < memberLinks.length) {
            memberCnt++;
            memberTranslate();
            memberSlideWait();
        }
        else if (window.innerWidth <= 767.98) {
            if(memberCnt < memberLinks.length) {
                memberCnt++;
                memberTranslate();
                memberSlideWait();
            }
        }
    });

    memberBtnLeft.addEventListener("click", () => {
        if(memberCnt - 1 > 0) {
            memberCnt--;
            memberTranslate();
            memberSlideWait();
        }
    });

    // chuyển động của slide
    function memberTranslate() {
        memberLinks.forEach(val => {
            let translate = (memberCnt - 1) * 100;
            console.log(translate, 20 * (memberCnt - 1));
            val.style.translate = `calc(-${translate}% - ${20 * (memberCnt - 1)}px)`;
        });
    };

    // chạy member slide auto
    setInterval(memberAutoSlide, memberTimeSlide);
    function memberAutoSlide() {
        if(!memberTimeWait) {
            memberCnt++;
            memberTranslate();
            if(memberCnt + 2 >= memberLinks.length) {
                memberCnt = 0;
            }
        }
    }

    // dừng slide 15s
    function memberSlideWait() {
        memberTimeWait = 1;
        setTimeout(() => {
            memberTimeWait = 0;
        }, 15000);
    };
};