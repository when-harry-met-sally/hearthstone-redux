import React from 'react';

function Hero({health, playerId}) {
  return (
    <div className='center hero' data-hero='true' data-playerid={playerId}>
      <div>{health}</div>
      <div><img alt='' className='portrait' src='https://gamepedia.cursecdn.com/hearthstone_gamepedia/0/0a/Gul%27dan%28618%29.png'></img></div>
    </div>
  );
}

export default Hero;
