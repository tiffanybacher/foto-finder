class Photo {

  constructor(id, title, caption, file) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file || '';
    this.favorite = false;
  }

  saveToStorage(allPhotos) {
    allPhotos.push(this);
    localStorage.allPhotos = JSON.stringify(allPhotos);
  }

  deleteFromStorage() {

  }

  updatePhoto() {

  }
}