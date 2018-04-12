"use strict";
{
  const summaryIntel = {
    countPublicPhotosTagged,
    countPublicPhotosLiked,
    countPublicStoriesTagged,
    countPublicStoriesLiked
  };

  const newTab = promisify((...args) => chrome.tabs.create(...args));

  Object.assign(self, summaryIntel);

  function countPublicPhotosTagged(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: 'https://www.facebook.com/search/${id}/photos-tagged/intersect'
    });
  }

  function countPublicPhotosLiked(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: 'https://www.facebook.com/search/${id}/photos-liked/intersect'
    });
  }

  function countPublicStoriesTagged(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: 'https://www.facebook.com/search/${id}/stories-tagged/intersect'
    });
  }

  function countPublicStoriesLiked(id) {
    const tab = await newTab({
      active: false,
      index: 1000,
      url: 'https://www.facebook.com/search/${id}/stories-liked/intersect'
    });
  }
}
