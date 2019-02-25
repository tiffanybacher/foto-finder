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
// var cardTitle = document.querySelector('.photo-card-heading');


// *** EVENT LISTENERS *** //
searchInput.addEventListener('input', searchCards);
searchBtn.addEventListener('click', searchCards);
chooseFileBtn.addEventListener('click', uploadPhoto);
viewFavoritesBtn.addEventListener('click', viewFavoritePhotos);
captionInput.addEventListener('keypress', addOnEnter);
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
  storePhotos();
}

function createPhotoCard(photo) {
  var photoCard = photoCardTemplate.content.cloneNode(true);
  addPhotoProperties(photoCard, photo)
  addPhotoEventListeners(photoCard);
  photoArea.insertBefore(photoCard, photoArea.firstChild)
  clearEmptyPhotosMsg();
}

function addPhotoProperties(card, photo) {
  card.querySelector('article').dataset.id = photo.id;
  card.querySelector('.photo-card-heading').innerText = photo.title;
  card.querySelector('.photo-card-caption').innerText = photo.caption;
}

function addPhotoEventListeners(card) {
  card.querySelector('.photo-card-heading').addEventListener('keypress', saveEditOnEnter);
}

function clearEmptyPhotosMsg() {
  noPhotosMsg.style.display = 'none';
}

function storePhotos() {
  localStorage.allPhotos = JSON.stringify(allPhotos);
}

function addOnEnter(e) {
  if(e.key === 'Enter') {
    addToAlbumBtn.click();
  };
}

function saveEditOnEnter(e) {
  if(e.key === 'Enter') {
    e.target.blur();
  }
}



