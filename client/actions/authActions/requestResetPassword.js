import axios from 'axios';
import API from '../api';
import notify from '../notify';

/**
 * send request to reset password
 * @param {String}    email  user email
 * 
 * @returns {undefined}      success or failure notification
 */
const requestResetPassword = email => () => (
  axios.post(`${API}/users/forgot-password`, { email })
    .then(response => notify.success(response.data.message)
    ).catch(error => notify.error(error.response.data.message))
);

export default requestResetPassword;