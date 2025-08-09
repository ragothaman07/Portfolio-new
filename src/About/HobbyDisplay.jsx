import React from "react";

const hobbyImages = {
  Drawing: [
    "https://ik.imagekit.io/ragothaman/New%20Folder/555.jpeg?updatedAt=1740273829885",
    "https://ik.imagekit.io/ragothaman/New%20Folder/666.jpeg?updatedAt=1740273829891",
    "https://ik.imagekit.io/ragothaman/New%20Folder/222.jpeg?updatedAt=1740273829997",
  ],
  Photography: [
    "https://ik.imagekit.io/ragothaman/New%20Folder/666.jpeg?updatedAt=1740273829891",
    "https://ik.imagekit.io/ragothaman/New%20Folder/222.jpeg?updatedAt=1740273829997",
    "https://ik.imagekit.io/ragothaman/New%20Folder/555.jpeg?updatedAt=1740273829885",
  ],
  Anime: [
    "https://ik.imagekit.io/ragothaman/New%20Folder/222.jpeg?updatedAt=1740273829997",
    "https://ik.imagekit.io/ragothaman/New%20Folder/555.jpeg?updatedAt=1740273829885",
    "https://ik.imagekit.io/ragothaman/New%20Folder/666.jpeg?updatedAt=1740273829891",
  ],
};

const slideDuration = 8000;

const HobbyDisplay = ({ hoveredHobby }) => {
  const imageWidth = 600; 
  const imageHeight = 320;
  const gap = 24;

  if (!hoveredHobby) {
    return (
      <div
        className="flex items-center justify-center w-full h-full bg-black text-white text-lg"
        style={{ minWidth: imageWidth, minHeight: imageHeight }}
      >
        Hover over a hobby
      </div>
    );
  }

  const images = hobbyImages[hoveredHobby];
  const totalWidth = images.length * (imageWidth + gap);

  return (
    <div
      className="relative overflow-hidden bg-black rounded-xl flex items-center justify-center"
      style={{
        userSelect: "none",
        width: imageWidth,
        height: imageHeight,
        minWidth: imageWidth,
        minHeight: imageHeight,
      }}
    >
      <div
        className="flex"
        style={{
          gap: `${gap}px`,
          width: `${totalWidth * 2}px`, // doubled width
          animation: `slideLeftToRight ${slideDuration}ms linear infinite`,
        }}
      >
        {/* Render images twice for continuous loop */}
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${hoveredHobby} ${i + 1}`}
            className="rounded-lg flex-shrink-0"
            draggable={false}
            style={{
              width: imageWidth,
              height: imageHeight,
              objectFit: "cover",
              minWidth: imageWidth,
              minHeight: imageHeight,
            }}
          />
        ))}
      </div>

      <style>{`
  @keyframes slideLeftToRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-${totalWidth}px);
    }
  }
`}</style>

    </div>
  );
};

export default HobbyDisplay;
