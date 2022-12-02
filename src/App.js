import { useEffect, useState } from "react";
import { Tree } from "./DataTaxonomy/tree";

function App() {
  const [resultData, setResultData] = useState([]);
  const [nex,setNex]=useState(null)

  const fetchTaxonomy = async () => {
    const tree = new Tree();
    await fetch(require("./DataTaxonomy/taxonomy.txt"))
      .then((res) => res.text())
      .then((result) => {
        result
          .split("\n")
          .map((d) => d.split(" > "))
          .forEach((val) => tree.insert(val));
      })
      setResultData(tree.root.children);
  };
  useEffect(() => {
    fetchTaxonomy();
  }, []);

  const nextData=(e) => {
    console.log(e.target.value)
  }

  return <div className="App">
    {resultData&& <>
    <select onChange={(e) => nextData(e)}>
      {console.log(resultData)}
      {resultData.map((row,i) => <option key={i} value={row.data}>{row.data}</option>)}
    </select>
    </>}
  </div>;
}

export default App;
