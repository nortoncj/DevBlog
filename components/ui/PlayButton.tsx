"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Play {
  videoUrl: string;
  size?: number;
}

const PlayButton = ({ videoUrl, size = 80 }: Play) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <style jsx>{`
        .play-btn {
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, #8b1538 0%, #b8336a 100%);
          border-radius: 100%;
          border: #fefcfc solid 2px;
          position: relative;
          display: inline-block;
          cursor: pointer;
          animation: shadowPulse 1.5s infinite ease-in-out;
          transition: transform 0.2s ease;
        }

        .play-btn:hover {
          transform: scale(1.05);
        }

        .play-btn:active {
          transform: scale(0.95);
        }

        .play-btn::before {
          position: absolute;
          content: "";
          border-top: transparent ${size * 0.1875}px solid;
          border-bottom: transparent ${size * 0.1875}px solid;
          border-left: #fefcfc ${size * 0.3125}px solid;
          top: 50%;
          left: 50%;
          transform: translate(-40%, -50%);
        }

        .play-btn::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: #e8b4b8 solid 2px;
          border-radius: 100%;
          animation: ringPulse 1.5s infinite ease-in-out;
        }

        @keyframes ringPulse {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }

          10% {
            opacity: 1;
          }

          80%,
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes shadowPulse {
          0% {
            box-shadow:
              0 0 8px 6px transparent,
              0 0 0 0 transparent,
              0 0 0 0 transparent;
          }

          10% {
            box-shadow:
              0 0 8px 6px rgba(139, 21, 56, 0.6),
              0 0 12px 10px transparent,
              0 0 12px 5px rgba(184, 51, 106, 0.4);
          }

          80%,
          100% {
            box-shadow:
              0 0 8px 6px transparent,
              0 0 0 40px transparent,
              0 0 0 40px transparent;
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(44, 44, 44, 0.95);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          background: linear-gradient(
            135deg,
            rgba(139, 21, 56, 0.1) 0%,
            rgba(232, 180, 184, 0.1) 100%
          );
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(139, 21, 56, 0.3);
          animation: slideUp 0.4s ease-out;
          border: 2px solid rgba(232, 180, 184, 0.2);
        }

        .modal-video {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #8b1538 0%, #b8336a 100%);
          border: 2px solid #fefcfc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 20px rgba(139, 21, 56, 0.3);
        }

        .close-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 30px rgba(139, 21, 56, 0.5);
        }

        .close-button:active {
          transform: scale(0.95) rotate(90deg);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Play Button */}
      <button
        className="play-btn"
        onClick={handleOpenModal}
        aria-label="Play video"
      />

      {/* Video Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={handleCloseModal}
              aria-label="Close video"
            >
              <X className="text-white" size={24} strokeWidth={2.5} />
            </button>

            <iframe
              className="modal-video"
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* <video className="modal-video" controls autoPlay src={videoUrl}>
              Your browser does not support the video tag.
            </video> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayButton;
