"use client"

import Link from 'next/link';
import styles from './TagsMenu.module.css';
import { useEffect, useRef, useState } from 'react';


const tagsList = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const TagsMenu = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.overlay}>
      <div className={styles.menuContainer}>
        <button className={styles.menuButton} onClick={toggle} ref={buttonRef}>
          Notes ▾
        </button>
        {isOpen && (
          <ul className={styles.menuList} ref={menuRef}>
            <li className={styles.menuItem}>
              <Link
                href={'/notes/filter/All'}
                className={styles.menuLink}
                onClick={() => setIsOpen(false)}>
                All notes
              </Link>
            </li>
            {tagsList.map(item => (
              <li key={`tagsList-${item}`} className={styles.menuItem}>
                <Link
                  href={`/notes/filter/${item}`}
                  className={styles.menuLink}
                  onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TagsMenu;
