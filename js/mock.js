'use strict';

(function () {
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
      MAX: 1200
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

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
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

  var createFeaturesArray = function () {
    var array = [];
    for (var i = 0; i < getRandomNumber(getRandomNumber(1, advertParams.FEATURE_VALUES.length), advertParams.FEATURE_VALUES.length); i++) {
      array[i] = getRandomArrayElement(advertParams.FEATURE_VALUES);
    }
    return array;
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

  window.createAdvertObjectsArray = createAdvertObjectsArray;
})();
