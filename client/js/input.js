const ce = React.createElement;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    }
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const input = ce("input", {
      onChange: this.handleChange.bind(this),
      value: this.state.inputValue,
      className: "input_value",
      placeholder: "메세지를 입력하세요...",
    });
    const wrapper = ce("div", {
      className: "input_wrapper",
    }, input)
    return (
      wrapper
    )
  }
}

export default Input;