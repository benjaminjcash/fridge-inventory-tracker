import React, { useState, useEffect } from 'react';
import { useStyletron } from 'baseui';

const UPCProductImage = ({ src, onProductSelect }) => {
  const [css] = useStyletron();
  const [imageSrc, setImageSrc] = useState(src);
  
  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const onLoad = ({ target: image }) => {
    if(image.offsetWidth/image.offsetHeight != 1) setImageSrc('../images/image-not-found.png')
  }

  return (
    <img 
      src={imageSrc}
      onClick={() => onProductSelect(i)}
      onLoad={onLoad}
      onError={()=>setImageSrc('../images/image-not-found.png')}
      className={css({ width: '100%', maxWidth: '400px', height: 'auto%' })}
    />
  );
}

export default UPCProductImage;