"use client";

import React from "react";

interface Section {
  id: string;
  title: string;
  subSections?: { id: string; title: string }[];
}

export default function CaseStudyNavigation({
  sections,
}: {
  sections: Section[];
}) {
  const handleNavigation = (id: string) => {
    // Delay navigation slightly to allow Offcanvas to close and focus to settle.
    // This prevents the "jump back" issue where focus restoration scrolls the page back up.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  };

  return (
    <div className="list-group list-group-flush">
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <button
            type="button"
            className="list-group-item list-group-item-action text-start"
            data-bs-dismiss="offcanvas"
            onClick={() => handleNavigation(section.id)}
          >
            {section.title}
          </button>
          {section.subSections && (
            <>
              {section.subSections.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  className="list-group-item list-group-item-action ps-4 text-start"
                  data-bs-dismiss="offcanvas"
                  onClick={() => handleNavigation(sub.id)}
                >
                  {sub.title}
                </button>
              ))}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
