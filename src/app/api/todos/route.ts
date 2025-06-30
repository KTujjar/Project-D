import { NextResponse } from "next/server";

const todos  = [
    {id:1, title: "Learn DevOps", completed: false},
];

export async function GET() {
    return NextResponse.json(todos);
}


export async function POST(req: Request) {
    const {title} = await req.json();
    const id = todos.length + 1;
    todos.push({id, title, completed: false});
    return NextResponse.json({id, title, completed: false});
}