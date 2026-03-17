import { useState, useRef, useEffect } from "react";

export const useRowMenu = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    const handleScroll = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openMenuId]);

  const openMenu = (id: string, anchorRect: DOMRect) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setMenuPosition({ top: anchorRect.bottom + 4, left: anchorRect.right });
      setOpenMenuId(id);
    }
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  return { openMenuId, menuPosition, menuRef, openMenu, closeMenu };
};
