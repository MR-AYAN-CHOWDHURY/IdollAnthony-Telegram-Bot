 const axios = require('axios');

module.exports = {
  config: {
    name: "bot",
    credits: "Nayan",
    prefix: "auto",
    permission: 0,
    aliases: ["bot"],
    description: " Chat With bot",
    tags: ["General"],
  },
  start: async ({ event, api, botInfo }) => {
    const lastReplies = {};
    
    const botId = botInfo.id;
    let isReplyEnabled = true; 
    const text = event.body;
    const chatId = event.threadId;

    const greetings = [
      "𝗞𝗮𝘀𝗲 𝗮𝘀𝗼 𝗯𝗮𝗯𝘆 𝘁𝗺𝗮𝗸𝗲 𝗮𝗸𝘁𝗮 𝗽𝗮𝗽𝗽𝗶 𝗱𝗲𝗶😇😘",
      "𝗔𝗺𝗮𝗸𝗲 𝗯𝗼𝘁 𝗻𝗮 𝗯𝗼𝗹𝗲 𝗯𝗮𝗯𝘆 𝗯𝗼𝗹𝗲 𝗱𝗮𝗸𝗼 ☺️🌼",
      "𝗕𝗮𝗿 𝗯𝗮𝗿 𝗮𝘁𝗼 𝗱𝗮𝗸𝗼𝘀 𝗸𝗲𝗻 😾😾",
      "𝗔𝗺𝗮𝗸𝗲 𝗻𝗮 𝗱𝗲𝗸𝗲 𝗮𝗺𝗮𝗿 𝗔𝗻𝘁𝗵𝗼𝗻𝘆 𝗯𝗼𝘀𝘀 𝗸 𝗮𝗸𝘁𝗮 𝗴𝗳 𝗱𝗲 😜😜",
      "𝗛𝗺𝗺𝗺 𝗯𝗼𝗹𝗲𝗻 𝗮𝗽𝗻𝗮𝗸𝗲 𝗮𝗺𝗶 𝗸𝗶𝘃𝗮𝗯𝗲 𝗵𝗲𝗹𝗽 𝗸𝗼𝗿𝘁𝗲 𝗽𝗮𝗿𝗶 😚😚",
      "𝗧𝗼𝗿𝗮 𝗸𝗶 𝘃𝗮𝗹𝗼 𝗵𝗼𝗯𝘆 𝗻𝗮𝗵 𝗸𝗼𝗻𝗼 𝗱𝗶𝗻 𝗺𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 𝗔 𝗼 𝗯𝗼𝘁 𝗯𝗼𝘁 𝗸𝗼𝗿𝘁𝘆 𝗮𝗿 𝗮𝗸𝗵𝗮𝗻𝗲 𝗼 𝗸𝗼𝗿𝗼𝘀 😾😾",
      "𝗩𝗮𝗶 𝗮𝗸𝗵𝗼𝗻 𝘁𝗵𝗮𝗺 𝘁𝗼𝗿𝗮 𝗺𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 𝗮 𝗷𝗮 𝗸𝗼𝗿𝘀𝗼𝘀 𝗸𝗼𝗿𝘀𝗼𝗮 𝗯𝘂𝘁 𝗮𝘁𝗮 𝘁𝗴 𝗮𝗸𝗵𝗮𝗻𝗲 𝘃𝗮𝗹𝗼 𝗸𝗼𝗿𝗲 𝗱𝗮𝗸 😞😞",
      "🍒𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂 𝗢𝗮𝗹𝗮𝗶𝗸𝘂𝗺🍒",
      "𝗔𝗿𝗲𝗸𝗯𝗮𝗿 𝗯𝗼𝘁 𝗯𝗼𝗹𝗹𝗲 𝗮𝗺𝗿 𝗯𝗼𝘀𝘀 𝗔𝗻𝘁𝗵𝗼𝗻𝘆 𝘀𝗮𝘁𝗵𝗲 𝗵𝘂𝗴𝗴𝗮 𝗸𝗼𝗿𝗶𝗮 𝗱𝗶𝗺𝘂 😎😎"
    ];

    const fetchApiResponse = async (text) => {
      try {
        const kl = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
        const apiUrl = kl.data.api;
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(text)}`);
        if (response.data.status === "200") {
          return response.data.data.msg;
        }
        return "⚠️ Unexpected response from the API.";
      } catch (error) {
        console.error("Error fetching data from API:", error);
        return "⚠️ Unable to fetch data from the API.";
      }
    };

    if (text.toLowerCase() === "off") {
      isReplyEnabled = false;
      await api.sendMessage(chatId, "✅ Reply functionality is now turned off.");
      return;
    }

    if (text.toLowerCase() === "on") {
      isReplyEnabled = true;
      await api.sendMessage(chatId, "✅ Reply functionality is now turned on.");
      return;
    }

    
    if (text) {
      const apiResponse = await fetchApiResponse(text);
      lastReplies[chatId] = apiResponse;
      await api.sendMessage(chatId, apiResponse, {reply_to_message_id: event.msg.message_id});
    } else {
      
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const firstName = event.message.from?.first_name || "Undefined";
      const lastName = event.message.from?.last_name || "Undefined";
      await api.sendMessage(chatId, `${firstName} ${lastName}, ${randomGreeting}`, {reply_to_message_id: event.msg.message_id});
    }


    api.on("message", async (msg) => {
      if (msg.reply_to_message && msg.reply_to_message.from.id === botId) {
        const chatId = msg.chat.id;
        const userReply = msg.text;

        if (isReplyEnabled && lastReplies[chatId]) {
          const apiResponse = await fetchApiResponse(userReply);
          await api.sendMessage(chatId, apiResponse);
        }
      }
    });
  },
};
