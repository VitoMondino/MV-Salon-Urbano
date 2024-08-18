
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

//seccion de horarios
document.addEventListener('DOMContentLoaded', function() {
  var horariosSection = document.getElementById('horarios');
  var horarios = horariosSection.querySelectorAll('.horario');
  
  // Función para verificar si un elemento está en el viewport
  function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  // Función para iniciar la animación
  function startAnimation() {
      if (isElementInViewport(horariosSection)) {
          horarios.forEach(function(horario, index) {
              horario.style.animationDelay = (index * 0.3) + 's';
              horario.style.animationName = 'fadeInUp';
          });
          // Remover el evento de scroll una vez que la animación ha comenzado
          window.removeEventListener('scroll', startAnimation);
      }
  }

  // Inicialmente, quitamos la animación de los elementos
  horarios.forEach(function(horario) {
      horario.style.opacity = '0';
      horario.style.transform = 'translateY(20px)';
      horario.style.animationName = 'none';
  });

  // Agregamos el evento de scroll
  window.addEventListener('scroll', startAnimation);
  
  // Verificamos la posición inicial por si la sección ya está visible
  startAnimation();
});


document.addEventListener("DOMContentLoaded", function () {
  const contadorElement = document.getElementById("contador");
  const contadorClientesElement = document.getElementById("contador-clientes");
  const codigoQRElement = document.getElementById("codigo-qr");
  const target = 100; // Número final del contador
  const speed = 25; // Velocidad de incremento en milisegundos
  const qrUrl = "https://www.google.com/search?sca_esv=ca10b7ff663b7daf&sxsrf=ADLYWILrEkJeOHG379jkYIHHRm9AIXKfDg:1723644541440&q=opiniones+de+math%C3%ADas+vedelago+villa+mar%C3%ADa&uds=ADvngMgnuliRvotS7ztzP57u3GhlqMtDdu-VEEfWKzl3jq8o98CpUuOt5Q7WaOBtjh42iYW69gFBAAv8Ari2igO9S_ZXjxZNcI-1BszDUFeDcs3bNNyBaTlFf1xFXmMHeSLaXGqrsRgB0UxrqND14OHiSBfqdlBKfFxmtMxjVIoHD_CKmCzmB66ZunWBvgUvYz--l2Kj6GrmsUbAT0XV4JwRZKWSnM7ogHxjkf4idLGeNxfESfuE4Czwo3VKZOWb-caORrGZYh5QtqK2JPR_bq42VhZ-ME3qo6h-y20u5cQMDNVmVQn8eJ2BYllKWMFT9KHqG-PZtpDvUf26hcaORXmpW4VGl34Ewg_mJGIJ5THTee_bcoqSIqmNRPCmtEezGxujzLwf9a6LuxiTQVGzlF6XkSelmWbVGbWD8sodJr2qWADU3w3ixAY&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7nwmaEueDVLSZuz1VJqFI2WebDJtt_WVyG82zw46V2fJZ2LeEKcngojtusEWTHfhjAlMpJdMu3e7Q5KWDz3x3WRGeTn4SsIOc_SnGsw1ZtJaHPqj5vlqOgURRgMZHY1wsbmVrKg%3D&sa=X&ictx=1&lei=fbq8ZunCGtLQ1sQP95_U-Q8"; // URL del código QR
  let count = 0;
  let counterStarted = false;

  const startCounter = () => {
    if (counterStarted) return;
    counterStarted = true;

    const counter = setInterval(() => {
      if (count < target) {
        count++;
        contadorElement.innerText = "+" + count;
      } else {
        clearInterval(counter);
      }
    }, speed);
  };

  // Añadir evento de clic solo al código QR
  codigoQRElement.addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir cualquier comportamiento por defecto
    window.open(qrUrl, "_blank");
  });

  // Cambiar el cursor a pointer solo para el código QR
  codigoQRElement.style.cursor = "pointer";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(contadorClientesElement);
});



