import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { UserType } from "@repo/shared-types";

const fetchUser = async (req: Request, res: Response) => {
  const users = await db
    .collection("users")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    });

  res.json(users);
};

const updateUser = async (req: Request, res: Response) => {
  try {
    //* Best practice is validate with Zod
    const body = req.body as UserType;

    const userDocRef = db.collection("users").doc(body.id);

    await db.runTransaction((transaction) => {
      return transaction.get(userDocRef).then((doc) => {
        if (!doc.exists) {
          throw "Document does not exist!";
        }

        transaction.update(userDocRef, {
          fullname: body.fullname,
          totalAverageWeightRatings: body.totalAverageWeightRatings,
          numberOfRents: body.numberOfRents,
          recentlyActive: body.recentlyActive,
        });
      });
    });

    const userDocGet = await userDocRef.get();
    const response = userDocGet.data();
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: true, message: "Update error." });
  }
};

export const controller = { fetchUser, updateUser };
