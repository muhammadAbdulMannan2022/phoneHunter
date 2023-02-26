const baseURL = "https://openapi.programming-hero.com/api";
const serch = document.getElementById("serch");
const serchBtn = document.getElementById("serchBtn");
const moreBtn = document.getElementById("moreBtn");

const phoneDisplay = document.getElementById("phoneDisplay");
serchBtn.addEventListener("click", () => {
  phoneDisplay.innerHTML = "";
  showDataInWindow(serch.value);
});
serch.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    phoneDisplay.innerHTML = "";
    showDataInWindow(e.target.value);
  }
});

async function getPhoneData(url, searchText) {
  const res = await fetch(`${url}${searchText}`);
  const AllData = await res.json();
  return await AllData.data;
}
async function showDataInWindow(phoneName) {
  const loding = document.getElementById("loding");
  const noDataFound = document.getElementById("noDataFound");
  loding.classList.remove("d-none");
  let data = await getPhoneData(`${baseURL}/phones?search=`, phoneName);
  if (data.length > 0) {
    let allData = [];
    if (data.length > 10) {
      allData = [...data];
      data = data.splice(0, 10);
      moreBtn.classList.remove("d-none");
    }
    moreBtn.addEventListener("click", () => {
      noDataFound.classList.add("d-none");
      loding.classList.add("d-none");
      moreBtn.classList.add("d-none");
      appendDataInWindow(allData);
    });
    loding.classList.add("d-none");
    noDataFound.classList.add("d-none");
    appendDataInWindow(data);
  } else {
    loding.classList.add("d-none");
    moreBtn.classList.add("d-none");
    noDataFound.classList.remove("d-none");
  }

  function appendDataInWindow(theDataToShow) {
    phoneDisplay.innerHTML = "";
    theDataToShow.forEach((el) => {
      // console.log(el, phoneDisplay);
      const { brand, phone_name, slug, image } = el;
      let htmlForCard = `
      <div class="col">
          <div class="card h-100 px-3 py-2">
              <img src="${image}" class="card-img-top" alt="${phone_name}" />
              <div class="card-body">
                  <h5 class="card-title">${phone_name}</h5>
                  <button onclick="showDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#dynamicModal">details</button>
              </div>
          </div>
      </div>
      `;
      phoneDisplay.innerHTML += htmlForCard;
    });
  }
}
function showFeaturesInUl(obj, display) {
  for (const key in obj) {
    const li = document.createElement("li");
    if (key == "sensors") {
      li.innerText = `${key} : ${obj[key].join(", ")}`;
    } else {
      li.innerText = `${key} : ${obj[key]}`;
    }
    display.appendChild(li);
  }
}
// for modal todo next
async function showDetails(id) {
  const jsonData = await getPhoneData(`${baseURL}/phone/`, id);
  console.log(jsonData);
  const { name, releaseDate, mainFeatures, others, image } = jsonData;
  const { storage, displaySize, chipSet, memory, sensors } = mainFeatures;
  const { WLAN, Bluetooth, GPS, NFC, Radio, USB } = others ? others : "";
  const modalTitle = document.getElementById("dynamicModalLabel");
  const carousel = document.getElementById("carousel");
  const othersFeatures = document.getElementById("othersFeatures");
  const mainFeaturesOl = document.getElementById("mainFeatures");
  modalTitle.innerHTML = name;
  showFeaturesInUl(mainFeatures, mainFeaturesOl);
  showFeaturesInUl(others, othersFeatures);
  carousel.innerHTML = `<div class="carousel-item active">
  <div
    class="align-items-center justify-content-center d-flex"
  >
    <img
      src="${image}"
      class="d-block w-50 rounded"
      alt="..."
    />
  </div>
</div>
<div class="carousel-item">
  <div
    class="align-items-center justify-content-center d-flex"
  >
    <img
      src="${image}"
      class="d-block w-50 rounded"
      alt="..."
    />
  </div>
</div>
<div class="carousel-item">
  <div
    class="align-items-center justify-content-center d-flex"
  >
    <img
      src="${image}"
      class="d-block w-50 rounded"
      alt="..."
    />
  </div>
</div>`;
}
showDataInWindow("iphone");

function showMore(data) {}
