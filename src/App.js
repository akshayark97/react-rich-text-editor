import "./App.css";
import Button from "./components/Button";
import CustomTextEditor from "./components/CustomEditor";

function App() {
  return (
    <div>
      <div>
        {/* <div></div>
        <p>Hello</p>
        <button>Save</button> */}
      </div>
      <div className="App">
        <CustomTextEditor />
      </div>
    </div>
  );
}

export default App;
