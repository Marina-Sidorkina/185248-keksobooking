'use strict';

(function () {
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var avatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');

  var resetAvatar = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
  };

  var loadAvatarPreview = function (file) {
    if (window.utils.checkFileType(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function () {
    var file = avatarInput.files[0];
    if (file) {
      loadAvatarPreview(file);
    }
  };

  var onAvatarDropZoneDrop = function (evt) {
    var dataTransfer = evt.dataTransfer;
    var file = dataTransfer.files[0];
    loadAvatarPreview(file);
  };

  window.utils.setEventPrevent(avatarDropZone);
  window.utils.setHighlightState(avatarDropZone);
  window.utils.setUnhighlightState(avatarDropZone);
  avatarInput.addEventListener('change', onAvatarChange);
  avatarDropZone.addEventListener('drop', onAvatarDropZoneDrop);

  window.resetAvatar = resetAvatar;
})();
