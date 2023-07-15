import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContext from '@/libs/context/AuthContext'
import AuthReducer from '@/libs/reducer/AuthReducer'
import { useEffect, useReducer } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import Footer from '@/Components/Footer'

export default function App({ Component, pageProps }) {
  const [authState, authDispatch] = useReducer(AuthReducer.reducer, AuthReducer.initialState);

  // ログイン状態を監視し，状態を更新する
  const listenAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      authDispatch({type: 'isLoading', payload: {isLoading: true}})
      if (user) {
        (async () => {
          const uid = user.uid;
          console.log('User signed in: ', uid);
          authDispatch({type: 'isLoading', payload: {isLoading: false}})
          authDispatch({type: 'signIn', payload: {user: user}});
        })();
      } else {
        console.log('No user');
        authDispatch({type: 'signOut'});
        authDispatch({type: 'isLoading', payload: {isLoading: false}});
      }
    });
  }

  useEffect(() => {
    (async () => {
      await listenAuthState();
    })();
  }, []);

  return (
    <AuthContext.Provider value={{authState, dispatch: authDispatch}}>
      <ChakraProvider>
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </AuthContext.Provider>
  )
}
