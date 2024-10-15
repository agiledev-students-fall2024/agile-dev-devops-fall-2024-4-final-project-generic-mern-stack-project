import React, { useState } from 'react';
import { useSpring, animated, to as interpolate } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import '../styles/SwipeableCard.css';
const SwipeableCard = ({ onSwipeLeft, onSwipeRight, children }) => {
  const [gone, setGone] = useState(false);

  const [{ x, rot, scale }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      api.start({
        x: deltaX,
        rot: deltaX / 10,
        scale: 1.05,
        immediate: true,
      });
    },
    onSwipedLeft: () => {
      api.start({ x: -window.innerWidth * 1.5, rot: -45, immediate: false });
      setGone(true);
      onSwipeLeft();
    },
    onSwipedRight: () => {
      api.start({ x: window.innerWidth * 1.5, rot: 45, immediate: false });
      setGone(true);
      onSwipeRight();
    },
    onSwiped: () => {
      if (!gone) {
        api.start({ x: 0, rot: 0, scale: 1, immediate: false });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (gone) return null;

  return (
    <animated.div
      {...handlers}
      className="swipeable-card"
      style={{
        transform: interpolate(
          [x, rot, scale],
          (x, rot, scale) =>
            `translateX(${x}px) rotate(${rot}deg) scale(${scale})`
        ),
      }}
    >
      {children}
    </animated.div>
  );
};

export default SwipeableCard;
