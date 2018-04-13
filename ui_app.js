"use strict";
{
  const table = document.querySelector('table');
  table.addEventListener('click', e => {
    const target = e.target;
    if ( target.matches('button.run') ) {
      document.querySelector('.scanning').classList.add('show');
      chrome.tabs.create({url:'https://www.facebook.com/',active:true});
    } else if ( target.matches('button.fix') ) {
      alert("Fix advice.");
    }
  });

  let id;
  let scansRunning = 0;

  chrome.runtime.onMessage.addListener( (msg, sender, reply) => {
    if ( msg.type == 'idFound' ) {
      id = msg.id; 
      scansRunning = 4;
      setTimeout( () => countPublicPhotosTagged(id), 100 );
      setTimeout( () => countPublicPhotosLiked(id), 100 );
      setTimeout( () => countPublicStoriesTagged(id), 100 );
      setTimeout( () => countPublicStoriesLiked(id), 100 );
    } else if ( msg.type == 'countUpdate' ) {
      const countEl = document.querySelector(`#${msg.countType} .count`);
      countEl.innerText = msg.count;
      if ( !! msg.done ) {
        document.querySelector(`#${msg.countType} button.fix`).disabled = false;
        scansRunning --;
        if ( scansRunning == 0 ) {
          document.querySelector('.scanning').classList.remove('show');
        }
      }
    }
  });
}
