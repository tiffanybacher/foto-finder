// *** QUERY SELECTORS *** //
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var titleInput = document.querySelector('#title-input');
var captionInput = document.querySelector('#caption-input');
var chooseFileBtn = document.querySelector('.file-input-btn');
var viewFavoritesBtn = document.querySelector('.view-favorites-btn');
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var photoArea = document.querySelector('.photo-area');
var noPhotosMsg = document.querySelector('.empty-photo-area-heading');
var photoCardTemplate = document.querySelector('template');
var photoArea = document.querySelector('.photo-area');


// *** EVENT LISTENERS *** //
searchInput.addEventListener('input', searchCards);
searchBtn.addEventListener('click', searchCards);
chooseFileBtn.addEventListener('click', uploadPhoto);
viewFavoritesBtn.addEventListener('click', viewFavoritePhotos);
captionInput.addEventListener('keypress', createPhotoOnEnter);
addToAlbumBtn.addEventListener('click', createNewPhoto);
photoArea.addEventListener('focusout', saveEdit);
photoArea.addEventListener('keypress', saveEditOnEnter);
photoArea.addEventListener('click', favoriteACard)

// *** GLOBAL VARIABLES *** //
var allPhotos = getPhotos();


// *** FUNCTIONS *** //
window.onload = displayCards();

function getPhotos() {
  var photosString = localStorage.allPhotos || '[]';
  return JSON.parse(photosString);
}

function displayCards() {
  allPhotos.forEach(photo => createPhotoCard(photo));
}

function searchCards() {

}

function uploadPhoto() {

}

function viewFavoritePhotos() {

}

function createNewPhoto() {
  var photoObject = new Photo(Date.now(), titleInput.value, captionInput.value);
  console.log(photoObject);
  createPhotoCard(photoObject);
  allPhotos.push(photoObject);
  photoObject.saveToStorage(allPhotos);
}

function createPhotoCard(photo) {
  var photoCard = photoCardTemplate.content.cloneNode(true);
  addPhotoProperties(photoCard, photo)
  photoArea.insertBefore(photoCard, photoArea.firstChild)
  clearEmptyPhotosMsg();
  clearUserInputs();
}

function addPhotoProperties(card, photo) {
  card.querySelector('article').dataset.id = photo.id;
  card.querySelector('.photo-card-heading').innerText = photo.title;
  card.querySelector('.photo-card-caption').innerText = photo.caption;
}

function clearEmptyPhotosMsg() {
  noPhotosMsg.style.display = 'none';
}

function clearUserInputs() {
  titleInput.value = '';
  captionInput.value = '';
}

function createPhotoOnEnter(e) {
  if (e.key === 'Enter') {
    addToAlbumBtn.click();
  };
}

function saveEdit(e) {
  if (event.target.classList.contains('photo-card-heading') || event.target.classList.contains('photo-card-caption')) {
    var photoToEdit = reinstatePhoto(e);
    photoToEdit.updatePhoto(e.target.innerText, e.target.classList);
    savePhoto(e, photoToEdit);
  }
}

function saveEditOnEnter(e) {
  if (e.key === 'Enter') {
    e.target.blur();
  }
}

function favoriteACard(e) {
  if (e.target.classList.contains('favorite-icon')) {
    var photoToEdit = reinstatePhoto(e);
    photoToEdit.updateFavoriteStatus();
    savePhoto(e, photoToEdit);
  }
}

function getPhotoIndex(e) {
  var photoCard = e.target.closest('article');
  var cardID = parseInt(photoCard.dataset.id);
  var i = allPhotos.findIndex(photo => photo.id === cardID);
  return i;
}

function reinstatePhoto(e) {
 var i = getPhotoIndex(e);
 var photo = allPhotos[i];
 return new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
}

function savePhoto(e, photo) {
  allPhotos[getPhotoIndex(e)] = photo;
  photo.saveToStorage(allPhotos);
}



