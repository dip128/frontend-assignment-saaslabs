import { pageCountUtil } from "../utils";

describe('page utils test',() => {
    it('pageCountUtil test',() => {
        const actualRes = pageCountUtil(100,5,1,5);
        expect(actualRes).toStrictEqual(["..."]);
    })
})

