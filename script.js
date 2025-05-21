document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMobile = document.querySelector(".nav-mobile")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("menu-open")
    navMobile.classList.toggle("open")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".nav-mobile .nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("menu-open")
      navMobile.classList.remove("open")
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  function setActiveLink() {
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", setActiveLink)

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For now, we'll just log it to the console
      console.log("Form submitted:", { name, email, subject, message })

      // Show success message (in a real app, you'd do this after successful submission)
      alert("Thank you for your message! I will get back to you soon.")

      // Reset form
      contactForm.reset()
    })
  }

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Initialize Lucide icons
  const lucide = window.lucide
  lucide.createIcons()
})

