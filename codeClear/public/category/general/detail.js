let currItemName = "";
let currUserId = getUserId();

let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";
let originName = decodeURI(
  window.location.href.split("?")[1].split("=")[1].replaceAll("-", "ยท")
);
const currCategory = decodeURI(
  window.location.href.split("?")[1].split("=")[1].split("-")[0]
);

// ์ํ
const goods = document.getElementById("goods");

const getList = function (
  img,
  delivery,
  name,
  description,
  price,
  manufacturer
) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsImgDiv = document.createElement("div");
    const tempGoodsTxtDiv = document.createElement("div");
    const tempGoodsImg = document.createElement("img");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("button");

    tempGoodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `[${manufacturer}]` + `${name}`;
    tempGoodsPrice.innerText = `${price.toLocaleString("ko-KR")}์`;
    tempGoodsInfo.innerText = `${description}`;

    if (!manufacturer) {
      tempGoodsText.innerText = `${name}`;
    }

    tempGoodsCart.classList.add(`goodsCartBtn`);
    tempGoodsText.classList.add(`goodsTxt`);
    tempGoodsPrice.classList.add(`priceTxt`);
    tempGoodsInfo.classList.add(`goodsInfoTxt`);

    goods.style = `
    display: flex;
    width: 837px;
    `;
    tempGoodsDiv.style = `
    display:flex;
    flex-wrap:wrap;
    width:279px
    `;
    tempGoodsInfo.style = `
    font-size: 12px;
    color: rgb(205, 204, 204);
    `;
    tempGoodsTxtDiv.style = `
    width : 250px;
    `;
    tempGoodsCart.style = `
    cursor: pointer;
    `;

    tempGoodsDel.classList.add(`deliveryTxt`);
    tempGoodsImg.classList.add(`goodsImg`);
    tempGoodsImgDiv.classList.add(`goodsItemDiv`);

    goods.appendChild(tempGoodsDiv);
    tempGoodsDiv.append(tempGoodsImgDiv);
    tempGoodsImgDiv.append(tempGoodsImg);
    tempGoodsDiv.append(tempGoodsTxtDiv);
    tempGoodsTxtDiv.append(tempGoodsDel);
    tempGoodsTxtDiv.append(tempGoodsText);
    tempGoodsTxtDiv.append(tempGoodsPrice);
    tempGoodsTxtDiv.append(tempGoodsInfo);
    tempGoodsDiv.append(tempGoodsCart);

    // ์?ํ ์์ธํ์ด์ง๋ก ์ด๋
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    // ์ด๋ฏธ์ง ํด๋ฆญ์
    tempGoodsImgDiv.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempGoodsCart.onclick = (e) => {
      e.preventDefault();
      if (currUserId == "") return (location.href = "/SignIn");
      axios
        .post(
          "/api/product/cartDamgi?productName=" +
            name +
            "&userId=" +
            getUserId() +
            "&price=" +
            price
        )
        .then((data) => {
          location.href = "/Cart";
        });
    };
  } catch (error) {}
};

