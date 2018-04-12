"use strict";
{
  // aim is to promisify all extension apis that use callbacks
  
  const expose = {
    promisify
  };

  Object.assign(self, expose);

  function promisify(func) {
    return async function(...args) {
      return new Promise((res,rej) => {
        try {
          func(...args, res);
        } catch(e) {
          rej(e);
        }
      });
    }
  }
}
