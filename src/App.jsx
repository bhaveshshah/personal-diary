import "./App.css";
import Header from "./components/Header/Header";
import EntryList from "./components/EntryList/EntryList";

function App() {
  return (
    <>
      <Header />
      <div className="divider"></div>
      <EntryList />
    </>
  );
}

export default App;