const categoryList = [
  [
    "์?์ฒด๋ณด๊ธฐ",
    `๋ธ๋ก์ฝ๋ฆฌยทํํ๋ฆฌ์นดยท์๋ฐฐ์ถ`,
    `์ฝฉ๋๋ฌผยท๋ฒ์ฏ`,
    `์นํ๊ฒฝ`,
    `์ํยท๋ํยท๋ง๋ยท๋ฐฐ์ถ`,
    `๊ณ?๊ตฌ๋งยท๊ฐ์ยท๋น๊ทผ`,
    `์ค์ดยทํธ๋ฐยท๊ณ?์ถ`,
    `์๊ธ์นยท์์ฑ์ยท๋๋ฌผ`,
    `๋๋ยท์ด์ยท๊ฐํธ์ฑ์`,
  ],
  [
    "์?์ฒด๋ณด๊ธฐ",
    `์์๊ณผ์ผ`,
    `์ยท์ก๊ณก`,
    `์นํ๊ฒฝ`,
    `๊ฐํธ๊ณผ์ผ`,
    `์?์ฒ?๊ณผ์ผ`,
    `๋๋ยท๊ฑด๊ณผ์ผ`,
    `๊ตญ์ฐ๊ณผ์ผ`,
    `๊ฒฌ๊ณผ๋ฅ`,
  ],
  [
    "์?์ฒด๋ณด๊ธฐ",
    `์ค์ง์ดยท๋์งยท๋ฌธ์ด`,
    `๊นยท๋ฏธ์ญยทํด์กฐ๋ฅ`,
    `์?์ฒ?์์ฐ`,
    `์์ฐยท๊ฒยท๋์คํฐ`,
    `๊ฑด์ด๋ฌผยท๋ค์ํฉ`,
    `์์?๋ฅ`,
    `ํด์ฐ๋ฌผยท์กฐ๊ฐ๋ฅ`,
    `๊ตด๋นยท๋ฐ๊ฑด๋ฅ`,
    `์์ฐ๊ฐ๊ณตํ`,
  ],
  [
    "์?์ฒด๋ณด๊ธฐ",
    `๊ณ๋๋ฅ`,
    `๊ตญ๋ด์ฐ ์๊ณ?๊ธฐ`,
    `๋ญยท์ค๋ฆฌ๊ณ?๊ธฐ`,
    `์์์ฐ ์๊ณ?๊ธฐ`,
    `์๋์กยท๋๊น์ค`,
    `๋ผ์ง๊ณ?๊ธฐ`,
    `์๊ณ?๊ธฐ`,
  ],
  [
    "์?์ฒด๋ณด๊ธฐ",
    `๊น์นยท์?๊ฐยท์ฅ๋ฅ`,
    `๊ตญยทํยท์ฐ๊ฐ`,
    `๋๋ถยท์ด๋ฌตยท๋ถ์นจ๊ฐ`,
    `๋ฐํคํธยท๋ฉ์ธ์๋ฆฌ`,
    `๋ฒ?์ด์ปจยทํยทํต์กฐ๋ฆผ`,
    `๋ฐ๋ฐ์ฐฌ`,
  ],
  [
    "์?์ฒด๋ณด๊ธฐ",
    `๋ก๋ณถ์ดยทํ๊นยท์๋`,
    `์?์ยท์๋ฆฌ์ผ`,
    `์๋ฌ๋ยท๋ญ๊ฐ์ด์ด`,
    `ํผ์ยทํซ๋๊ทธยท๋ง๋`,
    `๋์๋ฝยท๋ฐฅ๋ฅ`,
    `ํญ๋ฆฝยท๋ก๊ฐ๋นยท์์ฃผ`,
    `ํ์คํยท๋ฉด๋ฅ`,
    `์ฃฝยท์คํยท์นด๋?`,
  ],
  [
    "์?์ฒด๋ณด๊ธฐ",
    `์์ฉ์?ยท์ฐธ๊ธฐ๋ฆยท์ค์ผ`,
    `ํ์คํยท๋ฉด๋ฅ`,
    `์๊ธยท์คํยทํฅ์?๋ฃ`,
    `์์ดยท์์คยท๋๋?์ฑ`,
    `๋ฐ๊ฐ๋ฃจยท๊ฐ๋ฃจยท๋ฏน์ค`,
    `์๋ยท์ก์?ยท์ฅ๋ฅ`,
  ],
  ["์?์ฒด๋ณด๊ธฐ", `์ปคํผ`, `์์ยทํ์ฐ์`, `์ฐจ`, `์๋ฃยท์ฃผ์ค`, `์ฐ์?ยท๋์?ยท์๊ฑฐํธ`],
  ["์?์ฒด๋ณด๊ธฐ", `์ฟ?ํค!!!`],
];

function vegiCategories(category) {
  let currCategoryList = categoryList[8];
  switch (category) {
    case "์ฑ์":
      currCategoryList = categoryList[0];
      break;
    case "๊ณผ์ผ":
      currCategoryList = categoryList[1];
      break;
    case "์์ฐ":
      currCategoryList = categoryList[2];
      break;
    case "์?์ก":
      currCategoryList = categoryList[3];
      break;
    case "๊ตญ":
      currCategoryList = categoryList[4];
      break;
    case "์๋ฌ๋":
      currCategoryList = categoryList[5];
      break;
    case "๋ฉด":
      currCategoryList = categoryList[6];
      break;
    case "์์":
      currCategoryList = categoryList[7];
      break;
    case "๊ฐ์":
      currCategoryList = categoryList[8];
      break;
    default:
      currCategoryList = categoryList[0];
      break;
  }
  try {
    const itemInner = document.getElementsByClassName("item-inner")[0];
    itemInner.innerHTML = "";
    currCategoryList.forEach((innerText) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerText = innerText;
      tempDiv.style = `
        width : 200px;
        white-space:nowrap;
      `;
      itemInner.appendChild(tempDiv);
    });
  } catch (error) {}
}
// ํํฐ ์ฌ์ด๋๋ฐ (๋ธ๋๋๋ช)
const brandFilter = document.getElementById("filter-brand");
const priceBrand = document.getElementById("brand-price");
let brandSet = new Set();
const checkList = document.getElementsByClassName("check-list");
checkList[0].onclick = () => {
  if (selectedPrice == 0) selectedPrice = -1;
  else selectedPrice = 0;
  pricesFilter();
  searchFunc();
};
checkList[1].onclick = () => {
  if (selectedPrice == 1) selectedPrice = -1;
  else selectedPrice = 1;
  pricesFilter();
  searchFunc();
};
checkList[2].onclick = () => {
  if (selectedPrice == 2) selectedPrice = -1;
  else selectedPrice = 2;
  pricesFilter();
  searchFunc();
};
checkList[3].onclick = () => {
  if (selectedPrice == 3) selectedPrice = -1;
  else selectedPrice = 3;
  pricesFilter();
  searchFunc();
};
// let filterSet = new Set();

