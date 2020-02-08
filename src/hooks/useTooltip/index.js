import React, { useState } from 'react';

export const useTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState([0, 0]);

  const setPosition = (e) => {
    setPos([e.pageX, e.pageY]);
    setIsVisible(true);
  }

  const hideTooltip = () => {
    setIsVisible(false);
  }

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

  return [tooltip, setPosition, hideTooltip];
}
