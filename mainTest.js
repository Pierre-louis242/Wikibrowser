function keyPress(e) {
if (e.keyCode === 13) {
e.preventDefault()
document.querySelector('#wikiBtn').click()
text.value = ''
} else {
// e.preventDefault()
text.removeEventListener('keypress', keyPress)
setTimeout(function() {
const req = new XMLHttpRequest()
req.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+e.target.value, false)
req.send(null)
console.log(e.target.value)

            let suggest = JSON.parse(req.response)
            let dataList = document.querySelector('#suggest')
            for (i=0; i<suggest[1].length; i++) {
                dataList.childNodes[i].value = suggest[1][i]
            }
            text.addEventListener('keypress', keyPress)
        }, 500)
    }
}

