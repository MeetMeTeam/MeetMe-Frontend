import React, { useState, useEffect } from 'react';

const SpriteAnimation = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % 4); // ปรับตามจำนวนรูปภาพของคุณ
    }, 200); // ปรับตามความเร็วที่คุณต้องการ
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + `/Group${frame}.png`}
        alt={`Frame ${frame}`}
      />
    </div>
  );
};

export default SpriteAnimation;