import * as React from 'react';
import { Accordion } from '@base-ui-components/react/accordion';
import styles from './Accordian.module.scss';
import { Link } from 'react-router-dom';

export default function BaseAccordian({ title, items }) {
  return (
    <Accordion.Root className={styles.Accordion}>
        <Accordion.Item className={styles.Item}>
            <Accordion.Header className={styles.Header}>
                <Accordion.Trigger className={styles.Trigger}>
                    {title}
                    <PlusIcon className={styles.TriggerIcon} />
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className={styles.Panel}>
                <ul className="footer-links-contents-mobile">
                    {items.map((item, index) => (
                        <li key={index} className="footer-links">
                            <Link to={item.path} className="footer-links">
                                <span className="Nav-text">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Accordion.Panel>
        </Accordion.Item>
    </Accordion.Root>
  );
}
function PlusIcon(props) {
  return (
      <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
          <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
      </svg>
  );
}
