// Agregar un event listener al input de búsqueda
document.getElementById('busqueda').addEventListener('keyup', function() {
  var texto = this.value.toLowerCase(); // Obtener el valor del input de búsqueda y convertirlo a minúsculas
  var filas = document.querySelectorAll('#tabla-servicios tbody tr'); // Seleccionar todas las filas de la tabla

  // Iterar sobre cada fila de la tabla
  filas.forEach(function(fila) {
    var textoFila = fila.textContent.toLowerCase(); // Obtener el texto de la fila y convertirlo a minúsculas
    // Verificar si el texto de la fila incluye el texto de búsqueda
    if (textoFila.includes(texto)) {
      fila.style.display = ''; // Mostrar la fila si coincide con el texto de búsqueda
    } else {
      fila.style.display = 'none'; // Ocultar la fila si no coincide con el texto de búsqueda
    }
  });
});

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

document.addEventListener("DOMContentLoaded", function () {
  let count = 0;
  const target = 205; // Número final del contador
  const speed = 25; // Velocidad de incremento
  const counterElement = document.getElementById("contador");

  const counter = setInterval(() => {
    if (count < target) {
      count++;
      counterElement.innerText = "+" + count;
    } else {
      clearInterval(counter);
    }
  }, speed);
});



