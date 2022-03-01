// spinner
let spinner = document.querySelector(".spinner-border");
let showMore = document.querySelector(".show_more");

let maxResult = 20;
// onsubmit

document.getElementById("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    // result div
    document.getElementById("resultSection").innerHTML = "";
    // error div
    document.getElementById("errorBox").innerHTML = "";
    // show more
    showMore.classList.add("d-none");
    let inputText = document.querySelector("#searchForm input");
    let inputTextValue = inputText.value.toLowerCase();
    if (inputTextValue) {
        fetchMobileData(inputTextValue);
        spinner.classList.remove("d-none");
    } else {
        errorResult("please fill input box to search something");
    }
    inputText.value = "";
});

// fetch all data from search input
const fetchMobileData = (searchText) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then((res) => res.json())
        .then((data) => showMobileData(data.data))
        .catch((err) => console.log(err));
};
// show search result
const showMobileData = (data) => {
    // spinner
    spinner.classList.add("d-none");
    // result div
    let resultSection = document.getElementById("resultSection");
    resultSection.innerHTML = "";


    //  search  data
    if (data.length > 0) {
        data.forEach((phone, index) => {
            if (index < maxResult) {
                let createDiv = document.createElement("div");
                createDiv.classList.add("col");
                createDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top w-75 mx-auto my-4" alt="...">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"> ${phone.phone_name} </h5>
                        <p onclick="searchBrand('${phone.brand.toLowerCase()}')">brand: <span class="text-primary brand_name"> ${phone.brand} </span></p>
                        <div class="mt-auto">
                            <button onclick="mobileExplore('${phone.slug}')" class="mt-auto mb-3 btn btn-primary"> Explore More </button>
                        <div/>
                    </div>
                </div>`;

                resultSection.appendChild(createDiv);
            }
        });
    } else {
        errorResult("no data found");
    }

    if (data.length > maxResult) {
        showMore.classList.remove("d-none");

        // show more function
        showMore.addEventListener("click", () => {
            maxResult = data.length;
            showMore.classList.add("d-none");
            // result div
            let resultSection = document.getElementById("resultSection");
            resultSection.innerHTML = "";
            data.forEach((phone, index) => {
                if (index < maxResult) {
                    let createDiv = document.createElement("div");
                    createDiv.classList.add("col");
                    createDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top w-75 mx-auto my-4" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"> ${phone.phone_name} </h5>
                            <p onclick="searchBrand('${phone.brand.toLowerCase()}')">brand: <span class="text-primary brand_name"> ${phone.brand} </span></p>
                            <div class="mt-auto">
                                <button onclick="mobileExplore('${phone.slug}')" class="mt-auto btn btn-primary"> Explore More </button>
                            <div/>
                        </div>
                    </div>`;

                    resultSection.appendChild(createDiv);
                }
            });
        });
    }
};

// search by brand
let searchBrand = (brandName) => {
    // result div
    let resultSection = document.getElementById("resultSection");
    resultSection.innerHTML = "";
    // spinner
    spinner.classList.remove("d-none");
    document.querySelector("#searchForm input").value = brandName;
    fetchMobileData(brandName);
};

// show search result
const errorResult = (message) => {
    spinner.classList.add("d-none");
    let errorBox = document.getElementById("errorBox");
    errorBox.innerHTML = "";
    document.getElementById("resultSection").innerHTML = "";
    let createDiv = document.createElement("div");
    createDiv.classList.add("text-danger", "text-capitalize");
    createDiv.innerText = message;
    errorBox.appendChild(createDiv);
};

// modal for single data
const mobileExplore = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then((res) => res.json())
        .then((data) => showSingleData(data.data));
    // .catch(err=>console.log(err))
};

const showModal = document.querySelector(".showSingleData");
// single data function
const showSingleData = (data) => {
    document.body.style.overflowY = "hidden";
    showModal.classList.remove("d-none");
    showModal.innerHTML = "";
    let cardDiv = document.createElement("div");
    cardDiv.onclick = () => singleCard(event);
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
            <div class="close fw-bold" onclick="closeModel()" >X</div>
            <img src="${data.image ? data.image : ""}" class="card-img-top mb-3" alt="...">
            <div class="card-body">
                <h5 class="card-title"> ${data.name ? data.name : ""} </h5>
                <p>Brand: <span class="text-primary"> ${data.brand ? data.brand : ""} </span></p>
                    <p class="text-success">${data.releaseDate ? data.releaseDate : "<span class='text-danger'>No release date found</span>"}</p>

                <ul class="featureList p-0 py-3">                    
                    <li class="featerHead"><b class="me-2"> Main Features: </b></li>
                    <li><b class="me-2"> Storage </b><span> ${data.mainFeatures.storage ? data.mainFeatures.storage : ""} </span></li>
                    <li><b class="me-2"> Display size </b><span> ${data.mainFeatures.displaySize ? data.mainFeatures.displaySize : ""} </span></li>
                    <li><b class="me-2"> Chip set </b><span> ${data.mainFeatures.chipSet ? data.mainFeatures.chipSet : ""} </span></li>
                    <li><b class="me-2"> Memory </b><span> ${data.mainFeatures.memory ? data.mainFeatures.memory : ""} </span></li>
                    <li>
                        <b class="me-2" > Sensors </b>
                        <span>
                            ${data.mainFeatures.sensors.map((item) => "<span> " + item + "</span>")}
                        </span>
                    </li>
                </ul>
                <ul class="featureList p-0 py-3">                    
                    <li class="featerHead"><b> Others Features:  </b></li>
                    <li><b class='me-2'> WLAN </b><span> ${data.others?.WLAN ? data.others.WLAN : '<span class="text-danger">No data found</span>'} </span></li>
                    <li><b class='me-2'> Bluetooth </b><span> ${data.others?.Bluetooth ? data.others.Bluetooth : '<span class="text-danger">No data found</span>'} </span></li>
                    <li><b class='me-2'> GPS </b><span> ${data.others?.GPS ? data.others.GPS : '<span class="text-danger">No data found</span>'} </span></li>
                    <li><b class='me-2'> NFC </b><span> ${data.others?.NFC ? data.others.NFC : '<span class="text-danger">No data found</span>'} </span></li>
                    <li><b class='me-2'> Radio </b><span> ${data.others?.Radio ? data.others.Radio : '<span class="text-danger">No data found</span>'} </span></li>
                    <li><b class='me-2'> USB </b><span> ${data.others?.USB ? data.others.USB : '<span class="text-danger">No data found</span>'} </span></li>
                </ul>
            </div>


        `;
    showModal.appendChild(cardDiv);

    console.log(data);
};

let closeModel = () => {
    document.body.style.overflowY = "visible";
    showModal.classList.add("d-none");
};

showModal.addEventListener("click", closeModel);

// to stop bubbling
let singleCard = (event) => {
    event.stopPropagation();
};
