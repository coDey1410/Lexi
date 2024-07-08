"use client";
import "regenerator-runtime/runtime";
import React, { useState, ChangeEvent } from "react";
//import Footer from "@/components/Footer";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import TextArea from "@/components/Inputs/TextArea";
import FileUpload from "@/components/Inputs/FileUpload";
import LinkPaste from "@/components/Inputs/LinkPaste";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import useTranslate from "@/Hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText";
import { cn } from "@/utils/cn";
import { BackgroundBeams } from "@/components/ui/background-beams";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/categoryLinks";

const Home: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Hindi",
    "Bengali",
    "Tamil",
    "Russian",
    "Portuguese",
    "Italian",
    "Japanese",
    "Korean",
    "Arabic",
    "Indonesian",
    "Vietnamese",
    "Thai",
    "Turkish",
    "Urdu",
    "Polish",
    "Punjabi",
    "Danish",
    "Swedish",
    "Czech",
    "Hungarian",
    "Greek",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="relative z-10 text-3xl sm:text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
                Lexi
              </h1>
              <p className="relative z-4 text-xl sm:text-2xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans">
                For seamless language Translation
              </p>
              <p className="relative z-4 text-lg sm:text-1xl md:text-xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans">
                by Utsav
              </p>
              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      id="source-language"
                      value={sourceText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setSourceText(e.target.value)
                      }
                      placeholder="Source Language"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer flex space-x-2 flex-row">
                        <SpeechRecognitionComponent
                          setSourceText={setSourceText}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayback(sourceText)}
                        />
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPaste handleLinkPaste={handleLinkPaste} />
                      </span>
                      <span className="text-sm pr-4">
                        {sourceText.length} / 2000
                      </span>
                    </div>
                  </div>

                  <div className="px-3relative z-10 flex flex-col space-x-3 p-4  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      id="target-language"
                      value={targetText}
                      onChange={() => {}}
                      placeholder="Target Language"
                    />

                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer flex items-center space-x-2 flex-row">
                        <LanguageSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayback(targetText)}
                        />
                      </span>
                      <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && (
                          <span className="text-xs text-green-500">
                            Copied!
                          </span>
                        )}

                        {/* <IconStar
                          size={22}
                          onClick={handleFavorite}
                          className={favorite ? "text-yellow-500" : ""}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <SvgDecorations />
              </div>

              <CategoryLinks />
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Home;
