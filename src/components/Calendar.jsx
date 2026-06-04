import { ko } from 'date-fns/locale'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import "react-day-picker/dist/style.css"
import styles from '../styles/Calendar.module.css'

export default function Calendar({ date, onSelect }) {
  const defaultClassNames = getDefaultClassNames()
  
  return (
    <DayPicker
      locale={ko}
      mode='single'
      selected={date}
      onDayClick={onSelect}
      classNames={{
        root: `${defaultClassNames.root} ${styles.rdpRoot}`,
        nav: styles["rdp-nav"],
        button_previous: styles["rdp-button_previous"],
        button_next: styles["rdp-button_next"],
        month_caption: styles["rdp-month_caption"],
        caption_label: styles["rdp-caption_label"],
        weekdays: styles["rdp-weekdays"],
        weekday: styles["rdp-weekday"],
        weeks: styles["rdp-weeks"],
        week: styles["rdp-week"],
        day: styles["rdp-day"],
        today: styles["rdp-today"],
        selected: styles["rdp-selected"],
        outside: styles["rdp-outside"],
        chevron: styles["rdp-chevron"],
      }}
    />
  )
}