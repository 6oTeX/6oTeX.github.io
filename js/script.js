class StickyPhoneNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.navigation__link').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.phone-scroll-tabs').offset().top + $('.phone-scroll-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.phone-nav-container').addClass('phone-nav-container--top');
		} 
		else {
			$('.phone-nav-container').removeClass('phone-nav-container--top');
		}
	}
	
	findCurrentTabSelector(_element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.navigation__link').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.phone-scroll-slider').css('width', width);
		$('.phone-scroll-slider').css('left', left);
	}
	
}

new StickyPhoneNavigation();

// Theme switch

const themeToggle = document.querySelector("#themeSwitch");

themeToggle.addEventListener("click", () => {
  document.body.classList.contains("dark-theme")
    ? enableDarkMode()
    : enableLightMode();
});

function enableDarkMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
}

function enableLightMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
}

function setThemePreference() {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    enableLightMode();
    return;
  }
  enableDarkMode();
}

document.onload = setThemePreference();

// Phone theme switch

function changeTheme() {
	// Check if the switch is on or off
	if (document.getElementById('themeSwitch').checked) {
	  // If the switch is on, set the "light" class on the body
	  document.body.className = "light-theme";
	} else {
	  // If the switch is off, set the "dark" class on the body
	  document.body.className = "dark-theme";
	}
  }

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.nav-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.scroll-tabs').offset().top + $('.scroll-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.nav-container').addClass('nav-container--top');
		} 
		else {
			$('.nav-container').removeClass('nav-container--top');
		}
    if($(window).scrollTop() > offset) {
      $('.switch').addClass('switch--bottom');
      $('.switch').removeClass('switch--start');
      $('.switch').removeClass('switch--top');
    }
    else {
      $('.switch').removeClass('switch--bottom');
      $('.switch').removeClass('switch--start');
      $('.switch').addClass('switch--top');
    }
	}
	
	 findCurrentTabSelector(_element) {
		let newCurrentId = null;
		let newCurrentTab = null;
		let self = this;
	
		$('.nav-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
	
			if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
	
		if (newCurrentId && (this.currentId !== newCurrentId || !this.currentId)) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.scroll-slider').css('width', width);
		$('.scroll-slider').css('left', left);
	}
	
}

new StickyNavigation();

const navigationLinks = document.querySelectorAll('.navigation__link');

navigationLinks.forEach(link => {
  link.addEventListener('click', e => {
    // Remove the 'active' class from all links
    navigationLinks.forEach(link => link.classList.remove('active'));

    // Add the 'active' class to the clicked link
    e.currentTarget.classList.add('active');
  });
});

console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
  prev: document.querySelector(".btn-left"),
  next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".content__cards");
const appBgContainerEl = document.querySelector(".content__background");

const cardInfosContainerEl = document.querySelector(".content__information");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
  const currentCardEl = cardsContainerEl.querySelector(".card--current");
  const previousCardEl = cardsContainerEl.querySelector(".card--third");
  const nextCardEl = cardsContainerEl.querySelector(".card--second");

  const currentBgImageEl = appBgContainerEl.querySelector(".image--current");
  const previousBgImageEl = appBgContainerEl.querySelector(".image--third");
  const nextBgImageEl = appBgContainerEl.querySelector(".image--second");

  changeInfo(direction);
  swapCardsClass();

  removeCardEvents(currentCardEl);

  function swapCardsClass() {
    currentCardEl.classList.remove("card--current");
    previousCardEl.classList.remove("card--third");
    nextCardEl.classList.remove("card--second");

    currentBgImageEl.classList.remove("image--current");
    previousBgImageEl.classList.remove("image--third");
    nextBgImageEl.classList.remove("image--second");

    currentCardEl.style.zIndex = "50";
    currentBgImageEl.style.zIndex = "-2";

    if (direction === "right") {
      previousCardEl.style.zIndex = "20";
      nextCardEl.style.zIndex = "30";

      nextBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("card--third");
      previousCardEl.classList.add("card--second");
      nextCardEl.classList.add("card--current");

      currentBgImageEl.classList.add("image--third");
      previousBgImageEl.classList.add("image--second");
      nextBgImageEl.classList.add("image--current");
    } else if (direction === "left") {
      previousCardEl.style.zIndex = "30";
      nextCardEl.style.zIndex = "20";

      previousBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("card--second");
      previousCardEl.classList.add("card--current");
      nextCardEl.classList.add("card--third");

      currentBgImageEl.classList.add("image--second");
      previousBgImageEl.classList.add("image--current");
      nextBgImageEl.classList.add("image--third");
    }
  }
}

