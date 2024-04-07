import Message from "../models/Message.js";

// POST NEW MESSAGE
export const postMessage = async(req, res) =>{
    const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (error) {
    console.log(error);
  }
}

// GET ALL MESSAGE
export const getAllMessage = async (req, res) =>{
    try {
        const message = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).send(message);
      } catch (error) {
        console.log(error);
      }
}