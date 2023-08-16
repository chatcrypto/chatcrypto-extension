// let user_signed_in = false

// const CLIENT_ID = encodeURIComponent(
//   '349249349340-u6pjg3g4j3951oggpbidvj0oiisep78d.apps.googleusercontent.com',
// )
// const RESPONSE_TYPE = encodeURIComponent('id_token')
// const REDIRECT_URI = encodeURIComponent(
//   'https://' + chrome.runtime.id + '.chromiumapp.org',
// )
// const STATE = encodeURIComponent('jfkls3n')
// const SCOPE = encodeURIComponent('openid')
// const PROMPT = encodeURIComponent('consent')

// function create_oauth2_url() {
//   let nonce = encodeURIComponent(
//     Math.random().toString(36).substring(2, 15) +
//       Math.random().toString(36).substring(2, 15),
//   )
//   let url = `https://accounts.google.com/o/oauth2/v2/auth
//   ?client_id=${CLIENT_ID}
//   &response_type=${RESPONSE_TYPE}
//   &redirect_uri=${REDIRECT_URI}
//   &state=${STATE}
//   &scope=${SCOPE}
//   &prompt=${PROMPT}
//   &nonce=${nonce}`
//   console.log(url)
//   return url
// }

// function is_user_signed_in() {
//   return user_signed_in
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'login') {
//     if (is_user_signed_in()) {
//       console.log('user is already signed in.')
//     } else {
//       chrome.identity.launchWebAuthFlow(
//         {
//           url: create_oauth2_url(),
//           interactive: true,
//         },
//         function (redirect_uri) {
//           console.log(redirect_uri)
//           sendResponse('success')
//         },
//       )

//       return true
//     }
//   } else if (request.message === 'logout') {
//   }
// })

const API_KEY = 'AIzaSyDdJpoy59g2F9gnzLMOb635KhCGZqCIilA'

let user_signed_in = false

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
