/*******************************************************************************************************
 * useSessionStorage file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 29/09/2021 Ojas Telwane	Created 
 *******************************************************************************************************/

class SessionService {

  getSessionStorageOrDefault (key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  setSessionStrage(key, values) {
    sessionStorage.setItem(key, JSON.stringify(values));
  }

  removeSessionStorage (key) {
    sessionStorage.removeItem(key);
  }

}
export default new SessionService();

