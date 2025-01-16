

async function getTopAnime(count = 5) {
    const imageContainer = document.querySelector("#top-shows")
    const url = `https://api.jikan.moe/v4/top/anime?sfw=true&limit=${count}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        
        const json = await response.json();
        json.data.forEach(element => {
            console.log(element.images.jpg.image_url)
            let imgtag = document.createElement("img");
            imgtag.src = element.images.jpg.image_url
            imgtag.classList.add("top-anime-img")

            if (count > 1){
                
            }

            imageContainer.appendChild(imgtag);
            

            
        });
    }catch (error) {
        console.error(error.message);
    }
    
};



