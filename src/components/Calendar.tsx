import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import { format, addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarComponent = () => {
  const [calendar, setCalendar] = useState("");
  const deliveryDate = addDays(new Date(), 2);

  //open/close
  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    setCalendar(format(deliveryDate, "MM/dd/yyyy"));
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const handleSelect = (date: Date) => {
    setCalendar(format(date, "MM/dd/yyyy"));
  };

  const hideOnClickOutside = (e: Event) => {
    if (
      refOne.current &&
      !(refOne.current as HTMLDivElement).contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <input
        key="delivery_date"
        id="delivery_date"
        name="delivery_date"
        value={calendar}
        readOnly
        className="form-control"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <Calendar
            date={deliveryDate}
            onChange={handleSelect}
            className="calendarElement"
            minDate={deliveryDate}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
