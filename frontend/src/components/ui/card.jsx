// components/ui/card.jsx
import React from 'react';

// Card component
// A flexible container for displaying content in a distinct block.
// It supports additional Tailwind CSS classes via the className prop.
const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      rounded-xl border bg-card text-card-foreground shadow-sm
      ${className || ''}
    `}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

// CardContent component
// Used for the main content area within a Card.
// It provides default padding and supports additional Tailwind CSS classes.
const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      p-6
      ${className || ''}
    `}
    {...props}
  >
    {children}
  </div>
));
CardContent.displayName = "CardContent";

export { Card, CardContent };