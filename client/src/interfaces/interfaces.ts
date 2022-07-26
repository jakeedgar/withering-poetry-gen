// export interface RouteComponentProps<Params extends { [K in keyof Params]?: string }> {
//   match?: any;
//   location?: string;
//   history?: string;
//   staticContext?: any;
// }

import { Match } from '@testing-library/react';

export interface RouteComponentProps<Params extends { [K in keyof Params]?: string }> {
  params?: Params;
  match?: Match;
  location?: Location;
  history?: History;
  staticContext?: any;
}
