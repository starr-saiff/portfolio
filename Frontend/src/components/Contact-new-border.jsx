// Softer color palette for friendly borders
const borderColors = {
  topLeft: { color: 'rgba(100, 200, 255, 0.2)', glow: 'rgba(100, 200, 255, 0.1)' },
  topRight: { color: 'rgba(150, 120, 255, 0.2)', glow: 'rgba(150, 120, 255, 0.1)' },
  bottomRight: { color: 'rgba(255, 180, 120, 0.2)', glow: 'rgba(255, 180, 120, 0.1)' },
  bottomLeft: { color: 'rgba(120, 220, 180, 0.2)', glow: 'rgba(120, 220, 180, 0.1)' },
};

// Border components to replace in Contact.jsx
// Replace the entire border section (from "Elegant Complete Border Frame" comment to the glass-card div)

{/* Elegant Friendly Border Frame */}
{/* Top Left Corner */}
<div className="absolute -top-3 -left-3 w-24 h-24 z-30 pointer-events-none">
  <motion.div 
    className="absolute top-0 left-0 w-full h-full border-l-[1.5px] border-t-[1.5px] border-transparent rounded-tl-[2.2rem]"
    style={{
      borderLeftColor: 'rgba(100, 200, 255, 0.2)',
      borderTopColor: 'rgba(100, 200, 255, 0.2)',
      filter: 'drop-shadow(0 0 3px rgba(100, 200, 255, 0.1))',
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
  />
</div>

{/* Top Border - Continuous */}
<motion.div 
  className="absolute -top-3 left-20 right-20 h-[1.5px] z-30 pointer-events-none"
  style={{
    background: 'linear-gradient(90deg, rgba(100, 200, 255, 0) 0%, rgba(100, 200, 255, 0.2) 5%, rgba(150, 120, 255, 0.2) 95%, rgba(150, 120, 255, 0) 100%)',
    filter: 'drop-shadow(0 0 2px rgba(120, 160, 255, 0.08))',
  }}
  initial={{ scaleX: 0, opacity: 0 }}
  animate={{ scaleX: 1, opacity: 1 }}
  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
/>

{/* Top Right Corner */}
<div className="absolute -top-3 -right-3 w-24 h-24 z-30 pointer-events-none">
  <motion.div 
    className="absolute top-0 right-0 w-full h-full border-r-[1.5px] border-t-[1.5px] border-transparent rounded-tr-[2.2rem]"
    style={{
      borderRightColor: 'rgba(150, 120, 255, 0.2)',
      borderTopColor: 'rgba(150, 120, 255, 0.2)',
      filter: 'drop-shadow(0 0 3px rgba(150, 120, 255, 0.1))',
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
  />
</div>

{/* Right Border - Continuous */}
<motion.div 
  className="absolute top-20 bottom-20 -right-3 w-[1.5px] z-30 pointer-events-none"
  style={{
    background: 'linear-gradient(180deg, rgba(150, 120, 255, 0) 0%, rgba(150, 120, 255, 0.2) 5%, rgba(255, 180, 120, 0.2) 95%, rgba(255, 180, 120, 0) 100%)',
    filter: 'drop-shadow(0 0 2px rgba(200, 150, 180, 0.08))',
  }}
  initial={{ scaleY: 0, opacity: 0 }}
  animate={{ scaleY: 1, opacity: 1 }}
  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
/>

{/* Bottom Right Corner */}
<div className="absolute -bottom-3 -right-3 w-24 h-24 z-30 pointer-events-none">
  <motion.div 
    className="absolute bottom-0 right-0 w-full h-full border-r-[1.5px] border-b-[1.5px] border-transparent rounded-br-[2.2rem]"
    style={{
      borderRightColor: 'rgba(255, 180, 120, 0.2)',
      borderBottomColor: 'rgba(255, 180, 120, 0.2)',
      filter: 'drop-shadow(0 0 3px rgba(255, 180, 120, 0.1))',
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
  />
</div>

{/* Bottom Border - Continuous */}
<motion.div 
  className="absolute -bottom-3 left-20 right-20 h-[1.5px] z-30 pointer-events-none"
  style={{
    background: 'linear-gradient(90deg, rgba(120, 220, 180, 0) 0%, rgba(120, 220, 180, 0.2) 5%, rgba(255, 180, 120, 0.2) 95%, rgba(255, 180, 120, 0) 100%)',
    filter: 'drop-shadow(0 0 2px rgba(180, 200, 150, 0.08))',
  }}
  initial={{ scaleX: 0, opacity: 0 }}
  animate={{ scaleX: 1, opacity: 1 }}
  transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
/>

{/* Bottom Left Corner */}
<div className="absolute -bottom-3 -left-3 w-24 h-24 z-30 pointer-events-none">
  <motion.div 
    className="absolute bottom-0 left-0 w-full h-full border-l-[1.5px] border-b-[1.5px] border-transparent rounded-bl-[2.2rem]"
    style={{
      borderLeftColor: 'rgba(120, 220, 180, 0.2)',
      borderBottomColor: 'rgba(120, 220, 180, 0.2)',
      filter: 'drop-shadow(0 0 3px rgba(120, 220, 180, 0.1))',
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
  />
</div>

{/* Left Border - Continuous */}
<motion.div 
  className="absolute top-20 bottom-20 -left-3 w-[1.5px] z-30 pointer-events-none"
  style={{
    background: 'linear-gradient(180deg, rgba(100, 200, 255, 0) 0%, rgba(100, 200, 255, 0.2) 5%, rgba(120, 220, 180, 0.2) 95%, rgba(120, 220, 180, 0) 100%)',
    filter: 'drop-shadow(0 0 2px rgba(110, 210, 220, 0.08))',
  }}
  initial={{ scaleY: 0, opacity: 0 }}
  animate={{ scaleY: 1, opacity: 1 }}
  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
/>
