window.onload = function () {
  const loginEl = document.getElementById('login')
  const logoutEl = document.getElementById('logout')
  if (loginEl) {
    loginEl.addEventListener('click', function () {
      // chrome.runtime.sendMessage({ message: 'login' }, function (response) {
      //   console.log('login')
      // })
      chrome.identity.getAuthToken(
        {
          interactive: true,
        },
        function (auth_token) {
          console.log(auth_token)
          chrome.storage.sync.set({ auth_token: auth_token })
          sendResponse(true)
          let init = {
            method: 'GET',
            async: true,
            headers: {
              Authorization: 'Bearer ' + auth_token,
              'Content-Type': 'application/json',
            },
            contentType: 'json',
          }

          fetch(
            `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses&key=${API_KEY}`,
            init,
          )
            .then((response) => response.json())
            .then(function (data) {
              console.log('me', data)
              // let returnedContacts = data.memberResourceNames
              // for (let i = 0; i < returnedContacts.length; i++) {
              //   fetch(
              //     `https://people.googleapis.com/v1/' +
              //       returnedContacts[i] +
              //       '?personFields=photos&key=${API_KEY}`,
              //     init,
              //   )
              //     .then((response) => response.json())
              //     .then(function (data) {
              //       console.log('returnedContacts', data)
              //     })
              // }
            })
        },
      )
    })
  }

  if (logoutEl) {
    logoutEl.addEventListener('click', function () {
      // chrome.runtime.sendMessage({ message: 'logout' }, function (response) {
      //   console.log('logout')
      // })
      chrome.storage.sync.get('auth_token').then((data) => {
        console.log(data)
        if (data.auth_token) {
          chrome.identity.clearAllCachedAuthTokens((response) => {
            console.log(response)
            chrome.storage.sync.set({ auth_token: '' })
          })
        }
      })
    })
  }
}
