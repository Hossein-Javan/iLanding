const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

 /**
   * Mobile nav toggle (باز و بسته کردن منوی همبرگری)
   */
 const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
 const body = document.querySelector('body');

 function mobileNavToogle() {
     body.classList.toggle('mobile-nav-active');
     mobileNavToggleBtn.classList.toggle('bi-list');
     mobileNavToggleBtn.classList.toggle('bi-x');
 }

 if (mobileNavToggleBtn) {
     mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
 }

 /**
  * جلوگیری از بسته شدن منو هنگام کلیک روی زیرمنو در موبایل
  */
 document.querySelectorAll('.navmenu .dropdown > a').forEach(dropdownLink => {
     dropdownLink.addEventListener('click', function (e) {
         e.preventDefault(); // جلوگیری از اجرای لینک #
         
         let dropdownMenu = this.nextElementSibling; // یافتن زیرمنو
         if (dropdownMenu && dropdownMenu.tagName === "UL") {
             dropdownMenu.classList.toggle('dropdown-active'); // نمایش یا مخفی کردن زیرمنو
         }

         this.parentNode.classList.toggle('active'); // اضافه کردن کلاس active برای نمایش استایل منو باز شده

         e.stopImmediatePropagation(); // جلوگیری از بسته شدن کل منو
     });
 });

 /**
  * بستن منوی همبرگری هنگام کلیک روی لینک‌های معمولی (به جز آیتم‌های dropdown)
  */
 document.querySelectorAll('#navmenu a:not(.dropdown > a)').forEach(navmenu => {
     navmenu.addEventListener('click', function () {
         if (body.classList.contains('mobile-nav-active')) {
             mobileNavToogle(); // بستن منو هنگام کلیک روی لینک‌های غیر dropdown
         }
     });
 });

})();

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

