'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.notice__preview img');
  var fileChooserPhoto = document.querySelector('#images');
  var previewHousePhoto = document.querySelector('.form__photo-container');
  var draggedItem = null;
  var dropZoneAvatar = document.querySelector('.notice__header .drop-zone');
  var dropZoneHousePhoto = previewHousePhoto.querySelector('.drop-zone');

  function matchesNameFiles(name) {
    return FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  }

  function uploadAvatar(file) {
    var fileName = file.name.toLowerCase();
    var matches = matchesNameFiles(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function avatarChangeHandler() {
    var file = fileChooserAvatar.files[0];
    uploadAvatar(file);
  }

  function housePhotoReader(image, reader) {
    reader.addEventListener('load', function () {
      image.src = reader.result;
      previewHousePhoto.appendChild(image);
    });
  }

  function uploadHousePhoto(file) {
    var fileName = file.name.toLowerCase();
    var matches = matchesNameFiles(fileName);

    if (matches) {
      var reader = new FileReader();
      var image = document.createElement('img');

      image.style.width = '120px';
      image.style.height = 'auto';
      image.style.margin = '3px';
      image.draggable = 'true';
      image.addEventListener('dragenter', dragEnterHandler);
      image.addEventListener('dragover', dragOverHandler);
      image.addEventListener('drop', dropPhotoHandler);

      housePhotoReader(image, reader);
      reader.readAsDataURL(file);
    }
  }

  function dropPhotoHandler(evt) {
    evt.stopPropagation();
    var elem = evt.target;
    previewHousePhoto.insertBefore(draggedItem, elem);
  }

  function housePhotoChangeHandler() {
    var files = fileChooserPhoto.files;

    [].forEach.call(files, (function (file) {
      uploadHousePhoto(file);
    }));
  }

  function housePhotoDragStart(evt) {
    if (evt.target.tagName === 'IMG') {
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      draggedItem = evt.target;
    }
  }

  function dragEnterHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function dragOverHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function dropAvatarHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    uploadAvatar(files[0]);
  }

  function dropHousePhotoHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    uploadHousePhoto(files[0]);
  }

  function removeAvatar() {
    if (previewAvatar.length === 0) {
      return;
    }
    previewAvatar.setAttribute('src', 'img/muffin.png');

  }

  function removeHousePhoto() {

  }

  dropZoneAvatar.addEventListener('dragenter', dragEnterHandler);
  dropZoneAvatar.addEventListener('dragover', dragOverHandler);
  dropZoneAvatar.addEventListener('drop', dropAvatarHandler);

  dropZoneHousePhoto.addEventListener('dragenter', dragEnterHandler);
  dropZoneHousePhoto.addEventListener('dragover', dragOverHandler);
  dropZoneHousePhoto.addEventListener('drop', dropHousePhotoHandler);

  previewHousePhoto.addEventListener('dragstart', housePhotoDragStart);
  fileChooserAvatar.addEventListener('change', avatarChangeHandler);
  fileChooserPhoto.addEventListener('change', housePhotoChangeHandler);

  fileChooserAvatar.addEventListener('change', avatarChangeHandler);

  window.dragndrop = {
    removeAvatar: removeAvatar,
    removeHousePhoto: removeHousePhoto
  };
})();
