import { describe, expect, it, vi } from "vitest";
import { fail, ok } from "../../src/utils/api-response.js";

function mockRes() {
  const res: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res;
}

describe("ok", () => {
  it("sends success envelope with status and data", () => {
    const res = mockRes();
    ok(res, "Fetched", { id: 1 }, 201);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Fetched",
      data: { id: 1 },
    });
  });

  it("defaults to 200", () => {
    const res = mockRes();
    ok(res, "Fetched", null);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Fetched",
      data: null,
    });
  });

  it("takes message first and data second", () => {
    const res = mockRes();
    ok(res, "Created", { id: 2 }, 201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Created",
      data: { id: 2 },
    });
  });
});

describe("fail", () => {
  it("sends failure envelope with errors", () => {
    const res = mockRes();
    fail(res, "Validation failed", [{ path: "name", message: "required" }], 422);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Validation failed",
      errors: [{ path: "name", message: "required" }],
    });
  });

  it("defaults to 400 and empty errors", () => {
    const res = mockRes();
    fail(res, "Nope");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Nope",
      errors: [],
    });
  });
});
