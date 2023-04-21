import ipads from "../assets/data/ipads.js";

/* 장바구니 드롭다운 메뉴 */
const basketStarterEl = document.querySelector(".basket-starter");
const basketEl = document.querySelector(".basket");

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", (event) => {
  event.stopPropagation();
});
window.addEventListener("click", () => {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

/* 검색창 활성화 */
const headerEl = document.querySelector(".header");
const headerMenuEls = [...headerEl.querySelectorAll(".menu__item")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search__closer");
const searchShadowEl = searchWrapEl.querySelector(".search__shadow");
const searchInputEl = searchWrapEl.querySelector(".search__input");
const searchDelayEls = [...searchWrapEl.querySelectorAll(".autocompletes__item")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

// 요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("show");
      return;
    }
    entry.target.classList.add("show");
  });
});
const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => io.observe(el));

// 비디오 재생!
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// '당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`;
  });
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.append(itemEl);
});
