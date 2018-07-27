'use strict';
/* global store $ api */

// eslint-disable-next-line no-unused-vars
const bookmark = (function(){ 

  //refactor
  function generateBookmark(item) {      
    if (item.expanded) {  
      return `
    <li class="js-item-element" data-id="${item.id}">
      ${item.title}
      ${item.desc}
      ${item.rating}
      <a href="${item.url}">Visit Site</a>
      
      <button type="button" class="js-expanded-button"> - </button>
      <button type="button" class="js-delete-bookmark"> Delete Bookmark </button>
    </li> 
    `; 
    }
    else {
      return `
    <li class="js-item-element" data-id="${item.id}">
      ${item.title}
      ${item.rating}
      <button type="button" class="js-expanded-button"> + </button>
    </li> 
    `; 
    }
  
  }
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmark(item));
    return items.join('');
  }
  
  function render() {
    
    //refactor 
    if(!store.adding) {
      $('#js-add-bookmark-form').hide();
    }
    else { 
      $('#js-add-bookmark-form').show();
    }

    let items = store.items.filter(item => {
      return item.rating >= store.ratingFilter; 

    }) ; 
    
    //rebuild display, generates DOM from store    
    const BookmarkListItemsString = generateBookmarkItemsString(items);

    $('#js-bookmark-list').html(BookmarkListItemsString);

    if(store.error) {
      $('.error').html(store.error);
    }  

  }
  
  function handleAddBookmark() {
    $('.js-add-bookmark-button').on('click', function(event) {
      store.adding = true;
      render();
    });
  }
  
  function handleNewItemSubmit() {
    $('#js-add-bookmark-form').submit(function (event) {
      event.preventDefault();
      const newItemTitle = $('.js-bookmark-list-entry').val();
      const newItemLink = $('.js-bookmark-url').val();
      const newItemDescription = $('.js-bookmark-description').val();
      const newItemRating = $('.js-bookmark-rating').val();
      
      //refactor
      $('.js-bookmark-list-entry').val('');
      $('.js-bookmark-url').val('');
      $('.js-bookmark-description').val('');
      $('.js-bookmark-rating').val('');

      api.createItem(newItemTitle, newItemLink, newItemDescription, newItemRating, (newItem) => {
        
        store.addItem(newItem);
        store.setError(null);
        store.adding = false;
        render();
      }, 
      (error) => {
        store.setError(error.responseJSON.message);
        render();
      }
      );
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('id');
  }

  function handleItemExpanded() {
    $('#js-bookmark-list').on('click', '.js-expanded-button', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.findAndToggleExpanded(id);
      render();
    });
  }

  function handleDeleteBookmark() {
    $('#js-bookmark-list').on('click', '.js-delete-bookmark', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteBookmark(id, function(){
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleSearchRating() {
    $('select').on('change', event => {
      const val = $(event.currentTarget).val();
      store.setFilterRating(val);
      render();
    });
  
  }

  function bindEventListeners() {
    handleAddBookmark();
    handleNewItemSubmit();
    handleItemExpanded();
    handleDeleteBookmark();
    handleSearchRating();
  }
 
  return {
    render,
    bindEventListeners, 
    handleSearchRating,
    //handleDeleteBookmark,
  };

}());   