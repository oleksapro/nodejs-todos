import { matchPath } from "./matchPath.ts";

describe("matchPath", () => {
  // 1. Exact match (static route)
  it("should match exact static routes", () => {
    // Arrange
    const routePath = "/tasks";
    const pathname = "/tasks";

    // Act
    const result = matchPath(routePath, pathname);

    // Assert
    expect(result).toEqual({ match: true, params: {} });
  });

  // 2. Dynamic parameter match
  it("should match routes with dynamic parameters", () => {
    // Arrange
    const routePath = "/tasks/:id";
    const pathname = "/tasks/123";

    // Act
    const result = matchPath(routePath, pathname);

    // Assert
    expect(result).toEqual({ match: true, params: { id: "123" } });
  });

  // 3. Mismatch in static parts
  it("should not match if static parts differ", () => {
    // Arrange
    const routePath = "/tasks/details";
    const pathname = "/tasks/info";

    // Act
    const result = matchPath(routePath, pathname);

    // Assert
    expect(result).toEqual({ match: false, params: {} });
  });

  // 4. Mismatch in length
  it("should not match if path lengths differ", () => {
    // Arrange
    const routePath = "/tasks";
    const pathname = "/tasks/123";

    // Act
    const result = matchPath(routePath, pathname);

    // Assert
    expect(result).toEqual({ match: false, params: {} });
  });

  // 5. Multiple dynamic parameters
  it("should match routes with multiple dynamic parameters", () => {
    // Arrange
    const routePath = "/tasks/:taskId/comments/:commentId";
    const pathname = "/tasks/123/comments/456";

    // Act
    const result = matchPath(routePath, pathname);

    // Assert
    expect(result).toEqual({
      match: true,
      params: { taskId: "123", commentId: "456" },
    });
  });

  // 6. No match for dynamic parameter
  it("should not match if dynamic parameter is missing", () => {
    // Arrange
    const routePath = "/tasks/:id";
    const pathname = "/tasks";

    // Act
    const result = matchPath(routePath, pathname);

    // Assert
    expect(result).toEqual({ match: false, params: {} });
  });
});
