"use client";
import React from "react";
import style from "./page.css";
import { increment } from "@/lib/store/features/global/slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux/hooks";
const page = () => {
  const val = useAppSelector((store) => store.global.value);

  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(increment());
  }

  return (
    <main>
      <div className="about text-purple-500">
        i am about
        <button className="bg-black text-white" onClick={handleClick}>
          Click me val = {val}
        </button>
      </div>
    </main>
  );
};

export default page;
