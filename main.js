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


// *** EVENT LISTENERS *** //
searchInput.addEventListener('input', searchCards);
searchBtn.addEventListener('click', searchCards);
chooseFileBtn.addEventListener('click', uploadPhoto);
viewFavoritesBtn.addEventListener('click', viewFavoritePhotos);
captionInput.addEventListener('keypress', createPhotoOnEnter);
addToAlbumBtn.addEventListener('click', createNewPhoto);


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
  cardTitle.addEventListener('keypress', saveEditOnEnter);
  cardTitle.addEventListener('blur', saveEdit);
  card.querySelector('.photo-card-caption').addEventListener('keypress', saveEditOnEnter);
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
  getPhotoIndex(e);

}

function saveEditOnEnter(e) {
  if(e.key === 'Enter') {
    e.target.blur();
  }
}

function getPhotoIndex(e) {
  var photoCard = e.target.closest('article');
  var cardID = parseInt(photoCard.dataset.id);
  var index = allPhotos.findIndex(photo => photo.id === cardID);
  return index;
}



