import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Modern minimalistic icons with thin strokes and purple accents
export const ModernIcons = {
  // Fullscreen icon with expanding arrows
  Fullscreen: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Corner arrows with purple accent */}
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center expanding arrows with purple accent */}
      <path
        d="m15 9-6 6m0 0h4m-4 0V11"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m9 15 6-6m0 0v4m0-4h-4"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Document with folded corner and sparkle
  Document: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Document outline */}
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Content lines */}
      <path
        d="M16 13H8m8 4H8m2-8H8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Purple accent sparkle */}
      <path
        d="M11 18.5L12 17l1 1.5L12 20l-1-1.5z"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 18h3m-1.5-1.5v3"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  ),

  // Settings gear with purple accent
  Settings: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Outer gear */}
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center circle with purple accent */}
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Database with purple accent
  Database: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Database cylinders */}
      <ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Purple accent lines */}
      <path
        d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Users/Team with purple accent
  Users: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* First user */}
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Second user with purple accent */}
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // LogOut with purple accent
  LogOut: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Door frame */}
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow with purple accent */}
      <polyline
        points="16,17 21,12 16,7"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <line
        x1="21"
        y1="12"
        x2="9"
        y2="12"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Plus/Add with purple accent
  Plus: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Circle outline */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Plus with purple accent */}
      <path
        d="M12 8v8m-4-4h8"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Edit with purple accent
  Edit: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Pencil body */}
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Edit tip with purple accent */}
      <path
        d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Trash with purple accent
  Trash: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Trash can */}
      <path
        d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Delete lines with purple accent */}
      <path
        d="M10 11v6m4-6v6"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // MessageSquare with purple accent
  MessageSquare: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Chat bubble */}
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Message dots with purple accent */}
      <circle
        cx="9"
        cy="10"
        r="1"
        fill="#A78BFA"
      />
      <circle
        cx="12"
        cy="10"
        r="1"
        fill="#A78BFA"
      />
      <circle
        cx="15"
        cy="10"
        r="1"
        fill="#A78BFA"
      />
    </svg>
  ),

  // ChevronUp with purple accent
  ChevronUp: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      <path
        d="m18 15-6-6-6 6"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Mail with purple accent
  Mail: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      {/* Envelope */}
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Letter with purple accent */}
      <path
        d="m22 7-10 5L2 7"
        stroke="#A78BFA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // MoreHorizontal with purple accent
  MoreHorizontal: ({ className = "", size = 16 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="1" fill="#A78BFA" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
};
