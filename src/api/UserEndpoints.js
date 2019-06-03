import axios from 'axios'

export default class UserEndpoints {
  static saveOrUpdateSocialAccountOnServer = ({
    uid,
    displayName,
    email,
    photoURL,
  }) => axios.post(`/users/register/${uid}`, { displayName, email, photoURL })
}
