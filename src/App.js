import { useEffect, useState } from "react";
import { Tree } from "./DataTaxonomy/tree";

function App() {
  const [categories, setCategories] = useState([]);

  const fetchTaxonomy = async () => {
    const tree = new Tree();
    await fetch(require("./DataTaxonomy/taxonomy.txt"))
      .then((res) => res.text())
      .then((result) => {
        result
          .split("\n")
          .map((d) => d.split(" > "))
          .forEach((val) => tree.insert(val));
      });
    setCategories([tree.root]);
  };
  useEffect(() => {
    fetchTaxonomy();
  }, []);

  console.log(categories);

  return (
    <div className="App">
      {categories.map((cat, idx) => {
        return (
          cat.children.length > 0 && (
            <center key={idx}>
              <select
                onChange={(e) =>
                  setCategories([
                    ...categories.splice(0, idx + 1),
                    JSON.parse(e.target.value),
                  ])
                }
              >
                {cat.children.map((subCat, i) => (
                  <option
                    key={JSON.stringify(subCat)}
                    value={JSON.stringify(subCat)}
                  >
                    {subCat.data}
                  </option>
                ))}
              </select>
              <br />
              <br />
            </center>
          )
        );
      })}
    </div>
  );
}

export default App;
