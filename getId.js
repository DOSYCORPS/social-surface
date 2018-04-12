"use strict";
{
  Object.assign( self, {getId} );

  // gets the facebook id from https://www.facebook.com

  function getId() {
    const userNavItem = document.querySelector("[data-nav-item-id]");
    if ( !! userNavItem ) {
      throw new TypeError("Cannot get user id");      
    }
    return userNavItem.dataset.navItemId;
  }
}
