import { createMocks } from 'node-mocks-http';
import searchAPI from '../../pages/api/search';

describe("Search albums", () => {
  it("POST", async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: `https://api.spotify.com/v1/search?q=justice&limit=10&offset=0&type=album`,
    });

    await searchAPI(req, res);

    expect(res._getStatusCode()).toBe(200);
    const datas = JSON.parse(res._getData())
    expect(datas).toEqual(
      expect.objectContaining({
        albums: expect.any(Array),
      }),
    );
  })

  it("GET Bad method", async () => {
    const { req, res } = createMocks({
      method: 'GET',
      body: `https://api.spotify.com/v1/search?q=justice&limit=10&offset=0&type=album`,
    });

    await searchAPI(req, res);

    expect(res._getStatusCode()).toBe(405);
  })
})