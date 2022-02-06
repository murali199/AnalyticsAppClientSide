import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../assets/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function updateUser(userProfile, id) {
    return request({
        url: API_BASE_URL + "/users/update/"+id,
        method: 'PUT',
        body: JSON.stringify(userProfile)
    });
}

export function getAllUsers() {
    return request({
        url: API_BASE_URL + "/users/allUsers",
        method: 'GET'
    });
}

/* export function handleLogin() {
    /* notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    }); 
    loadCurrentUser();
    this.props.history.push("/signup");
  } */

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
