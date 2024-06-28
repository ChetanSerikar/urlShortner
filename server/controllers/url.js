import { nanoid } from "nanoid";
import URL from "../models/url.js";

// to generate a shortID
export const postUrl = async (req, res) => {
  try {
    const reqURL = req.body.url;
    if (!reqURL) return res.status(400).json({ message: "enter url" });
    const shortId = nanoid(8);

    const newURL = await URL.create({
      shortID: shortId,
      redirectURL: reqURL,
      visitHistory: [],
      createdBy: req.user._id,
    });

    // return res.status(200).json({ id: shortId });
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "error" });
  }
};

// to get all url's
export const getAllUrl = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy: req.user._id });

    return res.render("home", { urls: allurls });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//to update click's for th shortID
export const getUrl = async (req, res) => {
  try {
    const { shortID } = req.params;
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// to delete a shortURl
export const deletUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await URL.findOneAndDelete({ shortID: id });
    if (!result) return res.status(404).send({ message: "no url fr this id" });

    return res.status(200).send({ message: "shorturl deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// to get the number of Click's for specific short id
export const handleGetAnalytics = async (req, res) => {
  try {
    const { shortID } = req.params;

    const result = await URL.findOne({ shortID });

    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export default { postUrl, getUrl, getAllUrl, deletUrl, handleGetAnalytics };
