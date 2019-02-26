class Photo {

  constructor(id, title, caption, file) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file || '';
    this.favorite = false;
  }

  saveToStorage(allPhotos) {
    localStorage.allPhotos = JSON.stringify(allPhotos);
  }

  deleteFromStorage() {

  }

  // updatePhoto(text, classList, allPhotos) {
  //   if (classList[0] === 'photo-card-heading') {
  //   this.title = text;
  //   }
  //   this.saveToStorage(allPhotos);
  // }
}