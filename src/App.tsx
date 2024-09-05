import { Header } from "./components/Header";
import { Table } from "./components/Table";

function App() {
  return (
    <>
      <Header />

      <div className="w-screen h-screen bg-slate-100 flex items-start justify-center px-10 pt-32">
        <Table />
      </div>
    </>
  );
}

export default App;
