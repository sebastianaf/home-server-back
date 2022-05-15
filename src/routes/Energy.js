import { execQuery, verifyReq } from "../helper/resTools";

const postEnergy = async (req, res) => {
  verifyReq(`/energy`, req, res, async () => {
    const { value } = req.body;
    const data = await execQuery(`call insertEnergy(${value})`);
    res.send(data);
  });
};

export { postEnergy };
