import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useForm } from "react-hook-form";

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handelGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);


            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });

    }
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-12"></div>
                <div className="col-md-4 col-sm-12">
                    <div className="fromStyle">
                        <h4>Create An Account</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input name="example" defaultValue="test" ref={register} />

                            <input name="name" ref={register({ required: true })} placeholder="Name" />
                            {errors.exampleRequired && <span>This field is required</span>}
                            <br/>

                            <input name="email" ref={register({ required: true })} placeholder="email" />
                            {errors.email && <span>This field is required</span>}
                            <br/>

                            <input name="password" ref={register({ required: true })} placeholder="password" />
                            {errors.password && <span>This field is required</span>}
                            <br/>

                            <input name="confirmPassword" ref={register({ required: true })} placeholder="confirmPassword" />
                            {errors.confirmPassword && <span>This field is required</span>}
                            <br/>



                            <input type="submit" />
                        </form>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12"></div>
            </div>
        </div>
    );
};

export default Login;

{/* <div>
<p>this is loggin page</p>
<button onClick={handelGoogleSignIn}>Google Sign In</button>
</div> */}