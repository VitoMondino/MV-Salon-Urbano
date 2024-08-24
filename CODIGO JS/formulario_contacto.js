
// Función para enviar el mensaje por WhatsApp
function enviarMensajeWhatsApp(nombre, mensaje) {
  // Formatear el mensaje para que sea compatible con la URL de WhatsApp
  let mensajeWhatsApp = encodeURIComponent(`Hola, soy ${nombre}, ${mensaje}`);
  mensajeWhatsApp = mensajeWhatsApp.replace(/%20/g, '%20%20'); // Reemplazar espacios codificados por %20%20

  // Número de teléfono de destino para WhatsApp (reemplaza 'TUNUMERO' con el número real)
  let numeroWhatsApp = '+54 9 353 569-6791';

  // Construir la URL de WhatsApp
  let urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeWhatsApp}`;

  // Abrir la URL de WhatsApp en una nueva ventana o pestaña
  window.open(urlWhatsApp, '_blank');
}

// Event listener para el envío del formulario
document.getElementById('contactForm').addEventListener('submit', function(event) {
  // Evitar que el formulario se envíe
  event.preventDefault();

  // Obtener los valores de los campos de entrada y limpiarlos
  let nombre = document.getElementById('nombre').value.trim();
  let mensaje = document.getElementById('mensaje').value.trim();

  // Verificar si los campos no están vacíos
  if (nombre === '' || mensaje === '') {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Llamar a la función para enviar el mensaje por WhatsApp
  enviarMensajeWhatsApp(nombre, mensaje);

  // Limpiar los campos del formulario después de enviar el mensaje
  document.getElementById('nombre').value = '';
  document.getElementById('mensaje').value = '';
});

// Agregar un evento de clic a todos los enlaces de la barra de navegación para hacer el desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('#prevBtn');
  const nextBtn = document.querySelector('#nextBtn');
  const dotsContainer = document.querySelector('.dots-container');

  let counter = 0;
  let size;

  // Función para actualizar el tamaño de las imágenes
  function updateSize() {
    size = carouselSlide.clientWidth;
    carouselImages.forEach(img => {
      img.style.width = size + 'px';
    });
    updateCarousel(false);
  }

  // Crear puntos indicadores
  carouselImages.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      counter = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // Ir a la siguiente imagen
  nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) counter = -1;
    counter++;
    updateCarousel();
  });

  // Ir a la imagen anterior
  prevBtn.addEventListener('click', () => {
    if (counter <= 0) counter = carouselImages.length;
    counter--;
    updateCarousel();
  });

  // Actualizar la posición del carrusel y el punto activo
  function updateCarousel(transition = true) {
    if (transition) {
      carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    } else {
      carouselSlide.style.transition = 'none';
    }
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[counter].classList.add('active');
  }

  // Configuración inicial
  updateSize();

  // Actualizar tamaño en caso de cambio de ventana
  window.addEventListener('resize', updateSize);

  // Manejar el final de la transición
  carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
      carouselSlide.style.transition = 'none';
      counter = carouselImages.length - 2;
      carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }
    if (carouselImages[counter].id === 'firstClone') {
      carouselSlide.style.transition = 'none';
      counter = carouselImages.length - counter;
      carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }
  });
});

//scrol animado
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll('.hidden');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
          } else {
              entry.target.classList.remove('show');
          }
      });
  }, {
      threshold: 0.1
  });

  elements.forEach(element => {
      observer.observe(element);
  });
});

//animacion para la seccion de sobre nosotros
document.addEventListener("DOMContentLoaded", function() {
  const observer = newIntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Deja de observar una vez que el elemento está visible
      }
    });
  }, { threshold: 0.13 }); // Un umbral ligeramente mayor para una transición más fluidaconst hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
});

//productos
// JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Add a click event listener to each figure element
  document.querySelectorAll('.grid figure').forEach((figure, index) => {
      const whatsappText = `Hola, me gustaría consultar sobre Producto ${index + 1}`;
      const link = `https://wa.me/+5493535696791?text=${encodeURIComponent(whatsappText)}`;

      // Add a button inside the figure
      const btn = document.createElement('a');
      btn.classList.add('consultar-btn');
      btn.innerText = 'Consultar';
      btn.href = link;
      btn.target = '_blank'; // Open in a new tab

      figure.appendChild(btn);
  });
});

//funcion para la parte de resenias y opiniones
document.addEventListener('DOMContentLoaded', function() {
  const reviewsSection = document.getElementById('reviews');
  const content = reviewsSection.querySelector('.content');
  
  // Función para activar las animaciones
  function activateAnimations(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              reviewsSection.style.animation = 'fadeIn 1s ease-in-out forwards';
              content.style.animation = 'scaleIn 1s ease-out forwards';
              
              // Activar animaciones para elementos internos
              const h2 = content.querySelector('h2');
              const h1 = content.querySelector('h1');
              const qrCode = content.querySelector('.qr-code');
              const description = content.querySelector('.description');
              
              h2.style.animation = 'fadeInText 1s ease-in-out forwards';
              h1.style.animation = 'fadeInText 1s ease-in-out 0.2s forwards';
              qrCode.style.animation = 'fadeIn 1s ease-in-out 0.4s forwards';
              description.style.animation = 'fadeInText 1s ease-in-out 0.6s forwards';
              
              // Desconectar el observer una vez que las animaciones se han activado
              observer.disconnect();
          }
      });
  }
  
  // Inicialmente, desactivar todas las animaciones
  reviewsSection.style.animation = 'none';
  content.style.animation = 'none';
  content.querySelector('h2').style.animation = 'none';
  content.querySelector('h1').style.animation = 'none';
  content.querySelector('.qr-code').style.animation = 'none';
  content.querySelector('.description').style.animation = 'none';
  
  // Crear y configurar el IntersectionObserver
  const observer = new IntersectionObserver(activateAnimations, {
      root: null,
      threshold: 0.1 // Activa cuando al menos el 10% de la sección es visible
  });
  
  // Comenzar a observar la sección de reseñas
  observer.observe(reviewsSection);
});



