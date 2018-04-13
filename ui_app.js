"use strict";
{
  const table = document.querySelector('table');
  table.addEventListener('click', e => {
    const target = e.target;
    if ( target.matches('button.run') ) {
      chrome.tabs.create({url:'https://www.facebook.com/',active:true});
    } else if ( target.matches('button.fix') ) {
      alert("Fix advice.");
    }
  });

  let id;

  chrome.runtime.onMessage.addListener( (msg, sender, reply) => {
    if ( msg.type == 'idFound' ) {
      id = msg.id; 
      countPublicPhotosTagged(id);
      countPublicPhotosLiked(id);
      countPublicStoriesTagged(id);
      countPublicStoriesLiked(id);
    } else if ( msg.type == 'countUpdate' ) {
      const countEl = document.querySelector(`#${msg.countType} .count`);
      countEl.innerText = msg.count;
      if ( !! msg.done ) {
        document.querySelector(`#${msg.countType} button.fix`).disabled = false;
      }
    }
  });
}
