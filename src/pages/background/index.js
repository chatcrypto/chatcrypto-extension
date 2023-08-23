const { get } = require('lodash')

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

const API_KEY = 'AIzaSyDdJpoy59g2F9gnzLMOb635KhCGZqCIilA'

let user_signed_in = false

function injectedFunction() {
  const chatContainerEl = document.getElementById('chat-container')

  document.addEventListener('click', () => {
    if (chatContainerEl && chatContainerEl.style.width === '450px') {
      chatContainerEl.style.width = '0px'
    }
  })

  if (!chatContainerEl) {
    var iframe = document.createElement('iframe')
    const containerEl = document.createElement('div')
    containerEl.style.backgroundColor = '#fff'
    containerEl.style.display = 'flex'
    containerEl.style.transition = 'all 0.1s ease-in'
    containerEl.style.justifyContent = 'center'
    containerEl.style.flexDirection = 'column'
    containerEl.style.alignItems = 'center'
    containerEl.innerHTML = `
    <svg id="loading-el" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#6f8afe" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
    </svg>
    `
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

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request)
  if (request.message === 'googleLogin') {
    chrome.identity.getAuthToken(
      {
        interactive: true,
      },
      function (auth_token) {
        sendResponse(true)
        postData(`https://api-dev.chatcrypto.chat/auth/gmail/extension`, {
          token: auth_token,
        }).then((data) => {
          if (data.access_token) {
            chrome.storage.local.set({ access_token: data.access_token })
            chrome.runtime.sendMessage({
              message: 'access_token',
              data: {
                access_token: data.access_token,
              },
            })
          }
        })
      },
    )
  }

  if (request.message === 'googleLogout') {
    chrome.storage.local.get('access_token').then((data) => {
      if (data.access_token) {
        chrome.identity.clearAllCachedAuthTokens((response) => {
          chrome.storage.local.set({ access_token: '' })
        })
      }
    })
  }

  if (request.message === 'closePopup') {
    const tabId = get(sender, 'tab.id', null)

    if (tabId) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        func: () => {
          console.log('script triggered ?')
          const chatContainerEl = document.getElementById('chat-container')
          if (chatContainerEl) {
            if (chatContainerEl.style.width === '450px') {
              chatContainerEl.style.width = '0px'
            }
          }
        },
      })
    }
  }
})

// chrome.storage.local.onChanged.addListener((changes) => {
//   console.log(changes, 'changes bgbgbgbgbgb')
// })