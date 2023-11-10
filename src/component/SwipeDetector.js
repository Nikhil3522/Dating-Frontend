import React, { useRef } from 'react';

const SwipeDetector = ({ onSwipeLeft, onSwipeRight }) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchEndX.current - touchStartX.current;

    if (distance > 0) {
      // Swiped right
      onSwipeRight();
    } else if (distance < 0) {
      // Swiped left
      onSwipeLeft();
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Render your content here */}
    </div>
  );
};

export default SwipeDetector;
