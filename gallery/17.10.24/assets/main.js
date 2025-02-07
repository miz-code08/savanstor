const mayBay = document.querySelector(`.maybay`);

const download = document.querySelectorAll(`.fa-download`);
const image = document.querySelectorAll(`.imgDownload`);

let imageUrl;
let fileName;

// nếu load tất cả xong
// window.onload = function() {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(`header`).style.display = "block";
    document.querySelector(`.container`).style.display = "grid";    

    // cuộn tới đầu trang
    mayBay.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });

    download.forEach((val, idx) => {
        val.addEventListener("click", () => {
            let a = document.createElement('a');
            if(idx === 0) {
                image.forEach((val, id) => {
                    a.href = val.src;
                    imageUrl = val.src;
                    fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                    a.download = fileName;
                    // a.download = 'downloaded-image.jpg';

                    document.body.appendChild(a);
                    a.click(); 
                    document.body.removeChild(a);
                });
                console.log(123);
            }
            else {
                a.href = image[idx-1].src;
                imageUrl = image[idx-1].src;
                fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                a.download = fileName;
                // a.download = 'downloaded-image.jpg';

                document.body.appendChild(a);
                a.click(); 
                document.body.removeChild(a);
            }
        });
    });
// };
