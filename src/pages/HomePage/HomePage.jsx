import { useEffect, useState } from "react";
import HabitCard from "../../components/HabitCard/HabitCard";
import habitConfig from "../../data/habitConfig";
import { getOrCreateTodayLog, updateLog } from "../../services/logService";
import "./homePage.css";

function HomePage() {
  const today = new Date().toISOString().split("T")[0];

  const [todayLogId, setTodayLogId] = useState("");
  const [habits, setHabits] = useState(
    habitConfig.map((habit) => ({
      ...habit,
      done: false,
    }))
  );
  const [noteText, setNoteText] = useState("");
  const [noteDone, setNoteDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTodayLog() {
      try {
        const todayLog = await getOrCreateTodayLog(today);

        setTodayLogId(todayLog._id);

        setHabits((currentHabits) =>
          currentHabits.map((habit) => ({
            ...habit,
            done: todayLog[habit.field] || false,
          }))
        );

        setNoteText(todayLog.notes || "");
        setNoteDone((todayLog.notes || "").trim() !== "");
      } catch (error) {
        console.error("Failed to fetch today's log:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodayLog();
  }, [today]);

  async function toggleHabit(id) {
    const clickedHabit = habits.find((habit) => habit.id === id);

    if (!clickedHabit || !todayLogId) return;

    const newDoneValue = !clickedHabit.done;

    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, done: newDoneValue };
      }
      return habit;
    });

    setHabits(updatedHabits);

    try {
      await updateLog(todayLogId, {
        [clickedHabit.field]: newDoneValue,
      });
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  }

  async function toggleNote() {
    if (!todayLogId) return;

    if (noteDone) {
      setNoteDone(false);
      return;
    }

    try {
      const updatedLog = await updateLog(todayLogId, {
        notes: noteText,
      });

      setNoteText(updatedLog.notes || "");
      setNoteDone(true);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  }

  const completedHabits = habits.filter((habit) => habit.done).length;
  const totalHabits = habits.length;
  const percent = Math.round((completedHabits / totalHabits) * 100);

  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (isLoading) {
    return <p>Loading habits...</p>;
  }

  return (
    <main className="home">
      <div className="homeContainer">
        <section className="greetingSection">
          <h2 className="greetingTitle">
            Hello, <span>Pal!</span>
          </h2>
          <p className="dateText">{todayFormatted}</p>
        </section>

        <section className="heroCard">
          <div className="heroLeft">
            <div
              className="circle"
              style={{
                background: `conic-gradient(#ffffff ${
                  percent * 3.6
                }deg, rgba(255,255,255,0.25) 0deg)`,
              }}
            >
              <div className="circleInner">
                <span>{percent}%</span>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <h3>
              {completedHabits} of {totalHabits} habits
            </h3>
            <p>completed today!</p>
          </div>
        </section>

        <section className="habitsSection">
          <h3 className="habitsTitle">Daily Habits</h3>

          <div className="habitsGrid">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                icon={habit.icon}
                title={habit.title}
                done={habit.done}
                onClick={() => toggleHabit(habit.id)}
              />
            ))}
          </div>
        </section>

        <section className="noteSection">
          <h3 className="noteTitle">Note of the day</h3>

          <div className={noteDone ? "noteCard done" : "noteCard pending"}>
            <div className="noteIconBox">
              <img src="/images/note.png" alt="Note" />
            </div>

            <div className="noteTextBox">
              <textarea
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                placeholder="Write your note here..."
                disabled={noteDone}
              ></textarea>
            </div>

            <button className="noteButton" onClick={toggleNote}>
              {noteDone ? "✓" : "✓"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;

/*
1. This page uses shared config and service files instead of keeping all logic in one component.
2. Habit data is reused from habitConfig, which avoids repeating the same setup in multiple pages.
3. Backend fetch, create, and update calls are handled through logService for cleaner architecture.
4. HomePage focuses more on UI rendering and user interaction than raw API code.
*/