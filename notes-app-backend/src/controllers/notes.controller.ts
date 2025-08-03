import { Request, Response } from 'express';
import Note from '../models/Note';
import User from '../models/User';


export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({
      $or: [{ owner: req.user!.id }, { sharedWith: req.user!.id }],
    }).populate('owner', 'username').populate('sharedWith', 'username');
    res.json(notes);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server Error' });
  }
};


export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Please add a title and content' });
  }
  try {
    const newNote = new Note({
      title,
      content,
      owner: req.user!.id,
    });
    
    const savedNote = await newNote.save();
    const populatedNote = await Note.findById(savedNote._id).populate('owner', 'username');
    res.status(201).json(populatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const shareNote = async (req: Request, res: Response) => {
  const { usernameToShareWith } = req.body;
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.owner.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const userToShareWith = await User.findOne({ username: usernameToShareWith });
    if (!userToShareWith) {
      return res.status(404).json({ message: `User '${usernameToShareWith}' not found` });
    }

    if (note.sharedWith.includes(userToShareWith._id) || note.owner.equals(userToShareWith._id)) {
        return res.status(400).json({ message: 'Note already shared with this user' });
    }

    note.sharedWith.push(userToShareWith._id);
    await note.save();
    const populatedNote = await Note.findById(note._id).populate('owner', 'username').populate('sharedWith', 'username');

    res.json(populatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.owner.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.deleteOne();

    res.json({ message: 'Note removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.owner.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();

    const populatedNote = await Note.findById(updatedNote._id)
        .populate('owner', 'username')
        .populate('sharedWith', 'username');

    res.json(populatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};