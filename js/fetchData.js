async function loadCrewMembers() {
    return (await fetch('./../sailor_team.json')).json();
}

function handler(members, link) {
    let elements = [];
    let images = '';

    if(link.innerHTML !== 'Show all') {
        elements = members.filter(element => element.duty_slugs.includes(link.innerHTML.toLowerCase()))
    } else {
        elements = members
    }

    elements.forEach(element => images += '<div class="image"><img class="cover" src="' + element.image + '" /><div class="overlay"><div class="text"><h2>Max Mustermann</h2><p>A smooth sea never  made a skilled sailor</p></div></div></div></div>');
    document.getElementById("team").innerHTML = images;
}

function getCrewMembers(crewMembers) {
    let crewLinks = document.querySelectorAll(".crew-links");
    let images = '';
    let elements = crewMembers;
    
    for(let i = 0; i < crewLinks.length; i++){
        crewLinks[i].onclick = function() {
            'click', handler(crewMembers, crewLinks[i]), false
        }
    }
    
    elements.forEach(element => images += '<div class="image"><img class="cover" data-src="' + element.image + '" /><div class="overlay"><div class="text"><h2>Max Mustermann</h2><p>A smooth sea never  made a skilled sailor</p></div></div></div></div>');

    document.getElementById("team").innerHTML = images;
}

document.addEventListener("DOMContentLoaded", async () => {
    let crewMembers = [];
    

    try {
        crewMembers = await loadCrewMembers();
    } catch(e) {
        console.log(e)
    }

    getCrewMembers(crewMembers);

    
    const imagesOfCrew = document.querySelectorAll("[data-src]");

    function preloadImage(img) {

        const src = img.getAttribute("data-src");
        if(!src) {
            return;
        }

        img.src = src;
    }

    const imgOptions = {
        treshold: 0,
        rootMargin: "0px 0px 100px 0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
               return;
            } else {
                preloadImage(entry.target);
                imgObserver.unobserve(entry.target);
            }
        })
    }, imgOptions);

    imagesOfCrew.forEach(image => {
        imgObserver.observe(image);
    })
})