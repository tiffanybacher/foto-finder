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
addToAlbumBtn.addEventListener('click', addPhotoCard);

// *** GLOBAL VARIABLES *** //
var allPhotoCards;

// *** FUNCTIONS *** //
function getPhotoCards() {

}

function searchCards() {

}

function uploadPhoto() {

}

function viewFavoritePhotos() {

}

function addPhotoCard() {
 
}

function storePhotoCards() {

}



