'use strict';
/* global $ api */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rose';

  const getItems = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createItem = function(title, url, desc, rating, success, error) {
    const newBookmark = {title, url, desc, rating,};
    const data = JSON.stringify(newBookmark);

    $.ajax({
      contentType: 'application/json',
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      data: data,
      success,
      error,
    });
  };

  const deleteBookmark = function(id, success) {
    console.log('delete function running');
    $.ajax({
      contentType: 'application/json',
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success, 
    });
  };
  
  return {
    getItems,
    createItem,
    deleteBookmark,
  };
}());



