exports.onRouteUpdate = () => {
  const imageWrappers = document.querySelectorAll(`.story_image`)

  // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills
  for (let i = 0; i < imageWrappers.length; i++) {
    const imageWrapper = imageWrappers[i]

    const backgroundElement = imageWrapper.querySelector(
      `.background_image`
    )
    const imageElement = imageWrapper.querySelector(`.front_image`)

    const onImageLoad = () => {
      backgroundElement.style.transition = `opacity 0.5s 0.5s`
      backgroundElement.style.opacity = 0
      imageElement.style.transition = `opacity 0.5s`
      imageElement.style.opacity = 1
      imageElement.classList.add('loaded')
      imageElement.removeEventListener(`load`, onImageLoad)
    }
    if (imageElement){

      if (imageElement.complete) {
        backgroundElement.style.opacity = 0
      } else {
        imageElement.style.opacity = 0
        imageElement.addEventListener(`load`, onImageLoad)
      }
    }
  }
}

exports.onInitialClientRender = () => {
  const _attachEvent = function(eventName, target, fn) {
    const addEvent = function(elem,type,callback) {
        var evt = function(e) {
            e = e || window.event;
            return callback.call(elem,e);
        }, cb = function(e) {return evt(e);};
        if( elem.addEventListener) {
            elem.addEventListener(type,cb,false);
        }
        else if( elem.attachEvent) {
            elem.attachEvent("on"+type,cb);
        }
        return elem;
    };
    const findParent = function(child,filter,root) {
        do {
            if( filter(child)) return child;
            if( root && child == root) return false;
        } while(child = child.parentNode);
        return false;
    };
    const hasElem = function(elem, elems) {
      for (const _elem of elems) {
        if (_elm === elm) {
          return true
        }
      }
      return false;
    };
    addEvent(document.body, eventName, function(e) {
      const queryEl = document.querySelectorAll(target)
      var s = findParent(e.srcElement || e.target,function(elm) {
          return hasElem(elm,queryEl);
      },this);
      if(s) {
        fn();
      }
    });
  }
  _attachEvent('click', '.story_block_image .gif_player', (e)=> {
    const target = e.currentTarget
    target.classList.remove('error')
    if (target.classList.contains('loading')){
      return
    }
    const img = target.querySelector('img')
    if (img.classList.contains('loaded')){
      if (target.classList.contains('playing')) {
        target.classList.remove('playing')
        const still = img.dataset.still
        img.setAttribute('src', still)
      } else {
        const src = img.dataset.src
        target.classList.add('loading');
        const _img = document.createElement('img')
        _img.onload = ()=>{
          _img.onload = null
          _img.onerror = null
          target.classList.remove('loading')
          target.classList.remove('error')
          target.classList.add('playing')
          img.setAttribute('src', src)
        }
        _img.onerror = ()=> {
          _img.onload = null
          _img.onerror = null
          target.classList.remove('loading')
          target.classList.add('error')
        }
        _img.setAttribute('src', src)
      }
    }
  })
}
