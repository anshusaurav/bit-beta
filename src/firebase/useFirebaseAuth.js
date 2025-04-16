// Libraries
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';

// Constants & Utils
import firebase from './index';
import {hideLoader, showLoader, showToast} from '../../store/actions/globalActions';
import {showCustomFirebaseError} from '../../utils/commonUtils';

// Actions
import {getUserDetails, resetUserDetails} from '../../store/actions/userActions';
import {defaultApiErrorMessage} from '../../constants/commonConstants';

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName,
});


export default function useFirebaseAuth() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.userData);
    const {getUserDetailsResponse, getUserDetailsLoading, getUserDetailsFulfilled, getUserDetailsFailed} = userData;

    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(null);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setLoading(false);
            return;
        }

        setLoading(true);
        authState.token = await authState.getIdToken(true);
        const {token, refreshToken} = authState;

        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);


        dispatch(getUserDetails({}));

        let formattedUser = formatAuthUser(authState);
        setAuth(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const signInWithEmailAndPassword = (email, password) => {
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        //     .then(() => (
        //         firebase.auth().signInWithEmailAndPassword(email, password)
        //     ))
        //     .then((authUser) => {
        //         router.push('/');
        //     })
        //     .catch((error) => {
        //         dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));
        //
        //     });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                router.push('/').then();
            })
            .catch(error => {
                dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));
            });
    };

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            clear();
            dispatch(resetUserDetails());
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        });
    };

    const resetPassword = (email) => {

        const redirectURL = window?.location?.host;
        if (redirectURL) {
            const actionCodeSettings = {
                // After password reset, the user will be give the ability to go back
                // to this page.
                url: `https://${redirectURL}`,
                handleCodeInApp: false
            };
            firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
                .then(() => {
                    dispatch(showToast({status: 'success', message: 'Email sent successfully.'}));
                })
                .catch((error) => {
                    dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));
                });
        }
    };

    const updatePassword = (password, onSuccess, onFailure) => {
        firebase.auth().currentUser.updatePassword(password)
            .then(() => {
                dispatch(showToast({status: 'success', message: 'Password updated successfully.'}));
                if (onSuccess)
                    onSuccess();
            }).catch((error) => {
                dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));
                if (onFailure)
                    onFailure();
            });
    };

    const reauthenticateWithCredential = (password, onSuccess, onFailure) => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        );

        user.reauthenticateWithCredential(credential)
            .then(() => {
                dispatch(showToast({status: 'success', message: 'Re-authenticated successfully.'}));
                if (onSuccess)
                    onSuccess();
            }).catch((error) => {
                dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));
                if (onFailure)
                    onFailure();
            });
    };

    const deleteUser = () => {
        firebase.auth().currentUser.delete().then(() => {
            dispatch(showToast({status: 'success', message: 'Account deleted successfully.'}));
            clear();
            router.push('/').then();
        }).catch((error) => {
            dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));

        });
    };

    const updateDisplayName = (name) => {
        firebase.auth().currentUser.updateProfile({
            displayName: name
        }).then(() => {
            setAuthUser({...authUser, displayName: name});
            dispatch(showToast({status: 'success', message: 'Account updated successfully.'}));
        }).catch((error) => {
            dispatch(showToast({status: 'error', message: showCustomFirebaseError(error)}));
        });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    useEffect(() => {

        if (getUserDetailsResponse?.id) {
            dispatch(showLoader());
            setAuthUser(getUserDetailsResponse);
        }

    }, [getUserDetailsLoading]);

    useEffect(() => {

        if (getUserDetailsFulfilled && getUserDetailsResponse?.id) {
            dispatch(hideLoader());
            setAuthUser(getUserDetailsResponse);
        }

        if (getUserDetailsFailed) {
            dispatch(showToast({status: 'error', message: getUserDetailsResponse?.message || defaultApiErrorMessage}));
            signOut();
        }

    }, [getUserDetailsFulfilled, getUserDetailsFailed]);

    return {
        auth,
        authUser,
        loading,
        signInWithEmailAndPassword,
        signOut,
        resetPassword,
        updatePassword,
        reauthenticateWithCredential,
        deleteUser,
        updateDisplayName
    };
}