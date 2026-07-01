const games = [
  { id: 1, title: 'EA Sports FC 2', genre: 'Deportes', console: 'PS4-PS5', price: 15.000 },
  { id: 2, title: 'Grand Theft Auto V', genre: 'Acción', console: 'PS4/PS5', price: 19.000 },
  { id: 3, title: 'Need For Speed Deluxe Edition', genre: 'Carreras', console: 'PS4-PS5', price: 10.000 },
  { id: 4, title: 'Paquete de Unravel', genre: 'Aventura', console: 'PS5', price: 4599 },
  { id: 5, title: 'The Last of Us Remastered', genre: 'Aventura', console: 'PS4-PS5', price: 10.000 },
  { id: 6, title: 'Need For Speed Rivals', genre: 'Carrera', console: 'PS4-PS5', price: 8.000 },
  { id: 7, title: 'The Nathan Drake Collection', genre: 'Aventura', console: 'PS4/PS5', price: 10.000 },
  { id: 8, title: 'Resident Evil 4', genre: 'RPG', console: 'PS4-PS5', price: 10.000 },
];

const whatsappNumber = '541133644922'; // REEMPLAZA CON TU NÚMERO

function initCatalog() {
  const container = document.getElementById('catalog-container');
  container.innerHTML = games.map(game => `
    <div class="game-card">
      <div class="game-cover"><span class="console-tag">${game.console}</span></div>
      <div class="game-info">
        <h3>${game.title}</h3>
        <div class="genre">${game.genre}</div>
        <div class="game-price-row">
          <span class="price">$${game.price.toLocaleString('es-AR')}</span>
          <a href="https://wa.me/${whatsappNumber}?text=Hola%20quiero%20comprar%20${encodeURIComponent(game.title)}" target="_blank" class="buy-mini">Pedir</a>
        </div>
      </div>
    </div>
  `).join('');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCatalog);
} else {
  initCatalog();
}
