import { motion } from 'motion/react'

// Fades and lifts content into view once. Reduced motion is handled by <MotionConfig reducedMotion="user">.
export default function Reveal({ children, delay = 0, y = 28, as = 'div', ...props }) {
  const Component = motion[as]
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
