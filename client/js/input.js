import { chatContext } from "./board.js";

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

  handleSubmit(e) {
    e.preventDefault();
    const { updatechats: updateChats } = this.context;
    updateChats(this.state.inputValue);
    this.setState({ inputValue: "" });
  }

  render() {

    const input = ce("input", {
      onChange: this.handleChange.bind(this),
      value: this.state.inputValue,
      className: "input_value",
      placeholder: "메세지를 입력하세요...",
    });

    const form = ce("form", {
      onSubmit: this.handleSubmit.bind(this),
    },
      input
    )

    const wrapper = ce("div", {
      className: "input_box",
    }, form)

    return (
      wrapper
    )
  }
}

Input.contextType = chatContext;

export default Input;
