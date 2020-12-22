import "./App.css";
import AverageInfoCard from "./components/stats/AverageInfoCard";

function App() {
  return (
    <div>
    <AverageInfoCard
      isBest
      average={100003}
      times={[100, 10, 6100, 61000, 99999]}
    ></AverageInfoCard>
    <AverageInfoCard
      isWorst
      average={Infinity}
      times={[Infinity, -Infinity, 100003, 100004, 100005]}
    ></AverageInfoCard>
    </div>
  );
}

export default App;
