const USER_ID = Math.floor(Math.random() * 1000000001);

class IM {
  constructor(client, userName) {
    return (async () => {
      // All async code here
      this.client = await client.login({
        token: "",
        uid: userName,
      });

      return this; // when done
    })();
  }

  async createChannel(channelId) {
    let channel = await this.client.createChannel(channelId);
    channel.join();
  }

  sendMsg() {}
}

// const useAgoraRtm = (userName, client) => {

//   // const [messages, setMessages] = useState<IMessage[]>([]);
//   // const channel = useRef(client.createChannel("channelId")).current;
//   // const color = useRef(randomColor({ luminosity: "dark" })).current;
//   const initRtm = async () => {
//     await client.login({
//       uid: USER_ID.toString(),
//     });
//     await channel.join();
//     await client.setLocalUserAttributes({
//       name: userName,
//       color,
//     });
//   };
//   useEffect(() => {
//     initRtm();
//     // eslint-disable-next-line consistent-return
//   }, []);

//   useEffect(() => {
//     channel.on("ChannelMessage", (data, uid) => {
//       handleMessageReceived(data, uid);
//     });
//   }, []);

//   const handleMessageReceived = async (data: RtmMessage, uid: string) => {
//     const user = await client.getUserAttributes(uid);
//     console.log(data);
//     if (data.messageType === "TEXT") {
//       const newMessageData = { user, message: data.text };
//       setCurrentMessage(newMessageData);
//     }
//   };

//   const [currentMessage, setCurrentMessage] = useState<IMessage>();
//   const sendChannelMessage = async (text: string) => {
//     channel
//       .sendMessage({ text })
//       .then(() => {
//         setCurrentMessage({
//           user: { name: "Current User (Me)", color },
//           message: text,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (currentMessage) setMessages([...messages, currentMessage]);
//   }, [currentMessage]);

//   return { sendChannelMessage, messages };
// };
export default IM;
