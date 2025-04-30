import { NextResponse } from "next/server";
import connectDB from "../../db";
import { verifyJwt } from "../../utils/verifyToken";
import Note from "../../models/notes";
// import Note from "../../models/note";
export async function GET(_, { params }) {
  try {
    await connectDB();
    const decoded = await verifyJwt();
    if (!decoded?.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    const note = await Note.findOne({ _id: params.id, user: decoded.id });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    // console.error("GET /api/notes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const decoded = await verifyJwt();
    if (!decoded?.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }
    const note = await Note.findOneAndUpdate(
      { _id: params.id, user: decoded.id },
      { title, content },
      { new: true }
    );
    if (!note) {
      return NextResponse.json(
        { error: "Note not found or unauthorized" },
        { status: 404 }
      );
    }
    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    // console.error("PUT /api/notes/[id] error:", error);
    return NextResponse.json(
      { error: "Something went wrong while updating note" },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    // console.log("function called");
    await connectDB();
    // console.log("db connected");

    const decoded = await verifyJwt();

    if (!decoded?.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    const deleted = await Note.findOneAndDelete({
      _id: params.id,
      user: decoded.id,
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Note not found or unauthorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // console.error("DELETE /api/notes/[id] error:", error);
    return NextResponse.json(
      { error: "Something went wrong while deleting note" },
      { status: 500 }
    );
  }
}
