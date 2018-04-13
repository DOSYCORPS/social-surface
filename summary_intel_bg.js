"use strict";
{
  const summaryIntel = {
    countPublicPhotosTagged,
    countPublicPhotosLiked,
    countPublicStoriesTagged,
    countPublicStoriesLiked
  };

  const newTab = promisify((...args) => chrome.tabs.create(...args));
  const exe = promisify((...args) => chrome.tabs.executeScript(...args));

  Object.assign(self, summaryIntel);

  /**
    const storyStamps = Array.from(document.querySelectorAll('.timestampContent'));
    const photoLinks = Array.from(document.querySelectorAll('a[rel="theater"]'));
  **/

  async function countPublicPhotosTagged(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/photos-tagged/intersect`
    });
    exe(tab.id, {
      code: `
        (function() {
          let count = 0;
          let retries = 5;
          const int = setInterval(() => {
            scrollTo(0,scrollY+9999);
            const photoLinks = Array.from(document.querySelectorAll('a[rel="theater"]')).length;
            const newCount = photoLinks / 2;
            if ( newCount == count ) {
              retries--;
              if ( retries <= 0 ) {
                clearInterval(int);
                chrome.runtime.sendMessage({id:${id},count,type:'countUpdate',countType:'publicPhotosTagged',done:true});
                setTimeout( () => self.close(), 0 );
              }
            } else {
              count = newCount;
              chrome.runtime.sendMessage({id:${id},count,type:'countUpdate',countType:'publicPhotosTagged',done:false});
            }
          }, 2000);
        }());
      `
    });
  }

  async function countPublicPhotosLiked(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/photos-liked/intersect`
    });
    exe(tab.id, {
      code: `
        (function() {
          let count = 0;
          let retries = 5;
          const int = setInterval(() => {
            scrollTo(0,scrollY+9999);
            const photoLinks = Array.from(document.querySelectorAll('a[rel="theater"]')).length;
            const newCount = photoLinks / 2;;
            if ( newCount == count ) {
              retries--;
              if ( retries == 0 ) {
                clearInterval(int);
                chrome.runtime.sendMessage({id:${id},count,countType:'publicPhotosLiked',type:'countUpdate',done:true});
                setTimeout( () => self.close(), 0 );
              }
            } else {
              count = newCount;
              chrome.runtime.sendMessage({id:${id},count,countType:'publicPhotosLiked',type:'countUpdate',done:false});
            }
          }, 2000);
        }());
      `
    });
  }

  async function countPublicStoriesTagged(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/stories-tagged/intersect`
    });
    exe(tab.id, {
      code: `
        (function() {
          let count = 0;
          let retries = 5;
          const int = setInterval(() => {
            scrollTo(0,scrollY+9999);
            const newCount = Array.from(document.querySelectorAll('.timestampContent')).length;
            if ( newCount == count ) {
              retries--;
              if ( retries == 0 ) {
                clearInterval(int);
                chrome.runtime.sendMessage({id:${id},count,countType:'publicStoriesTagged',type:'countUpdate',done:true});
                setTimeout( () => self.close(), 0 );
              }
            } else {
              count = newCount;
              chrome.runtime.sendMessage({id:${id},count,countType:'publicStoriesTagged',type:'countUpdate',done:false});
            }
          }, 2000);
        }());
      `
    });
  }

  async function countPublicStoriesLiked(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/stories-liked/intersect`
    });
    exe(tab.id, {
      code: `
        (function() {
          let count = 0;
          let retries = 5;
          const int = setInterval(() => {
            scrollTo(0,scrollY+9999);
            const newCount = Array.from(document.querySelectorAll('.timestampContent')).length;
            if ( newCount == count ) {
              retries--;
              if ( retries == 0 ) {
                clearInterval(int);
                chrome.runtime.sendMessage({id:${id},count,countType:'publicStoriesLiked',type:'countUpdate',done:true});
                setTimeout( () => self.close(), 0 );
              }
            } else {
              count = newCount;
              chrome.runtime.sendMessage({id:${id},count,countType:'publicStoriesLiked',type:'countUpdate',done:false});
            }
          }, 2000);
        }());
      `
    });
  }
}
