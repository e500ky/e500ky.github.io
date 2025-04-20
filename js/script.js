document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle')
  const body = document.body

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    body.classList = savedTheme === 'dark' ? 'dark-theme' : 'light-theme'
  } else {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      body.classList = 'dark-theme'
    }
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme')
      localStorage.setItem('theme', 'light')
      document.getElementById('signature-path').setAttribute('fill', '#000')
    } else {
      body.classList.replace('light-theme', 'dark-theme')
      localStorage.setItem('theme', 'dark')
      document.getElementById('signature-path').setAttribute('fill', '#ffffff')
    }
  })

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle')
  const navLinks = document.querySelector('.nav-links')

  mobileNavToggle.addEventListener('click', () => {
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true'
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded)
    navLinks.classList.toggle('active')
    document.body.classList.toggle('nav-open')
  })

  const sections = document.querySelectorAll('section')
  const navItems = document.querySelectorAll('.nav-link')

  function setActiveNavItem() {
    let current = ''
    let scrollPosition = window.scrollY + 200

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute('id')
      }
    })

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      current = sections[sections.length - 1].getAttribute('id')
    }

    navItems.forEach((navItem) => {
      navItem.classList.remove('active')
      if (navItem.getAttribute('href').substring(1) === current) {
        navItem.classList.add('active')
      }
    })
  }

  navItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      navItems.forEach((navItem) => {
        navItem.classList.remove('active')
      })

      this.classList.add('active')

      const targetId = this.getAttribute('href').substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        e.preventDefault()
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        })
      }
    })
  })

  window.addEventListener('scroll', setActiveNavItem)

  const cursorFollower = document.querySelector('.cursor-follower')

  if (window.innerWidth > 991) {
    document.addEventListener('mousemove', (e) => {
      cursorFollower.style.left = `${e.clientX}px`
      cursorFollower.style.top = `${e.clientY}px`
    })

    document.addEventListener('mousedown', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)'
    })

    document.addEventListener('mouseup', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)'
    })

    document
      .querySelectorAll('a, button, .expertise-card, input, textarea')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursorFollower.style.width = '30px'
          cursorFollower.style.height = '30px'
          cursorFollower.style.opacity = '0.3'
        })

        el.addEventListener('mouseleave', () => {
          cursorFollower.style.width = '20px'
          cursorFollower.style.height = '20px'
          cursorFollower.style.opacity = '0.5'
        })
      })
  }

  function loadEmailJS() {
    const script = document.createElement('script')
    script.src =
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = function () {
      emailjs.init('8zbxgTlfF7GNeH5xa')
    }
  }

  loadEmailJS()

  const contactForm = document.getElementById('contact-form')

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()

      contactForm.classList.add('submitting')
      const submitBtn = contactForm.querySelector('.submit-btn')
      submitBtn.classList.add('loading')
      submitBtn.disabled = true

      contactForm.classList.remove('success', 'error')

      emailjs
        .sendForm('service_nuvm4km', 'template_6jr4zub', contactForm)
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text)
          contactForm.classList.add('success')
          contactForm.reset()

          setTimeout(() => {
            contactForm.classList.remove('success')
          }, 5000)
        })
        .catch(function (error) {
          console.error('FAILED...', error)
          contactForm.classList.add('error')
        })
        .finally(() => {
          contactForm.classList.remove('submitting')
          submitBtn.classList.remove('loading')
          submitBtn.disabled = false
        })
    })
  }

  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const shapes = document.querySelectorAll('.shape-1, .shape-2, .shape-3')
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 20
        const moveX = (mouseX - 0.5) * factor
        const moveY = (mouseY - 0.5) * factor

        shape.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    })
  }

  const signature = document.querySelector('.signature-svg')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible'
        }
      })
    },
    { threshold: 0.5 },
  )

  if (signature) {
    observer.observe(signature)
  }

  setActiveNavItem()
})
