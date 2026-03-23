const habitConfig = [
  {
    id: 1,
    field: "sleep",
    title: "Sleep 7+ hrs",
    icon: "/images/sleep.png",
  },
  {
    id: 2,
    field: "water",
    title: "Hydration 8+ glass Water",
    icon: "/images/water.png",
  },
  {
    id: 3,
    field: "exercise",
    title: "Exercise or Running 30+ minutes",
    icon: "/images/exercise.png",
  },
  {
    id: 4,
    field: "lowCarb",
    title: "Low Carb. Diet",
    icon: "/images/food.png",
  },
  {
    id: 5,
    field: "noSugarDrink",
    title: "No Sugary Drink",
    icon: "/images/drink.png",
  },
];

export default habitConfig;

/*
1. This file stores the reusable habit setup for the whole app.
2. I separated this config so HomePage, ProgressPage, and StatsPage can use the same habit data.
3. This makes the app easier to scale and avoids repeating the same array in multiple pages.
*/