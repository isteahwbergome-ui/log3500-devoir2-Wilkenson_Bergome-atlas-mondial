// ==========================================================
// Atlas Mondial Interactif — logique applicative
// API : REST Countries v5 (https://api.restcountries.com/countries/v5?q={nom})
// Authentification requise : header Authorization: Bearer <clé API>
// ==========================================================

const form = document.getElementById('country-form');
const input = document.getElementById('country-input');
const inputError = document.getElementById('input-error');

const loadingEl = document.getElementById('loading');
const statusEl = document.getElementById('status-message');
const cardEl = document.getElementById('country-card');

const flagImg = document.getElementById('flag-img');
const nameEl = document.getElementById('country-name');
const capitalEl = document.getElementById('country-capital');
const populationEl = document.getElementById('country-population');
const regionEl = document.getElementById('country-region');
const currencyEl = document.getElementById('country-currency');
const languagesEl = document.getElementById('country-languages');

const API_BASE = 'https://api.restcountries.com/countries/v5';

// ATTENTION : ne jamais pousser une vraie clé sur un dépôt GitHub public.
// Ici la clé est isolée dans une seule variable pour qu'elle soit facile
// à retirer ou à remplacer avant la remise finale.
const API_KEY = 'rc_live_74c6f74b45154550b33252c792e94645';

// Réinitialise l'état d'erreur du champ de recherche
function clearInputError() {
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  inputError.hidden = true;
  inputError.textContent = '';
}

// Affiche l'état d'erreur du champ de recherche (champ vide)
function showInputError(message) {
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', 'input-error');
  inputError.textContent = message;
  inputError.hidden = false;
}

// Cache toutes les zones de résultat avant une nouvelle recherche
function resetResultZones() {
  statusEl.hidden = true;
  statusEl.textContent = '';
  cardEl.hidden = true;
}

// Formate un nombre avec des espaces comme séparateur de milliers
// Ex : 11402533 -> "11 402 533"
function formatPopulation(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Construit le texte des devises à partir du tableau currencies (v5)
function formatCurrencies(currencies) {
  if (!currencies || currencies.length === 0) return 'Non disponible';
  return currencies.map((c) => c.name).join(', ');
}

// Construit le texte des langues à partir du tableau languages (v5)
function formatLanguages(languages) {
  if (!languages || languages.length === 0) return 'Non disponible';
  return languages.map((l) => l.name).join(', ');
}

// Affiche la fiche du pays dans le DOM (via textContent, jamais innerHTML)
function renderCountry(country) {
  flagImg.src = country.flag.url_svg;
  flagImg.alt = country.flag.description || `Drapeau de ${country.names.common}`;

  nameEl.textContent = country.names.common;
  capitalEl.textContent = country.capitals && country.capitals.length > 0
    ? country.capitals[0].name
    : 'Non disponible';
  populationEl.textContent = formatPopulation(country.population);
  regionEl.textContent = country.region;
  currencyEl.textContent = formatCurrencies(country.currencies);
  languagesEl.textContent = formatLanguages(country.languages);

  cardEl.hidden = false;
}

// Affiche un message de statut (erreur API ou réseau)
function renderStatusMessage(message) {
  statusEl.textContent = message;
  statusEl.hidden = false;
}

async function searchCountry(name) {
  resetResultZones();
  loadingEl.hidden = false;

  try {
    const url = `${API_BASE}?q=${encodeURIComponent(name)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      renderStatusMessage(
        "Aucun résultat trouvé pour cette recherche. Veuillez vérifier l'orthographe."
      );
      return;
    }

    const payload = await response.json();

    // Structure v5 confirmée : les résultats sont dans data.objects
    const data = payload?.data?.objects;

    if (!Array.isArray(data) || data.length === 0) {
      renderStatusMessage(
        "Aucun résultat trouvé pour cette recherche. Veuillez vérifier l'orthographe."
      );
      return;
    }

    renderCountry(data[0]);
  } catch (error) {
    renderStatusMessage(
      'Connexion impossible. Veuillez vérifier votre accès à internet.'
    );
  } finally {
    loadingEl.hidden = true;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (value === '') {
    showInputError('Veuillez entrer le nom d\'un pays avant de lancer la recherche.');
    return;
  }

  clearInputError();
  searchCountry(value);
});

// Réinitialise l'état d'erreur dès que l'utilisateur corrige sa saisie
input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    clearInputError();
  }
});
