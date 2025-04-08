import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const response = await axios.get("http://11.11.7.81:3002/api/v1/users");

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update users" },
      { status: 500 },
    );
  }
}
