import N_User from "../models/user";
import { verifyJwt } from "../utils/verifyToken";
export async function GET() {
  try {
    const decoded = await verifyJwt();
    const user = await N_User.findById(decoded.id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
