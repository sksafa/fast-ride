import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useForm } from "react-hook-form";
import bg from '../../images/Bg.png'
import './Login.css'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(true)
    const [user, setUser] = useState({
        isSignIn: false,
        Name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });
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
                var errorMessage = error.message;
            });

    }
    const handelChange = (e) => {
        let fieldValid;
        if (e.target.name === 'name') {
            fieldValid = e.target.value
        }
        if (e.target.name === 'email') {
            fieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const validPasswordLength = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            fieldValid = validPasswordLength && passwordHasNumber;
        }

        if (fieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }

    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    console.log('sign info', res.user)
                    setLoggedInUser(newUserInfo);
                    history.replace(from);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('user name updated successfully')

        }).catch(function (error) {
            console.log(error)

        });
    }


    const { register, watch, errors } = useForm();
    const style = {
        backgroundImage: ` url(${bg})`,
        height: '800px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
    return (
    
        <div className="container-fluid" style={style} >
            <div className="row">
                <div className="col-md-4 col-sm-12"></div>
                <div className="col-md-4 col-sm-12">
                    <div className="fromStyle">
                        <h4>{newUser ? 'Create An Account' : 'Login'}</h4>
                        <form onSubmit={handleSubmit}>
                            {newUser && <input name="name" type="text" onBlur={handelChange} ref={register({ required: true })} placeholder="Name" />}
                            {errors.exampleRequired && <span>This field is required</span>}
                            <br />

                            <input name="email" onBlur={handelChange} ref={register({ required: true })} placeholder="email" />
                            {errors.email && <span>This field is required</span>}
                            <br />

                            <input name="password" type="password" onBlur={handelChange} ref={register({ required: true })} placeholder="password" />
                            {errors.password && <span>This field is required</span>}
                            <br />

                            {newUser && <input name="confirmPassword" type="password" onBlur={handelChange} ref={register({ required: true })} placeholder="confirmPassword" />}
                            {errors.confirmPassword && <span>This field is required</span>}
                            <br />
                            <input type="submit" value={newUser ? 'creat account' : 'login'} />
                        </form>
                        <p>{newUser ? 'Already Have account' : 'create new Account'} <button onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'create account'}</button> </p>

                        <p style={{ color: 'red' }}> {user.error}</p>
                        {user.success && <p style={{ color: 'green' }}>User {newUser ? ' Created ' : 'login'} Successfully</p>}
                    </div>
                    <div className="othersSignIn">
                        <button onClick={handelGoogleSignIn}>Google Sign In</button>
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
//    <input name="example" defaultValue="test" ref={register} />
</div> */}