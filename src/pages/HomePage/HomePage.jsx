import { useState } from "react";
import HabitCard from "../../components/HabitCard/HabitCard";
import "./homePage.css";

function HomePage() {
  const [habits, setHabits] = useState([
    { id: 1, title: "Sleep 7+ hrs", icon: "/images/sleep.png", done: true },
    { id: 2, title: "Hydration 8+ glass Water", icon: "/images/water.png", done: true },
    { id: 3, title: "Exercise or Running 30+ minutes", icon: "/images/exercise.png", done: true },
    { id: 4, title: "Low Carb. Diet", icon: "/images/food.png", done: false },
    { id: 5, title: "No Sugary Drink", icon: "/images/drink.png", done: false },
  ]);

  const [noteText, setNoteText] = useState("");
  const [noteDone, setNoteDone] = useState(false);

  function toggleHabit(id) {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, done: !habit.done };
      }
      return habit;
    });

    setHabits(updatedHabits);
  }

  function toggleNote() {
    setNoteDone(!noteDone);
  }

  const completedHabits = habits.filter((habit) => habit.done).length;
  const totalHabits = habits.length;
  const percent = Math.round((completedHabits / totalHabits) * 100);

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
                  background: `conic-gradient(#ffffff ${percent * 3.6}deg, rgba(255,255,255,0.25) 0deg)`
                }}
              >
                <div className="circleInner">
                  <span>{percent}%</span>
                </div>
              </div>
          </div>

          <div className="heroRight">
            <h3>{completedHabits} of {totalHabits} habits</h3>
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