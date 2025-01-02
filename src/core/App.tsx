import Login from "../pages/Login";
import SpeciesList from "../pages/Species";
import "./App.css";

function App() {
  const handleClick = () => {
    console.log("test");
  };
  return (
    <>
      <h1>Hello</h1>
      <button onClick={handleClick}>Test +5</button>
      <Login></Login>
      <SpeciesList></SpeciesList>
    </>
  );
}

export default App;
