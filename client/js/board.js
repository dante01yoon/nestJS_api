const ce = React.createElement;
export const chatContext = React.createContext(null);

const chatconsumer = ce(chatContext.Consumer, {},
);

const chatprovider = (value, child) => ce(chatContext.Provider, { value }, child);


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],

    }
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on("fromServer", ({ message }) => {
      console.log(message);
      this.setState({
        chats: [
          ...this.state.chats,
          message,
        ]
      })
    });

  }

  componentWillUnMount() {
    this.props.socket.leave();
  }

  updateChats = (chat) => {
    const { socket } = this.props;
    socket.emit("fromClient", {
      message: chat,
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

    const chatElement = (chat, idx) => ce("div", {
      className: "chat_element",
      key: `chatElementKey::${idx}`
    }, chat)

    const chatContainer = ce("article", {
      className: "chat_container",
    }, ce(React.Fragment, {}, this.state.chats.map(
      (chat, idx) => chatElement(chat, idx))
    ));

    const inputContainer = ce("article", {
      className: "input_container",
    },
      inputtag
    );

    const wrapper = ce("section", {
      className: "board_rapper",
    },
      chatContainer,
      inputContainer,
    );

    const provider = chatprovider({
      updatechats: this.updateChats
    }, ce("div", {}, wrapper));

    return provider
  }
}

export default Board;