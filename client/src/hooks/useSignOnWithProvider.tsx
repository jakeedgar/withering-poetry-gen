import * as React from 'react';
import { signInWithPopup } from 'firebase/auth';
import IProvider from '../interfaces/provider';

export const SignInWithSocialMedia = (auth: IProvider['auth'], provider: IProvider['provider']) =>
  new Promise<IProvider['credential']>((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result: any) => resolve(result))
      .catch((error: any) => reject(error));
  });

export default SignInWithSocialMedia;
