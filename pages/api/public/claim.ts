import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { handleApiError } from "../../../api/error";
import { createResponse } from "../../../api/types/response";
import { authUsecase } from "../../../api/usecases/auth";

const handleClaimAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
      const { ctoken } = req.query;
      if (!ctoken) {
        return res
          .status(400)
          .send(createResponse(false, "Require CToken", null));
      }
      return authUsecase.claimAccessToken(res, ctoken as string);
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleClaimAPI;
