"use strict";
{
  Object.assign( self, {getId} );
  let found = false;

  // gets the facebook id from https://www.facebook.com
  
  const int = setInterval( () => {
    if ( found ) clearInterval(int);
    getId();
  }, 500 );

  function getId() {
    if ( found ) return;
    const userNavItem = document.querySelector("[data-nav-item-id]");
    if ( ! userNavItem ) {
      throw new TypeError("Cannot get user id");      
    }
    found = true;
    chrome.extension.sendMessage({ type: 'idFound', id : userNavItem.dataset.navItemId});
  }
}
