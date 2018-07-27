'use strict';
/* global store Item ... */
//IIFE
const store = (function(){
  const addItem = function(item) {
    //this.items.push(item);
    try {
      //Item.validateName(item.name);
      console.log(item.name);
      this.items.push({...item, expanded:false}); 
    } catch(e) {
      console.log(e.message);
    }
  };
 
  const setError = function(errorMsg) {
    this.error = errorMsg;
  };

  const findAndToggleExpanded = function(id) {
    console.log(id);
    this.items = this.items.map(item => {
      if (id === item.id) {
        item.expanded = !item.expanded;
      }
      return item; 
    }) 
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id != id);
  };
  
  const setFilterRating = function(rating) {
    this.ratingFilter = rating;
  }

 
  
  return {
    items: [], 
    adding: false,
    addItem,
    ratingFilter: 0,
    error: null,
    setError, 
    findAndToggleExpanded,
    findAndDelete,
    setFilterRating,
  };
  
}());
