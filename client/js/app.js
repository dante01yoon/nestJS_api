import Input from "./input.js";
import Board from "./board.js";

const ce = React.createElement

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div",
        {},
        ce(Board, {
          inputtag: ce(Input),
        }))
    );
  }
}

export default App;