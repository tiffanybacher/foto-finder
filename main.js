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
// var photoCard = document.querySelector('.photo-card');


// *** EVENT LISTENERS *** //
searchInput.addEventListener('input', searchCards);
searchBtn.addEventListener('click', searchCards);
chooseFileBtn.addEventListener('click', uploadPhoto);
viewFavoritesBtn.addEventListener('click', viewFavoritePhotos);
captionInput.addEventListener('keypress', createPhotoOnEnter);
addToAlbumBtn.addEventListener('click', createNewPhoto);
// photoCardTemplate.addEventListener('click', saveEdit);
// photoCard.addEventListener('click', saveEdit);


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
  addPhotoEventListeners(photoCard);
  photoArea.insertBefore(photoCard, photoArea.firstChild)
  clearEmptyPhotosMsg();
  clearUserInputs();
}

function addPhotoProperties(card, photo) {
  card.querySelector('article').dataset.id = photo.id;
  card.querySelector('.photo-card-heading').innerText = photo.title;
  card.querySelector('.photo-card-caption').innerText = photo.caption;
}

function addPhotoEventListeners(card) {
  var cardTitle = card.querySelector('.photo-card-heading');
  var cardCaption = card.querySelector('.photo-card-caption');
  cardTitle.addEventListener('blur', saveEdit);
  cardTitle.addEventListener('keypress', saveEditOnEnter);
  cardCaption.addEventListener('blur', saveEdit);
  cardCaption.addEventListener('keypress', saveEditOnEnter);
}

function clearEmptyPhotosMsg() {
  noPhotosMsg.style.display = 'none';
}

function clearUserInputs() {
  titleInput.value = '';
  captionInput.value = '';
}

function createPhotoOnEnter(e) {
  if(e.key === 'Enter') {
    addToAlbumBtn.click();
  };
}

function saveEdit(e) {
  var photoToEdit = reinstatePhoto(e);
  // photoToEdit.updatePhoto(e.target.innerText, e.target.classList, allPhotos);
}

function saveEditOnEnter(e) {
  if(e.key === 'Enter') {
    e.target.blur();
  }
}

function getPhoto(e) {
  var photoCard = e.target.closest('article');
  var cardID = parseInt(photoCard.dataset.id);
  var i = allPhotos.findIndex(photo => photo.id === cardID);
  return allPhotos[i];
}

function reinstatePhoto(e) {
 var photo = getPhoto(e);
 return new Photo(photo.id, photo.title, photo.caption);
}



