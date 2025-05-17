"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface FlowNodeProps {
  id: string
  label: string
  position: string
  hasIcon?: boolean
  info: string
}

export default function UserFlowDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Define the nodes with their information
  const nodes: FlowNodeProps[] = [
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
      hasIcon: true,
      info: "Teams play, results come in, and everything stays on track — no confusion, just clean progress.",
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
      info: "Once it's all settled, winners get their prizes right away — fast, fair, and straight to their wallet.",
    },
  ]

  // Calculate positions for a perfect circle
  const getNodePosition = (position: string) => {
    const radius = 180
    switch (position) {
      case "top":
        return { x: 0, y: -radius }
      case "right":
        return { x: radius, y: 0 }
      case "bottom":
        return { x: 0, y: radius }
      case "left":
        return { x: -radius, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  // Generate SVG path for connection lines
  const getConnectionPath = (startPosition: string, endPosition: string) => {
    const start = getNodePosition(startPosition)
    const end = getNodePosition(endPosition)

    // Calculate control points for smooth curve
    const controlPointDistance = 120

    let startControlX, startControlY, endControlX, endControlY

    if (startPosition === "top" && endPosition === "right") {
      startControlX = start.x + controlPointDistance
      startControlY = start.y
      endControlX = end.x
      endControlY = end.y - controlPointDistance
    } else if (startPosition === "right" && endPosition === "bottom") {
      startControlX = start.x
      startControlY = start.y + controlPointDistance
      endControlX = end.x + controlPointDistance
      endControlY = end.y
    } else if (startPosition === "bottom" && endPosition === "left") {
      startControlX = start.x - controlPointDistance
      startControlY = start.y
      endControlX = end.x
      endControlY = end.y + controlPointDistance
    } else {
      // left to top
      startControlX = start.x
      startControlY = start.y - controlPointDistance
      endControlX = end.x - controlPointDistance
      endControlY = end.y
    }

    return `M ${start.x} ${start.y} C ${startControlX} ${startControlY}, ${endControlX} ${endControlY}, ${end.x} ${end.y}`
  }

  // Generate the connections
  const connections = [
    { from: "top", to: "right" },
    { from: "right", to: "bottom" },
    { from: "bottom", to: "left" },
    { from: "left", to: "top" },
  ]

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

  return (
    <div className="flex items-center justify-center w-full h-[500px] bg-black">
      <div className="relative w-[500px] h-[500px]">
        {/* Circle border */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-600 shadow-[0_0_30px_rgba(80,140,255,0.3)]"></div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="-250 -250 500 500">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c3e50" />
              <stop offset="100%" stopColor="#4ca1af" />
            </linearGradient>
          </defs>

          {connections.map((conn, index) => (
            <path
              key={index}
              d={getConnectionPath(conn.from, conn.to)}
              fill="none"
              stroke="#2c3e50"
              strokeWidth="1"
              className="opacity-50"
            />
          ))}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0">
          {nodes.map((node) => {
            const position = getNodePosition(node.position)
            return (
              <motion.div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  style={{
                    width: "246.46px",
                    height: "61.62px",
                    background: "linear-gradient(90deg, #191D1E 0%, #345D61 50.48%, #191D1E 97.12%)",
                    borderRadius: "37px",
                    border: "3px solid #FFFFFF",
                    boxSizing: "border-box",
                    filter: "drop-shadow(0px 0px 20px #000000)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {node.hasIcon && <span className="mr-1 text-white">+</span>}
                  <span className="text-white text-2xl font-semibold tracking-tight">{node.label}</span>

                  {/* Tooltip */}
                  {hoveredNode === node.id && (
                    <motion.div
                      className={`absolute ${getTooltipPosition(node.position)} w-64 bg-gray-900/90 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg z-30`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm text-gray-200">{node.info}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Center element */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#2c3e50]/10 to-[#4ca1af]/10 blur-xl"></div>
      </div>
    </div>
  )
}
