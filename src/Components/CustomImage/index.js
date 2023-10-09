import React from 'react';
import { Image } from 'react-native';
import { Images } from '../../Constant/Images';

const CustomImage = ({ source, staticSource, style }) => {
    // console.log("images>>",source, staticSource, style )
  const onError = () => {
    return <Image source={Images.HAIRCUTTINGS} style={style} />;
  };

  return <Image source={{uri:source}} style={style} onError={onError} />;
};

export default CustomImage;
