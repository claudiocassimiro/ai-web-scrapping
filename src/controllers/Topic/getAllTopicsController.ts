import { Request, Response } from "express";
import { getAllTopicsRepo } from "../../repositories/Topic/getAllTopicsRepo";

export const getAllTopicsController = async (req: Request, res: Response) => {
  try {
    const topics = await getAllTopicsRepo(req.email?.email);

    if (!topics) {
      return res.status(404).send("Not found Topics");
    }

    res.status(200).json({
      topics,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
