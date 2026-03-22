import "../styles/homePage.css";

function HomePage() {
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
            <div className="circle">
              <span>60%</span>
            </div>
          </div>

          <div className="heroRight">
            <h3>3 of 5 habits</h3>
            <p>completed today!</p>
          </div>
        </section>

        <section className="habitsSection">
          <h3 className="habitsTitle">Daily Habits</h3>

          <div className="habitsGrid">
            <div className="habitCard done">
              <div className="habitIconBox">
                <img src="/images/sleep.png" alt="Sleep" />
              </div>
              <div className="habitText">
                <p>Sleep 7+ hrs</p>
              </div>
              <div className="habitCheck">✓</div>
            </div>

            <div className="habitCard done">
              <div className="habitIconBox">
                <img src="/images/water.png" alt="Water" />
              </div>
              <div className="habitText">
                <p>Hydration 8+ glass Water</p>
              </div>
              <div className="habitCheck">✓</div>
            </div>

            <div className="habitCard done">
              <div className="habitIconBox">
                <img src="/images/exercise.png" alt="Exercise" />
              </div>
              <div className="habitText">
                <p>Exercise or Running 30+ minutes</p>
              </div>
              <div className="habitCheck">✓</div>
            </div>

            <div className="habitCard pending">
              <div className="habitIconBox">
                <img src="/images/food.png" alt="Food" />
              </div>
              <div className="habitText">
                <p>Low Carb. Diet</p>
              </div>
              <div className="habitCheck">✓</div>
            </div>

            <div className="habitCard pending">
              <div className="habitIconBox">
                <img src="/images/drink.png" alt="No sugary drink" />
              </div>
              <div className="habitText">
                <p>No Sugary Drink</p>
              </div>
              <div className="habitCheck">✓</div>
            </div>

            <div className="habitCard pending">
              <div className="habitIconBox">
                <img src="/images/note.png" alt="Note" />
              </div>
              <div className="habitText">
                <p>Write the note here and click the right button on the right side...</p>
              </div>
              <div className="habitCheck">✓</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;