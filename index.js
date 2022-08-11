const colorInput = document.querySelector('#color-input')
const schemeInput = document.querySelector('#scheme-input')
const btn = document.querySelector('#btn')
const colorsContainer = document.querySelector('.app--cards-container')

function getColorsApi() {

    const color = colorInput.value.replace('#','')
    const scheme = schemeInput.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=12`)
        .then(res => res.json())
        .then(data => {

            colorsContainer.innerHTML = ``
            data.colors.forEach((color, i, arr) => {
                colorsContainer.innerHTML += `
                    <div class='card'>
                        <div class='card--color' style='background:${color.hex.value}'>
                            <p class='card--title'>${color.name.value}</p>
                        </div>
                        <p class='card--color-code' onclick='copyCode("${color.hex.value}", ${i})'>${color.hex.value}</p>
                    </div>
                `
            })
        })
        .catch(err => {
            console.log(err)
            alert("API is not working.")
        })
}

btn.addEventListener('click', getColorsApi)

getColorsApi()

function copyCode(code, id) {

    const cards = document.querySelectorAll('.card--color-code')
    navigator.clipboard.writeText(code).then(() => {

        cards[id].classList.add('copy-text-animation')
        setTimeout(() => {
            cards[id].classList.remove('copy-text-animation')
        }, 1000)

      }, () => {
        alert('Failed to copy to clipboard')
      })

}