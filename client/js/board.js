const ce = React.createElement;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    }
    this.updateChats.bind(this);
  }

  updateChats(chat) {
    this.setState({
      chats: [
        ...this.state.chats,
        chat
      ]
    })
  }

  appendTo(...args) {
    if (Array.isArray(args)) {
      const reduced = args.reduce((acc, curr, idx) => {
        if (idx === 0) {
          return curr;
        }
        acc.appendTo(curr);
        return acc;
      });
      return reduced;
    }
    return null;
  }

  render() {
    const { inputtag } = this.props;

    const chatContainer = ce("article", {
      className: "chat_container",
    })

    const inputContainer = ce("article", {
      className: "input_container",
    },
      inputtag
    )

    const wrapper = ce("section", {
      className: "board_rapper",
    },
      chatContainer,
      inputContainer
    );

    return (
      wrapper
    )
  }
}

export default Board;