// *** QUERY SELECTORS *** //
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var titleInput = document.querySelector('#title-input');
var captionInput = document.querySelector('#caption-input');
var fileInput = document.querySelector('#file-input');
var chooseFileBtn = document.querySelector('.file-input-btn');
var viewFavoritesBtn = document.querySelector('.view-favorites-btn');
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var userArea = document.querySelector('.user-input-area');
var photoArea = document.querySelector('.photo-area');
var noPhotosMsg = document.querySelector('.empty-photo-area-heading');
var photoCardTemplate = document.querySelector('template');
var reader = new FileReader();


// *** EVENT LISTENERS *** //
searchInput.addEventListener('input', displaySearchResults);
searchInput.addEventListener('focusout', clearSearchInput);
searchBtn.addEventListener('click', displaySearchResults);
titleInput.addEventListener('input', toggleAddBtn);
captionInput.addEventListener('input', toggleAddBtn);
captionInput.addEventListener('keypress', createNewCardOnEnter);
fileInput.addEventListener('change', uploadPhoto);
fileInput.addEventListener('change', toggleAddBtn);
addToAlbumBtn.addEventListener('click', createNewPhotoCard);
viewFavoritesBtn.addEventListener('click', toggleFavoritesBtn);
userArea.addEventListener('keypress', blurOnEnter);
photoArea.addEventListener('keypress', blurOnEnter);
photoArea.addEventListener('focusout', editCard);
photoArea.addEventListener('click', favoriteCard);
photoArea.addEventListener('click', removeCard);

// *** GLOBAL VARIABLES *** //
var allPhotos = getAllPhotos();


// *** FUNCTIONS *** //
window.onload = displayAllCards();

function getAllPhotos() {
  var photosString = localStorage.allPhotos || '[]';
  return JSON.parse(photosString);
}

function displayAllCards() {
  allPhotos.forEach(photo => createPhotoCard(photo));
}

function createPhotoCard(photo) {
  var photoCard = photoCardTemplate.content.cloneNode(true);
  addPhotoProperties(photoCard, photo);
  setFavoriteToActive(photo, photoCard);
  appendPhotoCard(photoCard);
}

function addPhotoProperties(photoCard, photo) {
  photoCard.querySelector('article').dataset.id = photo.id;
  photoCard.querySelector('.photo-card-heading').innerText = photo.title;
  photoCard.querySelector('.photo-card-caption').innerText = photo.caption;
  photoCard.querySelector('.photo-card-img').src = photo.file;
}

function setFavoriteToActive(photo, photoCard) {
  if (photo.favorite === true) {
  photoCard.querySelector('.favorite-icon').classList.add('favorite-icon-active')
  };
}

function appendPhotoCard(photoCard) {
  photoArea.insertBefore(photoCard, photoArea.firstChild);
  toggleEmptyPhotosMsg();
  clearUserInputs();
}

function toggleEmptyPhotosMsg() {
  if (allPhotos === []) {
    noPhotosMsg.style.display = 'block';
  } else {
  noPhotosMsg.style.display = 'none';
  }
}

function clearUserInputs() {
  titleInput.value = '';
  captionInput.value = '';
  fileInput.value = '';
  chooseFileBtn.innerHTML = 'Choose File';
}

function displaySearchResults() {
  photoArea.innerHTML = '';
  var searchResults = filterSearch();
  searchResults.forEach(photo => createPhotoCard(photo));
}

function filterSearch() {
  if (viewFavoritesBtn.innerText == 'View All Photos' || viewFavoritesBtn.innerText == 'Go Back to Favorites') {
    var favoritePhotos = allPhotos.filter(photo => photo.favorite);
    var searchResults = findSearchResults(favoritePhotos);
    viewFavoritesBtn.innerText = 'Go Back to Favorites';
  } else {
    var searchResults = findSearchResults(allPhotos);
    viewFavoritesBtn.innerText = 'Go Back to All';
  } 
  return searchResults
}

