"use client";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside>
      <section className="part-1">
        <div
          className="icon cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img
            className={!isOpen? "py-[1rem]":""}
            src={isOpen ? "/assets/cross.png" : "/assets/pajamas_hamburger.png"}
            alt="cross"
          />
        </div>
        {isOpen && <h1 className="text heading text-nowrap">FOCUS-FLOW</h1>}
      </section>
      <section>
        Explore
      </section>
    </aside>
  );
};

export default Sidebar;