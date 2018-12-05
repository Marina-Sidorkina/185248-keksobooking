'use strict';

(function () {
  var mainBlock = document.querySelector('main');
  var newAdForm = document.querySelector('.ad-form');
  var newAdRoomsField = document.querySelector('#room_number');
  var newAdCapacityField = document.querySelector('#capacity');
  var newAdTimeInField = document.querySelector('#timein');
  var newAdTimeOutField = document.querySelector('#timeout');
  var newAdPriceField = document.querySelector('#price');
  var newAdTypeField = document.querySelector('#type');
  var newAdFieldsets = newAdForm.querySelectorAll('fieldset');
  var newAdSubmitButton = newAdForm.querySelector('.ad-form__submit');
  var newAdResetButton = newAdForm.querySelector('.ad-form__reset');
  var successNotificationTemplate = document.querySelector('#success')
    .content.querySelector('.success');

  var minPriceParams = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var capacityParams = {
    1: ['2', '3', '0'],
    2: ['3', '0'],
    3: ['0'],
    100: ['1', '2', '3']
  };

  var setNewAdFormAbility = function (disabilityValue) {
    window.utils.setItemsAbility(newAdFieldsets, disabilityValue);
    newAdSubmitButton.disabled = disabilityValue;
    newAdResetButton.disabled = disabilityValue;
  };

  var disableNewAdForm = function () {
    newAdForm.classList.add('ad-form--disabled');
    newAdForm.reset();
    setNewAdFormAbility(true);
  };

  var enableNewAdForm = function () {
    newAdForm.classList.remove('ad-form--disabled');
    setNewAdFormAbility(false);
  };

  var onTypeChange = function () {
    var min = minPriceParams[newAdTypeField.value.toUpperCase()];
    newAdPriceField.min = min;
    newAdPriceField.placeholder = min;
  };

  var onTimeInChange = function () {
    newAdTimeOutField.value = newAdTimeInField.value;
  };

  var onTimeOutChange = function () {
    newAdTimeInField.value = newAdTimeOutField.value;
  };

  var onCapacityInvalid = function () {
    var check = false;
    check = capacityParams[newAdRoomsField.value].some(function (item) {
      return item === newAdCapacityField.value;
    });
    if (check) {
      newAdCapacityField.setCustomValidity('Данная опция недоступна для указанного количества комнат');
    } else {
      newAdCapacityField.setCustomValidity('');
    }
  };

  var closeNotification = function () {
    var element = document.querySelector('.success');
    mainBlock.removeChild(element);
    window.removeEventListener('keydown', onNotificationEscape);
    window.removeEventListener('click', onNotificationClick);
  };

  var onNotificationEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      closeNotification();
    }
  };

  var onNotificationClick = function () {
    closeNotification();
  };

  var onFormSubmit = function () {
    if (newAdForm.checkValidity()) {
      var notification = successNotificationTemplate.cloneNode(true);
      mainBlock.appendChild(notification);
      window.addEventListener('keydown', onNotificationEscape);
      window.addEventListener('click', onNotificationClick);
      window.map.onFormSubmitAndReset();
    }
  };

  onCapacityInvalid();
  setNewAdFormAbility(true);
  newAdCapacityField.addEventListener('change', onCapacityInvalid);
  newAdRoomsField.addEventListener('change', onCapacityInvalid);
  newAdTimeInField.addEventListener('change', onTimeInChange);
  newAdTimeOutField.addEventListener('change', onTimeOutChange);
  newAdTypeField.addEventListener('change', onTypeChange);
  newAdResetButton.addEventListener('click', window.map.onFormSubmitAndReset);
  newAdForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onFormSubmit();
  });


  window.validation = {
    disableNewAdForm: disableNewAdForm,
    enableNewAdForm: enableNewAdForm
  };
})();
