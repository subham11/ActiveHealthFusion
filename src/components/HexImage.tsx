// HexImage.tsx
import React from 'react';
import { Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Polygon } from 'react-native-svg';

interface HexImageProps {
  source: any;      // ImageSourcePropType; using any for local require
  size: number;     // The width/height of the hex
}

const HexImage: React.FC<HexImageProps> = ({ source, size }) => {
  const center = size / 2;
  const radius = size / 2;
  // Generate 12 points (for a dodecagon; adjust if you prefer a hexagon)
  const points = Array.from({ length: 12 }, (_, i) => {
    const angle = (2 * Math.PI * i) / 12;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Polygon points={points} fill="black" />
        </Svg>
      }
    >
      <Image
        source={source}
        style={{ width: size, height: size }}
        resizeMode="cover"
      />
    </MaskedView>
  );
};

export default HexImage;
