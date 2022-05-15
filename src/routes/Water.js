import { execQuery, verifyReq } from "../helper/resTools";

const postWater = async (req, res) => {
  verifyReq(`water`, req, res, async () => {
    const { value } = req.body;
    const data = await execQuery(`call insertWater(${value})`);
    res.send(data);
  });
};

export { postWater };
