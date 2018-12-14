'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');
  var accommodationTypes = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var getDeclension = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ?
      2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  var renderPhotosSet = function (object) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < object.offer.photos.length; i++) {
      var photo = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
      photo.src = object.offer.photos[i];
      fragment.appendChild(photo);
    }
    return fragment;
  };

  var createFeatureIcon = function (feature) {
    var icon = document.createElement('li');
    icon.classList.add('popup__feature');
    icon.classList.add('popup__feature--' + feature);
    return icon;
  };

  var createFeaturesIconsSet = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (feature) {
      fragment.appendChild(createFeatureIcon(feature));
    });
    return fragment;
  };

  var renderMapCard = function (advertObject) {
    var fragment = document.createDocumentFragment();
    var card = mapCardTemplate.cloneNode(true);
    var photosBlock = card.querySelector('.popup__photos');
    var featuresBlock = card.querySelector('.popup__features');
    card.querySelector('.popup__title').textContent = advertObject.offer.title;
    card.querySelector('.popup__text--address').textContent = advertObject.offer.address;
    card.querySelector('.popup__text--price').textContent = advertObject.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = accommodationTypes[advertObject.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').textContent = advertObject.offer.rooms
    + ' ' + getDeclension(advertObject.offer.rooms, ['комната', 'комнаты', 'комнат'])
    + ' для ' + advertObject.offer.guests + ' '
    + getDeclension(advertObject.offer.guests, ['гостя', 'гостей', 'гостей']);
    card.querySelector('.popup__text--time').textContent = 'Заезд после '
    + advertObject.offer.checkin + ', '
    + 'выезд до ' + advertObject.offer.checkout;
    featuresBlock.innerHTML = '';
    featuresBlock.appendChild(createFeaturesIconsSet(advertObject.offer.features));
    card.querySelector('.popup__description').textContent = advertObject.offer.description;
    photosBlock.innerHTML = '';
    photosBlock.appendChild(renderPhotosSet(advertObject));
    card.querySelector('.popup__avatar').src = advertObject.author.avatar;
    card.querySelector('.popup__close').addEventListener('click', function () {
      window.map.resetBlock();
      document.addEventListener('keydown', window.map.onCardEscape);
    });
    return fragment.appendChild(card);
  };

  window.renderMapCard = renderMapCard;
})();
