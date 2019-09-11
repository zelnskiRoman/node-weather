const btn = document.querySelector('#btn-search')
const text = document.querySelector('#type-text')
const err = document.querySelector('#error')
const success = document.querySelector('#success')
const container = document.querySelectorAll('.container')[0]
const texts = document.querySelectorAll('#success p')

text.addEventListener('input', () => {
    success.style.display = 'none'
    err.style.display = 'none'
})

btn.addEventListener('click', () => {
    if (!text.value)
        return
    fetch(`/weather?adress=${text.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                success.style.display = 'none'
                err.style.display = 'block'
                text.value = '';
            } else {
                err.style.display = 'none'
                texts[0].innerText = `Humidity ${data.resp.humidity} | Precipitation: ${data.resp.precipProbability}%`
                texts[1].innerText = `${data.resp.summary} | Temp: ${data.resp.temperature} C`
                texts[2].innerText = `${data.location}`
                success.style.display = 'block'
                text.value = '';
            }
        })
    })
})