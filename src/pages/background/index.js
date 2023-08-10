let user_signed_in = false

const CLIENT_ID = encodeURIComponent(
  '349249349340-rk05m80mffp6v1gcodfuqvfphgquj8cs.apps.googleusercontent.com',
)
const RESPONSE_TYPE = encodeURIComponent('id_token')
const REDIRECT_URI = encodeURIComponent(
  'https://lfkeagbenhfhmkbkmpedimedikedoffe.chromiumapp.org',
)
const STATE = encodeURIComponent('jfkls3n')
const SCOPE = encodeURIComponent('openid')
const PROMPT = encodeURIComponent('consent')

function create_oauth2_url() {
  let nonce = encodeURIComponent(
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
  )
  let url = `https://accounts.google.com/o/oauth2/v2/auth
  ?client_id=${CLIENT_ID}
  &response_type=${RESPONSE_TYPE}
  &redirect_uri=${REDIRECT_URI}
  &state=${STATE}
  &scope=${SCOPE}
  &prompt=${PROMPT}
  &nonce=${nonce}`
  console.log(url)
  return url
}

function is_user_signed_in() {
  return user_signed_in
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    if (is_user_signed_in()) {
      console.log('user is already signed in.')
    } else {
      chrome.identity.launchWebAuthFlow({
        url: create_oauth2_url(),
        interactive: true,
      }, function (redirect_uri) {
        console.log(redirect_uri)
        sendResponse('success')
      })

      return true
    }
  } else if (request.message === 'logout') {
  }
})