function changeInfo(direction) {
  let currentInfoEl = cardInfosContainerEl.querySelector(
    ".information__current"
  );
  let previousInfoEl = cardInfosContainerEl.querySelector(
    ".information__third"
  );
  let nextInfoEl = cardInfosContainerEl.querySelector(".information__second");

  gsap
    .timeline()
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 0.5,
      pointerEvents: "none",
    })
    .to(
      currentInfoEl.querySelectorAll(".text"),
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "-120px",
        opacity: 0,
      },
      "-="
    )
    .call(() => {
      swapInfosClass(direction);
    })
    .call(() => initCardEvents())
    .fromTo(
      direction === "right"
        ? nextInfoEl.querySelectorAll(".text")
        : previousInfoEl.querySelectorAll(".text"),
      {
        opacity: 0,
        translateY: "40px",
      },
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "0px",
        opacity: 1,
      }
    )
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 1,
      pointerEvents: "all",
    });

  function swapInfosClass() {
    currentInfoEl.classList.remove("information__current");
    previousInfoEl.classList.remove("information__third");
    nextInfoEl.classList.remove("information__second");

    if (direction === "right") {
      currentInfoEl.classList.add("information__third");
      nextInfoEl.classList.add("information__current");
      previousInfoEl.classList.add("information__second");
    } else if (direction === "left") {
      currentInfoEl.classList.add("information__second");
      nextInfoEl.classList.add("information__third");
      previousInfoEl.classList.add("information__current");
    }
  }
}

function updateCard(e) {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const centerPosition = {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  };
  let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
  gsap.set(card, {
    "--current-card-rotation-offset": `${angle}deg`,
  });
  const currentInfoEl = cardInfosContainerEl.querySelector(
    ".information__current"
  );
  gsap.set(currentInfoEl, {
    rotateY: `${angle}deg`,
  });
}

function resetCardTransforms(e) {
  const card = e.currentTarget;
  const currentInfoEl = cardInfosContainerEl.querySelector(
    ".information__current"
  );
  gsap.set(card, {
    "--current-card-rotation-offset": 0,
  });
  gsap.set(currentInfoEl, {
    rotateY: 0,
  });
}

function initCardEvents() {
  const currentCardEl = cardsContainerEl.querySelector(".card--current");
  currentCardEl.addEventListener("pointermove", updateCard);
  currentCardEl.addEventListener("pointerout", (e) => {
    resetCardTransforms(e);
  });
}

initCardEvents();

function removeCardEvents(card) {
  card.removeEventListener("pointermove", updateCard);
}

function init() {
  let tl = gsap.timeline();

  tl.to(cardsContainerEl.children, {
    delay: 0.15,
    duration: 0.5,
    stagger: {
      ease: "power4.inOut",
      from: "right",
      amount: 0.1,
    },
    "--card-translateY-offset": "0%",
  })
    .to(
      cardInfosContainerEl
        .querySelector(".information__current")
        .querySelectorAll(".text"),
      {
        delay: 0.5,
        duration: 0.4,
        stagger: 0.1,
        opacity: 1,
        translateY: 0,
      }
    )
    .to(
      [buttons.prev, buttons.next],
      {
        duration: 0.4,
        opacity: 1,
        pointerEvents: "all",
      },
      "-=0.4"
    );
}

const waitForImages = () => {
  const images = [...document.querySelectorAll("img")];
  const totalImages = images.length;
  let loadedImages = 0;
  const loaderEl = document.querySelector(".loader span");

  gsap.set(cardsContainerEl.children, {
    "--card-translateY-offset": "100vh",
  });
  gsap.set(
    cardInfosContainerEl
      .querySelector(".information__current")
      .querySelectorAll(".text"),
    {
      translateY: "40px",
      opacity: 0,
    }
  );
  gsap.set([buttons.prev, buttons.next], {
    pointerEvents: "none",
    opacity: "0",
  });

  images.forEach((image) => {
    imagesLoaded(image, (instance) => {
      if (instance.isComplete) {
        loadedImages++;
        let loadProgress = loadedImages / totalImages;

        gsap.to(loaderEl, {
          duration: 1,
          scaleX: loadProgress,
          backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
        });

        if (totalImages == loadedImages) {
          gsap
            .timeline()
            .to(".loader", {
              duration: 0.8,
              opacity: 0,
              pointerEvents: "none",
            })
            .call(() => init());
        }
      }
    });
  });
};

waitForImages();

document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
});
