"use strict";
{
  const table = document.querySelector('table');

  const myId = promisify((cb) => chrome.windows.getCurrent(cb));
  const focusMe = promisify((wid, cb) => chrome.windows.update(wid, {focused:true}, cb));
  Object.assign(self, {focusMe,myId});

  table.addEventListener('click', e => {
    const target = e.target;
    if ( target.matches('button.run') ) {
      document.querySelector('.scanning').classList.add('show');
      chrome.tabs.create({url:'https://www.facebook.com/',active:false});
    } else if ( target.matches('button.fix') ) {
      alert(target.closest('.report').dataset.advice);
    }
  });

  let id;
  let scansRunning = 4;

  chrome.runtime.onMessage.addListener( async (msg, sender, reply) => {
    if ( msg.type == 'idFound' ) {
      id = msg.id; 
      scansRunning = 4;
      const {id:windowId} = await myId();
      await countPublicPhotosTagged(id);
      await focusMe(windowId);
      await countPublicPhotosLiked(id);
      await focusMe(windowId);
      await countPublicStoriesTagged(id);
      await focusMe(windowId);
      await countPublicStoriesLiked(id);
      await focusMe(windowId);
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
