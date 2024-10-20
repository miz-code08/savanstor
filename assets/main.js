window.onload = function() {
    const mayBay = document.querySelector(`.maybay`);

    const underLine = document.querySelectorAll(`.underLine`);
    const navLinks = document.querySelectorAll(`.navbar-link`);
    const navId = document.querySelectorAll(`.navId`);
    const panel = document.querySelectorAll(`.panel`);

    const menu = document.querySelector(`.menu`);
    const menuBtn = document.querySelector(`.fa-bars`);
    const menuBtnClose = document.querySelector(`.fa-xmark`);
    const menuLinks = document.querySelectorAll(`.menu-link`);

    const mode = document.querySelectorAll(`.checkMode`);

    const memberLinks = document.querySelectorAll(`.member-link`);
    const memberBtnLeft = document.querySelector(`.member__btn--left`);
    const memberBtnRight = document.querySelector(`.member__btn--right`);
    let memberCnt = 1;
    let memberTimeSlide = 5000;
    let memberTimeWait = 0;

    const about = document.querySelectorAll(`.member-about`);
    const aboutClose = document.querySelectorAll(`.about__close`);

    // cuộn tới đầu trang
    mayBay.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });

    // dark light mode 
    mode.forEach((val, idx) => {
        val.addEventListener("change", () => {
            if(val.checked) {
                mode.forEach(e => { e.checked = true; });
                document.body.style.background = 'var(--dark-bg)';
                document.body.style.color = 'var(--dark-text)';
            }
            else {
                mode.forEach(e => { e.checked = false; });
                document.body.style.background = 'var(--light-bg)';
                document.body.style.color = 'var(--light-text)';
            }
        });
    });

    // under thanh navbar
    navLinks.forEach((val, idx) => {
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
        });
    });

    function removePanelActive() {
        panel.forEach(val => {
            val.classList.remove("panelActive");
        }) 
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
        memberCnt++;
        if(window.innerWidth <= 767.98) {
            if(memberCnt >= memberLinks.length + 1) 
                memberCnt = 1;
        } 
        else {
            if(memberCnt + 1 >= memberLinks.length) 
                memberCnt = 1;
        }
        memberTranslate();
        memberSlideWait();
    });

    memberBtnLeft.addEventListener("click", () => {
        memberCnt--;
        if(memberCnt === 0) {
            if(window.innerWidth <= 767.98)
                memberCnt = memberLinks.length;
            else
            memberCnt = memberLinks.length - 2;
        }
        memberTranslate();
        memberSlideWait();
    });

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

    // chuyển động của slide
    function memberTranslate() {
        memberLinks.forEach(val => {
            let translate = (memberCnt - 1) * 100;
            val.style.translate = `calc(-${translate}% - ${20 * (memberCnt - 1)}px)`;
        });
    };

    // dừng slide 15s
    function memberSlideWait() {
        memberTimeWait = 1;
        setTimeout(() => {
            memberTimeWait = 0;
        }, 15000);
    };

    // hiện about
    memberLinks.forEach((val, idx) => {
        val.addEventListener("click", () => {
            about[idx].style.display = "flex";
            memberTimeWait = 1;
            document.addEventListener('keydown', function(event) {
                if (event.key === "Escape")
                    about[idx].style.display = "none";
            });
            document.body.style.overflow = 'hidden';
        });
    });

    // tắt about
    aboutClose.forEach((val, idx) => {
        val.addEventListener("click", () => {
            about[idx].style.display = "none";
            memberTimeWait = 0;
            document.body.style.overflow = 'auto';
        });
    });

};
