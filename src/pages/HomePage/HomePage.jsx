import { useEffect, useState } from "react";
import HabitCard from "../../components/HabitCard/HabitCard";
import "./homePage.css";

function HomePage() {
  const today = new Date().toISOString().split("T")[0];

  const [todayLogId, setTodayLogId] = useState("");
  const [habits, setHabits] = useState([
    {
      id: 1,
      field: "sleep",
      title: "Sleep 7+ hrs",
      icon: "/images/sleep.png",
      done: false,
    },
    {
      id: 2,
      field: "water",
      title: "Hydration 8+ glass Water",
      icon: "/images/water.png",
      done: false,
    },
    {
      id: 3,
      field: "exercise",
      title: "Exercise or Running 30+ minutes",
      icon: "/images/exercise.png",
      done: false,
    },
    {
      id: 4,
      field: "lowCarb",
      title: "Low Carb. Diet",
      icon: "/images/food.png",
      done: false,
    },
    {
      id: 5,
      field: "noSugarDrink",
      title: "No Sugary Drink",
      icon: "/images/drink.png",
      done: false,
    },
  ]);

  const [noteText, setNoteText] = useState("");
  const [noteDone, setNoteDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTodayLog() {
      try {
        const response = await fetch("http://localhost:5000/api/logs");
        const data = await response.json();

        const todayLog = data.find((log) => log.date === today);

        if (todayLog) {
          setTodayLogId(todayLog._id);

          setHabits((currentHabits) =>
            currentHabits.map((habit) => {
              return {
                ...habit,
                done: todayLog[habit.field] || false,
              };
            }),
          );

          setNoteText(todayLog.notes || "");
          setNoteDone((todayLog.notes || "").trim() !== "");
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodayLog();
  }, [today]);

  async function toggleHabit(id) {
    const clickedHabit = habits.find((habit) => habit.id === id);

    if (!clickedHabit || !todayLogId) {
      return;
    }

    const newDoneValue = !clickedHabit.done;

    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, done: newDoneValue };
      }
      return habit;
    });

    setHabits(updatedHabits);

    try {
      await fetch(`http://localhost:5000/api/logs/${todayLogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [clickedHabit.field]: newDoneValue,
        }),
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
    const response = await fetch(`http://localhost:5000/api/logs/${todayLogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notes: noteText,
      }),
    });

    const updatedLog = await response.json();
    console.log("Saved note:", updatedLog);

    if (!response.ok) {
      throw new Error("Failed to save note");
    }

    setNoteText(updatedLog.notes || "");
    setNoteDone(true);
  } catch (error) {
    console.error("Failed to update note:", error);
  }
}

  const completedHabits = habits.filter((habit) => habit.done).length;
  const totalHabits = habits.length;
  const percent = Math.round((completedHabits / totalHabits) * 100);

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
          <p className="dateText">Thu, 2 Apr 2026</p>
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
1. This page fetches today's habit log from MongoDB when it loads.
2. I store the MongoDB document id so the correct daily log can be updated later.
3. Clicking a habit card now updates both the React UI and the database with a PUT request.
4. Backend fields such as sleep, water, and exercise are mapped to frontend habit cards.
5. The progress circle is calculated dynamically from real saved habit data.
*/
