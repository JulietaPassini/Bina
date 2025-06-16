import Calendar from "react-calendar";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

const CalendarView = ({ selectedDate, setSelectedDate }: Props) => {
  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        tileDisabled={({ date }) => isDateDisabled(date)}
      />
    </div>
  );
};

export default CalendarView;
