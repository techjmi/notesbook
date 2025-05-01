import { NextResponse } from "next/server";
import connectDB from "../db";
import Note from "../models/notes";
import { verifyJwt } from "../utils/verifyToken";
import { startOfDay, endOfDay } from 'date-fns'
export async function GET(req) {
  try {
    await connectDB();
    const decoded = await verifyJwt();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); 
    let filter = { user: decoded.id };
    const today = new Date();
    if (type === "today") {
      filter.date = {
        $gte: startOfDay(today),
        $lte: endOfDay(today),
      };
    } else if (type === "upcoming") {
      filter.date = { $gt: endOfDay(today) };
    } else if (type === "past") {
      filter.date = { $lt: startOfDay(today) };
    }

    const notes = await Note.find(filter).sort({ date: 1 });
    // console.log(notes)

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
      const { title, content, date } = await req.json();
  
      const newNote = new Note({
        title,
        content,
        date: new Date(date), 
        user: decoded.id,
      });
  
      const savedNote = await newNote.save();
      return NextResponse.json({ note: savedNote }, { status: 201 });
    } catch (error) {
      console.error("Error creating note:", error.message);
      return NextResponse.json({ error: "Failed to create note" }, { status: 400 });
    }
  }
  
