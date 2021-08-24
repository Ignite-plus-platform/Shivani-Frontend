import React from 'react'
import { GoogleLogout } from 'react-google-login';

const Logout = () => {
    
    return (
        <div>
            <GoogleLogout
                clientId="415218634076-323ovbk93f9jptho379cs6cr7ffnlee2.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={(response) => { this.setState(() => { return { isSignedIn: false } }) }}
            >
            </GoogleLogout>
        </div>
    )
}
export default Logout;
