import paths from "@/constants/paths";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.NEXT_CLERK_SVIX_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add NEXT_CLERK_SVIX_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  // const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, first_name, last_name, username, email_addresses, image_url } =
      evt.data;
    try {
      const newUser = await createUser({
        clerkId: id,
        name: `${first_name} ${last_name ? last_name : ""}`,
        username: username || "",
        email: email_addresses[0].email_address,
        picture: image_url,
      });
      return NextResponse.json(
        { message: "OK", user: newUser },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: `Internal server error : ${error}` },
        { status: 500 },
      );
    }
  }

  if (eventType === "user.updated") {
    const { id, first_name, last_name, username, email_addresses, image_url } =
      evt.data;
    try {
      const newUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name} ${last_name ? last_name : ""}`,
          username: username || "",
          email: email_addresses[0].email_address,
          picture: image_url,
        },
        revalidatePath: `${paths.profile}/${id}`,
      });
      return NextResponse.json(
        { message: "OK", user: newUser },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500 },
      );
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      const newUser = await deleteUser({
        clerkId: id!,
        revalidatePath: `${paths.profile}/${id}`,
      });
      return NextResponse.json(
        { message: "OK", user: newUser },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: `Internal server error: ${error}` },
        { status: 500 },
      );
    }
  }

  return new Response("Webhook received", { status: 200 });
}
