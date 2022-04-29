/*******************************************************************************************************
 * Print Screen Functions file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 29/09/2021 Ojas Telwane	Created 
 *******************************************************************************************************/

/**
 * stopPrntScr function
 * @function stopPrntScr
 * 
 * example
 * document.addEventListener("keyup", function (e) {
 * var keyCode = e.keyCode ? e.keyCode : e.which;
 *   if (keyCode == 44) {
 *     stopPrntScr();
 *   }
 * }); 
 * 
 */
 export function stopPrntScr() {
    var inpFld = document.createElement("input");
    inpFld.setAttribute("value", ".");
    inpFld.setAttribute("width", "0");
    inpFld.style.height = "0px";
    inpFld.style.width = "0px";
    inpFld.style.border = "0px";
    document.body.appendChild(inpFld);
    inpFld.select();
    document.execCommand("copy");
    inpFld.remove(inpFld);
}

/**
 * AccessClipboardData function
 * @function AccessClipboardData
 * 
 * example
 * setInterval("AccessClipboardData()", 300);
 * 
 */
 export function AccessClipboardData() {
  try {
      window.clipboardData.setData('text', "Access Restricted");
  } catch (err) {
  }
}
