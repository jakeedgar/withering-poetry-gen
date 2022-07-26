import React from 'react';
import { Link } from 'react-router-dom';

export interface IPoemPreviewProps {
  _id: string;
  title: string;
  creator: string;
  contentPostErasure: string;
  createdAt: string;
  updatedAt: string;
  children: any;
}

const BlogPreview: React.FunctionComponent<IPoemPreviewProps> = (props) => {
  const { _id, creator, contentPostErasure, children, createdAt, updatedAt, title } = props;

  return (
    <div className="card">
      <div className="card-body">
        <Link to={`/poems/${_id}`} style={{ textDecoration: 'none' }} className="text-primary">
          <h1>
            <strong>{title}</strong>
          </h1>
          <br />
        </Link>
        {createdAt !== updatedAt ? (
          <p>
            Updated by {creator} at {new Date(updatedAt).toLocaleString()}
          </p>
        ) : (
          <p>
            Posted by {creator} at {new Date(createdAt).toLocaleString()}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default BlogPreview;
