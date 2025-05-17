"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import WalletConnectModal from "@/components/wallet-connect-modal"
import { useWallet } from "@/contexts/wallet-context"
import MobileAppPopup from "@/components/mobile-app-popup"
import AccountAccessModal from "@/components/account-access-modal"
import FlowDiagram from "@/components/flow-diagram"
import OrganizerModal from "@/components/organizer-modal"
import ParticipantModal from "@/components/participant-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false)
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false)
  const { wallet } = useWallet()

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }

    // If the section is organizer or participant, open the respective modal
    if (sectionId === "organizer") {
      setIsOrganizerModalOpen(true)
    } else if (sectionId === "participant") {
      setIsParticipantModalOpen(true)
    }
  }

  const [isQrModalOpen, setIsQrModalOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section with Integrated Header */}
      <section className="relative">
        {/* Hero Image */}
        <div className="relative w-full h-[853px]">
          <Image
            src="/golf-sunset-hero.png"
            alt="Golf course at sunset with a beautiful blue and pink sky"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>

        {/* Hero content */}
        <div className="absolute top-0 left-0 right-0 h-full container mx-auto px-4">
          <div className="relative h-full">
            {/* Heading */}
            <h1
              className="absolute text-white font-extralight text-[85px] leading-[80px] tracking-[-0.04em]"
              style={{
                width: "503px",
                height: "232px",
                left: "calc(50% - 503px/2 - 332.5px)",
                top: "547px",
                fontFamily: "Geist, sans-serif",
                fontWeight: "250",
              }}
            >
              Where
              <br />
              Tournaments
              <br />
              Meet Web3
            </h1>

            {/* Description */}
            <p
              className="absolute text-[rgba(255,255,255,0.75)] font-normal text-[20px] leading-[27px] tracking-[-0.02em]"
              style={{
                width: "453px",
                height: "102px",
                left: "calc(50% - 453px/2 + 374.5px)",
                top: "677px",
                fontFamily: "Geist, sans-serif",
              }}
            >
              StrikeChain connects organizers and competitors through secure smart contracts. Automate rewards, simplify
              sign-ups, and elevate your tournaments on-chain and unstoppable.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="relative py-20 bg-black">
        <div className="mx-auto relative" style={{ height: "650px" }}>
          {/* Methodology StrikeChain heading */}
          <h2
            className="absolute text-white font-normal text-[65px] leading-[65px] tracking-[-0.05em]"
            style={{
              width: "398px",
              height: "122px",
              left: "calc(50% - 398px/2 - 323px)",
              top: "0px",
              fontFamily: "Geist, sans-serif",
            }}
          >
            Methodology
            <br />
            StrikeChain
          </h2>

          {/* How does it work? subheading */}
          <h4
            className="absolute text-white font-medium text-[22px] leading-[27px] tracking-[-0.02em]"
            style={{
              width: "230px",
              height: "28px",
              left: "calc(50% - 230px/2 + 69px)",
              top: "9px",
              fontFamily: "Geist, sans-serif",
            }}
          >
            How does it work?
          </h4>

          {/* Description */}
          <p
            className="absolute text-[rgba(255,255,255,0.75)] font-normal text-[20px] leading-[27px] tracking-[-0.02em]"
            style={{
              width: "486px",
              height: "84px",
              left: "calc(50% - 486px/2 + 197px)",
              top: "47px",
              fontFamily: "Geist, sans-serif",
            }}
          >
            StrikeChain connects event organizers and competitors through smart contracts that handle every step of a
            tournament securely and transparently.
          </p>

          {/* Main rectangle background */}
          <div
            className="absolute rounded-[45px] bg-[#101617]"
            style={{
              width: "1081px",
              height: "423px",
              left: "calc(50% - 1081px/2 + 0.5px)",
              top: "194px",
            }}
          >
            {/* Process description text */}
            <div
              className="absolute text-white font-normal text-[20px] leading-[27px] tracking-[-0.02em]"
              style={{
                width: "362px",
                height: "297px",
                left: "calc(50% - 362px/2 - 304px)",
                top: "64px",
                fontFamily: "Geist, sans-serif",
              }}
            >
              <p className="mb-6">Organizers create an event and define the rules, fees, and prize structure.</p>

              <p className="mb-6">
                Participants sign up by sending funds to a smart contract, which holds them in escrow until the event
                concludes.
              </p>

              <p>
                Once results are verified, the contract automatically sends rewards to the winners. No intermediaries,
                no delays, no disputes—just clean, on-chain execution.
              </p>
            </div>
          </div>

          {/* Rectangle background for image */}
          <div
            className="absolute rounded-[45px] bg-[#5C5C5C]"
            style={{
              width: "602px",
              height: "423px",
              left: "579px",
              top: "194px",
            }}
          ></div>

          {/* Tennis stadium image */}
          <div
            className="absolute rounded-[45px] overflow-hidden"
            style={{
              width: "645px",
              height: "430px",
              left: "561px",
              top: "190px",
            }}
          >
            <Image
              src="/tennis-racket-stadium.png"
              alt="Tennis racket with view of stadium court"
              fill
              className="object-cover"
              sizes="645px"
            />
          </div>

          {/* Tennis ball overlay */}
          <div
            className="absolute"
            style={{
              width: "81px",
              height: "81px",
              left: "1025px",
              top: "161px",
              filter: "drop-shadow(0px 0px 20px rgba(34, 51, 59, 0.3))",
            }}
          >
            <Image src="/tennis-ball.png" alt="Tennis ball" width={81} height={81} className="w-full h-full" />
          </div>

          {/* Start now button - positioned at the right side of the methodology section */}
          <div
            className="absolute"
            style={{
              width: "180px",
              height: "50px",
              left: "942px",
              top: "537px",
              zIndex: "25",
              background: "linear-gradient(90deg, #191D1E 0%, #345D61 50.48%, #191D1E 97.12%)",
              borderRadius: "37px",
              border: "3px solid #FFFFFF",
              boxSizing: "border-box",
              filter: "drop-shadow(0px 0px 20px #000000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              overflow: "hidden",
            }}
          >
            {/* Background glow effect for the button */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(circle at center, rgba(255, 255, 0, 0.3) 0%, transparent 70%)",
              }}
            ></div>

            <button
              onClick={() => scrollToSection("process")}
              className="w-full h-full flex items-center justify-center relative"
            >
              <span
                className="text-white font-medium text-[18px] leading-[22px] tracking-[-0.04em]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Start now
              </span>

              {/* Logo next to text */}
              <div
                className="ml-2 flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                  filter: "drop-shadow(0px 0px 12px rgba(255, 255, 0, 0.8))",
                }}
              >
                <Image
                  src="/logo-transparent.png"
                  alt="Strikechain Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain animate-pulse"
                />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Flow Diagram Section - No title */}
      <section id="process" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <FlowDiagram onNavigate={scrollToSection} />
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Organizer Card */}
            <div id="organizer" className="w-[486px] h-[472px] bg-[#101617] rounded-[35px] overflow-hidden relative">
              <div className="h-[200px] relative">
                <Image
                  src="/tennis-stadium.png"
                  alt="Tennis stadium with grass court and spectators"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 486px"
                  priority
                />
              </div>
              <div className="p-8 pb-16">
                <h3 className="text-2xl font-bold mb-4">Organizer</h3>
                <p className="text-gray-300">
                  Create tournaments, set up rules, collect funds, and distribute prizes, all on-chain.
                </p>

                {/* Action button in bottom right corner */}
                <button
                  onClick={() => setIsOrganizerModalOpen(true)}
                  className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #191D1E 0%, #345D61 50.48%, #191D1E 97.12%)",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255, 255, 0, 0.3) 0%, transparent 70%)",
                    }}
                  ></div>
                  <Image
                    src="/logo-transparent.png"
                    alt="Strikechain Logo"
                    width={30}
                    height={30}
                    className="object-contain animate-pulse"
                  />
                </button>
              </div>
            </div>

            {/* Participant Card - aligned with the Organizer card */}
            <div id="participant" className="w-[486px] h-[472px] bg-[#101617] rounded-[35px] overflow-hidden relative">
              <div className="h-[200px] relative">
                <Image
                  src="/bowling-alley.png"
                  alt="Person bowling in a modern bowling alley"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 486px"
                  priority
                />
              </div>
              <div className="p-8 pb-16">
                <h3 className="text-2xl font-bold mb-4">Participant</h3>
                <p className="text-gray-300">
                  Join verified tournaments with ease and get paid automatically when you win.
                </p>

                {/* Action button in bottom right corner */}
                <button
                  onClick={() => setIsParticipantModalOpen(true)}
                  className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #191D1E 0%, #345D61 50.48%, #191D1E 97.12%)",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255, 255, 0, 0.3) 0%, transparent 70%)",
                    }}
                  ></div>
                  <Image
                    src="/logo-transparent.png"
                    alt="Strikechain Logo"
                    width={30}
                    height={30}
                    className="object-contain animate-pulse"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Static Version */}
      <section id="benefits" className="relative py-24 bg-black overflow-visible">
        {/* Center glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-[#0a5d6b] opacity-15 blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Title */}
          <h2 className="text-white text-[48px] font-extralight text-center mb-20 tracking-tight">
            Unlimited benefits
          </h2>

          {/* Static Benefits Pills */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Row 1 */}
            <div className="flex justify-center gap-6">
              <div className="pill-container opacity-50">
                <div className="benefit-pill">
                  <span>Secure</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Decentralized</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Blockchain</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Transparent</span>
                </div>
              </div>
              <div className="pill-container opacity-50">
                <div className="benefit-pill">
                  <span>Secure</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-center gap-6">
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Easy to Use</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Fast Payments</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Global Access</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Trustless System</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex justify-center gap-6">
              <div className="pill-container opacity-50">
                <div className="benefit-pill">
                  <span>Innovative</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Scalable</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Seamless UX</span>
                </div>
              </div>
              <div className="pill-container">
                <div className="benefit-pill">
                  <span>Efficient</span>
                </div>
              </div>
              <div className="pill-container opacity-50">
                <div className="benefit-pill">
                  <span>Reliable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional subtle glow spots */}
        <div className="absolute left-1/4 top-1/3 w-[300px] h-[200px] bg-[#0a5d6b] opacity-10 blur-[150px] -z-0"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[300px] h-[200px] bg-[#0a5d6b] opacity-10 blur-[150px] -z-0"></div>
      </section>

      {/* Footer - Reorganized with navigation above the line */}
      <footer className="relative bg-black py-8">
        {/* Navigation above the line */}
        <div className="container mx-auto px-4 mb-6">
          <nav className="flex gap-8">
            <Link href="/" className="text-white text-base font-light hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white text-base font-light hover:text-gray-300">
              About
            </Link>
            <Link href="/benefits" className="text-white text-base font-light hover:text-gray-300">
              Benefits
            </Link>
          </nav>
        </div>

        {/* Top border line */}
        <div className="border-t border-[#B3EFF5]/30"></div>

        {/* Content below the line */}
        <div className="container mx-auto px-4 pt-6">
          <div className="flex flex-wrap justify-between items-center">
            {/* Left section */}
            <div className="flex items-center gap-8">
              <p className="text-[#B3EFF5] text-base font-light">© 2025 Strikechain</p>
              <Link href="/terms" className="text-[#B3EFF5] text-base font-light hover:opacity-80">
                Terms & Conditions
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-8">
              {/* Social icons with updated SVGs */}
              <div className="flex gap-6">
                {/* X (Twitter) Icon */}
                <Link href="https://twitter.com" className="text-white hover:text-[#B3EFF5]" aria-label="X (Twitter)">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.8199 10.201L21.9999 0.800H20.0999L13.0199 8.901L7.3499 0.800H0.599902L9.1699 13.001L0.599902 22.801H2.4999L9.9699 14.201L15.9999 22.801H22.7499L13.8199 10.201ZM10.9799 13.101L10.0499 11.801L3.1999 2.201H6.2999L11.8999 10.101L12.8299 11.401L20.0999 21.401H16.9999L10.9799 13.101Z" />
                  </svg>
                </Link>

                {/* Telegram Icon */}
                <Link href="https://telegram.org" className="text-white hover:text-[#B3EFF5]" aria-label="Telegram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.2647 2.2647C21.8732 1.8732 21.3296 1.6689 20.7612 1.6982C20.1928 1.7275 19.6716 1.9878 19.3212 2.4147L2.4147 19.3212C1.9878 19.6716 1.7275 20.1928 1.6982 20.7612C1.6689 21.3296 1.8732 21.8732 2.2647 22.2647C2.6562 22.6562 3.1998 22.8605 3.7682 22.8312C4.3366 22.8019 4.8578 22.5416 5.2082 22.1147L22.1147 5.2082C22.5416 4.8578 22.8019 4.3366 22.8312 3.7682C22.8605 3.1998 22.6562 2.6562 22.2647 2.2647Z"
                      fill="currentColor"
                    />
                    <path
                      d="M22.5 2L11 13.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* Discord Icon */}
                <Link href="https://discord.com" className="text-white hover:text-[#B3EFF5]" aria-label="Discord">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.9519 4.8079C18.5019 4.1399 16.9599 3.6479 15.3599 3.3599C15.3359 3.3559 15.3119 3.3679 15.2999 3.3919C15.1159 3.7359 14.9159 4.1759 14.7719 4.5279C13.0639 4.2599 11.3639 4.2599 9.6959 4.5279C9.5519 4.1679 9.3439 3.7359 9.1599 3.3919C9.1479 3.3679 9.1239 3.3559 9.0999 3.3599C7.4999 3.6479 5.9579 4.1399 4.5079 4.8079C4.4979 4.8119 4.4899 4.8199 4.4839 4.8299C1.5839 9.2879 0.7799 13.6319 1.1799 17.9199C1.1819 17.9399 1.1919 17.9599 1.2059 17.9719C3.0959 19.3639 4.9259 20.2079 6.7199 20.7599C6.7439 20.7679 6.7699 20.7599 6.7839 20.7399C7.2239 20.1479 7.6159 19.5239 7.9519 18.8679C7.9679 18.8359 7.9519 18.7999 7.9199 18.7879C7.2959 18.5519 6.6999 18.2679 6.1239 17.9439C6.0879 17.9239 6.0839 17.8719 6.1159 17.8479C6.2279 17.7639 6.3399 17.6759 6.4479 17.5879C6.4639 17.5739 6.4879 17.5699 6.5079 17.5799C10.1919 19.2719 14.1839 19.2719 17.8239 17.5799C17.8439 17.5699 17.8679 17.5739 17.8839 17.5879C17.9919 17.6759 18.1039 17.7639 18.2159 17.8479C18.2479 17.8719 18.2439 17.9239 18.2079 17.9439C17.6319 18.2759 17.0359 18.5519 16.4119 18.7859C16.3799 18.7979 16.3639 18.8359 16.3799 18.8679C16.7239 19.5239 17.1159 20.1459 17.5479 20.7379C17.5619 20.7599 17.5879 20.7679 17.6119 20.7599C19.4139 20.2079 21.2439 19.3639 23.1339 17.9719C23.1479 17.9599 23.1579 17.9399 23.1599 17.9199C23.6359 12.9399 22.3279 8.6319 19.5559 4.8299C19.5499 4.8199 19.5419 4.8119 19.9519 4.8079ZM8.4799 15.2639C7.3639 15.2639 6.4479 14.2439 6.4479 12.9999C6.4479 11.7559 7.3439 10.7359 8.4799 10.7359C9.6239 10.7359 10.5199 11.7639 10.5119 12.9999C10.5119 14.2439 9.6159 15.2639 8.4799 15.2639ZM15.5359 15.2639C14.4199 15.2639 13.5039 14.2439 13.5039 12.9999C13.5039 11.7559 14.3999 10.7359 15.5359 10.7359C16.6799 10.7359 17.5759 11.7639 17.5679 12.9999C17.5679 14.2439 16.6799 15.2639 15.5359 15.2639Z" />
                  </svg>
                </Link>
              </div>

              {/* QR code and mobile text */}
              <div className="flex items-center gap-4">
                <div
                  className="w-[83px] h-[83px] rounded-[11px] bg-white p-1 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setIsQrModalOpen(true)}
                >
                  <Image
                    src="/qr-code.png"
                    alt="QR Code"
                    width={75}
                    height={75}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p
                  className="text-[#B3EFF5] text-lg font-light leading-[18px] tracking-tight text-right cursor-pointer"
                  onClick={() => setIsQrModalOpen(true)}
                >
                  Try mobile
                  <br />
                  version
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Connect Modal */}
      <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Account Access Modal */}
      <AccountAccessModal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} />

      {/* Mobile App Popup */}
      <MobileAppPopup isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />

      {/* Organizer Modal */}
      <OrganizerModal isOpen={isOrganizerModalOpen} onClose={() => setIsOrganizerModalOpen(false)} />

      {/* Participant Modal */}
      <ParticipantModal isOpen={isParticipantModalOpen} onClose={() => setIsParticipantModalOpen(false)} />
    </div>
  )
}
