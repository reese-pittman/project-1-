
let anime_continue_list = []; 
let leftIndex = 0
let centerIndex = 1;
let rightIndex = 2
let imgUrls = [];
let imgList = [];



async function getTopAnime(count = 5) {
    const url = `https://api.jikan.moe/v4/top/anime?sfw=true&limit=${count}`;
    

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        return json.data.map(element => element.images.jpg.image_url); 
        
    }catch (error) {
        console.error(error.message);
    }
    
};

async function displayImages() {
    const imageContainer = document.querySelector("#watched-shows");
    const centerImg = imageContainer.querySelector("#centerImg");
    const rightImg = imageContainer.querySelector("#rightImg");
    const leftImg = imageContainer.querySelector("#leftImg");

    imgList = [leftImg, centerImg, rightImg];

    imgUrls = await getTopAnime();
    try {
        for (let i = 0; i < 3; i++){
            imgList[i].src = imgUrls[i];
        }
        console.log(imgUrls);
    } catch(err) {
        console.log(err);
    }
    
    formatImgs();

};


function rightImg(){


    centerIndex++;
    rightIndex++;
    leftIndex++;
    formatImgs();

}

function leftImg() {
    centerIndex--;
    rightIndex--;
    leftIndex--;
    formatImgs();
}


function calculateIdexPos() {
    if (centerIndex >= imgUrls.length){
        centerIndex = 0;
    } else if (centerIndex < 0){
        centerIndex = imgUrls.length - 1;
    }
    
    if (rightIndex >= imgUrls.length) {
        rightIndex = 0;
    } else if (rightIndex < 0) {
        rightIndex = imgUrls.length - 1;
    }

    if (leftIndex >= imgUrls.length) {
        leftIndex = 0;
    } else if (leftIndex < 0) {
        leftIndex = imgUrls.length - 1;
    }
}

function formatImgs(){
    calculateIdexPos();
   
    imgList[0].src = imgUrls[leftIndex];
    imgList[1].src = imgUrls[centerIndex];
    imgList[2].src = imgUrls[rightIndex];


}