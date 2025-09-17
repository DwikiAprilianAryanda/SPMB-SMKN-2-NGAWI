document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Helper function to throttle events using requestAnimationFrame
  function throttle(callback, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        callback.apply(this, args);
        timeoutId = null;
      }, delay);
    };
  }

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navbar = document.getElementById("navbar");

  if (mobileNavToggle && navbar) {
    mobileNavToggle.addEventListener("click", () => {
      navbar.classList.toggle("open");
      document.body.classList.toggle("mobile-nav-active");
    });

    // Close nav on link click
    document.querySelectorAll("#navbar a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("open")) {
          navbar.classList.remove("open");
          document.body.classList.remove("mobile-nav-active");
        }
      });
    });
  }

  // Scroll spy for active navigation links
  const navLinks = document.querySelectorAll("#navbar a[href*='#']");
  if (navLinks.length > 0) {
    const sections = Array.from(navLinks).map((link) =>
      document.querySelector(link.getAttribute("href"))
    );

    const checkActiveLink = throttle(() => {
      let currentSection = null;
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section && scrollPosition >= section.offsetTop) {
          currentSection = section;
        }
      });

      if (currentSection) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSection.id}`) {
            link.classList.add("active");
          }
        });
      }
    }, 100);

    window.addEventListener("scroll", checkActiveLink);
    window.addEventListener("load", checkActiveLink);
  }

  // Scroll to top button functionality
  const scrollTopButton = document.querySelector(".scroll-top");
  if (scrollTopButton) {
    const toggleScrollTop = () => {
      if (window.scrollY > 300) {
        scrollTopButton.classList.add("show");
      } else {
        scrollTopButton.classList.remove("show");
      }
    };
    window.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrollTop);

    scrollTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Simple testimonial slider
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  if (testimonialItems.length > 0) {
    let currentIndex = 0;
    const interval = 5000;

    const showTestimonial = (index) => {
      testimonialItems.forEach((item, i) => {
        item.classList.remove("active");
        if (i === index) {
          item.classList.add("active");
        }
      });
    };

    const nextTestimonial = () => {
      currentIndex = (currentIndex + 1) % testimonialItems.length;
      showTestimonial(currentIndex);
    };

    showTestimonial(currentIndex);
    setInterval(nextTestimonial, interval);
  }

  // Global form validation for login and register
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  function ensureAlertElement(form) {
    let alert = form.querySelector(".form-alert");
    if (!alert) {
      alert = document.createElement("div");
      alert.className = "alert alert-warning form-alert";
      alert.setAttribute("role", "alert");
      alert.style.marginBottom = "16px";
      form.prepend(alert);
    }
    return alert;
  }

  function showWarning(form, message) {
    const alert = ensureAlertElement(form);
    alert.textContent = message;
    alert.style.display = "block";
  }

  function hideWarning(form) {
    const alert = form.querySelector(".form-alert");
    if (alert) alert.style.display = "none";
  }

  function markInvalidFields(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach((f) => {
      f.classList.remove("is-invalid");
      if (!f.checkValidity()) {
        f.classList.add("is-invalid");
      }
    });
  }

  function getFirstInvalid(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    for (const f of fields) {
      if (!f.checkValidity()) return f;
    }
    return null;
  }

  function handleFormSubmit(form, successRedirect) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      hideWarning(form);

      const isValid = form.checkValidity();
      markInvalidFields(form);

      if (!isValid) {
        showWarning(form, "Lengkapi data pribadi Anda terlebih dahulu.");
        const firstInvalid = getFirstInvalid(form);
        if (firstInvalid) {
          firstInvalid.focus();
        }
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // If valid, redirect as requested
      window.location.href = successRedirect;
    });
  }

  if (loginForm) {
    handleFormSubmit(loginForm, "thank-you.html");
  }
  if (registerForm) {
    handleFormSubmit(registerForm, "regis-berhasil.html");
  }
});
window.addEventListener("load", function () {
  let preloader = document.getElementById("preloader");
  let content = document.getElementById("content");

  preloader.style.opacity = "0";

  setTimeout(function () {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 800);
});
