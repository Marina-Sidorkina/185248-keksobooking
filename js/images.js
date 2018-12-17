'use strict';

(function () {
  var imagesBlock = document.querySelector('.ad-form__photo-container');
  var imagesInput = document.querySelector('#images');
  var imagesPreview = document.querySelector('.ad-form__photo');
  var imagesDropZone = document.querySelector('.ad-form__drop-zone');
  var urls = [];

  var removePreviousImages = function () {
    var previousImage = imagesBlock.querySelector('.ad-form__photo');
    if (previousImage) {
      imagesBlock.removeChild(previousImage);
      removePreviousImages();
    }
  };

  var renderOneImage = function (source) {
    var fragment = imagesPreview.cloneNode(true);
    var image = document.createElement('img');
    image.src = source;
    image.style.maxWidth = '80%';
    image.style.maxHeight = '80%';
    fragment.appendChild(image);
    imagesBlock.appendChild(fragment);
  };

  var renderImages = function (readerResult) {
    if (urls.length > 1) {
      removePreviousImages();
      urls.forEach(function (url) {
        renderOneImage(url);
      });
    } else if (urls.length === 1) {
      removePreviousImages();
      renderOneImage(readerResult);
    }
    urls = [];
  };

  var checkUrl = function (readerResult, file) {
    if (window.utils.checkFileType(file)) {
      urls.push(readerResult);
    }
  };

  var onImagesInputChange = function (index) {
    var file = imagesInput.files[index++];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      checkUrl(reader.result, file);
      if (index < imagesInput.files.length) {
        onImagesInputChange(index);
      } else {
        renderImages(reader.result);
      }
    });
    reader.readAsDataURL(file);
  };

  var loadDroppedImagesPreview = function (files, index) {
    var file = files[index++];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      checkUrl(reader.result, file);
      if (index < files.length) {
        loadDroppedImagesPreview(files, index);
      } else {
        renderImages(reader.result);
      }
    });
    reader.readAsDataURL(file);
  };

  var onImagesInputDrop = function (evt, index) {
    var dataTransfer = evt.dataTransfer;
    loadDroppedImagesPreview(dataTransfer.files, index);
  };

  var resetImages = function () {
    removePreviousImages();
    var fragment = imagesPreview.cloneNode(true);
    imagesBlock.appendChild(fragment);
  };

  window.utils.setEventPrevent(imagesDropZone);
  window.utils.setHighlightState(imagesDropZone);
  window.utils.setUnhighlightState(imagesDropZone);
  imagesInput.addEventListener('change', function () {
    onImagesInputChange(0);
  });
  imagesDropZone.addEventListener('drop', function (evt) {
    onImagesInputDrop(evt, 0);
  });

  window.resetImages = resetImages;
})();
