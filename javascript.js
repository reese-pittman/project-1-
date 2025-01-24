
let anime_continue_list = []; 
let centerIndex = 1;

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
    const imageContainer = document.querySelector("#watched-shows")

    const imgUrls = await getTopAnime();

    anime_continue_list = imgUrls.map(img_url => {
        let imgtag = document.createElement("img");
        imgtag.src = img_url;
        imgtag.classList.add("hidden-img");

        imageContainer.appendChild(imgtag);
        return imgtag;
    });

    showImgs();

};

function showImgs(){
    anime_continue_list[centerIndex].classList.add("current-img");
    anime_continue_list[centerIndex + 1].classList.add("side-img");
    anime_continue_list[centerIndex - 1].classList.add("side-img");

    anime_continue_list.slice(0, 3).forEach(element => element.classList.remove("hidden-img"));
};
