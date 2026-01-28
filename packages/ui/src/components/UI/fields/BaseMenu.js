import React, { useState } from 'react';
import { Menu } from '@base-ui-components/react/menu';
import styles from './index.module.scss';

export default function BaseMenu({ title = "Menu", items = [], onSelect, selectedItem }) {

  const handleSelect = (item) => {
    onSelect(item);
    // closeMenu(); // Close the menu after selection
  };

  return (
    <Menu.Root>
      <Menu.Trigger className={styles.Button}>
        {selectedItem?.label || title} <ChevronDownIcon className={styles.ButtonIcon} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className={styles.Positioner} sideOffset={8}>
          <Menu.Popup className={styles.Popup}>
            <Menu.Arrow className={styles.Arrow}>
              {/* <ArrowSvg /> */}
            </Menu.Arrow>
            {items?.map((item, index) =>
              item?.separator? 
              (
                <Menu.Separator key={index} className={styles.Separator} />
              ) 
              : 
              (
                <Menu.Item
                  key={index}
                  className={`${styles?.Item} ${selectedItem?.label === item?.label ? styles?.Selected : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  {item?.label}
                </Menu.Item>
              )
            )}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

// SVG Components
function ArrowSvg(props) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z" className={styles.ArrowFill} />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  );
}
