import App from "./app.js";

const rootElement = document.getElementById("root");

ReactDOM.render(React.createElement(App, { name: "dante" }), rootElement);