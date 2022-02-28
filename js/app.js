// spinner
let spinner = document.querySelector('.spinner-border')
let showMore = document.querySelector('.show_more')

let maxResult = 20
// onsubmit 

document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault()
    let inputText = document.querySelector('#searchForm input')
    let inputTextValue = (inputText.value).toLowerCase()
    if (inputTextValue) {
        fetchMobileData(inputTextValue)
        spinner.classList.remove('d-none')
    } else {
        errorResult('please fill input box to search something')
    }
})


// fetch all data from search input 
const fetchMobileData = searchText => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => showMobileData(data.data))
        .catch(err => console.log(err))
}
// show search result
const showMobileData = data => {
    // spinner
    spinner.classList.add('d-none')
    // result div
    let resultSection = document.getElementById('resultSection')
    resultSection.innerHTML = ''
    // error div
    document.getElementById('errorBox').innerHTML = ''

    // if search has data
    if (data.length > 0) {
        data.forEach((phone, index) => {
            if (index < maxResult) {
                let createDiv = document.createElement('div')
                createDiv.classList.add('col')
                createDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top w-75 mx-auto my-4" alt="...">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"> ${phone.phone_name} </h5>
                        <p onclick="searchBrand('${(phone.brand).toLowerCase()}')">brand: <span class="text-primary brand_name"> ${phone.brand} </span></p>
                        <div class="mt-auto">
                            <button onclick="mobileExplore('${phone.slug}')" class="mt-auto btn btn-primary"> Explore More </button>
                        <div/>
                    </div>
                </div>`

                resultSection.appendChild(createDiv)
            }
        });
    } else {
        errorResult('no data found')
    }

    if (data.length > maxResult) {
        showMore.classList.remove('d-none')

        // show more function
        showMore.addEventListener('click', () => {
            maxResult = data.length
            showMore.classList.add('d-none')
            // result div
            let resultSection = document.getElementById('resultSection')
            resultSection.innerHTML = ''
            data.forEach((phone, index) => {
                if (index < maxResult) {
                    let createDiv = document.createElement('div')
                    createDiv.classList.add('col')
                    createDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top w-75 mx-auto my-4" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"> ${phone.phone_name} </h5>
                            <p onclick="searchBrand('${(phone.brand).toLowerCase()}')">brand: <span class="text-primary brand_name"> ${phone.brand} </span></p>
                            <div class="mt-auto">
                                <button onclick="mobileExplore('${phone.slug}')" class="mt-auto btn btn-primary"> Explore More </button>
                            <div/>
                        </div>
                    </div>`

                    resultSection.appendChild(createDiv)
                }
            });
        })

    }
}

// search by brand
let searchBrand = brandName => {
    // result div
    let resultSection = document.getElementById('resultSection')
    resultSection.innerHTML = ''
    // spinner
    spinner.classList.remove('d-none')
    document.querySelector('#searchForm input').value = brandName
    fetchMobileData(brandName)
}

// show search result
const errorResult = message => {
    spinner.classList.add('d-none')
    let errorBox = document.getElementById('errorBox')
    errorBox.innerHTML = ''
    document.getElementById('resultSection').innerHTML = ''
    let createDiv = document.createElement('div')
    createDiv.classList.add('text-danger', 'text-capitalize')
    createDiv.innerText = message
    errorBox.appendChild(createDiv)
}



// modal for single data
const mobileExplore = id => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => showSingleData(data.data))
    // .catch(err=>console.log(err))
}
const showModal = document.querySelector('.showSingleData')
const showSingleData = data => {
    showModal.classList.remove('d-none')
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.innerHTML = `
        <div class="text-center">
            <img src="img/fabicone.png" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                </tr>
            </tbody>
        </table>
    `


    console.log(data)
}