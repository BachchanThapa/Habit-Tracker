import { useEffect, useMemo, useRef, useState } from "react";
import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import HeroCard from "../../components/HeroCard/HeroCard";
import habitConfig from "../../data/habitConfig";
import { getLogs } from "../../services/logService";
import "./statsPage.css";

// Register Chart.js parts once before using the chart
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

function StatsPage() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [todayLog, setTodayLog] = useState(null);
  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMonthlyPreview, setShowMonthlyPreview] = useState(false);

  // Helper function to keep date format stable in local time
  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = formatLocalDate(new Date());

  useEffect(() => {
    // Load logs and prepare the latest 7 days for the chart
    async function fetchStatsData() {
      try {
        const logs = await getLogs();

        const logsByDate = new Map();

        logs.forEach((log) => {
          if (!logsByDate.has(log.date)) {
            logsByDate.set(log.date, log);
          }
        });

        const last7Days = [];

        for (let i = 6; i >= 0; i -= 1) {
          const date = new Date();
          date.setDate(date.getDate() - i);

          const dateKey = formatLocalDate(date);
          const label = date.toLocaleDateString("en-GB", { weekday: "short" });

          last7Days.push({
            date: dateKey,
            label,
            log: logsByDate.get(dateKey) || null,
          });
        }

        setWeeklyLogs(last7Days);
        setTodayLog(logsByDate.get(today) || null);
      } catch (error) {
        console.error("Failed to load stats page data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatsData();
  }, [today]);

  const statsData = useMemo(() => {
    // Habit colors used in the stacked bar chart
    const colors = {
      sleep: "#32c85a",
      lowCarb: "#f4c20d",
      exercise: "#9b5de5",
      water: "#3b82f6",
      noSugarDrink: "#d1d5db",
    };

    const labels = weeklyLogs.map((day) => day.label);

    // Each dataset adds one habit layer to the stacked bars
    const datasets = [
      {
        label: "Sleep",
        data: weeklyLogs.map((day) => (day.log?.sleep ? 1 : 0)),
        backgroundColor: colors.sleep,
        borderRadius: 4,
        borderSkipped: false,
        stack: "habits",
      },
      {
        label: "Diet",
        data: weeklyLogs.map((day) => (day.log?.lowCarb ? 1 : 0)),
        backgroundColor: colors.lowCarb,
        borderRadius: 4,
        borderSkipped: false,
        stack: "habits",
      },
      {
        label: "Exercise",
        data: weeklyLogs.map((day) => (day.log?.exercise ? 1 : 0)),
        backgroundColor: colors.exercise,
        borderRadius: 4,
        borderSkipped: false,
        stack: "habits",
      },
      {
        label: "Water",
        data: weeklyLogs.map((day) => (day.log?.water ? 1 : 0)),
        backgroundColor: colors.water,
        borderRadius: 4,
        borderSkipped: false,
        stack: "habits",
      },
      {
        label: "No Sugar",
        data: weeklyLogs.map((day) => (day.log?.noSugarDrink ? 1 : 0)),
        backgroundColor: colors.noSugarDrink,
        borderRadius: 4,
        borderSkipped: false,
        stack: "habits",
      },
    ];

    return { labels, datasets };
  }, [weeklyLogs]);

  useEffect(() => {
    if (!chartRef.current || weeklyLogs.length === 0) return;

    // Destroy old chart before drawing a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(chartRef.current, {
      type: "bar",
      data: statsData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#111827",
            titleColor: "#ffffff",
            bodyColor: "#e5e7eb",
            borderColor: "#374151",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            bodyFont: {
              size: 13,
            },
            titleFont: {
              size: 14,
              weight: "600",
            },
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${context.raw ? "Done" : "Not done"}`;
              },
              afterBody(context) {
                const index = context[0].dataIndex;
                const day = weeklyLogs[index];

                if (day?.log?.notes?.trim()) {
                  const note = day.log.notes;
                  const lines = note.match(/.{1,40}/g);

                  return ["", "⭐ Note:", ...lines];
                }

                return "";
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: "#ffffff",
              font: {
                size: 12,
                weight: "600",
              },
            },
            border: {
              display: false,
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              color: "rgba(255,255,255,0.85)",
              font: {
                size: 11,
              },
            },
            grid: {
              color: "rgba(255,255,255,0.18)",
            },
            border: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [statsData, weeklyLogs]);

  // Prepare today's habits for Done / Pending sections
  const todayHabits = habitConfig.map((habit) => ({
    ...habit,
    done: todayLog ? Boolean(todayLog[habit.field]) : false,
  }));

  const doneHabits = todayHabits.filter((habit) => habit.done);
  const pendingHabits = todayHabits.filter((habit) => !habit.done);

  // Count how many recent days in a row had at least one completed habit
  const streak = (() => {
    let count = 0;

    for (let i = weeklyLogs.length - 1; i >= 0; i -= 1) {
      const log = weeklyLogs[i].log;

      if (!log) break;

      const completed = [
        log.sleep,
        log.water,
        log.exercise,
        log.lowCarb,
        log.noSugarDrink,
      ].filter(Boolean).length;

      if (completed > 0) {
        count += 1;
      } else {
        break;
      }
    }

    return count;
  })();

  // Active day = any completed habit or a written note
  const activeDays = weeklyLogs.filter((day) => {
    if (!day.log) return false;

    const completed = [
      day.log.sleep,
      day.log.water,
      day.log.exercise,
      day.log.lowCarb,
      day.log.noSugarDrink,
    ].filter(Boolean).length;

    return completed > 0 || (day.log.notes || "").trim() !== "";
  }).length;

  // Meaningful day = completed habit or written note
  const meaningfulDays = weeklyLogs.filter((day) => {
    if (!day.log) return false;

    const completed = [
      day.log.sleep,
      day.log.water,
      day.log.exercise,
      day.log.lowCarb,
      day.log.noSugarDrink,
    ].filter(Boolean).length;

    return completed > 0 || (day.log.notes || "").trim() !== "";
  });

  // Weekly average shows the average completion percentage
  const weeklyAverage = meaningfulDays.length
    ? Math.round(
        meaningfulDays.reduce((sum, day) => {
          const completed = [
            day.log.sleep,
            day.log.water,
            day.log.exercise,
            day.log.lowCarb,
            day.log.noSugarDrink,
          ].filter(Boolean).length;

          return sum + (completed / 5) * 100;
        }, 0) / meaningfulDays.length,
      )
    : 0;

  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (isLoading) {
    return <p>Loading stats...</p>;
  }

  return (
    <main className="page">
      <div className="container">
        <section className="statsGreetingSection">
          <h2 className="statsGreetingTitle">
            Hello, <span>Pal!</span>
          </h2>
          <p className="statsDateText">{todayFormatted}</p>
        </section>

        <HeroCard>
          <div className="statsHeroContent">
            <div className="statsHeroTopRow">
              <div>
                <h3 className="statsHeroTitle">Your Weekly Habits</h3>
                <p className="statsHeroSubtitle">
                  Track your daily consistency
                </p>
              </div>

              {/* Small future-feature button for monthly statistics */}
              <button
                type="button"
                className="statsMonthlyButton"
                onClick={() => setShowMonthlyPreview((prev) => !prev)}
              >
                Last 30 Days
              </button>
            </div>

            <div className="statsChartWrap">
              <canvas ref={chartRef}></canvas>
            </div>

            {/* Temporary placeholder for future monthly view */}
            {showMonthlyPreview && (
              <div className="statsMonthlyPreviewCard">
                <h4>Monthly Statistics</h4>
                <p>
                  This page is under development. A future version will show the
                  last 30 days of habit consistency and a wider overview of
                  long-term progress.
                </p>
              </div>
            )}
          </div>
        </HeroCard>

        <section className="statsLegend">
          <div className="legendItem">
            <span className="legendDot sleep"></span>
            <span>Sleep</span>
          </div>
          <div className="legendItem">
            <span className="legendDot diet"></span>
            <span>Diet</span>
          </div>
          <div className="legendItem">
            <span className="legendDot exercise"></span>
            <span>Exercise</span>
          </div>
          <div className="legendItem">
            <span className="legendDot water"></span>
            <span>Water</span>
          </div>
          <div className="legendItem">
            <span className="legendDot noSugar"></span>
            <span>No Sugar</span>
          </div>
        </section>

        <section className="statsSummary">
          <div className="statsChip">🔥 Streak: {streak} days</div>
          <div className="statsChip">✅ Completion: {weeklyAverage}%</div>
          <div className="statsChip">📅 Active Days: {activeDays}/7</div>
        </section>

        <section className="statsSection">
          <h3 className="statsSectionTitle">Done Today !</h3>

          <div className="statsHabitGrid">
            {doneHabits.map((habit) => (
              <div key={habit.id} className="statsHabitCard done">
                <div className="statsHabitIconBox">
                  <img src={habit.icon} alt={habit.title} />
                </div>

                <div className="statsHabitText">
                  <p>{habit.title}</p>
                </div>

                <div className="statsHabitCheck">✓</div>
              </div>
            ))}
          </div>
        </section>

        <section className="statsSection">
          <h3 className="statsSectionTitle">Pending Tasks...</h3>

          <div className="statsHabitGrid">
            {pendingHabits.map((habit) => (
              <div key={habit.id} className="statsHabitCard pending">
                <div className="statsHabitIconBox">
                  <img src={habit.icon} alt={habit.title} />
                </div>

                <div className="statsHabitText">
                  <p>{habit.title}</p>
                </div>

                <div className="statsHabitCheck">✓</div>
              </div>
            ))}
          </div>
        </section>

        <section className="statsSection">
          <h3 className="statsSectionTitle">Note of the Day</h3>

          <div
            className={
              todayLog?.notes?.trim()
                ? "statsNoteCard done"
                : "statsNoteCard pending"
            }
          >
            <div className="statsNoteIconBox">
              <img src="/images/note.png" alt="Note" />
            </div>

            <div className="statsNoteTextBox">
              <p>
                {todayLog?.notes?.trim()
                  ? todayLog.notes
                  : "Write the note here and click the tick button on the right side to save it."}
              </p>
            </div>

            <div className="statsNoteCheck">✓</div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default StatsPage;

/*
1. This page shows the last 7 days of real habit activity.
2. The chart uses stacked bars, where each color means one habit.
3. Empty days stay at 0, so the stats remain honest.
4. Streak, completion, and active days are calculated from the same weekly logs.
5. A small Last 30 Days button is added as a future feature placeholder.
6. If a day contains a note, a star appears above the chart and shows the note on hover.
*/
