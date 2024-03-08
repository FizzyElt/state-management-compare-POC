import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { pipe } from "fp-ts/function";
import * as Option from "fp-ts/Option";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

pipe(
  Option.fromNullable(document.getElementById("root")),
  Option.map((root) => ReactDOM.createRoot(root).render(<App />)),
);
