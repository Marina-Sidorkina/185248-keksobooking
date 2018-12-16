'use strict';

(function () {
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var avatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var resetAvatar = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
  };

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    if (window.utils.checkFileType(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  window.resetAvatar = resetAvatar;
})();
