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

  chrome.runtime.onMessage.addListener( (msg, sender, reply) => {
    console.log(msg, sender, reply);
  });
  
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
            const newCount = photoLinks / 2;;
            if ( newCount == count ) {
              retries--;
              if ( retries == 0 ) {
                clearInterval(int);
                chrome.runtime.sendMessage({count,type:'publicphotostagged'});
              }
            } else {
              count = newCount;
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
  }

  async function countPublicStoriesTagged(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/stories-tagged/intersect`
    });
  }

  async function countPublicStoriesLiked(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/stories-liked/intersect`
    });
  }
}
