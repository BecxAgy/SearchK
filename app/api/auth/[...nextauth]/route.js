import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import React from "react";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    //find one by email
    const userSession = await User.findOne({
      email: session.user.email,
    });

    //take id
    session.user.id = userSession.user._id;

    return session;
  },

  async signIn({ profile }) {
    try {
    } catch (error) {
      //Connect
      await connectToDB();

      //check if user already exists in database
      const hasUser = await User.findOne({
        email: this.session.user.email,
      });

      //if not exists, create new user
      if (!hasUser) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", ""),
          image: profile.picture,
        });
      }
    }
  },
});

export { handler as GET, handler as POST };
