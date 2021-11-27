import { createMocks } from 'node-mocks-http';
import albumAPI from '../../pages/api/album/[id].js';

describe("Search specific album", () => {
  it("GET", async () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: {
        id: '2noRn2Aes5aoNVsU6iWThc'
      },
    });

    await albumAPI(req, res);

    expect(res._getStatusCode()).toBe(200);
    const datas = JSON.parse(res._getData())
    expect(datas).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String)
      }),
    );
  })

  it("POST Bad method", async () => {
    const { req, res } = createMocks({
      method: 'POST',
      params: {
        id: '2noRn2Aes5aoNVsU6iWThc'
      },
    });

    await albumAPI(req, res);

    expect(res._getStatusCode()).toBe(405);
  })
})