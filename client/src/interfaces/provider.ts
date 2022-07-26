import * as React from 'react';
import { AuthProvider, AuthCredential, Auth } from 'firebase/auth';

export default interface IProvider {
  provider: AuthProvider;
  credential: AuthCredential;
  auth: Auth;
}
