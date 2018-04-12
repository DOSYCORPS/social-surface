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

  async function countPublicPhotosTagged(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: `https://www.facebook.com/search/${id}/photos-tagged/intersect`
    });
    const result = await exe(tab.id, {
      code: `
        await new Promise((res,rej) => {
          let count = 0;
          const int = setInterval(() => {
            scrollTo(0,scrollY+1000);
            const storyStamps = Array.from(document.querySelectorAll('.timestampContent'));
            const photoLinks = Array.from(document.querySelectorAll('a[rel="theater"]'));
            let newCount;
            if ( !! storyStamps ) {
              newCount = storyStamps;
            } else if ( !! photoLinks ) {
              newCount = photoLinks / 2;
            }
            if ( newCount == count ) {
              console.log(count);
              res(count);    
            }
          }, 1000);
        });
      `
    });
    console.log(result);     
    return result;
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
