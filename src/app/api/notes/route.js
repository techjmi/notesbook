import { NextResponse } from "next/server";
import connectDB from "../db";
import Note from "../models/notes";
import { verifyJwt } from "../utils/verifyToken";
export async function GET(req) {
    try {
      await connectDB();
      const decoded = await verifyJwt();
      // Fetch all notes for the logged-in user
      const notes = await Note.find({ user: decoded.id }).sort({ createdAt: -1 });
      return NextResponse.json({ notes }, { status: 200 });
  
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }  
export async function POST(req) {
    try {
      await connectDB();
      const decoded = await verifyJwt();
      const { title, content,} = await req.json();
      const newNote = new Note({
        title,
        content,
        user: decoded.id,
      });
  
      const savedNote = await newNote.save();
    //   console.log("Saved Note:", savedNote);
      return NextResponse.json({ note: savedNote }, { status: 201 });
    } catch (error) {
      console.error("Error creating note:", error.message);
      return NextResponse.json({ error: "Failed to create note" }, { status: 400 });
    }
  }
