
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import Section1dm from "../FinanceDesignForNotes/Section-1/Section1";
import Section2dm from "../FinanceDesignForNotes/Section-2/Section2";
import Section3dm from "../FinanceDesignForNotes/Section-3/Section3";
import Section4dm from "../FinanceDesignForNotes/Section-4/Section4";
import Section5dm from "../FinanceDesignForNotes/Section-5/Section5";
import Section6dm from "../FinanceDesignForNotes/Section-6/Section6";


const notesSidebar = [
  { id: "1", title: "Section 1: Banking Basics" },
  { id: "2", title: "Section 2: Budgeting" },
  { id: "3", title: "Section 3: Credit" },
  { id: "4", title: "Section 4: Stock Market" },
  { id: "5", title: "Section 5: Investing" },
  { id: "6", title: "Section 6: Spending Habits" },
  
];

const FinanceFullNotes = () => {
  const [activeId, setActiveId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const topicRefs = useRef({});
  const visibleTopics = useRef(new Set());

  useEffect(() => {
    const container = document.getElementById("main-content");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleTopics.current.add(id);
          } else {
            visibleTopics.current.delete(id);
          }
        });

        const sorted = Array.from(visibleTopics.current).sort((a, b) => {
          const aTop = topicRefs.current[a]?.getBoundingClientRect().top ?? 0;
          const bTop = topicRefs.current[b]?.getBoundingClientRect().top ?? 0;
          return aTop - bTop;
        });

        if (sorted.length > 0) {
          setActiveId(sorted[0]);
        }
      },
      { root: container, threshold: 0.1 }
    );

    Object.entries(topicRefs.current).forEach(([id, el]) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.querySelector(`[data-scroll-id="${activeId}"]`);
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  const scrollTo = (id) => {
    topicRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setShowSidebar(false);
  };

  return (
    <div className="flex h-screen overflow-hidden relative pt-[4.5rem] md:pt-0">
      {/* Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-[4.5rem] left-4 z-40 p-2 bg-blue-600 text-white rounded shadow-lg"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 top-[4.5rem] md:top-0 left-0 h-full md:h-auto min-w-[260px] max-w-[280px] bg-white p-4 border-r shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold text-blue-800 mb-6 px-2">
          Finance
        </h2>
        <ul className="space-y-3">
          {notesSidebar.map((section) => (
            <li
              key={section.id}
              data-scroll-id={section.id}
              className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 text-sm shadow-sm shadow-green-700/20 ${
                activeId === section.id
                    ? "bg-green-100 text-[#09be43] font-semibold border-l-4 border-[#09be43]"
                    : "hover:bg-green-50 text-gray-800"
              }`}
              onClick={() => scrollTo(section.id)}
              title={section.title} 
            >
              <div className="text-[14px] font-medium leading-5 break-words whitespace-normal">
                {section.title}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-10 scroll-smooth"
      >
        

        <div className="space-y-10">
          <div className="overflow-x-auto"><Section1dm topicRefs={topicRefs} /></div>
          <div className="overflow-x-auto"><Section2dm topicRefs={topicRefs} /></div>
          <div className="overflow-x-auto"><Section3dm topicRefs={topicRefs} /></div>
          <div className="overflow-x-auto"><Section4dm topicRefs={topicRefs} /></div>
          <div className="overflow-x-auto"><Section5dm topicRefs={topicRefs} /></div>
          <div className="overflow-x-auto"><Section6dm topicRefs={topicRefs} /></div>
        </div>
      </main>
    </div>
  );
};

export default FinanceFullNotes;

