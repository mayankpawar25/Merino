/**
* Template Name: TheEvent
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function (event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
$(function () {
  $('#datepicker').length && $('#datepicker').datepicker({
    format: 'dd/mm/yyyy'  // Set the desired date format
  });

});

var currentStep = 1;
var updateProgressBar;

function displayStep(stepNumber) {
  if (stepNumber >= 1 && stepNumber <= 3) {
    $(".step-" + currentStep).hide();
    $(".step-" + stepNumber).show();
    currentStep = stepNumber;
    updateProgressBar();
  }
}

$(document).ready(function () {
  // Registeration Validations
  // Function to validate the step-1 form fields
  function validateStep1() {
    var isValid = true;

    // Validate name
    var name = $("#name").val();
    if (name.trim() == "") {
      isValid = false;
      $("#name").addClass("is-invalid");
    } else {
      $("#name").removeClass("is-invalid");
    }

    // Validate email
    var email = $("#email").val();
    if (email.trim() == "" || !isValidEmail(email)) {
      isValid = false;
      $("#email").addClass("is-invalid");
    } else {
      $("#email").removeClass("is-invalid");
    }

    // Validate mobile number
    var mobileNumber = $("#mobile_number").val();
    if (mobileNumber.trim() == "" || !validateMobileNumber(mobileNumber)) {
      isValid = false;
      $("#mobile_number").addClass("is-invalid");
    } else {
      $("#mobile_number").removeClass("is-invalid");
    }

    // Validate date of birth
    var dateOfBirth = $("#date").val();
    if (dateOfBirth.trim() == "") {
      isValid = false;
      $("#date").addClass("is-invalid");
    } else {
      $("#date").removeClass("is-invalid");
    }

    // Validate t-shirt size
    var tshirtSize = $("#tshirt_size").val();
    if (tshirtSize.trim() == "") {
      isValid = false;
      $("#tshirt_size").addClass("is-invalid");
    } else {
      $("#tshirt_size").removeClass("is-invalid");
    }

    // Validate meal preference
    var mealPreference = $("#meal_preference").val();
    if (mealPreference.trim() == "") {
      isValid = false;
      $("#meal_preference").addClass("is-invalid");
    } else {
      $("#meal_preference").removeClass("is-invalid");
    }

    // Validate Aadhaar number
    var adhaarNumber = $("#adhaar_number").val();
    if (adhaarNumber.trim() == "") {
      isValid = false;
      $("#adhaar_number").addClass("is-invalid");
    } else {
      $("#adhaar_number").removeClass("is-invalid");
    }

    return isValid;
  }

  // Function to validate email format
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateMobileNumber(mobileNumber) {
    // Remove non-numeric characters
    var numericMobileNumber = mobileNumber.replace(/\D/g, '');
  
    // Regular expression to validate mobile number with optional country code
    var mobileRegex = /^(\+\d{1,3})?(\d{10})$/;
  
    return mobileRegex.test(numericMobileNumber);
  }

  // Function to handle next step button click
  $(".next-step").click(function () {
    if (validateStep1()) {
      $(".progress-bar").css("width", "50%");
      $(".step-1").hide();
      $(".step-2").show();
    }
  });

  function showValidationErrorsStep1() {
    // Add is-invalid class to the fields that failed validation
    // $("#name, #email, #mobile_number, #date, #tshirt_size, #meal_preference, #adhaar_number").addClass("is-invalid");

    // Optional: Display an error message to the user
    // $(".validation-error-message").text("Please fill in all required fields.").show();
  }

  // Form submission handler
  $("#multi-step-form").submit(function (event) {
    if (!validateStep1()) {
      showValidationErrorsStep1();
      event.preventDefault(); // Prevent form submission if step-1 is not valid
    }
  });

  $('#multi-step-form').find('.step').slice(1).hide();

  $(".next-step").click(function () {
    if (currentStep < 2) {
      if (currentStep === 1) {
        console.log(validateStep1())
        if (!validateStep1()) {
          // Validation failed, show error classes and stop the stepper
          showValidationErrorsStep1();
          return;
        }
      }
      $(".step-" + currentStep).addClass("animate__animated animate__fadeOutLeft");
      currentStep++;
      setTimeout(function () {
        $(".step").removeClass("animate__animated animate__fadeOutLeft").hide();
        $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInRight");
        updateProgressBar();
      }, 500);
    }
  });

  $(".prev-step").click(function () {
    if (currentStep > 1) {
      $(".step-" + currentStep).addClass("animate__animated animate__fadeOutRight");
      currentStep--;
      setTimeout(function () {
        $(".step").removeClass("animate__animated animate__fadeOutRight").hide();
        $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInLeft");
        updateProgressBar();
      }, 500);
    }
  });

  updateProgressBar = function () {
    var progressPercentage = (currentStep - 1) * 100;
    $(".progress-bar").css("width", progressPercentage + "%");
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  function OTPInput() {
    const inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus();
        }
        else {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1)
              inputs[i + 1].focus(); event.preventDefault();
          }
          else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1)
              inputs[i + 1].focus(); event.preventDefault();
          }
        }
      });
    }
  } 
  OTPInput();
});

