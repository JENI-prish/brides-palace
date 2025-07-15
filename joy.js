const posts = [
  {
    title: "Ethic lehanga",
    excerpt:
      "A lehanga isn't just an outfit — it's a story woven with tradition, grace, and a dash of modern magic",
    imageSrc: "https://ambraee.com/cdn/shop/articles/The_Perfect_Wedding_Ethnic_Wear_for_the_Season.webp?v=1717881020",
    date: "June 12, 2023",
    readTime: "5 min",
    url: "#"
  },
  {
    title: "Asthetic feel",
    excerpt:
      "Every thread tells a tale — and a lehanga spins a fairytale",
    imageSrc: "https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dwf3a0ba32/Blog_slay_wedding_lehenga_photoshoot.jpg",
    author: "Tech Research Team",
    date: "June 10, 2023",
    readTime: "7 min",
    url: "#"
  },
  {
    title: "bride's lehanga",
    excerpt:
      "Tradition stitched with elegance — that's the power of a perfect lehanga.",
    imageSrc: "https://cdn0.weddingwire.in/article/1216/3_2/960/jpg/56121-lehenga-wearing-styles-shyamal-bhumika-cover.jpeg",
    author: "Alumni Association",
    date: "June 08, 2023",
    readTime: "9 min",
    url: "#"
  },
  {
    title: "Wedding lehanga",
    excerpt:
      "Let your lehanga do the talking while you walk in timeless charm",
    imageSrc: "https://www.mohifashion.com/cdn/shop/articles/Mohi_Bridal_Banner_3.jpg?v=1716554794",
    author: "Wellness Center",
    date: "July 12, 2023",
    readTime: "5 min",
    url: "#"
  }
];

let currentIndex = 0;
let direction = 1;
const carousel = document.getElementById("carousel");

function createSlide(post, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (index === currentIndex) slide.classList.add("active");
  slide.style.backgroundImage = `url(${post.imageSrc})`;

  slide.innerHTML = `
      <div class="overlay"></div>
      <div class="slide-content">
        <h1><a href="${post.url}" style="color:white;text-decoration:none" target="_blank">${post.title}</a></h1>
        <p>${post.excerpt}</p>
        <div class="author">${post.author} • ${post.date} • ${post.readTime}</div>
      </div>
    `;

  return slide;
}

function renderSlides() {
  carousel.innerHTML = "";
  posts.forEach((post, i) => {
    const slide = createSlide(post, i);
    carousel.appendChild(slide);
  });

  const controls = document.createElement("div");
  controls.className = "controls";

  const dots = document.createElement("div");
  dots.className = "dots";
  posts.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot ${i === currentIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      direction = i > currentIndex ? 1 : -1;
      currentIndex = i;
      updateSlides();
    });
    dots.appendChild(dot);
  });

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow-btn";
  prevBtn.textContent = "<";
  prevBtn.onclick = () => {
    direction = -1;
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateSlides();
  };

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow-btn";
  nextBtn.textContent = ">";
  nextBtn.onclick = () => {
    direction = 1;
    currentIndex = (currentIndex + 1) % posts.length;
    updateSlides();
  };

  arrows.appendChild(prevBtn);
  arrows.appendChild(nextBtn);
  controls.appendChild(dots);
  controls.appendChild(arrows);
  carousel.appendChild(controls);
}

function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "exit-left", "exit-right");
    if (i === currentIndex) {
      slide.classList.add("active");
    } else if (direction === 1) {
      slide.classList.add("exit-left");
    } else {
      slide.classList.add("exit-right");
    }
  });

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

setInterval(() => {
  direction = 1;
  currentIndex = (currentIndex + 1) % posts.length;
  updateSlides();
}, 6000);

renderSlides();
