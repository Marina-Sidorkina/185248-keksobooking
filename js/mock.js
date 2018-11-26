'use strict';

var mapBlock = document.querySelector('.map');
var mapPinsBlock = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card')
  .content.querySelector('.map__card');

var advertParams = {
  TITLE_VALUES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  TYPE_VALUES: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  TIME_VALUES: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURE_VALUES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTO_LINK_VALUES: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  priceRangeValues: {
    MIN: 1000,
    MAX: 1000000
  },
  roomsAmountValues: {
    MIN: 1,
    MAX: 5
  },
  locationXValues: {
    MIN: 0,
    MAX: mapBlock.getBoundingClientRect().width
  },
  locationYValues: {
    MIN: 130,
    MAX: 630
  },
  guestsNumberValues: {
    MIN: 1,
    MAX: 10
  }
};

var accommodationTypes = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getDeclension = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ?
    2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var createFeaturesArray = function () {
  var array = [];
  for (var i = 0; i < getRandomNumber(getRandomNumber(1, advertParams.FEATURE_VALUES.length), advertParams.FEATURE_VALUES.length); i++) {
    array[i] = getRandomArrayElement(advertParams.FEATURE_VALUES);
  }
  return array.join(', ');
};

var shuffleArray = function (array) {
  var result = array.slice();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

var createAdvertObject = function (avatarIndex, titleValue) {
  var coordinateX = getRandomNumber(advertParams.locationXValues.MIN, advertParams.locationXValues.MAX + 1);
  var coordinateY = getRandomNumber(advertParams.locationYValues.MIN, advertParams.locationYValues.MAX + 1);
  return {
    author: {
      avatar: 'img/avatars/user0' + avatarIndex + '.png',
    },
    offer: {
      title: titleValue,
      address: '' + coordinateX + ', ' + coordinateY + '',
      price: getRandomNumber(advertParams.priceRangeValues.MIN, advertParams.priceRangeValues.MAX + 1),
      type: getRandomArrayElement(advertParams.TYPE_VALUES),
      rooms: getRandomNumber(advertParams.roomsAmountValues.MIN, advertParams.roomsAmountValues.MAX + 1),
      guests: getRandomNumber(advertParams.guestsNumberValues.MIN, advertParams.guestsNumberValues.MAX + 1),
      checkin: getRandomArrayElement(advertParams.TIME_VALUES),
      checkout: getRandomArrayElement(advertParams.TIME_VALUES),
      features: createFeaturesArray(),
      description: '',
      photos: shuffleArray(advertParams.PHOTO_LINK_VALUES)
    },
    location: {
      x: coordinateX,
      y: coordinateY
    }
  };
};

var createAdvertObjectsArray = function () {
  var array = [];
  for (var i = 0; i < advertParams.TITLE_VALUES.length; i++) {
    array[i] = createAdvertObject(i + 1, advertParams.TITLE_VALUES[i]);
  }
  return array;
};

var renderMapPin = function (advertObject) {
  var pin = mapPinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pin.style.left = (advertObject.location.x - pin.getBoundingClientRect().width / 2) + 'px';
  pin.style.top = (advertObject.location.y - pin.getBoundingClientRect().height) + 'px';
  pinImage.src = advertObject.author.avatar;
  pinImage.alt = advertObject.offer.title;
  return pin;
};

var renderMapPinsSet = function () {
  var fragment = document.createDocumentFragment();
  var array = createAdvertObjectsArray();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i]));
  }
  return fragment;
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

var renderMapCard = function () {
  var fragment = document.createDocumentFragment();
  var array = createAdvertObjectsArray();
  var mapCard = mapCardTemplate.cloneNode(true);
  var photosBlock = mapCard.querySelector('.popup__photos');
  mapCard.querySelector('.popup__title').textContent = array[0].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = array[0].offer.address;
  mapCard.querySelector('.popup__text--price').textContent = array[0].offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = accommodationTypes[array[0].offer.type.toUpperCase()];
  mapCard.querySelector('.popup__text--capacity').textContent = array[0].offer.rooms
  + ' ' + getDeclension(array[0].offer.rooms, ['комната', 'комнаты', 'комнат'])
  + ' для ' + array[0].offer.guests + ' ' + getDeclension(array[0].offer.guests, ['гостя', 'гостей', 'гостей']);
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после '
  + array[0].offer.checkin + ', '
  + 'выезд до ' + array[0].offer.checkout;
  mapCard.querySelector('.popup__features').textContent = array[0].offer.features;
  mapCard.querySelector('.popup__description').textContent = array[0].offer.description;
  photosBlock.textContent = '';
  photosBlock.appendChild(renderPhotosSet(array[0]));
  mapCard.querySelector('.popup__avatar').src = array[0].author.avatar;
  return fragment.appendChild(mapCard);
};

mapBlock.classList.remove('map--faded');
mapBlock.insertBefore(renderMapCard(), mapBlock.children[1]);
mapPinsBlock.appendChild(renderMapPinsSet());
