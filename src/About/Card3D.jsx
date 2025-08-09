import React, { useState, forwardRef } from 'react';

const Card3D = forwardRef(
  (
    {
      title,
      specialization,
      marks,
      year,
      smallInfo = [],
      wrapperClass = '',
      styleOverride = {},
    },
    ref
  ) => {
    const [style, setStyle] = useState({
      transform:
        'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
      transition: 'transform 200ms linear',
    });

    const handleMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -5;
      const ry = ((x - cx) / cx) * 6;
      const s = 1.03;
      setStyle({
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
        transition: 'transform 120ms linear',
      });
    };

    const handleEnter = () => {
      setStyle({
        transform: `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1.2)`,
        transition: 'transform 180ms cubic-bezier(.6,2,.1,2)',
      });
    };

    const handleLeave = () => {
      setStyle({
        transform:
          'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 300ms cubic-bezier(.2,.9,.2,1)',
      });
    };

    return (
      <div
        ref={ref}
        className={`threeD-wrapper ${wrapperClass} w-[460px] h-[380px]`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handleEnter}
        style={{ perspective: 900, ...styleOverride }}
      >
        <div
          className="threeD-card relative w-full h-full rounded-2xl border border-gray-300 shadow-2xl bg-white flex flex-col justify-between p-8"
          style={style}
        >
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col items-start text-left">
              <h2 className="text-black text-2xl font-bold">{title}</h2>
              <p className="text-gray-600 text-xl mt-2">{specialization}</p>
            </div>

            {smallInfo.length > 0 && (
              <div className="flex items-center justify-center w-[80px] h-[80px] bg-white border border-gray-300 rounded-lg shadow-md text-black text-xl font-bold text-center leading-tight">
                {smallInfo.join(' ')}
              </div>
            )}
          </div>

          <div className="flex-grow flex items-center justify-center -mt-4">
            <span className="text-6xl font-extrabold text-black">{marks}</span>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="bg-white text-black rounded-full px-6 py-3 text-lg font-bold shadow-md border border-gray-200">
              Pass Out {year}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card3D;
