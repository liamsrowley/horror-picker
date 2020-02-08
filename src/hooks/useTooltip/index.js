import React, { useState } from 'react';

export const useTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState([0, 0]);

  const setPosition = (x, y) => {
    setPos([x, y]);
  }

  const setVisibility = (value) => {
    setIsVisible(value);
  }

  const actions = {
    setPosition,
    setVisibility
  };

  const tooltip = (params) => {
    const {
      element
    } = params;

    if (isVisible) {
      return (
        <div
          style={{
            position: 'absolute',
            left: pos[0] + 16,
            top: pos[1] + 16
          }}
        >
          {element}
        </div>
      );
    }
  }

  return [tooltip, actions];
}
