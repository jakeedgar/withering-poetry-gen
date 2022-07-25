import IUser from './user';

export default interface IPoem {
  _id: string;
  title: string;
  creator: string | IUser;
  content: string;
  contentPostErasure: string;
  createdAt: string;
  updatedAt: string;
}
