"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function FlowDiagram({
  onNavigate,
}: {
  onNavigate: (sectionId: string) => void
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Define the nodes with their information
  const nodes = [
    {
      id: "join",
      label: "Join / Create",
      position: "top",
      info: "Jump into a competition or start your own. It's simple to set up and everything runs smoothly on-chain.",
    },
    {
      id: "compete",
      label: "Compete",
      position: "right",
      info: "Teams play, results come in, and everything stays on track, no confusion, just clean progress.",
    },
    {
      id: "validate",
      label: "Validate",
      position: "bottom",
      info: "Scores get confirmed by organizers or match data, all out in the open so there's no room for doubt.",
    },
    {
      id: "reward",
      label: "Get Rewarded",
      position: "left",
      info: "Once it's all settled, winners get their prizes right away: fast, fair, and straight to their wallet.",
    },
  ]

  // Track mouse position for the halo effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Get tooltip position based on node position
  const getTooltipPosition = (position: string) => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-3"
      case "right":
        return "right-full top-1/2 -translate-y-1/2 mr-3"
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-3"
      case "left":
        return "left-full top-1/2 -translate-y-1/2 ml-3"
      default:
        return ""
    }
  }

  // Calculate the distance from mouse to a point on the oval
  const getDistanceToOval = (mouseX: number, mouseY: number, ovalX: number, ovalY: number) => {
    const dx = mouseX - ovalX
    const dy = mouseY - ovalY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Calculate the glow intensity based on mouse position
  const getGlowIntensity = (x: number, y: number) => {
    // Center of the oval
    const centerX = 650.54 / 2
    const centerY = 315.24 / 2

    // Calculate distance from mouse to center
    const distance = getDistanceToOval(x, y, centerX, centerY)

    // Calculate intensity based on distance (closer = more intense)
    const maxDistance = Math.max(centerX, centerY)
    const intensity = Math.max(0, 1 - distance / maxDistance)

    return intensity * 0.5 // Scale down the effect
  }

  return (
    <div className="flex justify-center items-center w-full py-16">
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          width: "650.54px",
          height: "315.24px",
        }}
      >
        {/* Main oval border with interactive glow */}
        <div
          className="absolute rounded-[150px] border border-gray-600/40"
          style={{
            width: "650.54px",
            height: "315.24px",
            left: "0",
            top: "0",
            borderRadius: "150px",
            boxShadow: `0 0 ${20 + getGlowIntensity(mousePosition.x, mousePosition.y) * 30}px rgba(52, 93, 97, ${0.1 + getGlowIntensity(mousePosition.x, mousePosition.y) * 0.3})`,
            transition: "box-shadow 0.1s ease-out",
          }}
        >
          {/* Dynamic glow effect that follows mouse */}
          <div
            className="absolute rounded-[150px] bg-blue-900/5 blur-md"
            style={{
              inset: 0,
              background: `radial-gradient(
                circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(52, 93, 97, ${0.1 + getGlowIntensity(mousePosition.x, mousePosition.y) * 0.2}) 0%,
                transparent 70%
              )`,
              opacity: 0.8,
              transition: "background 0.1s ease-out",
            }}
          />
        </div>

        {/* Join / Create - Top */}
        <div
          style={{
            position: "absolute",
            width: "246.46px",
            height: "61.62px",
            left: "calc(50% - 246.46px/2 + 1.93px)",
            top: "0",
            transform: "translateY(-50%)",
          }}
        >
          <motion.button
            onMouseEnter={() => setHoveredNode("join")}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 15px rgba(179, 239, 245, 0.3)",
            }}
            style={{
              width: "246.46px",
              height: "61.62px",
              background: "linear-gradient(90deg, #191D1E 0%, #2B3536 50.48%, #191D1E 97.12%)",
              borderRadius: "37px",
              border: "3px solid rgba(255, 255, 255, 0.4)",
              boxSizing: "border-box",
              filter: "drop-shadow(0px 0px 20px #000000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Geist, sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "22px",
                lineHeight: "24px",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                textAlign: "center",
                width: "100%",
                padding: "0 8px",
              }}
            >
              Join/Create
            </span>

            {/* Tooltip */}
            {hoveredNode === "join" && (
              <motion.div
                className={`absolute ${getTooltipPosition("top")} bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg z-30`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "240px",
                  padding: "10px 12px",
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-3 w-3 rounded-full flex-shrink-0 bg-[rgba(179, 239, 245, 0.8)]"></span>
                  <p className="text-sm text-gray-200 pr-1">{nodes[0].info}</p>
                </div>
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Compete - Right */}
        <div
          style={{
            position: "absolute",
            width: "246.46px",
            height: "61.62px",
            left: "calc(50% - 246.46px/2 + 325.77px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <motion.button
            onMouseEnter={() => setHoveredNode("compete")}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 15px rgba(179, 239, 245, 0.3)",
            }}
            style={{
              width: "246.46px",
              height: "61.62px",
              background: "linear-gradient(90deg, #191D1E 0%, #2B3536 50.48%, #191D1E 97.12%)",
              borderRadius: "37px",
              border: "3px solid rgba(255, 255, 255, 0.4)",
              boxSizing: "border-box",
              filter: "drop-shadow(0px 0px 20px #000000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Geist, sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "22px",
                lineHeight: "24px",
                textAlign: "center",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                width: "100%",
                padding: "0 8px",
              }}
            >
              Compete
            </span>

            {/* Tooltip */}
            {hoveredNode === "compete" && (
              <motion.div
                className={`absolute ${getTooltipPosition("right")} bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg z-30`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "240px",
                  padding: "10px 12px",
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-3 w-3 rounded-full flex-shrink-0 bg-[rgba(179, 239, 245, 0.8)]"></span>
                  <p className="text-sm text-gray-200 pr-1">{nodes[1].info}</p>
                </div>
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Validate - Bottom */}
        <div
          style={{
            position: "absolute",
            width: "246.46px",
            height: "61.62px",
            left: "calc(50% - 246.46px/2 + 4.8px)",
            bottom: "0",
            transform: "translateY(50%)",
          }}
        >
          <motion.button
            onMouseEnter={() => setHoveredNode("validate")}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 15px rgba(179, 239, 245, 0.3)",
            }}
            style={{
              width: "246.46px",
              height: "61.62px",
              background: "linear-gradient(90deg, #191D1E 0%, #2B3536 50.48%, #191D1E 97.12%)",
              borderRadius: "37px",
              border: "3px solid rgba(255, 255, 255, 0.4)",
              boxSizing: "border-box",
              filter: "drop-shadow(0px 0px 20px #000000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Geist, sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "22px",
                lineHeight: "24px",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                textAlign: "center",
                width: "100%",
                padding: "0 8px",
              }}
            >
              Validate
            </span>

            {/* Tooltip */}
            {hoveredNode === "validate" && (
              <motion.div
                className={`absolute ${getTooltipPosition("bottom")} bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg z-30`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "240px",
                  padding: "10px 12px",
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-3 w-3 rounded-full flex-shrink-0 bg-[rgba(179, 239, 245, 0.8)]"></span>
                  <p className="text-sm text-gray-200 pr-1">{nodes[2].info}</p>
                </div>
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Get Rewarded - Left */}
        <div
          style={{
            position: "absolute",
            width: "246.46px",
            height: "61.62px",
            left: "calc(50% - 246.46px/2 - 324.77px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <motion.button
            onMouseEnter={() => setHoveredNode("reward")}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 15px rgba(179, 239, 245, 0.3)",
            }}
            style={{
              width: "246.46px",
              height: "61.62px",
              background: "linear-gradient(90deg, #191D1E 0%, #2B3536 50.48%, #191D1E 97.12%)",
              borderRadius: "37px",
              border: "3px solid rgba(255, 255, 255, 0.4)",
              boxSizing: "border-box",
              filter: "drop-shadow(0px 0px 20px #000000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Geist, sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "22px",
                lineHeight: "24px",
                textAlign: "center",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                width: "100%",
                padding: "0 8px",
              }}
            >
              Get Rewarded
            </span>

            {/* Tooltip */}
            {hoveredNode === "reward" && (
              <motion.div
                className={`absolute ${getTooltipPosition("left")} bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg z-30`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "240px",
                  padding: "10px 12px",
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-3 w-3 rounded-full flex-shrink-0 bg-[rgba(179, 239, 245, 0.8)]"></span>
                  <p className="text-sm text-gray-200 pr-1">{nodes[3].info}</p>
                </div>
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Center element with subtle glow */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#2c3e50]/10 to-[#4ca1af]/10 blur-xl"></div>

        {/* Subtle animated glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          animate={{
            opacity: [0.02, 0.04, 0.02],
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(
              ellipse at center,
              rgba(52, 93, 97, 0.1) 0%,
              transparent 70%
            )`,
            filter: "blur(20px)",
            borderRadius: "150px",
          }}
        />
      </div>
    </div>
  )
}
