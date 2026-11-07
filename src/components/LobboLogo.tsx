import React from 'react';

interface LobboLogoProps {
  className?: string;
  variant?: 'color' | 'light' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * LobboLogo - Faithful reproduction of the authentic logo found on the Lobbo Cous Cous and Lobbo Bruks bottles.
 * Features the signature red/orange oval capsule, the two stylized leaves at the top apex,
 * and the iconic "LOBBO Beverages" typography.
 */
export const LobboLogo: React.FC<LobboLogoProps> = ({
  className = 'h-11 w-auto',
  variant = 'color',
}) => {
  const isLight = variant === 'light';
  const mainColor = isLight ? '#FFF8EF' : '#EF4329';
  const subColor = isLight ? '#F2C7A9' : '#EF4329';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 220 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain overflow-visible"
        aria-label="LOBBO Beverages Logo"
      >
        {/* Subtle pill background if variant === 'badge' */}
        {variant === 'badge' && (
          <ellipse cx="110" cy="56" rx="90" ry="38" fill="#FFF8EF" />
        )}

        {/* Outer Oval Contour matching bottle packaging */}
        <ellipse
          cx="110"
          cy="56"
          rx="88"
          ry="36"
          stroke={mainColor}
          strokeWidth="4.5"
          fill="none"
        />

        {/* Top Center Leaves Motif */}
        {/* Left Leaf */}
        <path
          d="M109 20 C106 11 95 6 88 10 C83 14 85 22 95 22 C103 22 108 20 109 20 Z"
          fill={mainColor}
        />
        {/* Right Leaf */}
        <path
          d="M111 20 C114 11 125 6 132 10 C137 14 135 22 125 22 C117 22 112 20 111 20 Z"
          fill={mainColor}
        />
        {/* Leaf Stem Base */}
        <path
          d="M108 20 Q110 22 112 20 Q110 18 108 20 Z"
          fill={mainColor}
        />

        {/* "LOBBO" Brand Text */}
        <text
          x="110"
          y="60"
          fill={mainColor}
          fontFamily="'Plus Jakarta Sans', 'Poppins', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="33"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          LOBBO
        </text>

        {/* "Beverages" Subtext */}
        <text
          x="110"
          y="77"
          fill={subColor}
          fontFamily="'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="12.5"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          Beverages
        </text>
      </svg>
    </div>
  );
};

