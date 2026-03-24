import { useEffect, useState } from "react";
import HeroCard from "../../components/HeroCard/HeroCard";
import habitConfig from "../../data/habitConfig";
import { getOrCreateTodayLog } from "../../services/logService";
import "./progressPage.css";

function ProgressPage() {
  const today = new Date().toISOString().split("T")[0];

  const [habits, setHabits] = useState(
    habitConfig.map((habit) => ({
      ...habit,
      done: false,
    }))
  );
  const [noteText, setNoteText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTodayProgress() {
      try {
        const todayLog = await getOrCreateTodayLog(today);

        setHabits(
          habitConfig.map((habit) => ({
            ...habit,
            done: todayLog[habit.field] || false,
          }))
        );

        setNoteText(todayLog.notes || "");
      } catch (error) {
        console.error("Failed to load progress page data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodayProgress();
  }, [today]);

  const doneHabits = habits.filter((habit) => habit.done);
  const pendingHabits = habits.filter((habit) => !habit.done);

  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (isLoading) {
    return <p>Loading progress...</p>;
  }

  return (
    <main className="page">
      <div className="container">
        <section className="progressGreetingSection">
          <h2 className="progressGreetingTitle">
            Hello, <span>Pal!</span>
          </h2>
          <p className="progressDateText">{todayFormatted}</p>
        </section>

        <HeroCard>
          <div className="progressHeroContent">
            <h3 className="progressHeroTitle">Daily Completion</h3>

            <div className="progressDots">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={habit.done ? "progressDot done" : "progressDot pending"}
                ></div>
              ))}
            </div>
          </div>
        </HeroCard>

        <section className="progressSection">
          <h3 className="progressSectionTitle">Done Today !</h3>

          <div className="progressHabitGrid">
            {doneHabits.map((habit) => (
              <div key={habit.id} className="progressHabitCard done">
                <div className="progressHabitIconBox">
                  <img src={habit.icon} alt={habit.title} />
                </div>

                <div className="progressHabitText">
                  <p>{habit.title}</p>
                </div>

                <div className="progressHabitCheck">✓</div>
              </div>
            ))}
          </div>
        </section>

        <section className="progressSection">
          <h3 className="progressSectionTitle">Pending Tasks...</h3>

          <div className="progressHabitGrid">
            {pendingHabits.map((habit) => (
              <div key={habit.id} className="progressHabitCard pending">
                <div className="progressHabitIconBox">
                  <img src={habit.icon} alt={habit.title} />
                </div>

                <div className="progressHabitText">
                  <p>{habit.title}</p>
                </div>

                <div className="progressHabitCheck">✓</div>
              </div>
            ))}
          </div>
        </section>

        <section className="progressSection">
          <h3 className="progressSectionTitle">Note of the Day</h3>

          <div
            className={
              noteText.trim() ? "progressNoteCard done" : "progressNoteCard pending"
            }
          >
            <div className="progressNoteIconBox">
              <img src="/images/note.png" alt="Note" />
            </div>

            <div className="progressNoteTextBox">
              <p>
                {noteText.trim()
                  ? noteText
                  : "Write the note here and click the tick button on the right side to save it."}
              </p>
            </div>

            <div className="progressNoteCheck">✓</div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProgressPage;

/*
1. This page reuses the shared habit config and backend log service to avoid repeating logic.
2. I load today's real habit data from MongoDB and divide it into completed and pending sections.
3. The hero card is now reused as a shared component for cleaner and more consistent design.
4. ProgressPage focuses on presentation of data, while shared service files handle data access.
5. This structure keeps the page easier to read and supports reuse across multiple pages.
*/