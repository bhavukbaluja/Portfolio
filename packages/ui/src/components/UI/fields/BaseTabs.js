import * as React from "react";
import { Tabs } from "@base-ui-components/react/tabs";
import styles from "./Base.module.scss";
import { isEmpty } from "@utils/helper/Helper";

export default function BaseTabs({ tabItems, defaultValue, style }) {
  return (
    <div style={style}>
      <Tabs.Root className={styles.Tabs} defaultValue={!isEmpty(defaultValue) ? defaultValue : tabItems[0]?.value || ""}>
        <Tabs.List className={styles.List}>
          {tabItems.map(({ label, value }, index) => (
            <React.Fragment key={value}>
              <Tabs.Tab className={styles.Tab} value={value}>
                {label}
              </Tabs.Tab>
              {index < tabItems.length - 1 && <div className={styles.Divider} />}
            </React.Fragment>
          ))}
          <Tabs.Indicator className={styles.Indicator} />
        </Tabs.List>
        {tabItems.map(({ value, PanelComponent }) => (
          <Tabs.Panel key={value} className={styles.Panel} value={value}>
            {PanelComponent}
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  );
}

export function OverviewIcon(props) {
  return (
    <svg width="40" height="40" viewBox="0 0 30 30" fill="currentColor" {...props}>
      <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 12 C 4 13.105 4.895 14 6 14 L 12 14 C 13.105 14 14 13.105 14 12 L 14 6 C 14 4.895 13.105 4 12 4 L 6 4 z M 18 4 C 16.895 4 16 4.895 16 6 L 16 12 C 16 13.105 16.895 14 18 14 L 24 14 C 25.105 14 26 13.105 26 12 L 26 6 C 26 4.895 25.105 4 24 4 L 18 4 z ..." />
    </svg>
  );
}

export function ProjectIcon(props) {
  return (
    <svg width="40" height="40" viewBox="0 0 30 30" fill="currentColor" {...props}>
      <path d="M 14.984375 1.9863281 A 1.0001 1.0001 0 0 0 14 3 L 14 4 L 5 4 L 4 4 A 1.0001 1.0001 0 1 0 3.9804688 6 ..." />
    </svg>
  );
}

export function PersonIcon(props) {
  return (
    <svg width="40" height="40" viewBox="0 0 30 30" fill="currentColor" {...props}>
      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M8,22.141 c1.167-3.5,4.667-2.134,5.25-4.03v-1.264..." />
    </svg>
  );
}
