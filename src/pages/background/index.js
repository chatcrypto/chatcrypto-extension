const API_KEY = 'AIzaSyDdJpoy59g2F9gnzLMOb635KhCGZqCIilA'

let user_signed_in = false

function injectedFunction() {
  var iframe = document.createElement('iframe')
  iframe.style.background = 'transparent'
  iframe.style.position = 'fixed'
  iframe.style.top = '0px'
  iframe.style.right = '0px'
  iframe.style.zIndex = '9000000000000000000'
  iframe.style.border = '1px solid rgba(155, 155, 155, 0.18)'
  iframe.style.borderTopLeftRadius = '10px'
  iframe.style.borderBottomLeftRadius = '10px'
  iframe.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  iframe.src = chrome.runtime.getURL('popup.html')
  iframe.style.width = '450px'
  iframe.style.height = '100%'

  document.body.appendChild(iframe)

  document.body.addEventListener('click', () => {
    iframe.style.width = '0px'
  })
}

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: injectedFunction,
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    chrome.identity.getAuthToken(
      {
        interactive: true,
      },
      function (auth_token) {
        console.log(auth_token)
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

    // chrome.identity.getProfileUserInfo(
    //   {
    //     accountStatus: 'ANY',
    //   },
    //   function (user_info) {
    //     console.log(user_info)
    //     sendResponse(true)
    //   },
    // )
  }
})
