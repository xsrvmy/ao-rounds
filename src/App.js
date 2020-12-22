import "./App.css";
import AverageInfoCard from "./components/stats/AverageInfoCard";

function App() {
  return (
    <div>
    <AverageInfoCard
      isBest
      average={100003}
      times={[100001, 100002, 100003, 100004, 100005]}
    ></AverageInfoCard>
    <AverageInfoCard
      isWorst
      average={100003}
      times={[100001, 100002, 100003, 100004, 100005]}
    ></AverageInfoCard>
    </div>
  );
}

export default App;
