document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault()
    let inputText = document.querySelector('#searchForm input')
    let inputTextValue = inputText.value
    console.log(inputTextValue)
})