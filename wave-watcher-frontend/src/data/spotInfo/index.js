/**
 * spotInfo/index.js
 *
 * Collects all regional spot info objects into a single SPOT_INFO export.
 * Import from this file exactly as you previously imported from spotInfoData.js:
 *   import { SPOT_INFO } from "../data/spotInfo";
 *
 * TO ADD A NEW REGION:
 *   1. Create src/data/spotInfo/my_region.js
 *   2. Export MY_REGION_INFO from it
 *   3. Spread it into SPOT_INFO below
 */

import { INDONESIA_SUMATRA_INFO } from "./indonesia_sumatra";
import { INDONESIA_BALI_INFO }    from "./indonesia_bali";
import { FRANCE_INFO }            from "./france";
import { USA_FLORIDA_INFO }       from "./usa_florida";

export const SPOT_INFO = {
  ...INDONESIA_SUMATRA_INFO,
  ...INDONESIA_BALI_INFO,
  ...FRANCE_INFO,
  ...USA_FLORIDA_INFO,
};
