export interface RouteComponentProps<Params extends { [K in keyof Params]?: string }> {
  match?: any;
  location?: string;
  history?: string;
  staticContext?: any;
}
