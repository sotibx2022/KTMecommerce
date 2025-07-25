import React, { Children, ReactNode } from 'react'
import TextReveal from './TextReveal'
interface IStaggerWrapper {
  children: ReactNode
  staggerDelay: number
  baseDelay?: number
}
const StaggerWrapper: React.FC<IStaggerWrapper> = ({
  children,
  staggerDelay,
  baseDelay = 0
}) => {
  // Log all children at once
  return (
    <>
      {Children.map(children, (child, index) => {
        if (!child) return null
        return (
          <TextReveal key={index} delay={baseDelay + index * staggerDelay}>
            {child}
          </TextReveal>
        )
      })}
    </>
  )
}
export default StaggerWrapper