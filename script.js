const count=30;
const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let images_loaded=0;
let totalimages=0;
let photosArr=[];
const apikey='HuF21cYWuCBVb5vYckRLyJcj2SjOxxnDCxeM-uYUxv8';
const apiurl=`https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

function imagedLoaded(params) {
    console.log('image load');
    images_loaded++;
    if(images_loaded===totalimages){
        ready=true;
        loader.hidden=true;
    }
}
function set_atrtributes_(element, attributes) {
    for (const key in attributes) {
        //const element = array[key];
        element.setAttribute(key,attributes[key]);
    }
    
    return element;
}
// Crete elements for links & photos, add to dom
function displayPhotos() {
    images_loaded=0;
    totalimages=photosArr.length;
    console.log(totalimages);
    photosArr.forEach((photo)=>{
        console.log(photo);
        
        // create <img> for photo
        const item=set_atrtributes_(document.createElement('a'),{
            href:photo.links.html,
            //target:photo.links.self,
        });
        console.log(item);
        const img=set_atrtributes_(document.createElement('img'),{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        // put <img> inside <a> , then 
        
        console.log(img);
        img.addEventListener('load',imagedLoaded);
        item.appendChild(img);

        console.log(item);
        console.log(imagecontainer);
        imagecontainer.appendChild(item); 
        console.log(imagecontainer);
    });
}
// get photos from unsplash API
async function getPhotosFromAPI() {
    try{
        const response=await fetch(apiurl);
        photosArr=await response.json();
        console.log(photosArr);
        displayPhotos();
    }
    catch(error){
        //for rror
    }
}
// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    // console.log('scrolled');
    if(window.innerHeight+window.screenY>= document.body.offsetHeight-1000 && ready)
    {
        ready=false;
        getPhotosFromAPI();
    }
});
getPhotosFromAPI();