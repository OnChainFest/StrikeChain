"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ProcessStepProps {
  position: "top" | "right" | "bottom" | "left"
  label: string
  info: string
  onClick: () => void
  isHighlighted?: boolean
}

export default function ProcessCircle({
  onNavigate,
}: {
  onNavigate: (sectionId: string) => void
}) {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Define the steps
  const steps: ProcessStepProps[] = [
    {
      position: "top",
      label: "Join / Create",
      info: "Jump into a competition or start your own. It's simple to set up and everything runs smoothly on-chain.",
      onClick: () => onNavigate("organizer"),
      isHighlighted: false,
    },
    {
      position: "right",
      label: "Compete",
      info: "Teams play, results come in, and everything stays on track — no confusion, just clean progress.",
      onClick: () => onNavigate("participant"),
      isHighlighted: true,
    },
    {
      position: "bottom",
      label: "Validate",
      info: "Scores get confirmed by organizers or match data, all out in the open so there's no room for doubt.",
      onClick: () => onNavigate("benefits"),
      isHighlighted: false,
    },
    {
      position: "left",
      label: "Get Rewarded",
      info: "Once it's all settled, winners get their prizes right away — fast, fair, and straight to their wallet.",
      onClick: () => onNavigate("benefits"),
      isHighlighted: false,
    },
  ]

  // Animation for moving the words around the oval
  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isHovering) {
        // Move at a speed of 10 degrees per second (clockwise)
        setRotation((prev) => (prev + deltaTime * 0.01) % 360)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering])

  // Calculate positions for each step based on the current rotation
  const getStepPosition = (basePosition: string, currentRotation: number) => {
    // Base angles for each position (clockwise)
    const baseAngles = {
      top: 0,
      right: 90,
      bottom: 180,
      left: 270,
    }

    // Get the base angle for this position
    const baseAngle = baseAngles[basePosition as keyof typeof baseAngles]

    // Calculate the new angle with rotation (clockwise)
    const newAngle = (baseAngle + currentRotation) % 360

    // Convert angle to radians
    const angleRad = (newAngle * Math.PI) / 180

    // Oval dimensions (horizontal radius is larger than vertical for the oval shape)
    const radiusX = 325 / 2 // Half of container width
    const radiusY = 157.5 / 2 // Half of container height

    // Calculate position on the oval
    const x = Math.sin(angleRad) * radiusX
    const y = -Math.cos(angleRad) * radiusY

    return {
      x,
      y,
      rotation: newAngle,
    }
  }

  // Get tooltip position based on current rotation
  const getTooltipPosition = (basePosition: string, currentRotation: number) => {
    // Calculate the new position based on rotation
    const baseAngles = {
      top: 0,
      right: 90,
      bottom: 180,
      left: 270,
    }

    const baseAngle = baseAngles[basePosition as keyof typeof baseAngles]
    const newAngle = (baseAngle + currentRotation) % 360

    // Determine tooltip position based on the new angle
    if (newAngle >= 315 || newAngle < 45) {
      return "bottom-full left-1/2 -translate-x-1/2 mb-3" // top
    } else if (newAngle >= 45 && newAngle < 135) {
      return "right-full top-1/2 -translate-y-1/2 mr-3" // right
    } else if (newAngle >= 135 && newAngle < 225) {
      return "top-full left-1/2 -translate-x-1/2 mt-3" // bottom
    } else {
      return "left-full top-1/2 -translate-y-1/2 ml-3" // left
    }
  }

  return (
    <div className="relative w-[650.54px] h-[315.24px] mx-auto">
      {/* Static oval border */}
      <div className="absolute inset-0 rounded-[150px] border-2 border-gray-600 shadow-[0_0_30px_rgba(80,140,255,0.3)]">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-[150px] bg-blue-900/5 blur-md"></div>
      </div>

      {/* Center element for visual interest */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#2c3e50]/10 to-[#4ca1af]/10 blur-xl"></div>

      {/* Animated pulse in the center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[rgba(179, 239, 245, 0.4)]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Moving elements container */}
      <div className="absolute inset-0">
        {/* Process steps */}
        {steps.map((step) => {
          const position = getStepPosition(step.position, rotation)

          return (
            <div
              key={step.position}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
                transition: isHovering ? "transform 0.5s ease-out" : "none",
              }}
              onMouseEnter={() => {
                setHoveredStep(step.position)
                setIsHovering(true)
              }}
              onMouseLeave={() => {
                setHoveredStep(null)
                setIsHovering(false)
              }}
            >
              <motion.button
                onClick={step.onClick}
                style={{
                  width: "246.46px",
                  height: "61.62px",
                  background: step.isHighlighted
                    ? "linear-gradient(90deg, #191D1E 0%, #345D61 50.48%, #191D1E 97.12%)"
                    : "linear-gradient(90deg, #191D1E 0%, #2B3536 50.48%, #191D1E 97.12%)",
                  borderRadius: "37px",
                  border: step.isHighlighted ? "3px solid #FFFFFF" : "3px solid rgba(255, 255, 255, 0.4)",
                  boxSizing: "border-box",
                  filter: "drop-shadow(0px 0px 20px #000000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 10,
                  overflow: "hidden",
                  // Counter-rotate to keep text upright
                  transform: `rotate(-${position.rotation}deg)`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 25px rgba(80, 140, 255, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center gap-2 relative z-20">
                  {step.position === "right" && (
                    <span className="h-2 w-2 rounded-full bg-[rgba(179, 239, 245, 0.8)]"></span>
                  )}
                  <span
                    className="text-white text-2xl font-medium tracking-tight"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      fontWeight: step.position === "right" ? "600" : "500",
                      fontSize: "24px",
                      lineHeight: "27px",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              </motion.button>

              {/* Tooltip */}
              {hoveredStep === step.position && (
                <motion.div
                  className={`absolute ${getTooltipPosition(step.position, rotation)} w-64 bg-gray-900/90 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg z-30`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    transform: `${getTooltipPosition(step.position, rotation).includes("translate") ? "" : "translate(0, 0)"} rotate(-${position.rotation}deg)`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-1 h-3 w-3 rounded-full flex-shrink-0 bg-[rgba(179, 239, 245, 0.8)]"></span>
                    <p className="text-sm text-gray-200">{step.info}</p>
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
