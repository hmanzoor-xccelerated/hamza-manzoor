"use client";

import { useState } from "react";
import { faqData } from "@/lib/faq/faqData";
import { motion, AnimatePresence } from "framer-motion";

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: Readonly<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}>) {
  return (
    <div className="border border-cyan-500/10 bg-slate-950/40 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan-400/20 shadow-md">
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-colors select-none cursor-pointer outline-none border-none bg-transparent"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-cyan-400 shrink-0 font-bold font-mono"
        >
          {isOpen ? "▲" : "▼"}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-1 text-xs leading-6 text-slate-300 border-t border-cyan-500/5 font-sans font-light select-text">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({});

  const categories = ["All", ...faqData.map((cat) => cat.title)];

  // Flatten items with category tags
  const allItems = faqData.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.title,
    }))
  );

  // Filter items based on selected category and search input
  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleOpen = (question: string) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-cyan-500/5 pb-6">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all select-none cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-cyan-400 text-slate-950 border-cyan-400 shadow-md shadow-cyan-400/10"
                  : "border-cyan-500/15 text-slate-400 hover:text-cyan-200 hover:border-cyan-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-[320px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search through 200+ technical Q&As..."
            className="w-full rounded-full border border-cyan-500/20 bg-[#03060f]/60 px-5 py-2.5 text-xs text-cyan-100 placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-2.5 text-[10px] text-slate-400 hover:text-cyan-400 select-none cursor-pointer border-none bg-transparent outline-none"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Showing Result Stats */}
      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300/60 uppercase tracking-widest px-2">
        <span>Filtered Q&As: {filteredItems.length} records</span>
        {search && <span>Query matched</span>}
      </div>

      {/* FAQ Cards Accordion Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {filteredItems.slice(0, Math.ceil(filteredItems.length / 2)).map((item) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={!!openIndexes[item.question]}
                onClick={() => toggleOpen(item.question)}
              />
            ))}
          </div>
          <div className="space-y-4">
            {filteredItems.slice(Math.ceil(filteredItems.length / 2)).map((item) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={!!openIndexes[item.question]}
                onClick={() => toggleOpen(item.question)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-cyan-500/5 bg-[#03060f]/30">
          <p className="text-sm text-slate-400">No database queries matched your search parameters.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-4 rounded-full border border-cyan-300/40 px-5 py-2 text-xs font-semibold text-cyan-200 hover:text-white transition select-none cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
