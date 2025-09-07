import css from "./SidebarNotes.module.css";
import Link from "next/link";

export default function SidebarNotes() {
    return (
        <ul className={css.menuList}>
            {/* список тегів */}
            {["All", "Todo", "Work", "Personal", "Meeting", "Shopping"].map(tag => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}