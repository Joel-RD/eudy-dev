document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const navMobile = document.querySelector(".nav-mobile")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("menu-open")
    navMobile.classList.toggle("open")
  })

  const mobileLinks = document.querySelectorAll(".nav-mobile .nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("menu-open")
      navMobile.classList.remove("open")
    })
  })

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

  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      console.log("Form submitted:", { name, email, subject, message })

      alert("Thank you for your message! I will get back to you soon.")

      contactForm.reset()
    })
  }

  document.getElementById("currentYear").textContent = new Date().getFullYear()

  const lucide = window.lucide
  lucide.createIcons()
})

