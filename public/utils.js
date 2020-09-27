export function checkBrowser() {
  let browserValue = ''
  let c = navigator.userAgent.search("Chrome");
  let f = navigator.userAgent.search("Firefox");
  let m8 = navigator.userAgent.search("MSIE 8.0");
  let m9 = navigator.userAgent.search("MSIE 9.0");
  if (c > -1) {
    browserValue = "Chrome";
  } else if (f > -1) {
    browserValue = "Firefox";
  } else if (m9 > -1) {
    browserValue = "MSIE 9.0";
  } else if (m8 > -1) {
    browserValue = "MSIE 8.0";
  }
  return browserValue;
}

export function createClassIdAppend(parentElem, htmlType, className, idName) {

      let testPar = parentElem
      let elementToAdd = document.createElement(htmlType);
      elementToAdd.setAttribute('class', className);
      elementToAdd.setAttribute('id', idName);
      if (testPar == null) {
        return;
      }
      testPar.appendChild(elementToAdd);
      return elementToAdd;
  }

export function loopIntroVideo(videoElemId) {
      document.querySelector(videoElemId).addEventListener('ended', function(e) {
        e.target.currentTime = 0;
        e.target.play();
      }, false);
  }

export function setElemAttribute(elem, attr, content) {
      elem[attr] = content
}
export function addListenerToClass(classSelector, functionName) {
      $(classSelector).each(function() {
        $(this).mouseup(functionName)
      })
    }
