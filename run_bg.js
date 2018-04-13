"use strict";
{
  chrome.tabs.create({active:true,url: chrome.extension.getURL('ui.html')});

  chrome.runtime.onMessage.addListener( (msg, sender, reply) => {
    console.log(msg);
  });
}
