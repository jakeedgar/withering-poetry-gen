import { Document } from 'mongoose';
import IUser from './user';

export default interface IPoem extends Document {
  title: string;
  creator: IUser;
  content: string;
  contentPostErasure: string;
}
