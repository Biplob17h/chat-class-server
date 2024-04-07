import Conversation from "../models/Conversation.js";

// CREATE NEW CONVERSATION
export const postNewConv = async(req, res) =>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
    
      try {
        const savedConversation = await newConversation.save();
        res.status(200).send(savedConversation);
      } catch (error) {
        res.status(500).send(error);
      }
}

// GET CONVERSATION
export const getConvUser = async (req, res) =>{
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.id] },
        });
        res.status(200).send(conversation);
      } catch (error) {
        res.status(500).send(error);
      }
}