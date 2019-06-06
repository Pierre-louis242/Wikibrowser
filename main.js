window.onload = function () {
    var response = ''
    const affichage = document.querySelector('#affichage');

    document.querySelector('#wordInput').addEventListener('keypress', keyPress)

    function keyPress(e) {
        document.querySelector('#wordInput').removeEventListener('keypress', keyPress)
        setTimeout(function() {
            let input = document.querySelector('#wordInput').value;
            const lienWiki = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + input;
            console.log(lienWiki);
            const req = new XMLHttpRequest();
            req.open("GET", lienWiki, false);
            req.send();
            if (req.status == 200) {
                response = JSON.parse(req.response)
                console.log(response) 
                for (i=0; i<10; i++) {
                    document.querySelector('#suggest').childNodes[i+1].value = response[1][i]
                }
                document.querySelector('#wordInput').addEventListener('keypress', keyPress)
            }
        }, 1000)
    }

    document.querySelector("form").addEventListener("submit", loadXMLDoc);
    
    let imgWiki = document.querySelector("img");
    let contentImg = document.querySelector("#contentImg");
    let formulair = document.querySelector("form");
    let button = document.querySelector("button");
    let splitBar = document.querySelector("#splitBar");
    
    function loadXMLDoc(e) {
        e.preventDefault()
        let iframe = document.createElement('iframe')
        for (i=0; i<10; i++) {
            if (capitalize(document.querySelector('#wordInput').value) === response[1][i]) {
                var src = response[3][i]
                iframe.src = src
                deleteBody()
                animationPositive()
                return affichage.appendChild(iframe)
            }else if (document.querySelector('#wordInput').value != response[1][i]){
                deleteBody()
                var src = "https://broodco.github.io/404"
                iframe.src = src
                affichage.appendChild(iframe)
                animationNegative();
            }
        }
    }

    function deleteBody() {
        affichage.innerHTML = ''
    }

    function animationPositive() {
        imgWiki.style.width = "0px"
        imgWiki.style.height = "0px"
        imgWiki.style.margin = "0px"
        contentImg.style.flexDirection = "row"
        contentImg.style.justifyContent = "center"
        formulair.style.flexDirection = "row"
        button.style.marginTop = "0px"
        splitBar.style.width = "70%"
        splitBar.style.border = "0.2px solid darkblue"
        splitBar.style.boxShadow = "1px 1px 1px 1px darkblue"
    }

    function animationNegative() {
        splitBar.style.width = "50%"
        splitBar.style.border = "0.2px solid red"
        splitBar.style.boxShadow = "1px 1px 1px 1px darkred"
        imgWiki.style.width = "20%";
        imgWiki.style.height = "20%";
        imgWiki.style.borderRadius = "50%";
        imgWiki.style.margin = "20px";
        contentImg.style.flexDirection = "column"
        contentImg.style.justifyContent = "center"
        formulair.style.flexDirection = "column"
        button.style.marginTop = "5px"
    }

    function capitalize(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
}
