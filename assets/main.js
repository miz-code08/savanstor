const mayBay = document.querySelector(`.maybay`);
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

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
const fb = document.querySelectorAll(`.fb-link`);
const ins = document.querySelectorAll(`.ins-link`);
const thread = document.querySelectorAll(`.thread-link`);
const redirect = document.querySelector(`.redirect`);
const redirectWeb = document.querySelector(`.redirectWeb`);
const redirectApp = document.querySelector(`.redirectApp`);
const redirectDel = document.querySelector(`.redirect-x`);
let webUrl, id, appUrl;

const lockInput = document.querySelector(`.lock-input`);
const lockBtn = document.querySelector(`.comic-button`);

// dark light mode 
if (darkModeMediaQuery.matches) {
    mode.forEach(val => {
        val.checked = true;
        mode.forEach(e => { e.checked = true; });
        document.body.style.background = 'var(--dark-bg)';
        document.body.style.color = 'var(--dark-text)';
    });
}

// nếu load tất cả xong
window.onload = function() {
    // ẩn loading
    document.querySelector(".loading").style.display = "none";
    document.querySelector(`header`).style.display = "block";
    document.querySelector(`.container`).style.display = "block";

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
        memberTranslate();
        memberSlideWait();
    });

    memberBtnLeft.addEventListener("click", () => {
        memberCnt--;
        memberTranslate();
        memberSlideWait();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            memberCnt--;
        } else if (e.key === "ArrowRight") {
            memberCnt++;
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
        if(window.innerWidth <= 767.98) {
            if(memberCnt >= memberLinks.length + 1) 
                memberCnt = 1;
        } 
        else {
            if(memberCnt + 1 >= memberLinks.length) 
                memberCnt = 1;
        }
        if(memberCnt === 0) {
            if(window.innerWidth <= 767.98)
                memberCnt = memberLinks.length;
            else
            memberCnt = memberLinks.length - 2;
        }
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
                if (event.key === "Escape") {
                    document.body.style.overflow = 'auto';
                    about[idx].style.display = "none";
                }
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

    // mở app hoặc web
    if (/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        fb.forEach((val, idx) => {
            val.addEventListener("click", (e) => {
                getUrl(e, val);
                appUrl = `fb://profile/${id}`;
                openApp(webUrl, appUrl)
            });
        });
        ins.forEach((val, idx) => {
            val.addEventListener("click", (e) => {
                getUrl(e, val);
                appUrl = `instagram://user?username=${id}`;
                openApp(webUrl, appUrl)
            });
        });
        thread.forEach((val, idx) => {
            val.addEventListener("click", (e) => {
                getUrl(e, val);
                appUrl = `threads://user?username=${id}`;
                openApp(webUrl, appUrl)
            });
        });
    }

    redirectDel.addEventListener("click", () => {
        redirect.style.display = "none";
    });

    function getUrl(e, val) {
        e.preventDefault();
        webUrl = val.getAttribute("href");
        id = webUrl.includes("id=") ? webUrl.split("id=")[1] : webUrl.split('/')[3];
    }

    function openApp(webUrl, appUrl) {
        redirect.style.display = "block";
        redirectApp.addEventListener("click", () => {
            window.location = appUrl;
        });
        redirectWeb.addEventListener("click", () => {
            window.location = webUrl;
        });
    }

    // check mật khẩu để mở kho ảnh dìm
    document.addEventListener("keydown", (e) => {
        if (lockInput === document.activeElement && e.key === "Enter") {
            lockSubmit();
        }
    });    
    lockBtn.addEventListener("click", lockSubmit);

    function lockSubmit() {
        const inputValue = lockInput.value;
        
        if(inputValue === "satvuc180923") {
            document.querySelector(".lock-loading").style.display = "block";
            // document.querySelector(`header`).style.display = "none";
            // document.querySelector(`.container`).style.display = "none";
            setTimeout(() => {
                document.querySelector('.photoBad').style.display = "grid";
                document.querySelector('.lock').style.display = "none";
            }, 1500);                        
        }
        else {
            lockInput.value = "";
            lockInput.style.background = "#d03434";
            lockInput.style.color = "#fff";
            lockInput.placeholder = "Mật khẩu sai, vui lòng nhập lại";
            lockInput.focus();
        }
    };
};
