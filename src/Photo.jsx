import React from "react";

const Photo = ({ src, alt, style }) => {
  const defaultStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  return (
    <div>
      {src ? (
        <img src={src} alt={alt} style={{ ...defaultStyle, ...style }} />
      ) : (
        <div
          style={{
            ...defaultStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e0e0e0",
            color: "#888",
            fontSize: "14px",
          }}
        >
          No Image Available
        </div>
      )}
    </div>
  );
};

export default Photo;