function findSearchResults(photos) {
  var searchQuery = searchInput.value.toLowerCase();
  return photos.filter(photo => photo.title.toLowerCase().includes(searchQuery) || photo.caption.toLowerCase().includes(searchQuery));
}

function clearSearchInput() {
  searchInput.value = '';
}

function uploadPhoto(e) {
  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]); 
    reader.onload = createNewPhoto;
  }
  updateFilesLabel(e);
}

function updateFilesLabel(e) {
  var fileName = e.target.value.split('\\').pop();
  if (fileName) {
    chooseFileBtn.innerHTML = fileName;
  } else {
    chooseFileBtn.innerHTML = 'Choose File';
  };
}

function createNewPhoto(e) {
  var photo = new Photo(Date.now(), titleInput.value, captionInput.value, e.target.result);
  allPhotos.push(photo);
  photo.saveToStorage(allPhotos);
}

function createNewPhotoCard() {
  var photo = allPhotos[allPhotos.length - 1];
  var photoCard = photoCardTemplate.content.cloneNode(true);
  addPhotoProperties(photoCard, photo);
  appendPhotoCard(photoCard);
  toggleAddBtn();
}

function createNewCardOnEnter(e) {
  if (e.key === 'Enter') {
    addToAlbumBtn.click();
  };
}

function toggleAddBtn() {
  if (fileInput.value !== '' && titleInput.value !== '' && captionInput.value !== '') {
    addToAlbumBtn.disabled = false;
  } else {
    addToAlbumBtn.disabled = true;
  }
}

function toggleFavoritesBtn() {
  photoArea.innerHTML = '';
  if (viewFavoritesBtn.innerText == 'View Favorites' || viewFavoritesBtn.innerText == 'Go Back to Favorites') {
    displayFavoriteCards();
    viewFavoritesBtn.innerText = 'View All Photos';
  } else {
    displayAllCards();
    viewFavoritesBtn.innerText = 'View Favorites';
  }
}

function displayFavoriteCards() {
  var favoritePhotos = allPhotos.filter(photo => photo.favorite);
  favoritePhotos.forEach(photo => createPhotoCard(photo));
}

function toggleFavoriteIcon(e, photo) {
  var photoCard = e.target.closest('article');
  var favIcon = photoCard.querySelector('.favorite-icon');
  favIcon.classList.toggle('favorite-icon-active');
}

function favoriteCard(e) {
  if (e.target.classList.contains('favorite-icon')) {
    var photoToUpdate = reinstatePhoto(e);
    photoToUpdate.updateFavoriteStatus();
    savePhoto(e, photoToUpdate);
    toggleFavoriteIcon(e, photoToUpdate);
  }
}

function removeCard(e) {
  if (e.target.classList.contains('delete-icon')) {
    e.target.closest('article').remove();
    var photoToRemove = reinstatePhoto(e);
    var i = getPhotoIndex(e);
    photoToRemove.deleteFromStorage(allPhotos, i);
  }
}

function editCard(e) {
  if (e.target.classList.contains('photo-card-heading') || e.target.classList.contains('photo-card-caption')) {
    var photoToEdit = reinstatePhoto(e);
    photoToEdit.updatePhoto(e.target.innerText, e.target.classList);
    savePhoto(e, photoToEdit);
  }
}

function blurOnEnter(e) {
  if (e.key === 'Enter') {
    e.target.blur();
  }
}

function reinstatePhoto(e) {
 var photo = allPhotos[getPhotoIndex(e)];
 return new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
}

function getPhotoIndex(e) {
  var photoCard = e.target.closest('article');
  var cardID = parseInt(photoCard.dataset.id);
  var i = allPhotos.findIndex(photo => photo.id === cardID);
  return i;
}

function savePhoto(e, photo) {
  allPhotos[getPhotoIndex(e)] = photo;
  photo.saveToStorage(allPhotos);
}