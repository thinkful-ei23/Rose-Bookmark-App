'use strict';
/* global $ bookmark store api*/

$(document).ready(function() {
  bookmark.bindEventListeners();
  api.getItems((items) => {
    items.forEach((item) => {
      store.addItem(item);
    });
    bookmark.render();
  });

});



/*
$.fn.extend({
  serializeJson: function serializeJson() {
    const formData = newFormData(this[0]);
    const obj = {};
    formData.forEach((val, name)) => {
      obj[name] = val;
    });
    return JSON.stringify(obj);
  }
});

function main() {
  $('.js-add-bookmark-form').submit(e => {
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: 'example.com'
      data: $(e.target).serializeJson()
    });
  })
}

$(function() {
  bookmark.bindEventListeners();
});
*/

/*
$.getJSON('https://thinkful-list-api.herokuapp.com/rose/bookmarks', (response) => {
  console.log('api response:', response);
});
*/
