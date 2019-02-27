// *** QUERY SELECTORS *** //
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var titleInput = document.querySelector('#title-input');
var captionInput = document.querySelector('#caption-input');
var chooseFileBtn = document.querySelector('.file-input-btn');
var viewFavoritesBtn = document.querySelector('.view-favorites-btn');
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var userArea = document.querySelector('.user-input-area');
var photoArea = document.querySelector('.photo-area');
var noPhotosMsg = document.querySelector('.empty-photo-area-heading');
var photoCardTemplate = document.querySelector('template');


// *** EVENT LISTENERS *** //
searchInput.addEventListener('input', searchCards);
searchBtn.addEventListener('click', searchCards);
titleInput.addEventListener('input', enableAddBtn);
captionInput.addEventListener('input', enableAddBtn);
chooseFileBtn.addEventListener('click', uploadPhoto);
viewFavoritesBtn.addEventListener('click', toggleFavoritesBtn);
captionInput.addEventListener('keypress', createNewPhotoOnEnter);
addToAlbumBtn.addEventListener('click', createNewPhoto);
userArea.addEventListener('keypress', blurOnEnter);
photoArea.addEventListener('focusout', saveEdit);
photoArea.addEventListener('keypress', blurOnEnter);
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

function searchCards() {

}

function uploadPhoto() {

}

function toggleFavoritesBtn() {
  photoArea.innerHTML = '';
  if (viewFavoritesBtn.innerText == 'View Favorites') {
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

function enableAddBtn() {
  if (titleInput.value !== '' && captionInput.value !== '') {
    addToAlbumBtn.disabled = false;
  }
}

function createNewPhoto() {
  var photo = new Photo(Date.now(), titleInput.value, captionInput.value);
  createPhotoCard(photo);
  allPhotos.push(photo);
  photo.saveToStorage(allPhotos);
  addToAlbumBtn.disabled = true;
}

function createPhotoCard(photo) {
  var photoCard = photoCardTemplate.content.cloneNode(true);
  addPhotoProperties(photoCard, photo);
  setFavoriteToActive(photo, photoCard);
  photoArea.insertBefore(photoCard, photoArea.firstChild)
  toggleEmptyPhotosMsg();
  clearUserInputs();
}

function addPhotoProperties(card, photo) {
  card.querySelector('article').dataset.id = photo.id;
  card.querySelector('.photo-card-heading').innerText = photo.title;
  card.querySelector('.photo-card-caption').innerText = photo.caption;
}

function setFavoriteToActive(photo, photoCard) {
  if (photo.favorite === true) {
  photoCard.querySelector('.favorite-icon').classList.add('favorite-icon-active')
  };
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
}

function createNewPhotoOnEnter(e) {
  if (e.key === 'Enter') {
    addToAlbumBtn.click();
  };
}

function removeCard(e) {
  if (e.target.classList.contains('delete-icon')) {
    e.target.closest('article').remove();
    var photoToRemove = reinstatePhoto(e);
    var i = getPhotoIndex(e);
    photoToRemove.deleteFromStorage(allPhotos, i);
  }
}

function favoriteCard(e) {
  if (e.target.classList.contains('favorite-icon')) {
    var photoToUpdate = reinstatePhoto(e);
    photoToUpdate.updateFavoriteStatus();
    savePhoto(e, photoToUpdate);
    toggleFavoriteIcon(e, photoToUpdate);
  }
}

function toggleFavoriteIcon(e, photo) {
  var photoCard = e.target.closest('article');
  var favIcon = photoCard.querySelector('.favorite-icon');
  favIcon.classList.toggle('favorite-icon-active');
}

function saveEdit(e) {
  if (event.target.classList.contains('photo-card-heading') || event.target.classList.contains('photo-card-caption')) {
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

function getPhotoIndex(e) {
  var photoCard = e.target.closest('article');
  var cardID = parseInt(photoCard.dataset.id);
  var i = allPhotos.findIndex(photo => photo.id === cardID);
  return i;
}

function reinstatePhoto(e) {
 var photo = allPhotos[getPhotoIndex(e)];
 return new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
}

function savePhoto(e, photo) {
  allPhotos[getPhotoIndex(e)] = photo;
  photo.saveToStorage(allPhotos);
}