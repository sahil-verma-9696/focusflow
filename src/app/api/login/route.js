import { NextResponse } from 'next/server';

// Handle GET requests to /api/login
export async function GET(request) {
  return NextResponse.json({ message: 'GET request received' });
}