import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
};

const Image: React.FC<ImageProps> = ({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/assets/images/no_image.png";
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
