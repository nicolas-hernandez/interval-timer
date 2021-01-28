import { ConfigController } from './configController.js';

test("Decreasing rest time updates the view and model", () => {
    controller = new ConfigController();
    expect(getUserDisplayName(1)).toBe("Polesny, Ondrej");
})
