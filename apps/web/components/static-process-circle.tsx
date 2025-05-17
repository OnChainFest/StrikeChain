"use client"

export default function StaticProcessCircle({
  onNavigate,
}: {
  onNavigate: (sectionId: string) => void
}) {
  return (
    <div
      className="relative"
      style={{
        width: "650.54px",
        height: "315.24px",
        left: "calc(50% - 650.54px/2 + 0.27px)",
        top: "calc(50% - 315.24px/2 + 21.62px)",
        margin: "0 auto",
      }}
    >
      {/* Main oval border */}
      <div
        className="absolute rounded-[150px] border-2 border-gray-600 shadow-[0_0_30px_rgba(80,140,255,0.3)]"
        style={{
          width: "650.54px",
          height: "315.24px",
          left: "0",
          top: "0",
          borderRadius: "150px",
        }}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-[150px] bg-blue-900/5 blur-md"></div>
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
        <button
          onClick={() => onNavigate("organizer")}
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
              fontSize: "24px",
              lineHeight: "27px",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              width: "138px",
              height: "23px",
              textAlign: "center",
            }}
          >
            Join / Create
          </span>
        </button>
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
        <button
          onClick={() => onNavigate("participant")}
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
            zIndex: 10,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "rgba(179, 239, 245, 0.8)",
                position: "absolute",
                left: "70.23%",
                right: "28.35%",
                top: "50.43%",
                bottom: "49.13%",
              }}
            ></span>
            <span
              style={{
                fontFamily: "Geist, sans-serif",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "27px",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                width: "106px",
                height: "28px",
                textAlign: "center",
              }}
            >
              Compete
            </span>
          </div>
        </button>
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
        <button
          onClick={() => onNavigate("benefits")}
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
              fontSize: "24px",
              lineHeight: "27px",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              width: "85px",
              height: "25px",
              textAlign: "center",
            }}
          >
            Validate
          </span>
        </button>
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
        <button
          onClick={() => onNavigate("benefits")}
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
              fontSize: "24px",
              lineHeight: "27px",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              width: "150px",
              height: "24px",
              textAlign: "center",
            }}
          >
            Get Rewarded
          </span>
        </button>
      </div>

      {/* Center element for visual interest */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#2c3e50]/10 to-[#4ca1af]/10 blur-xl"></div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 650.54 315.24">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3e50" />
            <stop offset="100%" stopColor="#4ca1af" />
          </linearGradient>
        </defs>

        {/* Top to Right */}
        <path
          d="M 325.27 0 Q 450 0 650.54 157.62"
          fill="none"
          stroke="#2c3e50"
          strokeWidth="1"
          className="opacity-50"
        />

        {/* Right to Bottom */}
        <path
          d="M 650.54 157.62 Q 450 315.24 325.27 315.24"
          fill="none"
          stroke="#2c3e50"
          strokeWidth="1"
          className="opacity-50"
        />

        {/* Bottom to Left */}
        <path
          d="M 325.27 315.24 Q 200 315.24 0 157.62"
          fill="none"
          stroke="#2c3e50"
          strokeWidth="1"
          className="opacity-50"
        />

        {/* Left to Top */}
        <path d="M 0 157.62 Q 200 0 325.27 0" fill="none" stroke="#2c3e50" strokeWidth="1" className="opacity-50" />
      </svg>
    </div>
  )
}
