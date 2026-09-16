"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ArrowRight
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionButtons?: { label: string; href?: string; query?: string }[];
}

export default function AIBuildAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Welcome to ModularHome.com. I am your architectural housing advisor. What kind of home or building project are you envisioning?",
      timestamp: "Just now",
      actionButtons: [
        { label: "Modular & Prefab Homes", query: "Tell me about your modular and prefab homes" },
        { label: "Modern Barndominiums", query: "Tell me about your residential barndominiums" },
        { label: "Cabins & ADUs", query: "What options do you have for cabins and ADUs?" },
        { label: "Estimate Build Cost", href: "/quote" },
        { label: "Upload Custom Floor Plan", href: "/upload-floor-plan" },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateBotReply = (userQuery: string): { reply: string; actionButtons?: { label: string; href?: string; query?: string }[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes("cabin") || q.includes("tiny") || q.includes("snow") || q.includes("mountain") || q.includes("off-grid")) {
      return {
        reply: "Our featured cabins and tiny homes include 'The Homestead Cabin' (1,200 sq ft, starting at $49,900) and 'The Retreat' luxury tiny home (650 sq ft, starting at $39,900), both factory engineered with precision.",
        actionButtons: [
          { label: "The Homestead Cabin", href: "/models/the-homestead-cabin" },
          { label: "The Retreat Tiny Home", href: "/models/the-retreat" },
          { label: "The Yellowstone Ranch", href: "/models/the-yellowstone" },
        ],
      };
    }

    if (q.includes("barndominium") || q.includes("residential") || q.includes("living") || q.includes("house")) {
      return {
        reply: "Our Barndominiums blend steel-reinforced framing with open Scandinavian luxury interiors. Our top residential designs include 'The Lancaster' (2,200 sq ft, starting at $64,500) and 'The Hawthorne' (2,400 sq ft with wraparound porch).",
        actionButtons: [
          { label: "View The Lancaster", href: "/models/the-lancaster" },
          { label: "View The Hawthorne", href: "/models/the-hawthorne" },
          { label: "Calculate Quote", href: "/quote" },
        ],
      };
    }

    if (q.includes("quote") || q.includes("cost") || q.includes("price") || q.includes("estimate") || q.includes("sq ft")) {
      return {
        reply: "Modular home packages typically range from $25 to $45 per sq ft for factory-engineered components, with finished home packages ranging from $120 to $180 per sq ft. You can calculate a customized breakdown using our interactive tool:",
        actionButtons: [
          { label: "Launch Instant Quote Tool →", href: "/quote" },
          { label: "Submit Floor Plan For Exact Bids", href: "/upload-floor-plan" },
        ],
      };
    }

    if (q.includes("workshop") || q.includes("commercial") || q.includes("shop") || q.includes("storage") || q.includes("crane") || q.includes("shed")) {
      return {
        reply: "For workshops, commercial space, and multi-purpose buildings, take a look at 'The Timberline Workshop' (3,000 sq ft clear-span) and 'The Artisan Shed' (480 sq ft versatile studio kit).",
        actionButtons: [
          { label: "Explore The Timberline", href: "/models/the-timberline-workshop" },
          { label: "Explore The Artisan Shed", href: "/models/the-artisan-shed" },
        ],
      };
    }

    return {
      reply: "Thank you for reaching out to ModularHome.com. We offer factory-built housing solutions from 650 sq ft cabins to 5,000+ sq ft custom estates. Would you like to explore existing models or build a custom quote?",
      actionButtons: [
        { label: "Browse All Models", href: "/models" },
        { label: "Request a Quote", href: "/quote" },
        { label: "Contact Us", href: "/contact" },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotReply(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        timestamp: "Just now",
        actionButtons: response.actionButtons,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <aside aria-label="AI Build Assistant Widget">
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Housing Assistant"
        className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2.5 ${
          isOpen
            ? "bg-[#8F171C] text-white rotate-90"
            : "bg-[#B82025] hover:bg-[#8F171C] text-white hover:scale-105"
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block pr-1">
              Housing Advisor
            </span>
          </>
        )}
      </button>

      {/* Slide-over Drawer / Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-white border border-[#E5E0D4] rounded-sm shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#B82025] text-white px-4 py-3.5 border-b border-[#8F171C] flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 px-2 rounded-xs bg-white flex items-center justify-center overflow-hidden border border-white/20 shrink-0 shadow-xs">
                <Image
                  src="/newlogo2.png"
                  alt="ModularHome.com"
                  width={80}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">
                  ModularHome Advisor
                </div>
                <div className="text-[10px] text-white/90 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Online • AI Housing Advisor
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F4EC]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#B82025] text-white"
                      : "bg-white border border-[#E5E0D4] text-[#1D2521]"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Render quick Action Buttons if provided by the bot */}
                {msg.actionButtons && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.actionButtons.map((btn, idx) => (
                      btn.href ? (
                        <Link
                          key={idx}
                          href={btn.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-[#B82025] text-[#1D2521] hover:text-white border border-[#E5E0D4] rounded-full transition-colors shadow-2xs"
                        >
                          <span>{btn.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <button
                          key={idx}
                          onClick={() => handleSend(btn.query || btn.label)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-[#F7F4EC] text-[#1D2521] border border-[#E5E0D4] rounded-full transition-colors text-left shadow-2xs"
                        >
                          {btn.label}
                        </button>
                      )
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-[#6B716D] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white border border-[#E5E0D4] rounded-lg w-fit shadow-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B82025] animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#B82025] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#B82025] animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions strip */}
          <div className="px-3 py-2 bg-white border-t border-[#E5E0D4] flex items-center gap-1.5 overflow-x-auto text-[10px] text-[#6B716D] no-scrollbar">
            <span className="shrink-0 font-bold text-[#1D2521]">Ask:</span>
            <button
              onClick={() => handleSend("Tell me about cabins")}
              className="px-2 py-0.5 rounded bg-[#F7F4EC] border border-[#E5E0D4] hover:text-[#1D2521] shrink-0 transition-colors"
            >
              Cabins?
            </button>
            <button
              onClick={() => handleSend("Why steel over wood framing?")}
              className="px-2 py-0.5 rounded bg-[#F7F4EC] border border-[#E5E0D4] hover:text-[#1D2521] shrink-0 transition-colors"
            >
              Steel vs Wood
            </button>
            <button
              onClick={() => handleSend("What does a cabin cost?")}
              className="px-2 py-0.5 rounded bg-[#F7F4EC] border border-[#E5E0D4] hover:text-[#1D2521] shrink-0 transition-colors"
            >
              Cabin Pricing?
            </button>
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E5E0D4] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about cabins, models, pricing..."
              className="flex-1 bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] placeholder-[#6B716D] focus:outline-none focus:border-[#B82025] rounded-sm"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="p-2 bg-[#B82025] hover:bg-[#8F171C] disabled:opacity-40 text-white rounded-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
