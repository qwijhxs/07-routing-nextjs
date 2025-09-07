"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = (): void => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {/* список тегів */}
                    {["All", "Todo", "Work", "Personal", "Meeting", "Shopping"].map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}