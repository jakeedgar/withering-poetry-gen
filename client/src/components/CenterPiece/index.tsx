import * as React from "react";

export interface ICenterPieceProps {
  children: React.ReactNode;
}

const CenterPiece: React.FC<ICenterPieceProps> = (props) => {
  const { children } = props;

  return (
    <div className="p-0">
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          WebkitTransform: "translate(-50%, -50%)",
        }}
        className="d-flex justify-content-center"
      >
        {children}
      </div>
    </div>
  );
};

export default CenterPiece;
