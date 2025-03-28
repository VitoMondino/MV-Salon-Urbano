// Función para enviar el mensaje por WhatsApp
function enviarMensajeWhatsApp(nombre, mensaje) {
  // Formatear el número de teléfono correctamente - eliminando espacios y caracteres especiales
  let numeroWhatsApp = '5493535696791'; // Número sin el signo + al principio
  
  // Crear el mensaje completo
  let mensajeCompleto = `Hola, soy ${nombre}, ${mensaje}`;
  
  // Formatear el mensaje para que sea compatible con la URL de WhatsApp
  // Usar encodeURIComponent para manejar correctamente espacios y caracteres especiales
  let mensajeWhatsApp = encodeURIComponent(mensajeCompleto);
  
  // Construir la URL de WhatsApp (usando la versión web para mayor compatibilidad)
  let urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
  
  // Registrar la URL para depuración
  console.log("URL de WhatsApp:", urlWhatsApp);
  
  // Abrir la URL de WhatsApp en una nueva ventana o pestaña
  window.open(urlWhatsApp, '_blank');
  
  // Limpiar los campos del formulario después de enviar el mensaje
  document.getElementById('nombre').value = '';
  document.getElementById('mensaje').value = '';
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
  // Evitar que el formulario se envíe de forma predeterminada
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
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencia al formulario
  const formulario = document.getElementById('contactForm');
  const mensajeTextarea = document.getElementById('mensaje');
  
  // Verificar que los elementos existen
  if (formulario && mensajeTextarea) {
    // Event listener para el envío del formulario (botón o Enter en cualquier campo)
    formulario.addEventListener('submit', handleFormSubmit);
    
    // Event listener para la tecla Enter en el textarea de mensaje
    mensajeTextarea.addEventListener('keydown', function(event) {
      // Verificar si se presionó Enter sin la tecla Shift
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Evitar el salto de línea predeterminado
        
        // Simular el envío del formulario
        handleFormSubmit(new Event('submit'));
      }
      // Si se presiona Shift+Enter, permitir el comportamiento predeterminado (nueva línea)
    });
  } else {
    console.error('No se encontraron elementos del formulario');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('#prevBtn');
  const nextBtn = document.querySelector('#nextBtn');
  const dotsContainer = document.querySelector('.dots-container');

  let counter = 0;
  let size;
  let startX;
  let currentX;
  let isDragging = false;

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

  // Funciones para el desplazamiento táctil
  carouselSlide.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carouselSlide.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    carouselSlide.style.transition = 'none';
    carouselSlide.style.transform = `translateX(${(-size * counter - diffX)}px)`;
  });

  carouselSlide.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const diffX = startX - currentX;
    if (Math.abs(diffX) > size / 4) {
      if (diffX > 0) {
        // Swipe left
        if (counter < carouselImages.length - 1) counter++;
      } else {
        // Swipe right
        if (counter > 0) counter--;
      }
    }
    updateCarousel();
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
  document.querySelectorAll('.grid figure').forEach((figure) => {
      const productName = figure.querySelector('figcaption').innerText;
      const whatsappText = `Hola, me gustaría consultar sobre ${productName}`;
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



