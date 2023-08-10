window.onload = function () {
  const loginEl = document.getElementById('login')
  const logoutEl = document.getElementById('logout')
  if (loginEl) {
    loginEl.addEventListener('click', function () {
      chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        console.log('login')
      })
    })
  }

  if (logoutEl) {
    logoutEl.addEventListener('click', function () {
      chrome.runtime.sendMessage({ message: 'logout' }, function (response) {
        console.log('logout')
      })
    })
  }
}
