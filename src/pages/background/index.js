const API_KEY = 'AIzaSyDdJpoy59g2F9gnzLMOb635KhCGZqCIilA'

let user_signed_in = false

function injectedFunction() {
  const chatContainerEl = document.getElementById('chat-container')

  if (!chatContainerEl) {
    var iframe = document.createElement('iframe')
    const containerEl = document.createElement('div')
    containerEl.style.backgroundColor = 'red'
    containerEl.style.display = 'flex'
    containerEl.style.justifyContent = 'center'
    containerEl.style.flexDirection = 'column'
    containerEl.style.alignItems = 'center'
    containerEl.setAttribute('id', 'chat-container')
    containerEl.style.position = 'fixed'
    containerEl.style.top = '0px'
    containerEl.style.right = '0px'
    containerEl.style.zIndex = '9000000000000000000'
    containerEl.style.border = '1px solid rgba(155, 155, 155, 0.18)'
    containerEl.style.borderTopLeftRadius = '10px'
    containerEl.style.borderBottomLeftRadius = '10px'
    containerEl.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    containerEl.style.width = '450px'
    containerEl.style.height = '100%'
    containerEl.style.animation = 'width 1s ease'
    containerEl.innerHTML = '<p id="loading-el">Loading</p>'
    containerEl.appendChild(iframe)
    iframe.setAttribute('id', 'chrome-extension')
    iframe.setAttribute('border', '0')
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.display = 'none'
    iframe.style.borderTopLeftRadius = '10px'
    iframe.style.borderBottomLeftRadius = '10px'
    iframe.style.border = 'none'
    iframe.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'

    iframe.onload = () => {
      const loadingIcon = document.getElementById('loading-el')
      iframe.style.display = 'block'
      containerEl.style.background = 'transparent'
      loadingIcon.remove()
    }
    iframe.src = chrome.runtime.getURL('popup.html')
    document.body.appendChild(containerEl)
  } else {
    if (chatContainerEl.style.width === '0px') {
      chatContainerEl.style.width = '450px'
    } else {
      chatContainerEl.style.width = '0px'
    }
  }
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
