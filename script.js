document.addEventListener("DOMContentLoaded", function () {
  // SECTION HIGHLIGHT ON SCROLL
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  function onScroll() {
    let scrollPos = window.scrollY + 90; // 90px offset for header

    sections.forEach((section) => {
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + section.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // Run on page load

  // CONTACT FORM RESPONSE
  const contactForm = document.getElementById("contactForm");
  const contactResponse = document.getElementById("contact-response");
  if (contactForm && contactResponse) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactResponse.textContent =
        "Thank you for contacting us! We'll get back to you soon.";
      contactResponse.style.display = "block";
      this.reset();
    });
  }

  // FAQ DATA AND ACCORDION FUNCTIONALITY
  const faqs = [
    {
      question: "How can I participate in a racing event?",
      answer:
        "You can register for upcoming events through our website or contact our support team for more details.",
    },
    {
      question: "Do you offer warranties on purchased cars?",
      answer:
        "Yes, all our cars come with comprehensive warranties and aftercare support.",
    },
    {
      question: "Can I book a test drive?",
      answer:
        "Absolutely! Use our contact form or call us to schedule a test drive at your convenience.",
    },
    {
      question: "What brands of cars do you offer?",
      answer:
        "We offer a wide range of top brands including Bugatti, McLaren, Lamborghini, Ferrari, BMW, and more. Check our Gallery for details.",
    },
    {
      question: "Do you provide car maintenance and repairs?",
      answer:
        "Yes, our certified mechanics provide regular maintenance, diagnostics, and repairs for all types of racing cars.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via the Contact section on our website or email us directly for assistance.",
    },
  ];

  // Dynamically populate FAQ section
  const faqList = document.querySelector(".faq-list");
  if (faqList) {
    faqList.innerHTML = ""; // Clear existing content if any
    faqs.forEach((faq) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <button class="faq-question" aria-expanded="false">
                    <strong>${faq.question}</strong>
                    <span class="faq-toggle">+</span>
                </button>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            `;
      faqList.appendChild(li);
    });

    // Attach click listeners AFTER FAQ is populated
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true";
        // Close all
        document
          .querySelectorAll(".faq-question")
          .forEach((b) => b.setAttribute("aria-expanded", "false"));
        document
          .querySelectorAll(".faq-answer")
          .forEach((ans) => (ans.style.display = "none"));
        // Open this one if it was not already open
        if (!expanded) {
          this.setAttribute("aria-expanded", "true");
          this.nextElementSibling.style.display = "block";
        }
      });
    });
  }

  // TESTIMONIAL SLIDER FUNCTIONALITY
  const slider = document.querySelector(".testimonial-slider");
  const cards = document.querySelectorAll(".testimonial-card");
  const leftArrow = document.querySelector(".testimonial-arrow.left");
  const rightArrow = document.querySelector(".testimonial-arrow.right");
  let currentIndex = 0;
  const visibleCards = 2;

  function updateTestimonialSlider() {
    if (!slider || cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth + 24; // card width + gap
    slider.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
    // Disable arrows at ends
    if (leftArrow) leftArrow.disabled = currentIndex === 0;
    if (rightArrow)
      rightArrow.disabled = currentIndex >= cards.length - visibleCards;
  }

  if (rightArrow && leftArrow && slider) {
    rightArrow.addEventListener("click", () => {
      if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        updateTestimonialSlider();
      }
    });

    leftArrow.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateTestimonialSlider();
      }
    });

    window.addEventListener("resize", updateTestimonialSlider);
    updateTestimonialSlider();
  }
  // Simple testimonial slider: shows 2 cards at a time, scrolls left/right
  document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".testimonials-right");
    const cards = Array.from(
      document.querySelectorAll(".testimonials-right .testimonial-card")
    );
    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");
    let start = 0;

    function updateVisibleCards() {
      cards.forEach((card, idx) => {
        if (idx === start || idx === start + 1) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
      // Disable/enable buttons at ends
      leftBtn.disabled = start === 0;
      rightBtn.disabled = start + 2 >= cards.length;
    }

    if (container && leftBtn && rightBtn && cards.length > 2) {
      updateVisibleCards();

      leftBtn.addEventListener("click", function () {
        if (start > 0) {
          start--;
          updateVisibleCards();
        }
      });

      rightBtn.addEventListener("click", function () {
        if (start + 2 < cards.length) {
          start++;
          updateVisibleCards();
        }
      });
    }
  });

  // TESTIMONIAL CAROUSEL FUNCTIONALITY
  const carousel = document.getElementById("testimonial-carousel");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");
  if (carousel && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -340, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: 340, behavior: "smooth" });
    });
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("main-nav");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", nav.classList.contains("active"));
  });
});

// Testimonial scroll button functionality
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".testimonials-right");
  const leftBtn = document.querySelector(".testimonial-arrow:first-child");
  const rightBtn = document.querySelector(".testimonial-arrow:last-child");

  if (leftBtn && rightBtn && container) {
    leftBtn.addEventListener("click", () => {
      container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
      container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
    });
  }
});
// Contact form "Send Us a Message" response
const sendMessageForm = document.getElementById("sendMessageForm");
const responseDiv = document.getElementById("send-message-response");
if (sendMessageForm && responseDiv) {
  sendMessageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    responseDiv.textContent =
      "Thank you for reaching out! We'll get back to you soon.";
    responseDiv.style.display = "block";
    sendMessageForm.reset();
    setTimeout(() => {
      responseDiv.style.display = "none";
    }, 4000);
  });
}
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});
