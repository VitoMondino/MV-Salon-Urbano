document.getElementById('busqueda').addEventListener('keyup', function() {
  var texto = this.value.toLowerCase();
  var filas = document.querySelectorAll('#tabla-servicios tbody tr');

  filas.forEach(function(fila) {
    var textoFila = fila.textContent.toLowerCase();
    if (textoFila.includes(texto)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
});
// Función para enviar el mensaje por WhatsApp
function enviarMensajeWhatsApp(nombre, mensaje) {
  // Formatear el mensaje para que sea compatible con la URL de WhatsApp
  let mensajeWhatsApp = encodeURIComponent(`Hola, soy ${nombre}. ${mensaje}`);
  mensajeWhatsApp = mensajeWhatsApp.replace(/%20/g, '%20%20'); // Reemplazar espacios codificados por %20%20

  // Número de teléfono de destino para WhatsApp (reemplaza 'TUNUMERO' con el número real)
  let numeroWhatsApp = '+54 9 3534 28-2956';

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

const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const dotsContainer = document.querySelector('.dots-container');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = `translateX(${-size * counter}px)`;

function goToSlide(index) {
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  carouselSlide.style.transform = `translateX(${-size * index}px)`;
  counter = index;
  setActiveDot();
}

function setActiveDot() {
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
  document.querySelector(`.dot[data-index="${counter}"]`).classList.add('active');
}

nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  setActiveDot();
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  setActiveDot();
});

carouselImages.forEach((image, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.setAttribute('data-index', index);
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

setActiveDot();