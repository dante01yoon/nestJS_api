import Input from "./input.js";

const ce = React.createElement

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      React.createElement("div", {}, ce(Input))
    )
  }
}

export default App;