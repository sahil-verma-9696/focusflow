"use client";

import { usePathname} from "next/navigation";
import styles from "./page.css";
export default function Home() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div>
      <main>
        <section className="part-1">i am part 1</section>
      </main>
    </div>
  );
}
