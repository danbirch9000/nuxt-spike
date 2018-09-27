export function clearAuth0LocalStorage() {
  var arr = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).substring(0, 14) == "com.auth0.auth") {
      arr.push(localStorage.key(i));
    }
  }

  for (var j = 0; j < arr.length; j++) {
    localStorage.removeItem(arr[j]);
  }
}
