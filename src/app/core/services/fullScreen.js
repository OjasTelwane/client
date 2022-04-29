/*******************************************************************************************************
 * fullScreen Functions file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 29/09/2021 Ojas Telwane	Created 
 *******************************************************************************************************/

/**
 * Toggle fullscreen function who work with webkit and firefox.
 * @function toggleFullscreen
 * @param {Object} event
 * 
 * example
 * toggleFullscreen(); 
 * 
 */
 export function toggleFullscreen(event) {
  var element = document.body;

  if (event instanceof HTMLElement) {
    element = event;
  }

  var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function() {
    return false;
  };
  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function() {
    return false;
  };

  isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

/**
 * request Full Screen function who work with webkit and firefox.
 * @function requestFullScreen
 * @param {Object} event
 * 
 * example
 * requestFullScreen(); 
 * 
 */
 export function requestFullScreen(event) {
  var element = document.body;

  if (event instanceof HTMLElement) {
    element = event;
  }

  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function() {
    return false;
  };
  element.requestFullScreen();
}

/**
 * cancel Full Screen function who work with webkit and firefox.
 * @function cancelFullScreen
 * @param {Object} event
 * 
 * example
 * cancelFullScreen(); 
 * 
 */
 export function cancelFullScreen(event) {
  var element = document.body;

  if (event instanceof HTMLElement) {
    element = event;
  }

  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function() {
    return false;
  };
  element.cancelFullScreen();
}
