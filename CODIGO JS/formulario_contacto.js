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

// Seleccionar elementos del DOM
const carouselSlide = document.querySelector('.carousel-slide'); // Contenedor del carrusel
const carouselImages = document.querySelectorAll('.carousel-slide img'); // Imágenes del carrusel

const prevBtn = document.getElementById('prevBtn'); // Botón de navegación anterior
const nextBtn = document.getElementById('nextBtn'); // Botón de navegación siguiente

const dotsContainer = document.querySelector('.dots-container'); // Contenedor de los puntos indicadores

let counter = 1; // Contador para rastrear la posición actual del carrusel
const size = carouselImages[0].clientWidth; // Ancho de una imagen del carrusel

// Posicionar el carrusel en la primera imagen
carouselSlide.style.transform = `translateX(${-size * counter}px)`; 

// Función para ir a un slide específico
function goToSlide(index) {
  carouselSlide.style.transition = 'transform 0.5s ease-in-out'; // Agregar transición suave
  carouselSlide.style.transform = `translateX(${-size * index}px)`; // Mover el carrusel a la posición del slide dado
  counter = index; // Actualizar el contador de posición
  setActiveDot(); // Activar el punto indicador correspondiente
}

// Función para activar el punto indicador correspondiente al slide actual
function setActiveDot() {
  // Remover la clase 'active' de todos los puntos indicadores
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
  // Agregar la clase 'active' al punto indicador correspondiente al slide actual
  document.querySelector(`.dot[data-index="${counter}"]`).classList.add('active');
}

// Event Listener para el botón "Siguiente"
nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return; // Evitar avanzar más allá del último slide
  carouselSlide.style.transition = 'transform 0.5s ease-in-out'; // Agregar transición suave
  counter++; // Incrementar el contador
  carouselSlide.style.transform = `translateX(${-size * counter}px)`; // Mover el carrusel al siguiente slide
  setActiveDot(); // Activar el punto indicador correspondiente al nuevo slide
});

// Event Listener para el botón "Anterior"
prevBtn.addEventListener('click', () => {
  if (counter <= 0) return; // Evitar retroceder más allá del primer slide
  carouselSlide.style.transition = 'transform 0.5s ease-in-out'; // Agregar transición suave
  counter--; // Decrementar el contador
  carouselSlide.style.transform = `translateX(${-size * counter}px)`; // Mover el carrusel al slide anterior
  setActiveDot(); // Activar el punto indicador correspondiente al nuevo slide
});

// Crear puntos indicadores para cada slide
carouselImages.forEach((image, index) => {
  const dot = document.createElement('span'); // Crear un elemento span para el punto indicador
  dot.classList.add('dot'); // Agregar la clase 'dot' al punto indicador
  dot.setAttribute('data-index', index); // Establecer el atributo data-index con el índice del slide
  dot.addEventListener('click', () => goToSlide(index)); // Agregar evento click para ir al slide correspondiente
  dotsContainer.appendChild(dot); // Agregar el punto indicador al contenedor de puntos
});

setActiveDot(); // Activar el punto indicador correspondiente al slide actual