// ํํฐ๋ฆฌ์คํธ
const getFilter = function (manufacturer) {
  try {
    const filterLi = document.createElement("li");
    const filterImg = document.createElement("img");
    const filterA = document.createElement("button");
    const filterAa = document.createElement("button");
    filterImg.src = `/category/imges/detailImg/check-circle.svg`;
    filterA.style = `
    border : none;
    background-color : transparent;
    border-radius: 50%;
    padding : 0;
    `;
    filterAa.innerText = `${manufacturer}`;
    filterAa.style = `
    margin-left: 20px;
    line-height: 2;
    border : none;
    background-color : transparent; 
    `;
    filterImg.style = `
    opacity: 0.7;
    `;
    filterLi.onclick = () => {
      if (selectedBrand.includes(filterAa.innerText)) {
        const tempAry = [];
        selectedBrand.filter((elem) => {
          if ((elem, filterAa.innerText, elem !== filterAa.innerText)) {
            tempAry.push(elem);
          }
          elem !== filterAa.innerText;
        });
        selectedBrand = tempAry;
      } else {
        selectedBrand.push(filterAa.innerText);
      }
      if (selectedBrand.includes(filterAa.innerText)) {
        filterA.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      } else {
        filterA.style.backgroundColor = "transparent";
      }
      searchFunc();
      // vegiCategories();
      vegiCategories();
    };

    brandFilter.append(filterLi);
    filterA.append(filterImg);
    filterLi.append(filterA);
    filterLi.append(filterAa);
  } catch (error) {}
};

// ์นดํ๊ณ?๋ฆฌ ๋ฐ์ดํฐ ์์ฒญ
let selectedBrand = [];
let selectedPrice = -1;
const filter = document.getElementById("filter");
const list = document.getElementById("list");
const totalCount = document.getElementById("totalCount");
const arrayPrice = document.getElementById("arrayPrice");
const productNone = document.getElementById("productNone");
function searchFunc() {
  goods.innerHTML = "";
  axios
    .post("/api/product/category", {
      data: currCategory,
      brand: selectedBrand,
      price: selectedPrice,
    })
    .then((data) => {
      totalCount.innerText = "์ด " + data.data.length + "๊ฑด";
      vegiCategories(currCategory);
      data.data.forEach((item) => {
        const category = Object.values(item.category[0]);
        getList(
          item.img,
          item.delivery,
          item.name,
          item.description,
          item.price,
          item.manufacturer,
          category
        );
        if (!brandSet.has(item.manufacturer) && item.manufacturer != "") {
          brandSet.add(item.manufacturer);
          getFilter(item.manufacturer);
        }
      });
      if (data.data.length == 0) {
        productNone.style.display = "flex";
        list.style.display = "none";
        if (selectedBrand.length == 0 && selectedPrice == -1)
          filter.style.display = "none";
      } else {
        productNone.style.display = "none";
        list.style.display = "block";
        filter.style.display = "block";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
searchFunc();
// vegiCategories();

const pricesFilter = function () {
  switch (selectedPrice) {
    case -1:
      [...checkList].forEach((item) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
      });
      break;
    case 0:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 0) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
    case 1:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 1) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
    case 2:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 2) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
    case 3:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 3) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
  }
};

function getUserId() {
  for (let i = 0; i < document.cookie.split(";").length; ++i) {
    return document.cookie.split(";")[i].split("=")[0];
  }
}

// ํ์ด์ง ์นดํ๊ณ?๋ฆฌ ์?๋ชฉ
const itemHead = document
  .getElementById("item-head")
  .getElementsByTagName("h1")[0];

itemHead.innerText = originName;

// ๋ฐฐ๋ ์?ํ๊ธฐ
const banner = document.getElementById("banner").getElementsByTagName("img")[0];
switch (originName) {
  case "์ฑ์":
    banner.src = "/category/imges/banner/vegi_banner.jpg";
    break;
  case "๊ณผ์ผยท๊ฒฌ๊ณผยท์":
    banner.src = "/category/imges/banner/fruit_banner.jpeg";
    break;
  case "์์ฐยทํด์ฐ๋ฌผยท๊ฑด์ด๋ฌผ":
    banner.src = "/category/imges/banner/sea_banner.jpeg";
    break;
  case "์?์กยท๊ณ๋":
    banner.src = "/category/imges/banner/meat_banner.jpg";
    break;
  case "๊ตญยท๋ฐ์ฐฌยท๋ฉ์ธ์๋ฆฌ":
    banner.src = "/category/imges/banner/soup_banner.jpg";
    break;
  case "์๋ฌ๋ยท๊ฐํธ์":
    banner.src = "/category/imges/banner/salad_banner.jpeg";
    break;
  case "๋ฉดยท์๋ยท์ค์ผ":
    banner.src = "/category/imges/banner/oil_banner.jpeg";
    break;
  case "์์ยท์๋ฃยท์ฐ์?ยท์ปคํผ":
    banner.src = "/category/imges/banner/drink_banner.jpg";
    break;
  case "๊ฐ์ยท๊ณผ์ยท๋ก":
    banner.src = "/category/imges/banner/cookie_banner.jpg";
    break;
  default:
    banner.src = "/category/imges/banner/cookie_banner.jpg";
    break;
}
