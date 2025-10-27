import { X } from "lucide-react";
import backgroundMusic from "../assets/audios/background-music.mp3";
import { useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastPlayingState, setLastPlayingState] = useState(false);
  const [tooltipVisibility, setToolTipVisibility] = useState(true);
  const audioRef = useRef(null);

  // load initial audio
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.volume = 0.5;
    audio.loop = true;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // handle audio state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        setIsPlaying(false);
        console.log(error.message);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // handle document visibility change to use for control audio state
  useEffect(() => {
    const handleVisibiliyChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (audio.paused) {
          setLastPlayingState(false);
        } else {
          setLastPlayingState(true);
          setIsPlaying(false);
        }
      } else {
        if (lastPlayingState) {
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibiliyChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibiliyChange);
    };
  }, [isPlaying, lastPlayingState]);

  // handle audio state with keyboard
  useEffect(() => {
    const handleOnKeyPress = (e) => {
      const audio = audioRef.current;
      if (!audio) return;

      // check if user not in focusable elements & input fields
      const inputsMap = ["textarea", "input", "button", "submit"];

      if (e.key === " ") {
        if (inputsMap.includes(e.srcElement.type)) return;

        e.preventDefault();
        setToolTipVisibility(false);
        setIsPlaying(!isPlaying);
      }
    };

    document.addEventListener("keypress", handleOnKeyPress);

    return () => {
      document.removeEventListener("keypress", handleOnKeyPress);
    };
  }, [isPlaying]);

  return (
    <div className="flex-center fixed right-5 bottom-5 z-40 flex-col">
      <p
        className={`border-base-content/30 bg-base-300 text-base-content absolute right-0 bottom-15 mx-auto translate-y-2 rounded-lg border p-2 text-center text-nowrap opacity-0 duration-200 ${tooltipVisibility ? "animate-fade-up pointer-events-auto" : "animate-fade-down pointer-events-none"}`}
      >
        <span className="flex-center gap-1">
          <span>tap to play music</span>
          <i
            className="cursor-pointer"
            onClick={() => setToolTipVisibility(false)}
          >
            <X />
          </i>
        </span>
        <span className="border-base-content absolute right-2.5 -bottom-[11px] z-[-1] h-0 w-0 border-10 border-b-0 border-solid border-r-transparent border-l-transparent"></span>
      </p>
      <div>
        <ScaleLoader
          className={`*:from-primary *:to-base-content cursor-pointer *:bg-linear-to-t ${isPlaying ? "" : "playerAnimationState"}`}
          onClick={() => {
            (setIsPlaying(!isPlaying), setToolTipVisibility(false));
          }}
          color="var(--color-primary)"
          size={150}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
