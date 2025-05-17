"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function UserFlowDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Define the nodes
  const nodes = [
    { id: "join", label: "Join / Create", position: "top" },
    { id: "compete", label: "Compete", position: "right", hasIcon: true },
    { id: "validate", label: "Validate", position: "bottom" },
    { id: "reward", label: "Get Rewarded", position: "left" },
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

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <div className="relative w-[500px] h-[500px]">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="-250 -250 500 500">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c3e50" />
              <stop offset="100%" stopColor="#4ca1af" />
            </linearGradient>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="url(#lineGradient)" />
            </marker>
          </defs>

          {connections.map((conn, index) => (
            <path
              key={index}
              d={getConnectionPath(conn.from, conn.to)}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="opacity-70"
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
                  className={`
                    flex items-center justify-center px-6 py-3 
                    rounded-full bg-gradient-to-br from-[#262626] to-[#1a1a1a]
                    text-white font-sans text-lg whitespace-nowrap
                    border border-gray-700
                    ${hoveredNode === node.id ? "shadow-[0_0_15px_rgba(76,161,175,0.3)]" : "shadow-[0_0_5px_rgba(76,161,175,0.1)]"}
                    transition-shadow duration-300
                  `}
                >
                  {node.hasIcon && <span className="mr-2 text-[#4ca1af]">+</span>}
                  {node.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Center element */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-[#2c3e50]/20 to-[#4ca1af]/20 blur-xl"></div>
      </div>
    </div>
  )
}
