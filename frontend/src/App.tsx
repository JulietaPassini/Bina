import { useState } from "react";
import Doctors from "./Doctors";
import DoctorCalendar from "./components/DoctorCalendar/DoctorCalendar";
import HourSelector from "./components/DoctorCalendar/HourSelector";
import AppointmentForm from "./components/DoctorCalendar/AppointmentForm";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Contacto from "./components/Contacto/Contacto";
import ConsultAppointment from "./components/ConsultAppointment/ConsultAppointment";
import { Doctor } from "./types";
import "./Styles.css";

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [view, setView] = useState<"home" | "doctors" | "calendar" | "hours" | "form" | "delete" | "contacto">("home");
  const [transitionClass, setTransitionClass] = useState("");


  const handleDoctorSelect = (doctor: Doctor) => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setSelectedDoctor(doctor);
      setView("calendar");
      setTransitionClass("fade-in");
    }, 300);
  };

  const handleDateSelect = (date: Date) => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setSelectedDate(date);
      setView("hours");
      setTransitionClass("fade-in");
    }, 300);
  };

  const handleHourSelect = (hour: string) => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setSelectedHour(hour);
      setView("form");
      setTransitionClass("fade-in");
    }, 300);
  };

  const handleBack = () => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      if (view === "form") {
        setView("hours");
        setSelectedHour(null);
      } else if (view === "hours") {
        setView("calendar");
        setSelectedDate(null);
      } else if (view === "calendar") {
        setView("doctors");
        setSelectedDoctor(null);
      } else if (view === "doctors") {
        setView("home");
      }
      setTransitionClass("fade-in");
    }, 300);
  };

  const handleConfirm = () => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setView("home");
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedHour(null);
      setTransitionClass("fade-in");
    }, 300);
  };


  const handleRegisterClick = () => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setView("doctors");
      setTransitionClass("fade-in");
    }, 300);
  };

  const handleDeleteClick = () => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setView("delete");
      setTransitionClass("fade-in");
    }, 300);
  };

  const handleNavigation = (newView: typeof view) => {
    setTransitionClass("fade-out");
    setTimeout(() => {
      setView(newView);
      setTransitionClass("fade-in");
    }, 300);
  };

  const showBackButton = ["form", "calendar", "hours"].includes(view);

  const renderView = () => {
    switch (view) {
      case "home":
        return <Home onRegisterClick={handleRegisterClick} />;
      case "doctors":
        return <Doctors onDoctorSelect={handleDoctorSelect} />;
      case "calendar":
        return selectedDoctor && (
          <DoctorCalendar doctor={selectedDoctor} onDateSelect={handleDateSelect} />
        );
      case "hours":
        return selectedDoctor && selectedDate && (
          <HourSelector
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            setSelectedHour={handleHourSelect}
            doctor={selectedDoctor}
          />
        );
      case "form":
        return selectedDoctor && selectedDate && selectedHour && (
          <div className="appointment-form-container">
            <AppointmentForm
              doctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedHour={selectedHour}
              onConfirm={handleConfirm}
            />
          </div>
        );
      case "delete":
        return <ConsultAppointment />;
      case "contacto":
        return <Contacto />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Navigation
        onRegisterClick={handleRegisterClick}
        onDeleteClick={handleDeleteClick}
        currentView={view}
        onNavigate={handleNavigation}
      />
      
      <div className="main-content">
        {showBackButton && (
          <button className="back-button" onClick={handleBack}>
            <span className="back-arrow">←</span> Volver
          </button>
        )}
        
        <div className={`page-container ${transitionClass}`}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;


