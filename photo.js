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

  updatePhoto(text, classList) {
    if (classList.value === 'photo-card-heading') {
      this.title = text;
    } else {
      this.caption = text;
    }
    console.log(this)
  }
}